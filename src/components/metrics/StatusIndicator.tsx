
import React from 'react';
import { cn } from '@/lib/utils';
import { StatusType } from './MetricCard';

interface StatusIndicatorProps {
  status: StatusType;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
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
    <div className={cn(
      status === 'positive' ? "status-positive" : 
      status === 'mixed' ? "status-mixed" : 
      "status-concerning"
    )}>
      {getStatusLabel(status)}
    </div>
  );
};

export default StatusIndicator;
