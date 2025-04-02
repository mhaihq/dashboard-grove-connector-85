
import React from 'react';
import { 
  Moon,
  Brain,
  Activity,
  Droplets,
  MessageSquare,
  InfoIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface PatternInsightCardProps {
  insightTitle: string;
  pattern: string;
  result: string;
  suggestion: string;
  status: 'positive' | 'negative' | 'cognitive' | 'curious';
  category: 'sleep' | 'stress' | 'exercise' | 'nutrition' | 'hydration' | 'social';
  tooltipInfo?: string;
  tags?: string[];
}

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'sleep':
      return <Moon className="w-5 h-5" />;
    case 'stress':
      return <Activity className="w-5 h-5" />;
    case 'exercise':
      return <Activity className="w-5 h-5" />;
    case 'nutrition':
      return <Droplets className="w-5 h-5" />;
    case 'hydration':
      return <Droplets className="w-5 h-5" />;
    case 'social':
      return <MessageSquare className="w-5 h-5" />;
    default:
      return <Brain className="w-5 h-5" />;
  }
};

export const getStatusIcon = (status: 'positive' | 'negative' | 'cognitive' | 'curious') => {
  switch (status) {
    case 'positive': return '✅';
    case 'negative': return '⚠️';
    case 'cognitive': return '🧠';
    case 'curious': return '💡';
    default: return '✅';
  }
};

export const getStatusColor = (status: 'positive' | 'negative' | 'cognitive' | 'curious') => {
  switch (status) {
    case 'positive': return 'bg-green-100 text-green-800 border-green-200';
    case 'negative': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'cognitive': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'curious': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-green-100 text-green-800 border-green-200';
  }
};

const PatternInsightCard: React.FC<PatternInsightCardProps> = ({
  insightTitle,
  pattern,
  result,
  suggestion,
  status,
  category,
  tooltipInfo = "This insight was found based on your recent activity patterns.",
  tags = []
}) => {
  const statusIcon = getStatusIcon(status);
  const statusColor = getStatusColor(status);
  const categoryIcon = getCategoryIcon(category);
  
  return (
    <div className="overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-lg border">
      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold">{statusIcon}</span>
              <h3 className="text-lg font-bold text-gray-900">{insightTitle}</h3>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {tags.map((tag, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p>{tooltipInfo}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="space-y-4 mb-5">
          <div className="flex gap-2">
            <div className={cn(
              "p-1.5 rounded-full flex-shrink-0 mt-0.5",
              status === 'positive' ? 'bg-green-100' : 
              status === 'negative' ? 'bg-amber-100' : 
              status === 'cognitive' ? 'bg-purple-100' : 'bg-blue-100'
            )}>
              {categoryIcon}
            </div>
            <div>
              <p className="text-gray-700 font-medium">Behavioral Pattern Detected:</p>
              <p className="text-gray-600">{pattern}</p>
            </div>
          </div>
          
          <div className="pl-8">
            <p className="text-gray-700 font-medium">Observed Result:</p>
            <p className="text-gray-600">{result}</p>
          </div>
          
          <div className="pl-8">
            <p className="text-gray-700 font-medium">Suggested Action:</p>
            <p className="text-gray-600">{suggestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternInsightCard;
