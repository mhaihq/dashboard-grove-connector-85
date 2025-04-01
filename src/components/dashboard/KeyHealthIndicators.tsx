
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthIndicator } from '@/types/dashboard';
import { Sparkles, Info, Check, AlertTriangle, Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface KeyHealthIndicatorsProps {
  healthIndicators: HealthIndicator[];
}

export const KeyHealthIndicators: React.FC<KeyHealthIndicatorsProps> = ({
  healthIndicators
}) => {
  // Helper function to determine status icon
  const getStatusIcon = (change: string) => {
    switch (change) {
      case 'improving':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'declining':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'stabilizing':
        return <Brain className="w-4 h-4 text-blue-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  // Helper function to determine status color class
  const getStatusColorClass = (change: string) => {
    switch (change) {
      case 'improving':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'declining':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'stabilizing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-purple-600 bg-purple-50 border-purple-200';
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
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "inline-flex items-center justify-center w-6 h-6 rounded-full",
                      indicator.change === 'improving' ? 'bg-green-100' : 
                      indicator.change === 'declining' ? 'bg-amber-100' : 'bg-blue-100'
                    )}>
                      {getStatusIcon(indicator.change)}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{indicator.title}</h3>
                  </div>
                  
                  <Badge className={cn(
                    "mt-2 font-medium px-2.5 py-1",
                    getStatusColorClass(indicator.change)
                  )}>
                    {indicator.value}
                  </Badge>
                </div>
                
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
              
              <div className="mb-4">
                <p className="text-sm text-gray-700 font-medium">Pattern Detected:</p>
                <p className="text-sm text-gray-600">
                  {indicator.plainLanguage || `Your ${indicator.title.toLowerCase()} is ${indicator.change}.`}
                </p>
              </div>
              
              {indicator.actionItems && indicator.actionItems.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-700 font-medium">Suggested Action:</p>
                  <p className="text-sm text-gray-600">{indicator.actionItems[0]}</p>
                </div>
              )}
              
              <div className="flex justify-end gap-2 mt-3">
                <Button variant="outline" size="sm" className="text-xs">
                  Add to Focus
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Save
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyHealthIndicators;
