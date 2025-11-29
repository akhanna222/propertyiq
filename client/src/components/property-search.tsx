import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, Loader2, Crown, MapPin, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { analyzeProperty } from "@/lib/property-api";
import { Link } from "wouter";
import { DataCollectionLoader } from "@/components/DataCollectionLoader";
import type { PropertyData } from "@shared/schema";

interface PropertySearchProps {
  onPropertyAnalyzed: (data: PropertyData) => void;
  onLoadingChange: (loading: boolean) => void;
  onClearOutput: () => void;
  isLoading: boolean;
  canAnalyze?: boolean;
}

// Irish counties list for dropdown
const IRISH_COUNTIES = [
  "Antrim", "Armagh", "Carlow", "Cavan", "Clare", "Cork", "Derry", "Donegal", 
  "Down", "Dublin", "Fermanagh", "Galway", "Kerry", "Kildare", "Kilkenny", 
  "Laois", "Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath", 
  "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary", "Tyrone", 
  "Waterford", "Westmeath", "Wexford", "Wicklow"
].sort();

export function PropertySearch({ onPropertyAnalyzed, onLoadingChange, onClearOutput, isLoading, canAnalyze = true }: PropertySearchProps) {
  const [address, setAddress] = useState("");
  const [county, setCounty] = useState("");
  const [eircode, setEircode] = useState("");
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: ({ address, county, eircode }: { address: string; county?: string; eircode?: string }) => 
      analyzeProperty(address, county, eircode),
    onSuccess: (data) => {
      onPropertyAnalyzed(data);
      onLoadingChange(false);
      toast({
        title: "Property analyzed successfully",
        description: "Property data has been loaded.",
      });
    },
    onError: (error: any) => {
      onLoadingChange(false);
      
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      
      if (error.message?.includes("Usage limit exceeded")) {
        toast({
          title: "Usage Limit Reached",
          description: "You've used all 3 free analyses. Upgrade to Premium for unlimited access.",
          variant: "destructive",
        });
        return;
      }
      
      if (error.message?.includes("verify your email")) {
        toast({
          title: "Email Verification Required",
          description: "Please check your inbox and verify your email address before analyzing properties.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Error analyzing property",
        description: error.message || "Failed to analyze property. Please try again.",
        variant: "destructive",
      });
    },
    onMutate: () => {
      onLoadingChange(true);
    },
  });

  const handleSearch = () => {
    if (!address.trim()) {
      toast({
        title: "Please enter an address",
        description: "Enter a property address to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    if (!canAnalyze) {
      toast({
        title: "Usage Limit Reached",
        description: "You've used all 3 free analyses. Upgrade to Premium for unlimited access.",
        variant: "destructive",
      });
      return;
    }
    
    // Clear existing output before starting new analysis
    onClearOutput();
    
    // Pass address, county, and eircode separately for better filtering
    analyzeMutation.mutate({ address: address.trim(), county, eircode: eircode.trim().toUpperCase() || undefined });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-black dark:text-white">Intelligent Property Analysis</h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Get comprehensive insights on any Irish property</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Address Field */}
              <div className="md:col-span-2">
                <Label htmlFor="address" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Property Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="e.g., 18 Seagreen, Greystones"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  disabled={isLoading}
                  required
                />
              </div>
              
              {/* Eircode Field */}
              <div>
                <Label htmlFor="eircode" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <Hash className="h-4 w-4 mr-1" />
                  Eircode
                </Label>
                <Input
                  id="eircode"
                  type="text"
                  placeholder="e.g., A11 AB11"
                  value={eircode}
                  onChange={(e) => setEircode(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full uppercase text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  disabled={isLoading}
                  maxLength={8}
                />
              </div>
            </div>
            
            {/* County Field */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="county" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  County
                </Label>
                <Select value={county} onValueChange={setCounty} disabled={isLoading}>
                  <SelectTrigger className="text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="Select county" />
                  </SelectTrigger>
                  <SelectContent>
                    {IRISH_COUNTIES.map((countyName) => (
                      <SelectItem key={countyName} value={countyName}>
                        {countyName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Search Button */}
              <div className="md:col-span-2 flex items-end">
                <Button
                  type="submit"
                  disabled={isLoading || !canAnalyze}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Search className="h-4 w-4 mr-2" />
                  )}
                  {isLoading ? "Analyzing..." : "Analyze Property"}
                </Button>
              </div>
            </div>
          </form>
        </div>
        
        {/* Show animated data collection loader when analyzing */}
        {isLoading && (
          <div className="mt-8">
            <DataCollectionLoader 
              isLoading={isLoading}
              onComplete={() => {
                // The loader will complete when the actual analysis finishes
                console.log('Data collection animation complete');
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
