import { Wifi, Droplets, Trash2 } from "lucide-react";
import type { InfrastructureAndUtilities } from "@shared/schema";

interface InfrastructureUtilitiesCardProps {
  infrastructureAndUtilities?: InfrastructureAndUtilities;
}

export function InfrastructureUtilitiesCard({ infrastructureAndUtilities }: InfrastructureUtilitiesCardProps) {
  if (!infrastructureAndUtilities) return null;

  return (
    <div className="property-card col-span-full">
      <div className="flex items-center mb-4">
        <Wifi className="text-teal-600 text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">🔧 Infrastructure & Utilities</h4>
      </div>
      <div className="grid md:grid-cols-3 gap-6 text-sm">
        {infrastructureAndUtilities.broadband_and_mobile && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">1️⃣ Broadband & Mobile</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{infrastructureAndUtilities.broadband_and_mobile}</div>
          </div>
        )}
        
        {infrastructureAndUtilities.water_and_sewerage && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">2️⃣ Water & Sewage</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{infrastructureAndUtilities.water_and_sewerage}</div>
          </div>
        )}
        
        {infrastructureAndUtilities.waste_collection && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">3️⃣ Waste Collection</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{infrastructureAndUtilities.waste_collection}</div>
          </div>
        )}
      </div>
    </div>
  );
}