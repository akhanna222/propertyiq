import { GraduationCap, School, University, Award } from "lucide-react";
import type { Education } from "@shared/schema";

interface EducationCardProps {
  education?: Education;
}

export function EducationCard({ education }: EducationCardProps) {
  if (!education) return null;

  return (
    <div className="property-card col-span-full">
      <div className="flex items-center mb-4">
        <GraduationCap className="text-blue-600 text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">👨‍👩‍👧‍👦 Family & Lifestyle Suitability</h4>
      </div>
      <div className="grid md:grid-cols-2 gap-6 text-sm">
        {education.primary_schools && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">1️⃣ School Quality</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{education.primary_schools}</div>
          </div>
        )}
        
        {education.secondary_schools && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">2️⃣ Community Feel</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{education.secondary_schools}</div>
          </div>
        )}
        
        {education.third_level_access && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">3️⃣ Healthcare Access</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{education.third_level_access}</div>
          </div>
        )}
        
        {education.school_performance && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 dark:text-white">4️⃣ Shops & Amenities</h5>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{education.school_performance}</div>
          </div>
        )}
      </div>
    </div>
  );
}