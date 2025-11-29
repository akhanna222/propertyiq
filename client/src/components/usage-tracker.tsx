import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Crown, TrendingUp, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

interface UsageTrackerProps {
  usage?: {
    canAnalyze: boolean;
    usageCount: number;
    limit: number;
    subscriptionPlan: string;
  };
  user?: {
    subscriptionStatus?: string;
    stripeSubscriptionId?: string;
  };
}

export function UsageTracker({ usage, user }: UsageTrackerProps) {
  if (!usage) {
    return null;
  }

  const isPremium = usage.subscriptionPlan === 'premium' || (user?.subscriptionStatus === 'active' && user?.stripeSubscriptionId);
  const usagePercentage = (usage.usageCount / usage.limit) * 100;
  const isNearLimit = usagePercentage >= 80;
  const isAtLimit = !usage.canAnalyze;

  return (
    <Card className={`mb-6 ${isAtLimit ? 'border-red-200 bg-red-50 dark:bg-red-950/10' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isPremium ? (
              <>
                <Crown className="h-5 w-5 text-yellow-500" />
                <CardTitle className="text-lg">Premium Account</CardTitle>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Unlimited
                </Badge>
              </>
            ) : (
              <>
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg">Free Trial</CardTitle>
                <Badge variant="outline">
                  {usage.usageCount} / {usage.limit} analyses used
                </Badge>
              </>
            )}
          </div>
          
          {!isPremium && isAtLimit && (
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              onClick={() => window.location.href = '/subscribe'}
            >
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Premium - €10/month
            </Button>
          )}
        </div>
        
        {!isPremium && (
          <CardDescription>
            {isAtLimit ? (
              <span className="text-red-600 dark:text-red-400 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                You've reached your free trial limit of 2 property analyses.
              </span>
            ) : isNearLimit ? (
              <span className="text-amber-600 dark:text-amber-400">
                You're running low on free analyses.
              </span>
            ) : (
              "Analyze up to 2 properties for free during your trial period."
            )}
          </CardDescription>
        )}
      </CardHeader>
      
      {!isPremium && (
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Usage</span>
              <span>{usage.usageCount} / {usage.limit}</span>
            </div>
            <Progress 
              value={usagePercentage} 
              className={`w-full ${isNearLimit ? 'text-amber-500' : 'text-blue-500'}`}
            />
            {isAtLimit && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg border">
                <h4 className="font-semibold text-foreground mb-2">Upgrade to Premium</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Get unlimited property analyses for just €10/month
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={() => window.location.href = '/subscribe'}
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Start Premium Subscription
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}