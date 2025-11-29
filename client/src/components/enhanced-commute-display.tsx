import { Clock, Car, Train } from "lucide-react";

interface EnhancedCommuteDisplayProps {
  commuteTime: string;
}

interface ParsedCommuteTime {
  offPeak: string;
  offPeakTimes: string;
  peak: string;
  peakTimes: string;
  route?: string;
}

function parseCommuteTime(commuteTime: string): ParsedCommuteTime | null {
  // Example input: "Off-peak: 25-30 minutes (outside 8-10am & 4-6pm). Peak hours (8am-10am, 4pm-6pm): 45-55 minutes via M7/N7."
  
  const offPeakMatch = commuteTime.match(/Off-peak:\s*([^(]+)\s*\(([^)]+)\)/);
  const peakMatch = commuteTime.match(/Peak hours\s*\(([^)]+)\):\s*([^.]+)/);
  const routeMatch = commuteTime.match(/via\s+([^.]+)/);
  
  if (!offPeakMatch || !peakMatch) {
    return null;
  }
  
  return {
    offPeak: offPeakMatch[1].trim(),
    offPeakTimes: offPeakMatch[2].trim(),
    peak: peakMatch[2].trim(),
    peakTimes: peakMatch[1].trim(),
    route: routeMatch ? routeMatch[1].trim() : undefined
  };
}

export function EnhancedCommuteDisplay({ commuteTime }: EnhancedCommuteDisplayProps) {
  const parsedCommute = parseCommuteTime(commuteTime);
  
  if (!parsedCommute) {
    // Fallback to original display if parsing fails
    return (
      <div className="flex justify-between">
        <span className="metric-label">Commute to Dublin City Centre</span>
        <span className="font-medium">{commuteTime}</span>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      <div className="flex items-center mb-2">
        <Car className="w-4 h-4 text-primary mr-2" />
        <span className="font-medium text-gray-900">Commute to Dublin City Centre</span>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="flex items-center mb-1">
          <Clock className="w-3 h-3 text-green-600 mr-1" />
          <span className="text-xs font-medium text-green-800">Off-Peak Times</span>
        </div>
        <div className="text-sm">
          <span className="font-semibold text-green-900">{parsedCommute.offPeak}</span>
          <div className="text-xs text-green-700 mt-1">{parsedCommute.offPeakTimes}</div>
        </div>
      </div>
      
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
        <div className="flex items-center mb-1">
          <Clock className="w-3 h-3 text-orange-600 mr-1" />
          <span className="text-xs font-medium text-orange-800">Peak Hours</span>
        </div>
        <div className="text-sm">
          <span className="font-semibold text-orange-900">{parsedCommute.peak}</span>
          <div className="text-xs text-orange-700 mt-1">{parsedCommute.peakTimes}</div>
        </div>
      </div>
      
      {parsedCommute.route && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
          <div className="flex items-center">
            <Train className="w-3 h-3 text-blue-600 mr-1" />
            <span className="text-xs font-medium text-blue-800">Primary Route: {parsedCommute.route}</span>
          </div>
        </div>
      )}
    </div>
  );
}