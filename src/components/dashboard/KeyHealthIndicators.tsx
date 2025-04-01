
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, Activity, Brain, Shield, Heart, Users, Info, Droplets, Clock, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HealthIndicator {
  title: string;
  value: string;
  change: string;
  icon: string;
  score?: number;
  previousScore?: number;
  maxScore?: number;
  status?: string;
  evidence?: string;
  intakeReference?: string;
  updatedAt?: string;
  actionItems?: string[];
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
      case 'droplets':
        return <Droplets className="h-5 w-5 text-blue-400" />;
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

  const renderScoreDots = (score: number, previousScore: number | undefined, maxScore: number) => {
    return (
      <div className="flex space-x-1 mt-1">
        {Array.from({ length: maxScore }).map((_, i) => {
          // Determine if this dot shows improvement
          const isImproved = previousScore !== undefined && i >= previousScore && i < score;
          
          return (
            <div 
              key={i} 
              className={`h-1.5 w-1.5 rounded-full ${
                i < score 
                  ? isImproved 
                    ? 'bg-green-400' 
                    : 'bg-hana-green' 
                  : 'bg-gray-200'
              } ${isImproved ? 'ring-1 ring-green-200' : ''}`}
            />
          );
        })}
      </div>
    );
  };

  const renderScoreChange = (current?: number, previous?: number) => {
    if (current === undefined || previous === undefined) return null;
    
    if (current > previous) {
      return <ArrowUp className="h-3 w-3 text-green-500" />;
    } else if (current < previous) {
      return <ArrowDown className="h-3 w-3 text-red-500" />;
    } else {
      return <Minus className="h-3 w-3 text-gray-400" />;
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">
          🧠 Functional Area Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {healthIndicators.map((indicator, i) => (
            <div key={i} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  {getIcon(indicator.icon)}
                  <h3 className="text-md font-medium ml-2">{indicator.title}</h3>
                </div>
                
                {indicator.score !== undefined && indicator.previousScore !== undefined && (
                  <div className="flex items-center gap-1">
                    {renderScoreChange(indicator.score, indicator.previousScore)}
                    <span className="text-xs font-medium">
                      {indicator.score > indicator.previousScore ? '+' : ''}{indicator.score - indicator.previousScore}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="mb-2">
                <div className="text-lg font-bold">{indicator.value}</div>
                <p className={`text-xs ${
                  indicator.change === "improving" ? "text-green-600" : 
                  indicator.change === "worsening" ? "text-red-600" : 
                  "text-blue-600"
                }`}>
                  {indicator.change}
                </p>
                {indicator.score !== undefined && indicator.maxScore !== undefined && indicator.previousScore !== undefined && 
                  renderScoreDots(indicator.score, indicator.previousScore, indicator.maxScore)
                }
              </div>
              
              {indicator.status && (
                <div className={`text-xs font-medium mb-1 ${getStatusColor(indicator.status)}`}>
                  Status: {indicator.status.charAt(0).toUpperCase() + indicator.status.slice(1)}
                </div>
              )}
              
              {indicator.evidence && (
                <div className="mt-2 text-xs text-gray-600 italic">
                  "{indicator.evidence}"
                </div>
              )}
              
              {indicator.updatedAt && (
                <div className="mt-2 text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Updated: {indicator.updatedAt}</span>
                </div>
              )}
              
              {indicator.actionItems && indicator.actionItems.length > 0 && (
                <div className="mt-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="text-xs text-hana-green flex items-center">
                          <Info className="h-3 w-3 mr-1" />
                          Action items
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs p-2">
                          <p className="font-medium mb-1 text-xs">Suggested actions:</p>
                          <ul className="text-xs list-disc pl-4 space-y-1">
                            {indicator.actionItems.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
