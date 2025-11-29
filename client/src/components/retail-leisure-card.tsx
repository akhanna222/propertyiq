import { ShoppingBag, Coffee, Dumbbell, Music } from "lucide-react";
import type { RetailAndLeisure } from "@shared/schema";

interface RetailLeisureCardProps {
  retailAndLeisure?: RetailAndLeisure;
}

export function RetailLeisureCard({ retailAndLeisure }: RetailLeisureCardProps) {
  if (!retailAndLeisure) return null;

  return (
    <div className="property-card">
      <div className="flex items-center mb-4">
        <ShoppingBag className="text-primary text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Retail & Leisure</h4>
      </div>
      <div className="space-y-4 text-sm">
        {retailAndLeisure.shopping_centres && (
          <div className="flex items-start gap-3">
            <ShoppingBag className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <p className="metric-label">Shopping Centres</p>
              <p className="text-gray-700 dark:text-gray-300">{retailAndLeisure.shopping_centres}</p>
            </div>
          </div>
        )}
        
        {retailAndLeisure.restaurants_cafes && (
          <div className="flex items-start gap-3">
            <Coffee className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <p className="metric-label">Restaurants & Cafes</p>
              <p className="text-gray-700 dark:text-gray-300">{retailAndLeisure.restaurants_cafes}</p>
            </div>
          </div>
        )}
        
        {retailAndLeisure.sports_facilities && (
          <div className="flex items-start gap-3">
            <Dumbbell className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <p className="metric-label">Sports Facilities</p>
              <p className="text-gray-700 dark:text-gray-300">{retailAndLeisure.sports_facilities}</p>
            </div>
          </div>
        )}
        
        {retailAndLeisure.entertainment_venues && (
          <div className="flex items-start gap-3">
            <Music className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <p className="metric-label">Entertainment Venues</p>
              <p className="text-gray-700 dark:text-gray-300">{retailAndLeisure.entertainment_venues}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}