
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export type StatusType = 'positive' | 'mixed' | 'concerning';

export interface MetricProps {
  title: string;
  status: StatusType;
  icon?: React.ReactNode;
  description?: string;
}

export const MetricCard: React.FC<MetricProps> = ({ title, status, icon, description }) => {
  const [expanded, setExpanded] = React.useState(false);
  
  const getStatusLabel = (status: StatusType): string => {
    switch(status) {
      case 'positive':
        return 'Strong';
      case 'mixed':
        return 'Moderate';
      case 'concerning':
        return 'Needs Focus';
      default:
        return '';
    }
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-5 hover-scale">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-base font-medium text-gray-900">{title}</h3>
        </div>
        <div className={cn(
          status === 'positive' ? "status-positive" : 
          status === 'mixed' ? "status-mixed" : 
          "status-concerning"
        )}>
          {getStatusLabel(status)}
        </div>
      </div>
      
      <div className="relative w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={cn(
          "absolute h-full left-0 top-0 rounded-full",
          status === 'positive' ? "bg-positive w-4/5" : 
          status === 'mixed' ? "bg-mixed w-1/2" : 
          "bg-concerning w-1/4"
        )}></div>
      </div>
      
      {description && (
        <div className={cn(
          "mt-4 overflow-hidden transition-all duration-300",
          expanded ? "max-h-40" : "max-h-0"
        )}>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      )}
      
      <div className="mt-4 flex justify-end">
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
    </div>
  );
};

export default MetricCard;
