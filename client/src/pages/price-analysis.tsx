import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, MapPin, Euro, TrendingUp, Search } from "lucide-react";

interface PriceAnalysisResult {
  location: string;
  year: number;
  averagePrice: number;
  count: number;
  top20Results: Array<{
    address: string;
    price: number;
    saleDate: string;
    description: string;
    county: string;
  }>;
}

export default function PriceAnalysis() {
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("2025");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const { data: analysisResult, isLoading, error } = useQuery<PriceAnalysisResult>({
    queryKey: ['/api/property-register/average-price', location, year],
    enabled: searchTriggered && location.length > 0,
    refetchOnWindowFocus: false,
  });

  const handleSearch = () => {
    if (location.trim()) {
      setSearchTriggered(true);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price / 100); // Convert from cents to euros for display
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Property Price Analysis</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Analyze property prices by location using official Property Price Register data. 
            Get average prices from the top 20 most expensive properties in any area.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search by Location
            </CardTitle>
            <CardDescription>
              Enter a location (e.g., "Newbridge", "Dublin", "Cork") to analyze property prices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter location (e.g., Newbridge, Dublin...)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <div className="w-24">
                <Input
                  placeholder="Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  type="number"
                  min="2010"
                  max="2025"
                />
              </div>
              <Button onClick={handleSearch} disabled={isLoading || !location.trim()}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">
                Error loading price analysis. Please try again.
              </p>
            </CardContent>
          </Card>
        )}

        {analysisResult && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Price Analysis Results
                </CardTitle>
                <CardDescription>
                  Top {analysisResult.count} properties in {analysisResult.location} ({analysisResult.year})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Euro className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-900">
                      €{analysisResult.averagePrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-600">Average Price</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-900">
                      {analysisResult.count}
                    </div>
                    <div className="text-sm text-green-600">Properties Found</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-900">
                      {analysisResult.year}
                    </div>
                    <div className="text-sm text-purple-600">Analysis Year</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top 20 Properties</CardTitle>
                <CardDescription>
                  Highest value properties found in {analysisResult.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisResult.top20Results.map((property, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{property.address}</div>
                        <div className="text-sm text-gray-500">
                          {property.description} • Sale Date: {new Date(property.saleDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          {formatPrice(property.price)}
                        </div>
                        <div className="text-xs text-gray-500">#{index + 1}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}