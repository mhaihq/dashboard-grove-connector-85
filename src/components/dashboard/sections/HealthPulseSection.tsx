
import React from 'react';
import { HealthPulse } from '@/components/dashboard/HealthPulse';
import { HealthPulseItem } from '@/types/dashboard';

interface HealthPulseSectionProps {
  data: HealthPulseItem[];
  mostImproved: string;
  focusArea: string;
  positiveAreas: number;
  totalAreas: number;
}

export const HealthPulseSection: React.FC<HealthPulseSectionProps> = ({
  data,
  mostImproved,
  focusArea,
  positiveAreas,
  totalAreas
}) => {
  return (
    <div className="mb-16">
      <HealthPulse 
        data={data}
        mostImproved={mostImproved}
        focusArea={focusArea}
        positiveAreas={positiveAreas}
        totalAreas={totalAreas}
      />
    </div>
  );
};

export default HealthPulseSection;
