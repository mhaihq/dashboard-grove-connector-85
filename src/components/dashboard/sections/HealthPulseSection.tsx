
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
  // Add trend data and tooltips to the health pulse items
  const enhancedData = data.map(item => {
    // Sample trend data - in a real app, this would come from the backend
    let trend: 'up' | 'down' | 'stable' = 'stable';
    
    if (item.area === mostImproved || item.improving) {
      trend = 'up';
    } else if (item.area === focusArea || item.priority) {
      trend = 'down';
    }
    
    // Add sample related dimensions
    const relatedTo: string[] = [];
    if (item.area === 'Sleep') relatedTo.push('Energy', 'Mood');
    if (item.area === 'Exercise') relatedTo.push('Energy', 'Mood');
    if (item.area === 'Nutrition') relatedTo.push('Energy');
    if (item.area === 'Stress') relatedTo.push('Sleep', 'Mood');
    
    return {
      ...item,
      trend,
      relatedTo
    };
  });
  
  return (
    <div className="mb-16">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Health Snapshot</h2>
      <HealthPulse 
        data={enhancedData}
        mostImproved={mostImproved}
        focusArea={focusArea}
        positiveAreas={positiveAreas}
        totalAreas={totalAreas}
      />
    </div>
  );
};

export default HealthPulseSection;
