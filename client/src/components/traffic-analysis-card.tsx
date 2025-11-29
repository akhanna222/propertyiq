import { TrafficCone } from "lucide-react";
import type { Traffic } from "@shared/schema";

interface TrafficAnalysisCardProps {
  traffic: Traffic;
}

export function TrafficAnalysisCard({ traffic }: TrafficAnalysisCardProps) {
  return (
    <div className="property-card">
      <div className="flex items-center mb-4">
        <TrafficCone className="text-warning text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900">Traffic Analysis</h4>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="metric-label">Avg Daily Commute</span>
          <span className="font-medium">{traffic.avg_daily_commute_minutes} min</span>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <p className="metric-label mb-2">Dublin Congestion Impact:</p>
          <div className="space-y-2">
            {traffic.dublin_congestion.time_lost_per_year_hours ? (
              <>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Time lost/year</span>
                  <span className="text-xs font-medium">{traffic.dublin_congestion.time_lost_per_year_hours} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Financial cost</span>
                  <span className="text-xs font-medium text-error">
                    €{traffic.dublin_congestion.financial_loss_per_driver_eur?.toLocaleString() || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Delay per 10km</span>
                  <span className="text-xs font-medium">{traffic.dublin_congestion.delay_seconds_per_10km} sec</span>
                </div>
              </>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Morning rush</span>
                  <span className="text-xs font-medium">{traffic.dublin_congestion.morning_rush_hour || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Evening rush</span>
                  <span className="text-xs font-medium">{traffic.dublin_congestion.evening_rush_hour || "N/A"}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
