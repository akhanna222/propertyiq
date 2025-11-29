import { TrendingUp } from "lucide-react";
import type { InvestmentOutlook } from "@shared/schema";

interface InvestmentOutlookCardProps {
  investmentOutlook: InvestmentOutlook;
}

export function InvestmentOutlookCard({ investmentOutlook }: InvestmentOutlookCardProps) {
  const getProgressWidth = (value: number) => {
    return Math.min((value / 10) * 100, 100);
  };

  return (
    <div className="property-card">
      <div className="flex items-center mb-4">
        <TrendingUp className="text-secondary text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900">Investment Outlook</h4>
      </div>
      <div className="space-y-3 text-sm">
        <div>
          <p className="metric-label mb-2">Price Index Growth:</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">2022</span>
              <div className="progress-bar flex-1 mx-2">
                <div
                  className="progress-fill bg-success"
                  style={{ width: `${getProgressWidth(investmentOutlook.house_price_index[2022])}%` }}
                />
              </div>
              <span className="text-xs font-medium">+{investmentOutlook.house_price_index[2022]}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">2023</span>
              <div className="progress-bar flex-1 mx-2">
                <div
                  className="progress-fill bg-success"
                  style={{ width: `${getProgressWidth(investmentOutlook.house_price_index[2023])}%` }}
                />
              </div>
              <span className="text-xs font-medium">+{investmentOutlook.house_price_index[2023]}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">2024</span>
              <div className="progress-bar flex-1 mx-2">
                <div
                  className="progress-fill bg-success"
                  style={{ width: `${getProgressWidth(investmentOutlook.house_price_index[2024])}%` }}
                />
              </div>
              <span className="text-xs font-medium">+{investmentOutlook.house_price_index[2024]}%</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-100">
          <span className="metric-label">Rental Yield</span>
          <span className="font-medium text-secondary">{investmentOutlook.rental_yield_percent}%</span>
        </div>
        <div>
          <p className="metric-label text-xs mb-1">New Projects:</p>
          <p className="text-gray-700 text-xs">{investmentOutlook.new_projects.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
