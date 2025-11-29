import { TrendingUp, PiggyBank, Building } from "lucide-react";
import type { InvestmentAndRental } from "@shared/schema";

interface InvestmentRentalCardProps {
  investmentAndRental?: InvestmentAndRental;
}

export function InvestmentRentalCard({ investmentAndRental }: InvestmentRentalCardProps) {
  if (!investmentAndRental) return null;

  return (
    <div className="property-card col-span-full">
      <div className="flex items-center mb-4">
        <PiggyBank className="text-green-600 text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">💰 Rental Yield / Resale Potential</h4>
      </div>
      <div className="grid md:grid-cols-2 gap-6 text-sm">
        {investmentAndRental.rental_market_overview && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">2️⃣ Rental Market Overview</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{investmentAndRental.rental_market_overview}</div>
          </div>
        )}
        
        {investmentAndRental.rental_yield_and_resale && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">💵 Rental Yield & Resale</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{investmentAndRental.rental_yield_and_resale}</div>
          </div>
        )}
        
        {investmentAndRental.new_developments && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">3️⃣ New Developments</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{investmentAndRental.new_developments}</div>
          </div>
        )}
      </div>
    </div>
  );
}