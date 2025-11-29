import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Clock, MapPin, Hash } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { PropertyData } from "@shared/schema";

interface SearchHistoryItem {
  id: number;
  address: string;
  eircode: string | null;
  county: string | null;
  createdAt: Date;
  analysisOutput: PropertyData;
}

interface SearchHistoryProps {
  onSelectHistory: (data: PropertyData) => void;
  userId?: string;
}

export function SearchHistory({ onSelectHistory, userId }: SearchHistoryProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { data: historyItems, isLoading } = useQuery<SearchHistoryItem[]>({
    queryKey: ["/api/user-queries"],
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });

  if (!userId) {
    return null;
  }

  return (
    <div 
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isCollapsed ? 'w-12' : 'w-80'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Search History</h2>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 h-8 w-8"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="p-4">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-16 rounded-md"></div>
                ))}
              </div>
            ) : historyItems && historyItems.length > 0 ? (
              <div className="space-y-2">
                {historyItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectHistory(item.analysisOutput)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className="space-y-2">
                      {/* Address */}
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                          {item.address}
                        </div>
                      </div>
                      
                      {/* Eircode and County */}
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          {item.eircode && (
                            <div className="flex items-center mr-3">
                              <Hash className="h-3 w-3 mr-1" />
                              {item.eircode}
                            </div>
                          )}
                          {item.county && (
                            <div>{item.county}</div>
                          )}
                        </div>
                        <div>
                          {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No search history yet</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Your analyzed properties will appear here
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      )}

      {/* Collapsed state indicator */}
      {isCollapsed && historyItems && historyItems.length > 0 && (
        <div className="p-2">
          <div className="text-center">
            <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                {historyItems.length}
              </span>
            </div>
            <Clock className="h-4 w-4 text-gray-400 mx-auto" />
          </div>
        </div>
      )}
    </div>
  );
}