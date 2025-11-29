import { LocationDetailsCard } from "./location-details-card";
import { ScenicAccessCard } from "./scenic-access-card";
import { TrafficAnalysisCard } from "./traffic-analysis-card";
import { PropertyMetricsCard } from "./property-metrics-card";
import { InvestmentOutlookCard } from "./investment-outlook-card";
import { FamilyLifestyleCard } from "./family-lifestyle-card";
import { LocalEventsCard } from "./local-events-card";
import { RecentNewsCard } from "./recent-news-card";
import { PropertyMap } from "./property-map";
// New comprehensive analysis components
import { CommuteDistanceCard } from "./commute-distance-card";
import { SafetyCard } from "./safety-card";
import { FloodCoastalCard } from "./flood-coastal-card";
import { HousePricesCard } from "./house-prices-card";
import { EducationCard } from "./education-card";
import { RetailLeisureCard } from "./retail-leisure-card";
import { FinancialRegulatoryCard } from "./financial-regulatory-card";
import { InfrastructureUtilitiesCard } from "./infrastructure-utilities-card";
import { OtherConsiderationsCard } from "./other-considerations-card";
import { InvestmentRentalCard } from "./investment-rental-card";
import { EnhancedCommuteDisplay } from "./enhanced-commute-display";
import { DataSourcesCard } from "./data-sources-card";
import { PropertyDataTable } from "./PropertyDataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Bookmark, Scale, CheckCircle, XCircle, Shield, MapPin, TrendingUp, GraduationCap, FileText, Wifi, AlertTriangle, Newspaper, ArrowUpRight, ExternalLink, Search, Home, Key } from "lucide-react";
import { SectionFeedback } from "@/components/section-feedback";
import type { PropertyData } from "@shared/schema";

interface PropertyResultsProps {
  propertyData: PropertyData;
}

export function PropertyResults({ propertyData }: PropertyResultsProps) {
  const handleDownloadReport = () => {
    console.log("Generating comprehensive property report");
    // TODO: Implement PDF report generation
  };

  const handleSaveProperty = () => {
    console.log("Property saved to watchlist");
    // TODO: Implement property saving functionality
  };

  const handleCompareProperties = () => {
    console.log("Opening property comparison tool");
    // TODO: Implement property comparison functionality
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Property Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6 transition-colors">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{propertyData.address}</h3>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">{propertyData.eircode}</p>
              </div>
              {propertyData.location_and_property_metrics?.overall_area_score && (
                <div className="flex items-center gap-2">
                  <div className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{propertyData.location_and_property_metrics.overall_area_score}/100</div>
                      <div className="text-xs uppercase tracking-wide">Area Score</div>
                    </div>
                  </div>
                  {propertyData.location_and_property_metrics.score_breakdown && (
                    <div className="text-xs space-y-1 hidden sm:block">
                      <div className="text-gray-600 dark:text-gray-300">
                        Safety: {propertyData.location_and_property_metrics.score_breakdown.safety_score}/20 • 
                        Investment: {propertyData.location_and_property_metrics.score_breakdown.investment_score}/25
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        Lifestyle: {propertyData.location_and_property_metrics.score_breakdown.lifestyle_score}/20 • 
                        Transport: {propertyData.location_and_property_metrics.score_breakdown.transport_score}/20 • 
                        Amenities: {propertyData.location_and_property_metrics.score_breakdown.amenities_score}/15
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Average Pricing Display Below Address */}
            {(propertyData.investment_potential_and_area_trends?.average_house_price || propertyData.investment_potential_and_area_trends?.median_house_price) && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800 dark:text-blue-200 text-sm">Area Pricing Overview</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  {['2025', '2024', '2023'].map((year) => {
                    const price = propertyData.investment_potential_and_area_trends.average_house_pricing_by_year?.[year];
                    return price ? (
                      <div key={year} className="text-center">
                        <span className="text-gray-600 dark:text-gray-400 text-xs block">{year}</span>
                        <div className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{price}</div>
                      </div>
                    ) : null;
                  })}
                  {/* Fallback to general pricing if yearly data not available */}
                  {!propertyData.investment_potential_and_area_trends.average_house_pricing_by_year?.['2025'] && 
                   !propertyData.investment_potential_and_area_trends.average_house_pricing_by_year?.['2024'] && 
                   !propertyData.investment_potential_and_area_trends.average_house_pricing_by_year?.['2023'] && (
                    <>
                      {propertyData.investment_potential_and_area_trends.average_house_price && (
                        <div className="text-center">
                          <span className="text-gray-600 dark:text-gray-400 text-xs block">Average</span>
                          <div className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{propertyData.investment_potential_and_area_trends.average_house_price}</div>
                        </div>
                      )}
                      {propertyData.investment_potential_and_area_trends.median_house_price && (
                        <div className="text-center">
                          <span className="text-gray-600 dark:text-gray-400 text-xs block">Median</span>
                          <div className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{propertyData.investment_potential_and_area_trends.median_house_price}</div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm">
              {/* BER Rating from multiple sources */}
              <span className="bg-success text-white px-2 md:px-3 py-1 rounded-full">
                BER: {propertyData.financial_and_regulatory?.ber_rating || propertyData.property_metrics?.ber_rating || 'N/A'}
              </span>
              
              {/* LPT Band from multiple sources */}
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 md:px-3 py-1 rounded-full">
                {propertyData.property_metrics?.lpt_band || 'LPT Band N/A'}
              </span>
              
              {/* Sale Price Information */}
              {propertyData.property_metrics?.latest_sale_price_eur && (
                <span className="bg-primary text-white px-2 md:px-3 py-1 rounded-full">
                  €{propertyData.property_metrics.latest_sale_price_eur.toLocaleString()} ({propertyData.property_metrics.last_sale_date})
                </span>
              )}
              
              {/* Market Value from comprehensive analysis */}
              {propertyData.house_prices?.current_market_value && (
                <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 md:px-3 py-1 rounded-full">
                  Current Value: {propertyData.house_prices.current_market_value.slice(0, 50)}...
                </span>
              )}
              
              {/* Safety Indicator */}
              {propertyData.safety?.neighbourhood_safety && (
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 md:px-3 py-1 rounded-full">
                  <Shield className="w-3 h-3 inline mr-1" />
                  Safety Info Available
                </span>
              )}
              
              {/* Comprehensive Analysis Indicator */}
              <span className="flex items-center gap-1 px-2 md:px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <CheckCircle className="w-3 h-3" />
                AI Comprehensive Analysis
              </span>
            </div>
          </div>
          <div className="w-full lg:w-80">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
              alt="Modern residential property in coastal Irish town"
              className="w-full h-40 md:h-48 object-cover rounded-lg shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Check if we have enhanced comprehensive analysis data structure */}
      {(propertyData.location_and_property_metrics || propertyData.safety_and_security || propertyData.investment_potential_and_area_trends || propertyData.family_and_lifestyle_suitability) ? (
        /* Enhanced Comprehensive Analysis Grid */
        <div className="space-y-6">
          {/* Location & Property-Specific Metrics */}
          {propertyData.location_and_property_metrics && (
            <div className="property-card col-span-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <MapPin className="text-blue-600 text-xl mr-3" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">🏠 Location & Property-Specific Metrics</h4>
                </div>
                <SectionFeedback 
                  sectionName="location_and_property_metrics"
                  sectionTitle="Location & Property-Specific Metrics"
                  propertyAddress={propertyData.address}
                  propertyEircode={propertyData.eircode}
                />
              </div>
              <div className="grid gap-6 text-sm" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                {propertyData.location_and_property_metrics.commute_time && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">1️⃣ Commute Time</h5>
                    <div className="pl-4">
                      <EnhancedCommuteDisplay commuteTime={propertyData.location_and_property_metrics.commute_time} />
                    </div>
                  </div>
                )}
                
{/* Combined Distance & Transport Section */}
                {(propertyData.location_and_property_metrics.distance_metrics || propertyData.location_and_property_metrics.transport_accessibility) && (
                  <div className="md:col-span-2 space-y-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white">2️⃣ Distance & Transport Accessibility</h5>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="grid md:grid-cols-2 gap-4">
                        {propertyData.location_and_property_metrics.distance_metrics && (
                          <div>
                            <h6 className="font-medium text-gray-800 dark:text-gray-200 mb-2">📍 Distance Metrics</h6>
                            <div className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">{propertyData.location_and_property_metrics.distance_metrics}</div>
                          </div>
                        )}
                        {propertyData.location_and_property_metrics.transport_accessibility && (
                          <div>
                            <h6 className="font-medium text-gray-800 dark:text-gray-200 mb-2">🚌 Transport Overview</h6>
                            <div className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">{propertyData.location_and_property_metrics.transport_accessibility}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Detailed Transport Information */}
                    {propertyData.location_and_property_metrics.detailed_transport_info && (
                      <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h6 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">🚌 Detailed Transport Information</h6>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          {propertyData.location_and_property_metrics.detailed_transport_info.bus_routes && (
                            <div>
                              <strong className="block text-blue-800 dark:text-blue-200">Bus Routes:</strong>
                              <span className="text-gray-700 dark:text-gray-300">{propertyData.location_and_property_metrics.detailed_transport_info.bus_routes}</span>
                            </div>
                          )}
                          {propertyData.location_and_property_metrics.detailed_transport_info.bus_frequency && (
                            <div>
                              <strong className="block text-blue-800 dark:text-blue-200">Bus Frequency:</strong>
                              <span className="text-gray-700 dark:text-gray-300">{propertyData.location_and_property_metrics.detailed_transport_info.bus_frequency}</span>
                            </div>
                          )}
                          {propertyData.location_and_property_metrics.detailed_transport_info.dart_luas_access && (
                            <div>
                              <strong className="block text-blue-800 dark:text-blue-200">DART/Luas Access:</strong>
                              <span className="text-gray-700 dark:text-gray-300">{propertyData.location_and_property_metrics.detailed_transport_info.dart_luas_access}</span>
                            </div>
                          )}
                          {propertyData.location_and_property_metrics.detailed_transport_info.cycling_infrastructure && (
                            <div>
                              <strong className="block text-blue-800 dark:text-blue-200">Cycling Infrastructure:</strong>
                              <span className="text-gray-700 dark:text-gray-300">{propertyData.location_and_property_metrics.detailed_transport_info.cycling_infrastructure}</span>
                            </div>
                          )}
                          {propertyData.location_and_property_metrics.detailed_transport_info.motorway_access && (
                            <div>
                              <strong className="block text-blue-800 dark:text-blue-200">Motorway Access:</strong>
                              <span className="text-gray-700 dark:text-gray-300">{propertyData.location_and_property_metrics.detailed_transport_info.motorway_access}</span>
                            </div>
                          )}
                          {propertyData.location_and_property_metrics.detailed_transport_info.airport_connections && (
                            <div>
                              <strong className="block text-blue-800 dark:text-blue-200">Airport Connections:</strong>
                              <span className="text-gray-700 dark:text-gray-300">{propertyData.location_and_property_metrics.detailed_transport_info.airport_connections}</span>
                            </div>
                          )}
                          {propertyData.location_and_property_metrics.detailed_transport_info.park_and_ride && (
                            <div>
                              <strong className="block text-blue-800 dark:text-blue-200">Park & Ride:</strong>
                              <span className="text-gray-700 dark:text-gray-300">{propertyData.location_and_property_metrics.detailed_transport_info.park_and_ride}</span>
                            </div>
                          )}
                          {propertyData.location_and_property_metrics.detailed_transport_info.future_transport_plans && (
                            <div className="md:col-span-2">
                              <strong className="block text-blue-800 dark:text-blue-200">Future Transport Plans:</strong>
                              <span className="text-gray-700 dark:text-gray-300">{propertyData.location_and_property_metrics.detailed_transport_info.future_transport_plans}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Safety & Security */}
          {propertyData.safety_and_security && (
            <div className="property-card col-span-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Shield className="text-green-600 text-xl mr-3" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">🛡️ Safety & Security</h4>
                </div>
                <SectionFeedback 
                  sectionName="safety_and_security"
                  sectionTitle="Safety & Security"
                  propertyAddress={propertyData.address}
                  propertyEircode={propertyData.eircode}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                {propertyData.safety_and_security.crime_rates && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">1️⃣ Crime Rates</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.safety_and_security.crime_rates}</div>
                  </div>
                )}
                
                {propertyData.safety_and_security.detailed_crime_breakdown && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">2️⃣ Detailed Crime Breakdown</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.safety_and_security.detailed_crime_breakdown}</div>
                  </div>
                )}
                
                {propertyData.safety_and_security.recent_local_news && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">3️⃣ Recent Local News</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.safety_and_security.recent_local_news}</div>
                  </div>
                )}
                
                {propertyData.safety_and_security.flood_risk_and_natural_hazards && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">4️⃣ Flood Risk & Natural Hazards</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.safety_and_security.flood_risk_and_natural_hazards}</div>
                  </div>
                )}
                
                {propertyData.safety_and_security.mica_or_pyrite_risk && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">5️⃣ Mica/Pyrite Risk</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.safety_and_security.mica_or_pyrite_risk}</div>
                  </div>
                )}
                
                {propertyData.safety_and_security.fire_safety_risks && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">🔥 Fire Safety Risks</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.safety_and_security.fire_safety_risks}</div>
                  </div>
                )}
                
                {propertyData.safety_and_security.alarm_system_requirements && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">🚨 Alarm System Requirements</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.safety_and_security.alarm_system_requirements}</div>
                  </div>
                )}
                
                {propertyData.safety_and_security.coastal_erosion_risk && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">🌊 Coastal Erosion Risk</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.safety_and_security.coastal_erosion_risk}</div>
                  </div>
                )}
                
                {propertyData.safety_and_security.landslide_or_subsidence_risk && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">⛰️ Landslide/Subsidence Risk</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.safety_and_security.landslide_or_subsidence_risk}</div>
                  </div>
                )}
                
                {propertyData.safety_and_security.radon_gas_levels && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">☢️ Radon Gas Levels</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.safety_and_security.radon_gas_levels}</div>
                  </div>
                )}
                
                {propertyData.safety_and_security.emergency_services_response_time && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">🚑 Emergency Services Response</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.safety_and_security.emergency_services_response_time}</div>
                  </div>
                )}
                
                {propertyData.safety_and_security.neighbourhood_watch_presence && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">👥 Neighbourhood Watch</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.safety_and_security.neighbourhood_watch_presence}</div>
                  </div>
                )}
                
                {propertyData.safety_and_security.anti_social_behaviour_hotspots && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">⚠️ Anti-Social Behaviour Hotspots</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.safety_and_security.anti_social_behaviour_hotspots}</div>
                  </div>
                )}
                
                {propertyData.safety_and_security.burglary_prevention_measures && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">🔒 Burglary Prevention</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.safety_and_security.burglary_prevention_measures}</div>
                  </div>
                )}
                
                {propertyData.safety_and_security.road_safety_concerns && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">🚗 Road Safety Concerns</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.safety_and_security.road_safety_concerns}</div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Investment Potential & Area Trends */}
          {propertyData.investment_potential_and_area_trends && (
            <div className="property-card col-span-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <TrendingUp className="text-green-600 text-xl mr-3" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">📈 Investment Potential & Area Trends</h4>
                </div>
                <SectionFeedback 
                  sectionName="investment_potential_and_area_trends"
                  sectionTitle="Investment Potential & Area Trends"
                  propertyAddress={propertyData.address}
                  propertyEircode={propertyData.eircode}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                {propertyData.investment_potential_and_area_trends.house_price_trends && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">1️⃣ House Price Trends</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.investment_potential_and_area_trends.house_price_trends}</div>
                  </div>
                )}
                
                {propertyData.investment_potential_and_area_trends.median_house_price && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">2️⃣ Median House Price</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.investment_potential_and_area_trends.median_house_price}</div>
                  </div>
                )}
                
                {propertyData.investment_potential_and_area_trends.average_house_price && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">3️⃣ Average House Price</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.investment_potential_and_area_trends.average_house_price}</div>
                  </div>
                )}
                
                {propertyData.investment_potential_and_area_trends.year_on_year_price_growth && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">4️⃣ Year-on-Year Price Growth</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.investment_potential_and_area_trends.year_on_year_price_growth}</div>
                  </div>
                )}
                
                {propertyData.investment_potential_and_area_trends.average_house_pricing_by_year && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">5️⃣ Recent House Prices</h5>
                    <div className="text-gray-700 dark:text-gray-300 text-sm pl-4">
                      <div className="grid grid-cols-3 gap-4">
                        {['2025', '2024', '2023'].map((year) => {
                          const price = propertyData.investment_potential_and_area_trends.average_house_pricing_by_year?.[year];
                          return price ? (
                            <div key={year} className="text-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                              <div className="font-semibold text-lg text-gray-900 dark:text-white">{year}</div>
                              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">{price}</div>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                )}
                
                {propertyData.investment_potential_and_area_trends.rental_pricing && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">6️⃣ Current Rental Pricing</h5>
                    <div className="text-gray-700 dark:text-gray-300 text-sm pl-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="font-medium">2-Bed:</div>
                          <div className="text-xs">{propertyData.investment_potential_and_area_trends.rental_pricing["2_bed"]}</div>
                        </div>
                        <div>
                          <div className="font-medium">3-Bed:</div>
                          <div className="text-xs">{propertyData.investment_potential_and_area_trends.rental_pricing["3_bed"]}</div>
                        </div>
                        <div>
                          <div className="font-medium">4-Bed:</div>
                          <div className="text-xs">{propertyData.investment_potential_and_area_trends.rental_pricing["4_bed"]}</div>
                        </div>
                        <div>
                          <div className="font-medium">YoY Growth:</div>
                          <div className="text-xs">{propertyData.investment_potential_and_area_trends.rental_pricing.rental_yoy_increase}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {propertyData.investment_potential_and_area_trends.rental_yield_and_resale_potential && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">5️⃣ Rental Yield & Resale Potential</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.investment_potential_and_area_trends.rental_yield_and_resale_potential}</div>
                  </div>
                )}
                
                {propertyData.investment_potential_and_area_trends.new_developments_nearby && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">6️⃣ New Developments Nearby</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.investment_potential_and_area_trends.new_developments_nearby}</div>
                  </div>
                )}
                
                {propertyData.investment_potential_and_area_trends.market_sentiment_and_regional_comparison && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">7️⃣ Market Sentiment & Regional Comparison</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.investment_potential_and_area_trends.market_sentiment_and_regional_comparison}</div>
                  </div>
                )}
                
                {propertyData.investment_potential_and_area_trends.current_daft_listings && propertyData.investment_potential_and_area_trends.current_daft_listings.length > 0 && (
                  <div className="space-y-3 md:col-span-2">
                    <h5 className="font-semibold text-gray-900 dark:text-white">8️⃣ Current Daft.ie Property Listings in Area</h5>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="grid gap-3">
                        {propertyData.investment_potential_and_area_trends.current_daft_listings.map((listing: any, index: number) => (
                          <div key={index} className="border border-green-200 dark:border-green-700 p-3 rounded-lg bg-white dark:bg-gray-800">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h6 className="font-medium text-gray-900 dark:text-white text-sm">{listing.address}</h6>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  {listing.property_type} • {listing.bedrooms} • Listed: {listing.listing_date}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-green-700 dark:text-green-300">{listing.price}</div>
                                <a 
                                  href={listing.daft_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                  View on Daft.ie →
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {propertyData.investment_potential_and_area_trends.planning_applications_and_infrastructure_upgrades && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">8️⃣ Planning Applications & Infrastructure Upgrades</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.investment_potential_and_area_trends.planning_applications_and_infrastructure_upgrades}</div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Family & Lifestyle Suitability */}
          {propertyData.family_and_lifestyle_suitability && (
            <div className="property-card col-span-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <GraduationCap className="text-blue-600 text-xl mr-3" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">👨‍👩‍👧‍👦 Family & Lifestyle Suitability</h4>
                </div>
                <SectionFeedback 
                  sectionName="family_and_lifestyle_suitability"
                  sectionTitle="Family & Lifestyle Suitability"
                  propertyAddress={propertyData.address}
                  propertyEircode={propertyData.eircode}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                {propertyData.family_and_lifestyle_suitability.school_quality && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">1️⃣ School Quality</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.family_and_lifestyle_suitability.school_quality}</div>
                    {propertyData.family_and_lifestyle_suitability.nearby_schools && Array.isArray(propertyData.family_and_lifestyle_suitability.nearby_schools) && (
                      <div className="pl-4">
                        <span className="font-medium text-primary">🏫 Nearby Schools:</span>
                        <ul className="ml-2 mt-1">
                          {propertyData.family_and_lifestyle_suitability.nearby_schools.map((school: string, index: number) => (
                            <li key={index} className="text-gray-600 dark:text-gray-400">• {school}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                {propertyData.family_and_lifestyle_suitability.community_feel && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">2️⃣ Community Feel</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.family_and_lifestyle_suitability.community_feel}</div>
                  </div>
                )}
                
                {propertyData.family_and_lifestyle_suitability.healthcare_access && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">3️⃣ Healthcare Access</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.family_and_lifestyle_suitability.healthcare_access}</div>
                    {propertyData.family_and_lifestyle_suitability.nearby_healthcare && Array.isArray(propertyData.family_and_lifestyle_suitability.nearby_healthcare) && (
                      <div className="pl-4">
                        <span className="font-medium text-primary">🏥 Nearby Healthcare:</span>
                        <ul className="ml-2 mt-1">
                          {propertyData.family_and_lifestyle_suitability.nearby_healthcare.map((facility: string, index: number) => (
                            <li key={index} className="text-gray-600 dark:text-gray-400">• {facility}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                {propertyData.family_and_lifestyle_suitability.shops_and_amenities && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">4️⃣ Shops & Amenities</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.family_and_lifestyle_suitability.shops_and_amenities}</div>
                    {propertyData.family_and_lifestyle_suitability.nearby_shops && Array.isArray(propertyData.family_and_lifestyle_suitability.nearby_shops) && (
                      <div className="pl-4">
                        <span className="font-medium text-blue-600">🛒 Nearby Shops & Dining:</span>
                        <ul className="ml-2 mt-1">
                          {propertyData.family_and_lifestyle_suitability.nearby_shops.map((shop: string, index: number) => (
                            <li key={index} className="text-gray-600 dark:text-gray-400">• {shop}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                {propertyData.family_and_lifestyle_suitability.recreation_and_leisure && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">5️⃣ Recreation & Leisure</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.family_and_lifestyle_suitability.recreation_and_leisure}</div>
                    {propertyData.family_and_lifestyle_suitability.nearby_recreation && Array.isArray(propertyData.family_and_lifestyle_suitability.nearby_recreation) && (
                      <div className="pl-4">
                        <span className="font-medium text-orange-600">⚽ Nearby Recreation:</span>
                        <ul className="ml-2 mt-1">
                          {propertyData.family_and_lifestyle_suitability.nearby_recreation.map((facility: string, index: number) => (
                            <li key={index} className="text-gray-600 dark:text-gray-400">• {facility}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                {propertyData.family_and_lifestyle_suitability.creches_and_childcare && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">6️⃣ Creches & Childcare</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.family_and_lifestyle_suitability.creches_and_childcare}</div>
                    {propertyData.family_and_lifestyle_suitability.nearby_creches && Array.isArray(propertyData.family_and_lifestyle_suitability.nearby_creches) && (
                      <div className="pl-4">
                        <span className="font-medium text-green-600">🧸 Nearby Creches:</span>
                        <ul className="ml-2 mt-1">
                          {propertyData.family_and_lifestyle_suitability.nearby_creches.map((creche: string, index: number) => (
                            <li key={index} className="text-gray-600 dark:text-gray-400">• {creche}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Financial & Regulatory Aspects */}
          {propertyData.financial_and_regulatory && (
            <div className="property-card col-span-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FileText className="text-indigo-600 text-xl mr-3" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">💶 Financial & Regulatory Aspects</h4>
                </div>
                <SectionFeedback 
                  sectionName="financial_and_regulatory"
                  sectionTitle="Financial & Regulatory Aspects"
                  propertyAddress={propertyData.address}
                  propertyEircode={propertyData.eircode}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                {propertyData.financial_and_regulatory.property_tax_band && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">1️⃣ Local Property Tax (LPT)</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.financial_and_regulatory.property_tax_band}</div>
                  </div>
                )}
                
                {propertyData.financial_and_regulatory.ber_rating && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">2️⃣ BER Rating</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.financial_and_regulatory.ber_rating}</div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Infrastructure & Utilities */}
          {propertyData.infrastructure_and_utilities && (
            <div className="property-card col-span-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Wifi className="text-teal-600 text-xl mr-3" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">🔧 Infrastructure & Utilities</h4>
                </div>
                <SectionFeedback 
                  sectionName="infrastructure_and_utilities"
                  sectionTitle="Infrastructure & Utilities"
                  propertyAddress={propertyData.address}
                  propertyEircode={propertyData.eircode}
                />
              </div>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                {propertyData.infrastructure_and_utilities.broadband_and_mobile_coverage && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">1️⃣ Broadband & Mobile</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.infrastructure_and_utilities.broadband_and_mobile_coverage}</div>
                  </div>
                )}
                
                {propertyData.infrastructure_and_utilities.water_and_sewerage && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">2️⃣ Water & Sewage</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.infrastructure_and_utilities.water_and_sewerage}</div>
                  </div>
                )}
                
                {propertyData.infrastructure_and_utilities.waste_collection && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">3️⃣ Waste Collection</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.infrastructure_and_utilities.waste_collection}</div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Other Considerations */}
          {propertyData.other_considerations && (
            <div className="property-card col-span-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <AlertTriangle className="text-orange-600 text-xl mr-3" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">🧾 Other Considerations</h4>
                </div>
                <SectionFeedback 
                  sectionName="other_considerations"
                  sectionTitle="Other Considerations"
                  propertyAddress={propertyData.address}
                  propertyEircode={propertyData.eircode}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                {propertyData.other_considerations.noise_levels && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">1️⃣ Noise Levels</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.other_considerations.noise_levels}</div>
                  </div>
                )}
                
                {propertyData.other_considerations.parking_and_traffic && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">2️⃣ Parking & Traffic</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.other_considerations.parking_and_traffic}</div>
                  </div>
                )}
                
                {propertyData.other_considerations.protected_status && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">3️⃣ Historic or Protected Structure Status</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.other_considerations.protected_status}</div>
                  </div>
                )}
                
                {propertyData.other_considerations.mica_or_pyrite_risk && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">4️⃣ Mica/Pyrite Risk</h5>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-4">{propertyData.other_considerations.mica_or_pyrite_risk}</div>
                  </div>
                )}
              </div>
            </div>
          )}
          

        </div>
      ) : (
        /* Legacy cards for backward compatibility */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {propertyData.location_details && <LocationDetailsCard locationDetails={propertyData.location_details} />}
          {propertyData.scenic_access && <ScenicAccessCard scenicAccess={propertyData.scenic_access} />}
          {propertyData.traffic && <TrafficAnalysisCard traffic={propertyData.traffic} />}
          {propertyData.property_metrics && <PropertyMetricsCard propertyMetrics={propertyData.property_metrics} />}
          {propertyData.investment_outlook && <InvestmentOutlookCard investmentOutlook={propertyData.investment_outlook} />}
          {propertyData.family_lifestyle && <FamilyLifestyleCard familyLifestyle={propertyData.family_lifestyle} />}
        </div>
      )}



      {/* Local Events and Recent News */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
        {propertyData.local_events && <LocalEventsCard localEvents={propertyData.local_events} />}
        {propertyData.recent_news && <RecentNewsCard recentNews={propertyData.recent_news} />}
      </div>

      {/* Data Sources Information */}
      {propertyData.summary_data_sources && (
        <div className="mt-6">
          <DataSourcesCard dataSources={propertyData.summary_data_sources} />
        </div>
      )}

      {/* Daft.ie Search Links */}
      {propertyData.daft_search_links && (
        <div className="mt-6">
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <ExternalLink className="h-5 w-5 mr-2 text-green-600" />
                Property Search Links
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Find similar properties for sale and rent in this area
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href={propertyData.daft_search_links.search_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-center mb-2">
                    <Search className="h-4 w-4 mr-2 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-300">General Search</span>
                  </div>
                  <p className="text-xs text-green-700 dark:text-green-400">Browse all properties</p>
                </a>
                
                <a
                  href={propertyData.daft_search_links.sale_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-center mb-2">
                    <Home className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="font-medium text-blue-800 dark:text-blue-300">For Sale</span>
                  </div>
                  <p className="text-xs text-blue-700 dark:text-blue-400">Properties for purchase</p>
                </a>
                
                <a
                  href={propertyData.daft_search_links.rent_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors border border-purple-200 dark:border-purple-800"
                >
                  <div className="flex items-center mb-2">
                    <Key className="h-4 w-4 mr-2 text-purple-600" />
                    <span className="font-medium text-purple-800 dark:text-purple-300">For Rent</span>
                  </div>
                  <p className="text-xs text-purple-700 dark:text-purple-400">Rental properties</p>
                </a>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Search Terms:</span> {propertyData.daft_search_links.search_terms}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Map Integration */}
      <PropertyMap address={propertyData.address} />

      {/* Action Buttons */}
      <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
        <Button
          onClick={handleDownloadReport}
          className="bg-primary hover:bg-blue-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Full Report
        </Button>
        <PropertyDataTable 
          address={propertyData.address} 
          county={propertyData.county} 
          eircode={propertyData.eircode}
        />
        <Button
          onClick={handleSaveProperty}
          variant="outline"
          className="px-6 md:px-8 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Bookmark className="h-4 w-4 mr-2" />
          Save Property
        </Button>
        <Button
          onClick={handleCompareProperties}
          className="bg-secondary hover:bg-green-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base"
        >
          <Scale className="h-4 w-4 mr-2" />
          Compare Properties
        </Button>
      </div>
    </div>
  );
}
