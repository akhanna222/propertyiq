import { Volume2, Car, ShieldCheck, AlertTriangle } from "lucide-react";
import type { OtherConsiderations } from "@shared/schema";

interface OtherConsiderationsCardProps {
  otherConsiderations?: OtherConsiderations;
}

export function OtherConsiderationsCard({ otherConsiderations }: OtherConsiderationsCardProps) {
  if (!otherConsiderations) return null;

  return (
    <div className="property-card col-span-full">
      <div className="flex items-center mb-4">
        <AlertTriangle className="text-orange-600 text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">🧾 Other Considerations</h4>
      </div>
      <div className="grid md:grid-cols-2 gap-6 text-sm">
        {otherConsiderations.noise_levels && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">1️⃣ Noise Levels</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{otherConsiderations.noise_levels}</div>
          </div>
        )}
        
        {otherConsiderations.parking_and_traffic && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">2️⃣ Parking & Traffic</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{otherConsiderations.parking_and_traffic}</div>
          </div>
        )}
        
        {otherConsiderations.protected_status && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">3️⃣ Historic or Protected Structure Status</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{otherConsiderations.protected_status}</div>
          </div>
        )}
        
        {otherConsiderations.mica_or_pyrite_risk && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">4️⃣ Mica/Pyrite Risk</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{otherConsiderations.mica_or_pyrite_risk}</div>
          </div>
        )}
      </div>
    </div>
  );
}