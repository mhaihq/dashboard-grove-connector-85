
import React from 'react';
import { Clipboard, Check, Clock, Play, X, ExternalLink, Moon, Activity, Heart, Users, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CarePlanItem } from '@/types/dashboard';

interface CarePlanProps {
  items: CarePlanItem[];
}

export const CarePlan: React.FC<CarePlanProps> = ({ items }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-0"><Check className="w-3 h-3 mr-1" /> Complete!</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-0"><Clock className="w-3 h-3 mr-1" /> In Progress</Badge>;
      case 'started':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-0"><Play className="w-3 h-3 mr-1" /> Started</Badge>;
      case 'not-started':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-0"><X className="w-3 h-3 mr-1" /> Not Started</Badge>;
      default:
        return null;
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'moon':
        return <Moon className="w-5 h-5 text-indigo-500" />;
      case 'activity':
        return <Activity className="w-5 h-5 text-red-500" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-pink-500" />;
      case 'users':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'droplets':
        return <Droplets className="w-5 h-5 text-cyan-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  // Sort items by status priority: in-progress, started, not-started, and complete at the end
  const sortedItems = [...items].sort((a, b) => {
    const statusOrder = { 'in-progress': 0, 'started': 1, 'not-started': 2, 'complete': 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {sortedItems.map((item, index) => {
          const progressPercentage = item.completedSteps 
            ? Math.round((item.completedSteps / item.totalSteps) * 100) 
            : item.status === 'complete' ? 100 : item.status === 'in-progress' ? 50 : item.status === 'started' ? 25 : 0;
          
          return (
            <div 
              key={index} 
              className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all hover:border-gray-200 bg-white"
            >
              <div className="flex items-center gap-2 mb-2">
                {getIcon(item.icon)}
                <h3 className="font-medium text-gray-900">{item.title}</h3>
              </div>
              
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>
              
              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              {/* Benefits statement */}
              {item.benefit && (
                <p className="text-xs text-green-600 mb-3 italic">
                  {item.benefit}
                </p>
              )}
              
              {/* Time commitment */}
              {item.timeCommitment && (
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{item.timeCommitment}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                {getStatusBadge(item.status)}
                
                {item.status !== 'complete' && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`text-xs ${item.status === 'not-started' ? 'bg-hana-green text-white hover:bg-green-600 border-0' : 'text-hana-green hover:text-green-700'}`}
                        >
                          {item.status === 'not-started' ? 'Start Now' : 'Continue'}
                          <ExternalLink className="ml-1 w-3 h-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{item.nextStep || 'Take the next step in your care plan'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarePlan;
