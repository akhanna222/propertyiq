import { MapPin } from "lucide-react";
import type { LocationDetails } from "@shared/schema";
import { EnhancedCommuteDisplay } from "./enhanced-commute-display";

interface LocationDetailsCardProps {
  locationDetails: LocationDetails;
}

export function LocationDetailsCard({ locationDetails }: LocationDetailsCardProps) {
  return (
    <div className="property-card">
      <div className="flex items-center mb-4">
        <MapPin className="text-primary text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900">Location Details</h4>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="metric-label">Distance to Dublin 2</span>
          <span className="font-medium">{locationDetails.distance_to_dublin2_km} km</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="metric-label">Car (Off-peak/Peak/Max)</span>
            <span className="font-medium">
              {typeof locationDetails.car_commute_minutes === 'object' 
                ? `${locationDetails.car_commute_minutes.off_peak}/${locationDetails.car_commute_minutes.peak}/${locationDetails.car_commute_minutes.max_peak || 'N/A'} min`
                : `${locationDetails.car_commute_minutes} min`}
            </span>
          </div>
          
          {typeof locationDetails.dart_commute_minutes === 'object' ? (
            <div className="flex justify-between">
              <span className="metric-label">DART (Normal/Peak)</span>
              <span className="font-medium">
                {locationDetails.dart_commute_minutes.normal}/{locationDetails.dart_commute_minutes.peak} min
                <span className="text-xs text-gray-500 ml-1">
                  ({locationDetails.dart_commute_minutes.frequency_per_hour}/hr)
                </span>
              </span>
            </div>
          ) : (
            <div className="flex justify-between">
              <span className="metric-label">DART Commute</span>
              <span className="font-medium">{locationDetails.dart_commute_minutes} min</span>
            </div>
          )}

          {locationDetails.bus_commute_minutes && typeof locationDetails.bus_commute_minutes === 'object' && (
            <div className="flex justify-between">
              <span className="metric-label">Bus (Normal/Peak)</span>
              <span className="font-medium">
                {locationDetails.bus_commute_minutes.normal}/{locationDetails.bus_commute_minutes.peak} min
                <span className="text-xs text-gray-500 ml-1">
                  ({locationDetails.bus_commute_minutes.frequency_per_hour}/hr)
                </span>
              </span>
            </div>
          )}

          {locationDetails.luas_commute_minutes && typeof locationDetails.luas_commute_minutes === 'object' && (
            <div className="flex justify-between">
              <span className="metric-label">Luas (Normal/Peak)</span>
              <span className="font-medium">
                {locationDetails.luas_commute_minutes.normal}/{locationDetails.luas_commute_minutes.peak} min
                <span className="text-xs text-gray-500 ml-1">
                  ({locationDetails.luas_commute_minutes.frequency_per_hour}/hr)
                </span>
              </span>
            </div>
          )}

          {locationDetails.cycling_commute_minutes && (
            <div className="flex justify-between">
              <span className="metric-label">Cycling</span>
              <span className="font-medium">{locationDetails.cycling_commute_minutes} min</span>
            </div>
          )}

          {locationDetails.walking_commute_minutes && (
            <div className="flex justify-between">
              <span className="metric-label">Walking</span>
              <span className="font-medium">{locationDetails.walking_commute_minutes} min</span>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <span className="metric-label">Nearest Station</span>
          <span className="font-medium">
            {locationDetails.nearest_train_station.name} ({locationDetails.nearest_train_station.distance_km}km)
          </span>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <p className="metric-label mb-1">Bus Routes:</p>
          <div className="flex flex-wrap gap-1">
            {locationDetails.bus_routes.map((route, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
              >
                {route}
              </span>
            ))}
          </div>
        </div>
        {locationDetails.nearby_hospitals.length > 0 && (
          <div className="pt-2 border-t border-gray-100">
            <p className="metric-label mb-1">Nearby Hospitals:</p>
            <ul className="space-y-1">
              {locationDetails.nearby_hospitals.map((hospital, index) => (
                <li key={index} className="text-gray-700 text-xs">• {hospital}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
