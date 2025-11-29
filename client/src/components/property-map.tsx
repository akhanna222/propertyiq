import { Map } from "lucide-react";

interface PropertyMapProps {
  address: string;
}

export function PropertyMap({ address }: PropertyMapProps) {
  return (
    <div className="mt-4 md:mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 transition-colors">
      <div className="flex items-center mb-4">
        <Map className="text-primary text-xl mr-3" />
        <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Location Map</h4>
      </div>
      <div className="w-full h-48 md:h-64 bg-gray-100 dark:bg-gray-700 rounded-lg relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
          alt="Aerial view of Greystones coastal town with harbor and residential areas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-20 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 px-3 md:px-4 py-2 rounded-lg shadow-lg">
            <Map className="inline text-primary mr-2" size={16} />
            <span className="font-medium text-gray-900 dark:text-white text-sm md:text-base">{address}</span>
          </div>
        </div>
      </div>
      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">
        Interactive map integration with Google Maps API would display property location and surrounding amenities.
      </p>
    </div>
  );
}
