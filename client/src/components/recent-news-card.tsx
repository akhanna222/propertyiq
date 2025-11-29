import { Newspaper } from "lucide-react";
import type { RecentNews } from "@shared/schema";

interface RecentNewsCardProps {
  recentNews: RecentNews[];
}

export function RecentNewsCard({ recentNews }: RecentNewsCardProps) {
  return (
    <div className="property-card">
      <div className="flex items-center mb-4">
        <Newspaper className="text-primary text-xl mr-3" />
        <h4 className="text-lg font-semibold text-gray-900">📰 Recent Area News Around Crimes Happened</h4>
      </div>
      <div className="space-y-4">
        {recentNews.map((news, index) => (
          <div key={index} className="pb-4 border-b border-gray-100 last:border-b-0">
            <h5 className="font-medium text-gray-900 mb-1">{news.title}</h5>
            <p className="text-sm text-gray-600 mb-2">{news.summary}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{new Date(news.date).toLocaleDateString()}</span>
              <span className="text-xs text-blue-600">{news.source}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
