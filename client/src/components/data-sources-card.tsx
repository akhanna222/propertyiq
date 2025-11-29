import { Database, Info } from "lucide-react";
import type { SummaryDataSources } from "@shared/schema";

interface DataSourcesCardProps {
  dataSources?: SummaryDataSources;
}

export function DataSourcesCard({ dataSources }: DataSourcesCardProps) {
  if (!dataSources) return null;

  const sources = [
    { label: "Commute & Distance", value: dataSources.commute_and_distance },
    { label: "Safety", value: dataSources.safety },
    { label: "Flood & Coastal", value: dataSources.flood_and_coastal },
    { label: "House Prices", value: dataSources.house_prices },
    { label: "Schools", value: dataSources.schools },
    { label: "Amenities & Shops", value: dataSources.amenities_and_shops },
    { label: "LPT & BER", value: dataSources.lpt_and_ber },
    { label: "Broadband & Utilities", value: dataSources.broadband_and_utilities },
    { label: "Other Metrics", value: dataSources.other_metrics },
  ].filter(source => source.value);

  if (sources.length === 0) return null;

  return (
    <div className="property-card col-span-full">
      <div className="flex items-center mb-4">
        <Database className="text-gray-600 text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Data Sources</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        {sources.map((source, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="metric-label font-medium">{source.label}</p>
              <p className="text-gray-700 dark:text-gray-300 text-xs mt-1">{source.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}