import { Shield, AlertTriangle, Phone, Eye } from "lucide-react";
import type { Safety } from "@shared/schema";

interface SafetyCardProps {
  safety?: Safety;
}

export function SafetyCard({ safety }: SafetyCardProps) {
  if (!safety) return null;

  return (
    <div className="property-card col-span-full">
      <div className="flex items-center mb-4">
        <Shield className="text-green-600 text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">🛡️ Safety & Security</h4>
      </div>
      <div className="grid md:grid-cols-2 gap-6 text-sm">
        {safety.crime_rates && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">1️⃣ Crime Rates</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{safety.crime_rates}</div>
          </div>
        )}
        
        {safety.neighbourhood_safety && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">🏘️ Neighbourhood Safety</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{safety.neighbourhood_safety}</div>
          </div>
        )}
        
        {safety.emergency_services && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">🚨 Emergency Services</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{safety.emergency_services}</div>
          </div>
        )}
        
        {safety.lighting_and_security && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">💡 Lighting & Security</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{safety.lighting_and_security}</div>
          </div>
        )}
      </div>
    </div>
  );
}