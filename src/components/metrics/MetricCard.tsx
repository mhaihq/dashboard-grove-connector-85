
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import ProgressBar from './ProgressBar';
import StatusIndicator from './StatusIndicator';

export type StatusType = 'positive' | 'mixed' | 'concerning';

export interface MetricProps {
  title: string;
  status: StatusType;
  icon?: React.ReactNode;
  description?: string;
}

export const MetricCard: React.FC<MetricProps> = ({ title, status, icon, description }) => {
  const [expanded, setExpanded] = React.useState(false);
  
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-3 hover-scale">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-base font-medium text-gray-900">{title}</h3>
        </div>
        <StatusIndicator status={status} />
      </div>
      
      <ProgressBar status={status} />
      
      {description && (
        <div className={cn(
          "mt-2 overflow-hidden transition-all duration-300",
          expanded ? "max-h-40" : "max-h-0"
        )}>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      )}
      
      {description && (
        <div className="mt-1 flex justify-end">
          <button 
            className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-900"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide Details" : "Show Details"}
            <ChevronDown className={cn(
              "w-4 h-4 transition-transform",
              expanded ? "transform rotate-180" : ""
            )} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
