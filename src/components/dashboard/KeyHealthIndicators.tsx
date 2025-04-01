
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthIndicator } from '@/types/dashboard';
import { Sparkles, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface KeyHealthIndicatorsProps {
  healthIndicators: HealthIndicator[];
}

export const KeyHealthIndicators: React.FC<KeyHealthIndicatorsProps> = ({
  healthIndicators
}) => {
  // Helper function to determine status color class
  const getStatusColorClass = (change: string) => {
    switch (change) {
      case 'improving':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'declining':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'stabilizing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-amber-600 bg-amber-50 border-amber-200';
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
          Your Health Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {healthIndicators.map((indicator, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm hover:shadow transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{indicator.title}</h3>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p>{indicator.evidence || 'Health data from your recent check-ins'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <Badge className={cn(
                  "font-medium px-2.5 py-1",
                  getStatusColorClass(indicator.change)
                )}>
                  {indicator.value}
                </Badge>
                
                <div className={cn(
                  "text-sm px-2 py-1 rounded font-medium",
                  indicator.change === 'improving' ? 'text-green-600' :
                  indicator.change === 'declining' ? 'text-red-600' : 'text-amber-600'
                )}>
                  {indicator.change}
                </div>
              </div>
              
              {indicator.actionItems && indicator.actionItems.length > 0 && (
                <div className="mt-3 text-sm text-gray-600">
                  <p className="font-medium mb-1">Action tip:</p>
                  <p>{indicator.actionItems[0]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyHealthIndicators;
