import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { PropertyIQLogo } from "@/components/property-iq-logo";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      propertyAreaInterested: "",
    },
  });

  const onSubmit = async (data: SignupData) => {
    setIsLoading(true);
    console.log("Signup data being sent:", data);
    try {
      const response = await apiRequest("POST", "/api/signup", data);

      if (response.ok) {
        // Invalidate auth query to refresh user state
        queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
        
        const user = await response.json();
        toast({
          title: "Account created successfully!",
          description: user.message || "Welcome to PropertyIQ! Please check your email to verify your account.",
        });
        setLocation("/");
      } else {
        const error = await response.json();
        
        if (error.message === "User already exists with this email" || error.redirectToSignIn) {
          toast({
            title: "Account already exists",
            description: "This email is already registered. Redirecting you to sign in...",
            variant: "destructive",
          });
          // Set session storage flag for signin page
          sessionStorage.setItem('fromSignup', 'existing-user');
          // Redirect to sign in page after a short delay
          setTimeout(() => {
            setLocation("/signin");
          }, 1500);
        } else {
          toast({
            title: "Signup failed",
            description: error.message || "Failed to create account",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-4 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <div className="max-w-md w-full space-y-4 my-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <PropertyIQLogo size="lg" showText={true} />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join PropertyIQ to analyze Irish properties with AI-powered insights
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="John Doe"
                  className="mt-1"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="john@example.com"
                  className="mt-1"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...form.register("password")}
                  placeholder="••••••••"
                  className="mt-1"
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="propertyAreaInterested">Property Area of Interest</Label>
                <Input
                  id="propertyAreaInterested"
                  {...form.register("propertyAreaInterested")}
                  placeholder="Dublin 4, Cork City, Galway, etc."
                  className="mt-1"
                />
                {form.formState.errors.propertyAreaInterested && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.propertyAreaInterested.message}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Tell us which area you're interested in buying property
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}