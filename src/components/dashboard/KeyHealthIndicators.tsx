
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, Activity, Brain, Shield, Heart, Users, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HealthIndicator {
  title: string;
  value: string;
  change: string;
  icon: string;
  score?: number;
  maxScore?: number;
  status?: string;
  evidence?: string;
  intakeReference?: string;
}

interface KeyHealthIndicatorsProps {
  healthIndicators: HealthIndicator[];
}

export const KeyHealthIndicators: React.FC<KeyHealthIndicatorsProps> = ({ 
  healthIndicators 
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'moon':
        return <Moon className="h-5 w-5 text-indigo-500" />;
      case 'activity':
        return <Activity className="h-5 w-5 text-red-500" />;
      case 'brain':
        return <Brain className="h-5 w-5 text-amber-500" />;
      case 'shield':
        return <Shield className="h-5 w-5 text-hana-green" />;
      case 'heart':
        return <Heart className="h-5 w-5 text-pink-500" />;
      case 'users':
        return <Users className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'concerning':
        return "text-red-600";
      case 'mixed':
        return "text-amber-600";
      case 'neutral':
        return "text-blue-600";
      case 'positive':
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const renderScoreDots = (score: number, maxScore: number) => {
    return (
      <div className="flex space-x-1 mt-1">
        {Array.from({ length: maxScore }).map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 w-1.5 rounded-full ${i < score ? 'bg-hana-green' : 'bg-gray-200'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {healthIndicators.map((indicator, i) => (
        <Card key={i} className="hover-scale text-left">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-gray-500">{indicator.title}</CardTitle>
              <div className="flex items-center">
                {getIcon(indicator.icon)}
                {indicator.evidence && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-1">
                          <Info className="h-3.5 w-3.5 text-gray-400" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs">
                          <p className="font-medium mb-1">Evidence:</p>
                          <p className="text-sm italic">"{indicator.evidence}"</p>
                          {indicator.intakeReference && (
                            <p className="text-xs text-gray-500 mt-1">{indicator.intakeReference}</p>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{indicator.value}</div>
            <p className={`text-xs ${
              indicator.change === "improving" ? "text-green-600" : 
              indicator.change === "worsening" ? "text-red-600" : 
              "text-blue-600"
            }`}>
              {indicator.title === "Medicare Status" 
                ? "Great news! You're covered for our support program" 
                : indicator.change}
            </p>
            {indicator.score !== undefined && indicator.maxScore !== undefined && 
              renderScoreDots(indicator.score, indicator.maxScore)
            }
            {indicator.status && (
              <div className={`text-xs font-medium mt-1 ${getStatusColor(indicator.status)}`}>
                Status: {indicator.status.charAt(0).toUpperCase() + indicator.status.slice(1)}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KeyHealthIndicators;
