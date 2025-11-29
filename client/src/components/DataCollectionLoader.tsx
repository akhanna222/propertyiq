import { useEffect, useState } from 'react';
import { Database, Globe, MapPin, Building, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataAgent {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  duration: number; // seconds
  status: 'pending' | 'active' | 'completed';
}

const dataAgents: DataAgent[] = [
  {
    id: 'internet',
    name: 'Internet Research Agent',
    icon: Globe,
    description: 'Collecting location and neighborhood data',
    duration: 8,
    status: 'pending'
  },
  {
    id: 'property-register',
    name: 'PropertyRegister.ie Agent',
    icon: Database,
    description: 'Searching official property sale records',
    duration: 6,
    status: 'pending'
  },
  {
    id: 'location',
    name: 'Location Intelligence Agent',
    icon: MapPin,
    description: 'Analyzing commute times and transport links',
    duration: 7,
    status: 'pending'
  },
  {
    id: 'amenities',
    name: 'Amenities & Lifestyle Agent',
    icon: Building,
    description: 'Finding schools, shops, and local facilities',
    duration: 9,
    status: 'pending'
  },
  {
    id: 'market',
    name: 'Market Analysis Agent',  
    icon: TrendingUp,
    description: 'Calculating investment and price trends',
    duration: 5,
    status: 'pending'
  },
  {
    id: 'community',
    name: 'Community Insights Agent',
    icon: Users,
    description: 'Gathering local news and community data',
    duration: 4,
    status: 'pending'
  }
];

interface DataCollectionLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function DataCollectionLoader({ isLoading, onComplete }: DataCollectionLoaderProps) {
  const [agents, setAgents] = useState<DataAgent[]>(dataAgents);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      // Reset all agents when not loading
      setAgents(dataAgents.map(agent => ({ ...agent, status: 'pending' })));
      setCurrentTime(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 0.5;
        // Stop the timer after all agents should be completed
        if (newTime > 35) {
          return 35;
        }
        return newTime;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) return;

    setAgents(prevAgents => {
      const updatedAgents = prevAgents.map((agent): DataAgent => {
        const startTime = dataAgents.findIndex(a => a.id === agent.id) * 2; // Stagger start times
        const endTime = startTime + agent.duration;

        if (currentTime >= startTime && currentTime < endTime) {
          return { ...agent, status: 'active' };
        } else if (currentTime >= endTime) {
          return { ...agent, status: 'completed' };
        }
        return { ...agent, status: 'pending' };
      });

      // Check if all agents are completed
      const allCompleted = updatedAgents.every(agent => agent.status === 'completed');
      if (allCompleted && currentTime > 30 && onComplete) {
        onComplete();
      }

      return updatedAgents;
    });
  }, [currentTime, isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border shadow-sm">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>  
          <h3 className="text-lg font-semibold">PropertyIQ Intelligence Network</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Our AI agents are working together to gather comprehensive property insights
        </p>
      </div>

      <div className="space-y-4">
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          const isActive = agent.status === 'active';
          const isCompleted = agent.status === 'completed';
          const isPending = agent.status === 'pending';

          return (
            <div
              key={agent.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-lg border transition-all duration-500",
                isActive && "bg-blue-50 border-blue-200 shadow-sm",
                isCompleted && "bg-green-50 border-green-200",
                isPending && "bg-gray-50 border-gray-200 opacity-60"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                isActive && "bg-blue-500 text-white animate-pulse",
                isCompleted && "bg-green-500 text-white",
                isPending && "bg-gray-300 text-gray-600"
              )}>
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className={cn(
                    "font-medium transition-colors",
                    isActive && "text-blue-700",
                    isCompleted && "text-green-700",
                    isPending && "text-gray-600"
                  )}>
                    {agent.name}
                  </h4>
                  {isActive && (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {agent.description}
                </p>
              </div>

              <div className={cn(
                "text-xs font-medium px-2 py-1 rounded-full transition-all",
                isActive && "bg-blue-100 text-blue-700",
                isCompleted && "bg-green-100 text-green-700",
                isPending && "bg-gray-100 text-gray-600"
              )}>
                {isCompleted ? 'Complete' : isActive ? 'Working...' : 'Waiting'}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 text-sm">
          <Database className="h-4 w-4 text-blue-600" />
          <span className="font-medium text-blue-700">
            Processing 30,400+ PropertyRegister.ie records
          </span>
        </div>
        <p className="text-xs text-blue-600 mt-1">
          Using authentic Irish property transaction data for accurate pricing analysis
        </p>
      </div>
    </div>
  );
}