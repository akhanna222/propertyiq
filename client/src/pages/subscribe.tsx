import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Crown, Check, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { PropertyIQLogo } from "@/components/property-iq-logo";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY || import.meta.env.VITE_STRIPE_TEST_PUBLIC_KEY;
if (!stripePublicKey) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY or VITE_STRIPE_TEST_PUBLIC_KEY');
}
const stripePromise = loadStripe(stripePublicKey);

const SubscribeForm = ({ intentType }: { intentType: 'payment' | 'setup' }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe button clicked, starting payment process...');

    if (!stripe || !elements) {
      console.log('Stripe or elements not loaded yet');
      toast({
        title: "Loading",
        description: "Payment system is still loading. Please wait a moment.",
        variant: "default",
      });
      return;
    }

    setIsLoading(true);
    console.log('Processing payment with intent type:', intentType);

    let result;
    
    if (intentType === 'setup') {
      // For SetupIntent (subscription setup) - handle without redirect
      result = await stripe.confirmSetup({
        elements,
        redirect: 'if_required',
      });
    } else {
      // For PaymentIntent (immediate payment) - handle without redirect
      result = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });
    }

    console.log('Payment result:', result);

    if (result.error) {
      console.error('Payment error:', result.error);
      toast({
        title: "Payment Failed",
        description: result.error.message,
        variant: "destructive",
      });
    } else {
      console.log('Payment/Setup successful, activating subscription...');
      // Payment/Setup successful - activate subscription
      try {
        const activationResponse = await apiRequest("POST", "/api/activate-subscription");
        const activationData = await activationResponse.json();
        
        if (activationData.success) {
          // Invalidate queries to refresh user status and usage
          queryClient.invalidateQueries({ queryKey: ['/api/auth/user-profile'] });
          queryClient.invalidateQueries({ queryKey: ['/api/usage'] });
          
          toast({
            title: "Welcome to Premium!",
            description: "Your subscription is now active. You have unlimited access.",
          });
          
          // Redirect to dashboard after success
          setTimeout(() => {
            setLocation("/");
          }, 2000);
        } else {
          throw new Error(activationData.message || "Failed to activate subscription");
        }
      } catch (activationError: any) {
        console.error("Failed to activate subscription:", activationError);
        toast({
          title: "Setup Complete",
          description: "Payment method saved. Your premium access is being activated.",
          variant: "default",
        });
      }
    }
    
    setIsLoading(false);
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Crown className="h-8 w-8 text-yellow-500 mr-2" />
          <CardTitle className="text-2xl">Premium Subscription</CardTitle>
        </div>
        <CardDescription>
          Complete your payment to unlock unlimited property analyses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement />
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            disabled={!stripe || !elements || isLoading}
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                <Crown className="h-4 w-4 mr-2" />
                Subscribe for €10/month
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default function Subscribe() {
  const [clientSecret, setClientSecret] = useState("");
  const [intentType, setIntentType] = useState<'payment' | 'setup'>('payment');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Create subscription when page loads
    apiRequest("POST", "/api/create-subscription")
      .then((res) => res.json())
      .then((data) => {
        console.log('Subscription response:', data);
        
        if (data.message === "Already subscribed" || data.status === "active") {
          toast({
            title: "Already Subscribed",
            description: "You already have an active premium subscription.",
            variant: "default",
          });
          setIsLoading(false);
          return;
        }
        
        if (data.clientSecret) {
          // Detect intent type from client secret
          const isSetupIntent = data.clientSecret.startsWith('seti_');
          setIntentType(isSetupIntent ? 'setup' : 'payment');
          setClientSecret(data.clientSecret);
        } else {
          console.error('No client secret in response:', data);
          toast({
            title: "Payment Setup Error",
            description: "Unable to initialize payment form. Please try again.",
            variant: "destructive",
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error creating subscription:', error);
        toast({
          title: "Error",
          description: "Failed to initialize payment. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">Upgrade to Premium</h1>
            <p className="text-lg text-muted-foreground">
              Unlock unlimited property analyses and advanced features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Pricing Card */}
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Crown className="h-6 w-6 text-yellow-500 mr-2" />
                  <CardTitle className="text-xl">Premium Plan</CardTitle>
                </div>
                <div className="text-3xl font-bold text-foreground">
                  €10
                  <span className="text-lg font-normal text-muted-foreground">/month</span>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  50% OFF - Limited Time
                </Badge>
                <CardDescription className="line-through text-muted-foreground">
                  Originally €20/month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Unlimited property analyses</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>AI-powered insights</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Market trends & predictions</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Export reports</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <div>
              {isLoading ? (
                <Card className="max-w-md mx-auto">
                  <CardContent className="flex items-center justify-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
                    <span className="ml-3">Setting up payment...</span>
                  </CardContent>
                </Card>
              ) : clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <SubscribeForm intentType={intentType} />
                </Elements>
              ) : (
                <Card className="max-w-md mx-auto">
                  <CardContent className="text-center py-8">
                    <p className="text-destructive mb-4">Failed to initialize payment</p>
                    <Button onClick={() => window.location.reload()}>
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}