import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing required environment variable: RESEND_API_KEY');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailData) {
  try {
    const result = await resend.emails.send({
      from: 'PropertyIQ <onboarding@resend.dev>',
      to,
      subject,
      html,
    });

    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

export function getWelcomeEmailTemplate(userName: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to PropertyIQ Premium</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to PropertyIQ Premium!</h1>
      </div>
      
      <div style="background: white; padding: 40px 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937; margin-top: 0;">Hello ${userName}!</h2>
        
        <p>Thank you for subscribing to PropertyIQ Premium! You now have unlimited access to our comprehensive property analysis platform.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #3b82f6; margin-top: 0;">Your Premium Benefits Include:</h3>
          <ul style="color: #4b5563; margin: 0; padding-left: 20px;">
            <li>Unlimited property analyses</li>
            <li>Advanced market insights and trends</li>
            <li>Detailed neighborhood analysis</li>
            <li>Investment potential assessments</li>
            <li>Priority customer support</li>
          </ul>
        </div>
        
        <p>Start exploring properties now with your unlimited access!</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://propertyiq.io" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Start Analyzing Properties</a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          If you have any questions, feel free to reach out to our support team. We're here to help you make the best property decisions!
        </p>
      </div>
      
      <div style="background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; font-size: 12px;">
        <p>© 2025 PropertyIQ. All rights reserved.</p>
        <p>PropertyIQ - Intelligent Property Analysis Platform</p>
      </div>
    </body>
    </html>
  `;
}

export function getEmailVerificationTemplate(userName: string, verificationUrl: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - PropertyIQ</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Verify Your Email Address</h1>
      </div>
      
      <div style="background: white; padding: 40px 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937; margin-top: 0;">Hello ${userName}!</h2>
        
        <p>Thank you for signing up with PropertyIQ! To complete your registration and start analyzing Irish properties, please verify your email address.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 16px;">Verify Email Address</a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          If the button doesn't work, copy and paste this link into your browser:<br>
          <a href="${verificationUrl}" style="color: #3b82f6; word-break: break-all;">${verificationUrl}</a>
        </p>
        
        <p style="color: #6b7280; font-size: 14px;">
          This verification link will expire in 24 hours. If you didn't create an account with PropertyIQ, you can safely ignore this email.
        </p>
      </div>
      
      <div style="background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; font-size: 12px;">
        <p>© 2025 PropertyIQ. All rights reserved.</p>
        <p>PropertyIQ - Intelligent Property Analysis Platform</p>
      </div>
    </body>
    </html>
  `;
}

export function getSubscriptionConfirmationTemplate(userName: string, planName: string, amount: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Subscription Confirmed - PropertyIQ</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #10b981, #3b82f6); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Subscription Confirmed!</h1>
      </div>
      
      <div style="background: white; padding: 40px 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937; margin-top: 0;">Hello ${userName}!</h2>
        
        <p>Your PropertyIQ Premium subscription has been successfully confirmed!</p>
        
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #10b981; margin-top: 0;">Subscription Details:</h3>
          <p style="margin: 5px 0;"><strong>Plan:</strong> ${planName}</p>
          <p style="margin: 5px 0;"><strong>Amount:</strong> ${amount}</p>
          <p style="margin: 5px 0;"><strong>Billing:</strong> Monthly</p>
          <p style="margin: 5px 0;"><strong>Status:</strong> Active</p>
        </div>
        
        <p>You now have unlimited access to all PropertyIQ Premium features. Start analyzing properties right away!</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://propertyiq.io" style="background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Access Your Dashboard</a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Your subscription will automatically renew monthly. You can manage your subscription settings in your account dashboard.
        </p>
      </div>
      
      <div style="background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; font-size: 12px;">
        <p>© 2025 PropertyIQ. All rights reserved.</p>
        <p>Need help? Contact us at support@propertyiq.io</p>
      </div>
    </body>
    </html>
  `;
}