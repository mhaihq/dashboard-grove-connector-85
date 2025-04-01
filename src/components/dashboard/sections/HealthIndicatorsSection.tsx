
import React from 'react';
import { KeyHealthIndicators } from '@/components/dashboard/KeyHealthIndicators';
import { HealthIndicator } from '@/types/dashboard';

interface HealthIndicatorsSectionProps {
  healthIndicators: HealthIndicator[];
}

export const HealthIndicatorsSection: React.FC<HealthIndicatorsSectionProps> = ({
  healthIndicators
}) => {
  return (
    <div className="mb-16">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Health Insights</h2>
      <KeyHealthIndicators healthIndicators={healthIndicators} />
    </div>
  );
};

export default HealthIndicatorsSection;
