
import React from 'react';
import { cn } from '@/lib/utils';
import { StatusType } from './MetricCard';

interface ProgressBarProps {
  status: StatusType;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ status }) => {
  return (
    <div className="relative w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className={cn(
        "absolute h-full left-0 top-0 rounded-full",
        status === 'positive' ? "bg-positive w-4/5" : 
        status === 'mixed' ? "bg-mixed w-1/2" : 
        "bg-concerning w-1/4"
      )}></div>
    </div>
  );
};

export default ProgressBar;
