import { FileText, Award, CreditCard, Scale } from "lucide-react";
import type { FinancialAndRegulatory } from "@shared/schema";

interface FinancialRegulatoryCardProps {
  financialAndRegulatory?: FinancialAndRegulatory;
}

export function FinancialRegulatoryCard({ financialAndRegulatory }: FinancialRegulatoryCardProps) {
  if (!financialAndRegulatory) return null;

  return (
    <div className="property-card col-span-full">
      <div className="flex items-center mb-4">
        <FileText className="text-indigo-600 text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">💶 Financial & Regulatory Aspects</h4>
      </div>
      <div className="grid md:grid-cols-2 gap-6 text-sm">
        {financialAndRegulatory.property_tax_band && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">1️⃣ Local Property Tax (LPT)</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{financialAndRegulatory.property_tax_band}</div>
          </div>
        )}
        
        {financialAndRegulatory.ber_rating && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">2️⃣ BER Rating</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{financialAndRegulatory.ber_rating}</div>
          </div>
        )}
        
        {financialAndRegulatory.management_fees && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">3️⃣ Management Fees</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{financialAndRegulatory.management_fees}</div>
          </div>
        )}
        
        {financialAndRegulatory.zoning_and_restrictions && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">4️⃣ Zoning & Restrictions</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{financialAndRegulatory.zoning_and_restrictions}</div>
          </div>
        )}
      </div>
    </div>
  );
}