import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, MapPin, TrendingUp, Users, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { PropertyIQLogo } from "@/components/property-iq-logo";

export default function Landing() {


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <PropertyIQLogo size="lg" showText={true} />
          <div className="flex space-x-2">
            <Link href="/signin">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            AI-Powered Property Intelligence
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 max-w-4xl mx-auto leading-tight">
            Make Smarter Property Decisions with
            <span className="text-blue-600"> AI-Driven Insights</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get comprehensive insights on any property including location details, traffic patterns, investment potential, and neighborhood lifestyle data.
          </p>
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <Link href="/signup">
                <Button size="lg">
                  Start Free Analysis
                </Button>
              </Link>
              <Link href="/signin">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-lg text-gray-500 line-through">€20</span>
                <span className="text-2xl font-bold text-blue-600">€10</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">50% OFF</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                3 free property analyses • No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Comprehensive Property Intelligence
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MapPin className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Location Analysis</CardTitle>
                <CardDescription>
                  Detailed insights into commute times, public transport, and nearby amenities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Dublin commute analysis</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Public transport routes</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Nearby hospitals & schools</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle>Investment Outlook</CardTitle>
                <CardDescription>
                  AI-powered market analysis and property value predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Market trends analysis</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Appreciation potential</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Risk assessment</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Lifestyle Insights</CardTitle>
                <CardDescription>
                  Family-friendly amenities and community information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Schools & childcare</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Parks & recreation</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Local amenities</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-center">Free Trial</CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-bold">3</span>
                  <span className="text-gray-600 dark:text-gray-300"> analyses</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Complete property analysis</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />AI-powered insights</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />No credit card required</li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full" variant="outline">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-center">Premium</CardTitle>
                <div className="text-center">
                  <div className="mb-2">
                    <span className="text-lg text-gray-500 line-through">€20</span>
                    <Badge className="ml-2 bg-red-500">50% OFF</Badge>
                  </div>
                  <span className="text-4xl font-bold text-green-600">€10</span>
                  <span className="text-gray-600 dark:text-gray-300">/month</span>
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">Limited time promotional pricing</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Unlimited property analyses</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Advanced AI insights</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Priority support</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Cancel anytime</li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full">
                    Get Premium Access
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Home className="h-6 w-6" />
            <span className="text-xl font-bold">PropertyIQ</span>
          </div>
          <p className="text-gray-400">
            Intelligent property analysis for smarter real estate decisions
          </p>
        </div>
      </footer>
    </div>
  );
}