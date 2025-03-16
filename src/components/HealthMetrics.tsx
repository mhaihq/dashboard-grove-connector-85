
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { MetricProps } from './metrics/MetricCard';
import MetricsGrid from './metrics/MetricsGrid';

interface HealthMetricsProps {
  metrics: Array<MetricProps>;
}

export const HealthMetrics: React.FC<HealthMetricsProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm mt-4 animate-slide-up delay-100 text-left">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="w-5 h-5 text-hana-green" />
        <h2 className="text-xl font-semibold text-gray-900">Health &amp; Wellness Assessment</h2>
      </div>
      
      <MetricsGrid metrics={metrics} />
    </div>
  );
};

export default HealthMetrics;
