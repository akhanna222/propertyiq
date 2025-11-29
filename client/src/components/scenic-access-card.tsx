import { Mountain } from "lucide-react";
import type { ScenicAccess } from "@shared/schema";

interface ScenicAccessCardProps {
  scenicAccess: ScenicAccess;
}

export function ScenicAccessCard({ scenicAccess }: ScenicAccessCardProps) {
  return (
    <div className="property-card">
      <div className="flex items-center mb-4">
        <Mountain className="text-secondary text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900">Scenic Access</h4>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="metric-label">Beach Distance</span>
          <span className="font-medium text-secondary">{scenicAccess.beach_distance_km} km</span>
        </div>
        <div className="flex justify-between">
          <span className="metric-label">Mountain Distance</span>
          <span className="font-medium">{scenicAccess.mountain_distance_km} km</span>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <p className="metric-label mb-2">Scenic Access:</p>
          <div className="text-gray-700">
            {Array.isArray(scenicAccess.scenic_views) ? (
              <ul className="space-y-1">
                {scenicAccess.scenic_views.map((view, index) => (
                  <li key={index}>• {view}</li>
                ))}
              </ul>
            ) : (
              <p>{scenicAccess.scenic_views ? "Scenic views available" : "Limited scenic access"}</p>
            )}
          </div>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150"
        alt="Dramatic coastal cliff walk with ocean views"
        className="w-full h-24 object-cover rounded-lg mt-4"
      />
    </div>
  );
}
