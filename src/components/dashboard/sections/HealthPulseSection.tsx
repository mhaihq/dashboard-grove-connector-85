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
  // Add trend data, initial scores, and tooltips to the health pulse items
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
    
    // Add initial scores (simulating historical data)
    const initialScore = Math.max(25, item.score - (item.improving ? 15 : -10));
    
    // Calculate percentage change
    const trendPercentage = Math.round(((item.score - initialScore) / initialScore) * 100);
    
    return {
      ...item,
      trend,
      relatedTo,
      initialScore,
      trendPercentage
    };
  });
  
  // Generate improved and declined areas for the highlights section
  const improvedAreas = enhancedData
    .filter(item => item.improving && item.trendPercentage && item.trendPercentage > 0)
    .map(item => ({
      area: item.area,
      change: item.trendPercentage || 0
    }))
    .sort((a, b) => b.change - a.change)
    .slice(0, 3);
    
  const declinedAreas = enhancedData
    .filter(item => !item.improving && item.trendPercentage && item.trendPercentage < 0)
    .map(item => ({
      area: item.area,
      change: item.trendPercentage || 0
    }))
    .sort((a, b) => a.change - b.change)
    .slice(0, 3);
  
  return (
    <div className="mb-16">
      <HealthPulse 
        data={enhancedData}
        mostImproved={mostImproved}
        focusArea={focusArea}
        positiveAreas={positiveAreas}
        totalAreas={totalAreas}
        improvedAreas={improvedAreas}
        declinedAreas={declinedAreas}
      />
    </div>
  );
};

export default HealthPulseSection;
