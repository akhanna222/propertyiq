import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import { pool } from "./db";
import { signupSchema, loginSchema, sectionFeedbackSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import { z } from "zod";
import Stripe from "stripe";
import { sendEmail, getWelcomeEmailTemplate, getSubscriptionConfirmationTemplate, getEmailVerificationTemplate } from "./email";
import crypto from "crypto";

// In-memory storage for email verification tokens (in production, use Redis or database)
const verificationTokens = new Map<string, { email: string, token: string, expires: Date }>();
const verifiedEmails = new Set<string>();

// Temporarily add test user to verified emails for CSV integration testing
verifiedEmails.add("Akhanna222@gmail.com");

// In development mode, auto-verify common test emails
verifiedEmails.add("abi@lendwell.ie");

// Check if we're in email testing mode (Resend development mode)
const isEmailTestingMode = process.env.NODE_ENV === 'development';

// Initialize Stripe - prioritize live credentials for production
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_TEST_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY or STRIPE_TEST_SECRET_KEY');
}
console.log(`[Stripe] Using ${stripeSecretKey.startsWith('sk_live_') ? 'LIVE' : 'TEST'} mode`);
const stripe = new Stripe(stripeSecretKey);



// Extend session to include userId
declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

// Simple authentication middleware
const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.session?.userId) {
    return next();
  }
  return res.status(401).json({ message: "Not authenticated" });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session middleware
  const pgSession = ConnectPgSimple(session);
  
  app.set("trust proxy", 1);
  app.use(session({
    store: new pgSession({
      pool: pool,
      tableName: "sessions"
    }),
    name: "sessionId",
    secret: process.env.SESSION_SECRET || "your-secret-key-here",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  }));

  // Email/Password Authentication Routes
  app.post('/api/signup', async (req, res) => {
    try {
      const validatedData = signupSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(409).json({ 
          message: "User already exists with this email", 
          redirectToSignIn: true 
        });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      // Create user
      const newUser = await storage.createUser({
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        propertyAreaInterested: validatedData.propertyAreaInterested,
      });
      
      // Send verification email
      try {
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationUrl = `${req.protocol}://${req.get('host')}/verify-email?token=${verificationToken}&email=${encodeURIComponent(newUser.email)}`;
        
        // Store verification token (expires in 24 hours)
        const expires = new Date();
        expires.setHours(expires.getHours() + 24);
        verificationTokens.set(verificationToken, {
          email: newUser.email,
          token: verificationToken,
          expires
        });
        
        const emailResult = await sendEmail({
          to: newUser.email,
          subject: "Verify your PropertyIQ account",
          html: getEmailVerificationTemplate(newUser.name || 'User', verificationUrl)
        });
        
        if (emailResult.error) {
          console.error("Email service error:", emailResult.error);
          
          // If we're in development mode and email service is restricted, auto-verify the email
          if (isEmailTestingMode && emailResult.error) {
            console.log(`Email service restricted in testing mode - auto-verifying ${newUser.email}`);
            verifiedEmails.add(newUser.email);
            verificationTokens.delete(verificationToken); // Clean up token
          } else {
            throw new Error(`Email delivery failed: ${emailResult.error.message}`);
          }
        } else {
          console.log(`Verification email sent successfully to ${newUser.email}`);
        }
      } catch (emailError) {
        console.error("Failed to send verification email:", emailError);
        
        // In development mode, auto-verify email if service fails
        if (isEmailTestingMode) {
          console.log(`Development mode: auto-verifying ${newUser.email} due to email service limitations`);
          verifiedEmails.add(newUser.email);
        }
        
        console.log("Account created - email verification status handled based on environment");
      }

      // Create session (manual session management)
      req.session.userId = newUser.id;
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).json({ message: "Failed to create session" });
        }
        
        res.json({
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          propertyAreaInterested: newUser.propertyAreaInterested,
          message: "Account created successfully! Please check your email to verify your account."
        });
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Signup validation error:", error.errors);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Signup error:", error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  app.post('/api/signin', async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Find user
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user || !user.password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Create session
      req.session.userId = user.id;
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).json({ message: "Failed to create session" });
        }
        
        res.json({
          id: user.id,
          email: user.email,
          name: user.name,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          propertyAreaInterested: user.propertyAreaInterested,
        });
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Signin error:", error);
      res.status(500).json({ message: "Failed to sign in" });
    }
  });

  // Get current user
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Usage limit check endpoint
  app.get('/api/usage', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const usage = await storage.checkUsageLimit(userId);
      res.json(usage);
    } catch (error) {
      console.error("Error checking usage:", error);
      res.status(500).json({ message: "Failed to check usage" });
    }
  });



  // Alternative auth user endpoint for email/password auth
  app.get('/api/auth/user-profile', async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        usageCount: user.usageCount || 0,
        subscriptionPlan: user.subscriptionPlan || 'free',
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Failed to fetch user profile" });
    }
  });

  app.post('/api/signout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ message: "Failed to sign out" });
      }
      res.json({ message: "Signed out successfully" });
    });
  });

  // Property search and analysis endpoints
  app.get("/api/properties", async (req, res) => {
    try {
      const { query } = req.query;
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: "Query parameter is required" });
      }
      
      const properties = await storage.searchProperties(query);
      res.json(properties);
    } catch (error) {
      console.error("Property search error:", error);
      res.status(500).json({ message: "Error searching properties" });
    }
  });

  // API endpoint to fetch raw PropertyRegister.ie data for popup table
  app.post("/api/property-register-data", isAuthenticated, async (req: any, res) => {
    try {
      const { address, county, eircode } = req.body;
      if (!address) {
        return res.status(400).json({ error: "Address is required" });
      }

      console.log(`Fetching PropertyRegister.ie data for: ${address}`);
      
      // Search for matching records in the database with county and eircode filtering
      const records = await storage.searchPropertyRegisterByAddress(address, county, eircode);
      
      // Format the data for the table
      const formattedData = records.map(record => ({
        id: record.id,
        address: record.address,
        county: record.county,
        eircode: record.eircode || 'N/A',
        price: record.price,
        saleDate: record.saleDate,
        description: record.description,
        year: record.year
      }));

      console.log(`Found ${formattedData.length} PropertyRegister.ie records for "${address}"`);
      
      res.json({ 
        success: true, 
        data: formattedData,
        count: formattedData.length,
        address: address
      });
    } catch (error) {
      console.error("Error fetching property register data:", error);
      res.status(500).json({ error: "Failed to fetch property register data" });
    }
  });

  app.post("/api/analyze-property", isAuthenticated, async (req: any, res) => {
    try {
      const { address, county, eircode } = req.body;
      
      if (!address) {
        return res.status(400).json({ message: "Address is required" });
      }

      const userId = req.session.userId;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Check if email is verified
      if (!verifiedEmails.has(user.email)) {
        return res.status(403).json({ 
          message: "Please verify your email address before analyzing properties. Check your inbox for the verification link.",
          requiresEmailVerification: true
        });
      }
      
      // Check usage limit
      const usage = await storage.checkUsageLimit(userId);
      if (!usage.canAnalyze) {
        return res.status(403).json({ 
          message: "You have reached your free trial limit of 3 property analyses. Please try again later or contact support.",
          usage
        });
      }

      // Perform property analysis using simple storage (temporary fix)
      const { analyzePropertySimple } = await import("./simple-storage");
      console.log(`Starting property analysis for: ${address}`);
      const propertyData = await analyzePropertySimple(address, eircode, county);
      console.log(`Property analysis completed successfully`);
      
      if (!propertyData) {
        return res.status(404).json({ message: "Property not found or could not be analyzed" });
      }

      // Increment usage count
      await storage.incrementUsage(userId);

      // Save search to history
      await storage.saveUserSearch({
        userId,
        address,
        eircode: eircode || null,
        searchResults: propertyData,
      });

      // Save user query for search history sidebar
      await storage.saveUserQuery({
        userId,
        address,
        eircode: eircode || null,
        county: county || null,
        subscriptionStatus: user.subscriptionStatus || 'free',
        analysisOutput: propertyData,
      });

      res.json(propertyData);
    } catch (error: any) {
      console.error("=== PROPERTY ANALYSIS ERROR ===");
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      console.error("Full error object:", error);
      console.error("=== END ERROR DETAILS ===");
      
      res.status(500).json({ 
        message: "Error analyzing property",
        error: error.message,
        details: error.stack?.split('\n')[0] // First line of stack trace for debugging
      });
    }
  });

  // Search history endpoint
  app.get("/api/search-history", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const history = await storage.getUserSearchHistory(userId, limit);
      res.json(history);
    } catch (error) {
      console.error("Search history error:", error);
      res.status(500).json({ message: "Error fetching search history" });
    }
  });

  // Property register data endpoints
  app.post("/api/import-csv", async (req, res) => {
    try {
      const { csvData, year } = req.body;
      
      if (!csvData || !year) {
        return res.status(400).json({ message: "CSV data and year are required" });
      }
      
      const count = await storage.importPropertyRegisterCSV(csvData, year);
      res.json({ message: `Imported ${count} records for year ${year}` });
    } catch (error) {
      console.error("CSV import error:", error);
      res.status(500).json({ message: "Error importing CSV data" });
    }
  });

  app.get("/api/property-register/search", async (req, res) => {
    try {
      const { address, county, eircode } = req.query;
      
      if (!address) {
        return res.status(400).json({ message: "Address parameter is required" });
      }
      
      const results = await storage.searchPropertyRegisterByAddress(
        address as string,
        county as string,
        eircode as string
      );
      
      res.json(results);
    } catch (error) {
      console.error("Property register search error:", error);
      res.status(500).json({ message: "Error searching property register" });
    }
  });

  // Property price analysis endpoint - get average price for a location in 2025
  app.get("/api/property-register/average-price", async (req, res) => {
    try {
      const { location, year = 2025 } = req.query;
      
      if (!location) {
        return res.status(400).json({ message: "Location parameter is required" });
      }
      
      // Get property price data for the location
      const priceResults = await storage.getPropertyPriceAnalysis(
        location as string,
        parseInt(year as string)
      );
      
      res.json(priceResults);
    } catch (error) {
      console.error("Property price analysis error:", error);
      res.status(500).json({ message: "Error analyzing property prices" });
    }
  });

  app.get("/api/property-register/price-history", async (req, res) => {
    try {
      const { address, county, eircode } = req.query;
      
      if (!address) {
        return res.status(400).json({ message: "Address parameter is required" });
      }
      
      const history = await storage.getPropertyPriceHistory(
        address as string,
        county as string,
        eircode as string
      );
      
      res.json(history);
    } catch (error) {
      console.error("Price history error:", error);
      res.status(500).json({ message: "Error fetching price history" });
    }
  });

  // Feedback API routes
  app.post("/api/section-feedback", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const validatedData = sectionFeedbackSchema.parse(req.body);
      
      const feedback = await storage.saveSectionFeedback({
        ...validatedData,
        userId,
      });
      
      res.json(feedback);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid feedback data", errors: error.errors });
      }
      console.error("Feedback submission error:", error);
      res.status(500).json({ message: "Error saving feedback" });
    }
  });

  app.get("/api/section-feedback", async (req, res) => {
    try {
      const { propertyAddress, propertyEircode, sectionName } = req.query;
      
      if (!propertyAddress) {
        return res.status(400).json({ message: "Property address is required" });
      }
      
      const feedback = await storage.getSectionFeedback(
        propertyAddress as string,
        propertyEircode as string,
        sectionName as string
      );
      
      res.json(feedback);
    } catch (error) {
      console.error("Feedback retrieval error:", error);
      res.status(500).json({ message: "Error retrieving feedback" });
    }
  });

  app.get("/api/user-feedback", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const feedback = await storage.getUserFeedbackHistory(userId);
      res.json(feedback);
    } catch (error) {
      console.error("User feedback history error:", error);
      res.status(500).json({ message: "Error retrieving feedback history" });
    }
  });

  // Create Stripe subscription
  app.post("/api/create-subscription", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await storage.getUser(userId);
      
      if (!user || !user.email) {
        return res.status(400).json({ message: "User not found or missing email" });
      }

      // Check if user already has a subscription
      if (user.stripeSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        if (subscription.status === 'active') {
          const clientSecret = null; // Already subscribed, no payment needed
          
          return res.json({
            subscriptionId: subscription.id,
            clientSecret: clientSecret,
            message: "Already subscribed"
          });
        }
      }

      // Create or get Stripe customer
      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email,
          metadata: {
            userId: user.id
          }
        });
        customerId = customer.id;
        await storage.updateUserStripeInfo(user.id, customerId);
      }

      const stripePriceId = process.env.STRIPE_PRICE_ID || process.env.STRIPE_TEST_PRICE_ID;
      if (!stripePriceId) {
        throw new Error('STRIPE_PRICE_ID or STRIPE_TEST_PRICE_ID environment variable is required');
      }
      console.log(`[Stripe] Using price ID: ${stripePriceId} (${process.env.STRIPE_PRICE_ID ? 'LIVE' : 'TEST'})`);

      // First, let's fetch the price details to see what we're charging
      try {
        const priceDetails = await stripe.prices.retrieve(stripePriceId);
        console.log(`[Stripe] Price details:`, {
          id: priceDetails.id,
          amount: priceDetails.unit_amount,
          currency: priceDetails.currency,
          recurring: priceDetails.recurring
        });
        
        if (priceDetails.unit_amount === 0) {
          console.warn(`[Stripe] WARNING: Price is set to €0! This should be €10.00 (1000 cents)`);
        } else if (priceDetails.unit_amount !== 1000) {
          console.warn(`[Stripe] WARNING: Price is set to ${priceDetails.unit_amount} cents, but should be 1000 cents (€10.00)`);
        } else {
          console.log(`[Stripe] ✓ Price correctly set to €10.00 per month`);
        }
      } catch (error) {
        console.error(`[Stripe] Error fetching price details:`, error);
      }

      // Create subscription with immediate billing (automated billing cycle reset)
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price: stripePriceId,
        }],
        payment_behavior: 'default_incomplete',
        payment_settings: {
          save_default_payment_method: 'on_subscription',
        },
        expand: ['latest_invoice.payment_intent'],
        // Ensure immediate billing (no trial period)
        trial_period_days: 0,
        // Force immediate collection
        collection_method: 'charge_automatically',
        // Automatically bill immediately (equivalent to "Reset billing cycle")
        billing_cycle_anchor: Math.floor(Date.now() / 1000), // Current timestamp
        proration_behavior: 'create_prorations',
      });

      console.log(`[Stripe] Created subscription ${subscription.id} with status: ${subscription.status}`);
      console.log(`[Stripe] Latest invoice amount: ${(subscription.latest_invoice as any)?.amount_due} cents`);

      // Update user with subscription ID
      await storage.updateUserStripeInfo(user.id, customerId, subscription.id);

      // If the subscription was created but no payment intent exists, create an immediate invoice
      if (!subscription.latest_invoice || !(subscription.latest_invoice as any)?.payment_intent) {
        console.log(`[Stripe] No payment intent found, creating immediate invoice...`);
        try {
          const invoice = await stripe.invoices.create({
            customer: customerId,
            subscription: subscription.id,
            auto_advance: true,
          });
          
          const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id, {
            expand: ['payment_intent']
          });
          console.log(`[Stripe] Created immediate invoice ${finalizedInvoice.id} for ${finalizedInvoice.amount_due} cents`);
          
          const paymentIntent = (finalizedInvoice as any).payment_intent;
          if (paymentIntent) {
            return res.json({
              subscriptionId: subscription.id,
              clientSecret: paymentIntent.client_secret,
              message: "Subscription created with immediate payment",
              invoiceId: finalizedInvoice.id
            });
          }
        } catch (invoiceError) {
          console.error(`[Stripe] Error creating immediate invoice:`, invoiceError);
        }
      }

      let clientSecret = (subscription.latest_invoice as any)?.payment_intent?.client_secret;

      // If no client secret, the subscription might not require immediate payment
      // This can happen with free trials or if the subscription is already active
      if (!clientSecret) {
        // Check if subscription is already active
        if (subscription.status === 'active') {
          return res.json({
            subscriptionId: subscription.id,
            clientSecret: null,
            message: "Subscription is already active",
            status: "active"
          });
        }
        
        // If subscription exists but needs payment setup, create a setup intent
        const setupIntent = await stripe.setupIntents.create({
          customer: customerId,
          payment_method_types: ['card'],
          usage: 'off_session'
        });
        
        clientSecret = setupIntent.client_secret;
      }

      res.json({
        subscriptionId: subscription.id,
        clientSecret: clientSecret,
      });
    } catch (error: any) {
      console.error("Stripe subscription error:", error);
      res.status(500).json({ 
        message: "Error creating subscription",
        error: error.message 
      });
    }
  });

  // Stripe webhook to handle subscription events
  app.post("/api/stripe-webhook", express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      // For development, we'll skip signature verification
      // In production, you should verify the webhook signature
      event = JSON.parse(req.body);
    } catch (err) {
      console.log('Webhook signature verification failed.', err);
      return res.status(400).send(`Webhook Error: ${err}`);
    }

    // Handle the event
    switch (event.type) {
      case 'setup_intent.succeeded':
        console.log('SetupIntent succeeded:', event.data.object.id);
        // Find user by customer ID and activate subscription
        const setupIntent = event.data.object;
        if (setupIntent.customer) {
          try {
            // Find user by Stripe customer ID and update their subscription status
            const user = await storage.getUserByStripeCustomerId(setupIntent.customer);
            if (user) {
              await storage.updateUserSubscriptionStatus(user.id, 'active');
              console.log(`Activated subscription for user ${user.id}`);
            }
          } catch (error) {
            console.error('Error processing setup_intent.succeeded:', error);
          }
        }
        break;
      case 'invoice.payment_succeeded':
        console.log('Payment succeeded:', event.data.object.id);
        // Handle successful payment
        const invoice = event.data.object;
        if (invoice.customer) {
          try {
            const user = await storage.getUserByStripeCustomerId(invoice.customer);
            if (user) {
              await storage.updateUserSubscriptionStatus(user.id, 'active');
              console.log(`Activated subscription for user ${user.id}`);
            }
          } catch (error) {
            console.error('Error processing invoice.payment_succeeded:', error);
          }
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  });

  // Manual activation endpoint for development (replace with proper webhook in production)
  app.post("/api/activate-subscription", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      
      // Update user subscription status to active
      const updatedUser = await storage.updateUserSubscriptionStatus(userId, 'active');
      
      console.log(`Manually activated subscription for user ${userId}`);
      
      if (updatedUser && updatedUser.email) {
        // Send welcome email
        try {
          await sendEmail({
            to: updatedUser.email,
            subject: "Welcome to Premium!",
            html: getSubscriptionConfirmationTemplate(updatedUser.firstName || updatedUser.email, "Premium", "€10")
          });
          console.log(`Welcome email sent to ${updatedUser.email}`);
        } catch (emailError) {
          console.error("Failed to send welcome email:", emailError);
        }
      }
      
      res.json({ 
        success: true, 
        message: "Subscription activated successfully",
        subscriptionPlan: updatedUser.subscriptionPlan
      });
    } catch (error: any) {
      console.error("Error activating subscription:", error);
      res.status(500).json({ 
        message: "Failed to activate subscription",
        error: error.message 
      });
    }
  });

  // Simple email notification endpoint (webhook alternative for development)
  app.post("/api/subscription-success", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await storage.getUser(userId);
      
      // Update user subscription status to active
      await storage.updateUserSubscriptionStatus(userId, 'active');
      
      if (user && user.email) {
        // Send welcome email
        try {
          await sendEmail({
            to: user.email,
            subject: "Welcome to PropertyIQ Premium!",
            html: getWelcomeEmailTemplate(user.firstName || user.email)
          });
          console.log(`Welcome email sent to ${user.email}`);
          res.json({ message: "Welcome email sent successfully" });
        } catch (emailError) {
          console.error("Failed to send welcome email:", emailError);
          res.status(500).json({ message: "Failed to send email" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error sending subscription success email:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Email verification endpoint
  app.get('/verify-email', (req, res) => {
    const { token, email } = req.query;
    
    if (!token || !email) {
      return res.status(400).send(`
        <html>
          <head><title>PropertyIQ - Verification Error</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #dc2626;">Verification Error</h1>
            <p>Invalid verification link. Please try signing up again.</p>
            <a href="/" style="color: #3b82f6;">Return to PropertyIQ</a>
          </body>
        </html>
      `);
    }
    
    // Check if token exists and is valid
    const verificationData = verificationTokens.get(token as string);
    if (!verificationData || verificationData.email !== email || verificationData.expires < new Date()) {
      return res.status(400).send(`
        <html>
          <head><title>PropertyIQ - Verification Error</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #dc2626;">Verification Link Expired</h1>
            <p>This verification link has expired or is invalid. Please sign up again to receive a new verification email.</p>
            <a href="/signup" style="color: #3b82f6;">Sign Up Again</a>
          </body>
        </html>
      `);
    }
    
    // Mark email as verified
    verifiedEmails.add(email as string);
    verificationTokens.delete(token as string);
    
    console.log(`Email verified successfully: ${email}`);
    
    res.send(`
      <html>
        <head><title>PropertyIQ - Email Verified</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <div style="max-width: 500px; margin: 0 auto;">
            <h1 style="color: #10b981;">Email Verified Successfully!</h1>
            <p>Thank you for verifying your email address with PropertyIQ.</p>
            <p>Your account is now fully activated and you can start analyzing Irish properties.</p>
            <a href="/" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 20px;">Start Analyzing Properties</a>
          </div>
        </body>
      </html>
    `);
  });

  // Get user query history
  app.get("/api/user-queries", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const queries = await storage.getUserQueryHistory(userId, limit);
      
      // Transform the data to only include essential info for the UI
      const historyItems = queries.map(query => ({
        id: query.id,
        address: query.address,
        eircode: query.eircode,
        county: query.county,
        createdAt: query.createdAt,
        analysisOutput: query.analysisOutput
      }));
      
      res.json(historyItems);
    } catch (error: any) {
      console.error("Error fetching user query history:", error);
      res.status(500).json({ message: "Error fetching search history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}