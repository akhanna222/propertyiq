import { Users } from "lucide-react";
import type { FamilyLifestyle } from "@shared/schema";

interface FamilyLifestyleCardProps {
  familyLifestyle?: FamilyLifestyle;
}

export function FamilyLifestyleCard({ familyLifestyle }: FamilyLifestyleCardProps) {
  if (!familyLifestyle) {
    return null;
  }

  const renderAmenitySection = (title: string, emoji: string, color: string, amenityData: any) => {
    if (!amenityData || typeof amenityData !== 'object') return null;
    
    const count = amenityData.count || 0;
    const details = amenityData.details || [];
    
    if (count === 0 && details.length === 0) return null;

    return (
      <div>
        <span className={`font-medium ${color} flex items-center gap-1`}>
          {emoji} {title} ({count})
        </span>
        {details.length > 0 && (
          <ul className="ml-2 mt-1 space-y-1">
            {details.map((item: any, index: number) => (
              <li key={index} className="flex justify-between items-center">
                <span className="text-gray-700">
                  • {item.name} {item.type && `(${item.type})`}
                </span>
                {item.distance_km && (
                  <span className="text-xs text-gray-500 ml-2">{item.distance_km}km</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="property-card">
      <div className="flex items-center mb-4">
        <Users className="text-secondary text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900">Family & Lifestyle Suitability</h4>
      </div>
      
      <div className="space-y-4 text-sm">
        {/* Overview sections */}
        {familyLifestyle.school_quality && (
          <div>
            <p className="metric-label">School Quality</p>
            <p className="text-gray-700">{familyLifestyle.school_quality}</p>
          </div>
        )}
        
        {familyLifestyle.community_feel && (
          <div>
            <p className="metric-label">Community Feel</p>
            <p className="text-gray-700">{familyLifestyle.community_feel}</p>
          </div>
        )}
        
        {familyLifestyle.healthcare_access && (
          <div>
            <p className="metric-label">Healthcare Access</p>
            <p className="text-gray-700">{familyLifestyle.healthcare_access}</p>
          </div>
        )}
        
        {familyLifestyle.shops_and_amenities && (
          <div>
            <p className="metric-label">Shops & Amenities</p>
            <p className="text-gray-700">{familyLifestyle.shops_and_amenities}</p>
          </div>
        )}
        
        {familyLifestyle.recreation_and_leisure && (
          <div>
            <p className="metric-label">Recreation & Leisure</p>
            <p className="text-gray-700">{familyLifestyle.recreation_and_leisure}</p>
          </div>
        )}
        
        {familyLifestyle.creches_and_childcare && (
          <div>
            <p className="metric-label">Creches & Childcare</p>
            <p className="text-gray-700">{familyLifestyle.creches_and_childcare}</p>
          </div>
        )}

        {/* Detailed amenities with counts and distances */}
        <div className="pt-3 border-t border-gray-100">
          <p className="metric-label mb-3">Nearby Facilities</p>
          <div className="space-y-3 text-xs text-gray-700">
            {renderAmenitySection("Schools", "🏫", "text-blue-600", familyLifestyle.schools)}
            {renderAmenitySection("Healthcare", "🏥", "text-red-600", familyLifestyle.healthcare)}
            {renderAmenitySection("Shops & Dining", "🛒", "text-green-600", familyLifestyle.shops)}
            {renderAmenitySection("Recreation", "⚽", "text-orange-600", familyLifestyle.recreation)}
            {renderAmenitySection("Creches & Childcare", "🧸", "text-primary", familyLifestyle.creches)}
          </div>
        </div>
      </div>
    </div>
  );
}
