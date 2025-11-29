import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertySearch } from "@/components/property-search";
import { PropertyResults } from "@/components/property-results";
import { UsageTracker } from "@/components/usage-tracker";
import { SearchHistory } from "@/components/search-history";
import type { PropertyData } from "@shared/schema";

export default function Home() {
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch usage information
  const { data: usage, refetch: refetchUsage } = useQuery<{
    canAnalyze: boolean;
    usageCount: number;
    limit: number;
    subscriptionPlan: string;
  }>({
    queryKey: ["/api/usage"],
    enabled: !!user,
  });

  const handlePropertyAnalyzed = (data: PropertyData) => {
    setPropertyData(data);
    // Refetch usage and history after successful analysis
    try {
      refetchUsage();
      // Invalidate and refetch user queries to update search history
      queryClient.invalidateQueries({ queryKey: ["/api/user-queries"] });
    } catch (error) {
      console.warn('Failed to refresh data:', error);
    }
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handleClearOutput = () => {
    setPropertyData(null);
  };

  const handleSelectHistory = (data: PropertyData) => {
    setPropertyData(data);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      
      <div className="flex">
        {/* Search History Sidebar */}
        <SearchHistory 
          onSelectHistory={handleSelectHistory}
          userId={user?.id}
        />
        
        {/* Main Content */}
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <UsageTracker usage={usage} user={user as any} />
            
            <PropertySearch 
              onPropertyAnalyzed={handlePropertyAnalyzed}
              onLoadingChange={handleLoadingChange}
              onClearOutput={handleClearOutput}
              isLoading={isLoading}
              canAnalyze={usage?.canAnalyze !== false}
            />
            
            {propertyData && (
              <PropertyResults propertyData={propertyData} />
            )}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
