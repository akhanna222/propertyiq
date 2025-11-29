import { Euro, TrendingUp, BarChart3, Sparkles } from "lucide-react";
import type { HousePrices } from "@shared/schema";

interface HousePricesCardProps {
  housePrices?: HousePrices;
}

export function HousePricesCard({ housePrices }: HousePricesCardProps) {
  if (!housePrices) return null;

  return (
    <div className="property-card col-span-full">
      <div className="flex items-center mb-4">
        <Euro className="text-green-600 text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">📈 Investment Potential & Area Trends</h4>
      </div>
      <div className="grid md:grid-cols-2 gap-6 text-sm">
        {housePrices.current_market_value && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">1️⃣ House Price Trends</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{housePrices.current_market_value}</div>
          </div>
        )}
        
        {housePrices.price_trends && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">📊 Price Trends</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{housePrices.price_trends}</div>
          </div>
        )}
        
        {housePrices.comparable_sales && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">🏘️ Comparable Sales</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{housePrices.comparable_sales}</div>
          </div>
        )}
        
        {housePrices.market_predictions && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">🔮 Market Predictions</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{housePrices.market_predictions}</div>
          </div>
        )}
      </div>
    </div>
  );
}