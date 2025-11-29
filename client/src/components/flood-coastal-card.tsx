import { Droplets, Waves, TrendingUp, Filter } from "lucide-react";
import type { FloodAndCoastal } from "@shared/schema";

interface FloodCoastalCardProps {
  floodAndCoastal?: FloodAndCoastal;
}

export function FloodCoastalCard({ floodAndCoastal }: FloodCoastalCardProps) {
  if (!floodAndCoastal) return null;

  return (
    <div className="property-card col-span-full">
      <div className="flex items-center mb-4">
        <Waves className="text-blue-500 text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">🌊 Flood Risk & Natural Hazards</h4>
      </div>
      <div className="grid md:grid-cols-2 gap-6 text-sm">
        {floodAndCoastal.flood_risk && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">2️⃣ Flood Risk & Natural Hazards</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{floodAndCoastal.flood_risk}</div>
          </div>
        )}
        
        {floodAndCoastal.coastal_erosion && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">🏖️ Coastal Erosion</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{floodAndCoastal.coastal_erosion}</div>
          </div>
        )}
        
        {floodAndCoastal.sea_level_rise && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">📈 Sea Level Rise</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{floodAndCoastal.sea_level_rise}</div>
          </div>
        )}
        
        {floodAndCoastal.drainage_systems && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">🚰 Drainage Systems</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{floodAndCoastal.drainage_systems}</div>
          </div>
        )}
      </div>
    </div>
  );
}