import { Home } from "lucide-react";
import type { PropertyMetrics } from "@shared/schema";

interface PropertyMetricsCardProps {
  propertyMetrics: PropertyMetrics;
}

export function PropertyMetricsCard({ propertyMetrics }: PropertyMetricsCardProps) {
  return (
    <div className="property-card">
      <div className="flex items-center mb-4">
        <Home className="text-primary text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900">Property Metrics</h4>
      </div>
      <div className="space-y-3 text-sm">
        {propertyMetrics.latest_sale_price_eur && (
          <div className="flex justify-between">
            <span className="metric-label">Latest Sale Price</span>
            <span className="font-bold text-primary">
              €{propertyMetrics.latest_sale_price_eur.toLocaleString()}
            </span>
          </div>
        )}
        {propertyMetrics.last_sale_date && (
          <div className="flex justify-between">
            <span className="metric-label">Sale Date</span>
            <span className="font-medium">{propertyMetrics.last_sale_date}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="metric-label">BER Rating</span>
          <span className="font-medium bg-success text-white px-2 py-1 rounded text-xs">
            {propertyMetrics.ber_rating}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="metric-label">LPT Band</span>
          <span className="font-medium">{propertyMetrics.lpt_band}</span>
        </div>
        <div className="flex justify-between">
          <span className="metric-label">Management Fee</span>
          <span className="font-medium text-success">{propertyMetrics.management_fee}</span>
        </div>
      </div>
    </div>
  );
}
