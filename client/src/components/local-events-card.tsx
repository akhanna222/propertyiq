import { Calendar } from "lucide-react";
import type { LocalEvent } from "@shared/schema";

interface LocalEventsCardProps {
  localEvents: LocalEvent[];
}

export function LocalEventsCard({ localEvents }: LocalEventsCardProps) {
  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "festival":
        return "border-accent";
      case "seasonal market":
        return "border-secondary";
      default:
        return "border-primary";
    }
  };

  const getEventTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "festival":
        return "bg-accent text-white";
      case "seasonal market":
        return "bg-secondary text-white";
      default:
        return "bg-primary text-white";
    }
  };

  return (
    <div className="property-card">
      <div className="flex items-center mb-4">
        <Calendar className="text-accent text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900">Local Events</h4>
      </div>
      <div className="space-y-4">
        {Array.isArray(localEvents) ? (
          localEvents.map((event, index) => (
            <div key={index} className={`border-l-4 ${typeof event === 'object' ? getEventTypeColor(event.type || 'event') : 'border-primary'} pl-4`}>
              <div className="flex justify-between items-start mb-1">
                <h5 className="font-medium text-gray-900">
                  {typeof event === 'object' ? event.name : event}
                </h5>
                {typeof event === 'object' && event.date && (
                  <span className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                )}
              </div>
              {typeof event === 'object' && event.description && (
                <p className="text-sm text-gray-600">{event.description}</p>
              )}
              {typeof event === 'object' && event.type && (
                <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${getEventTypeBadgeColor(event.type)}`}>
                  {event.type}
                </span>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No local events available</p>
        )}
      </div>
    </div>
  );
}
