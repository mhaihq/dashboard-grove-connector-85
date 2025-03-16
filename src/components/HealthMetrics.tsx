
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

type StatusType = 'positive' | 'mixed' | 'concerning';

interface MetricProps {
  title: string;
  status: StatusType;
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricProps> = ({ title, status, icon }) => {
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
          {status === 'positive' ? 'Positive' : 
           status === 'mixed' ? 'Mixed' : 
           'Concerning'}
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
      
      <div className="mt-4 flex justify-end">
        <button className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-900">
          Show Details
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface HealthMetricsProps {
  metrics: Array<MetricProps>;
}

export const HealthMetrics: React.FC<HealthMetricsProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm mt-8 animate-slide-up delay-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Functional Areas Assessment</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard 
            key={index}
            title={metric.title}
            status={metric.status}
            icon={metric.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default HealthMetrics;
