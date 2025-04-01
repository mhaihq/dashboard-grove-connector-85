
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
    
    // Add system explanation for Atomic Habits integration
    let systemExplanation = '';
    if (item.area === 'Sleep' && trend === 'up') {
      systemExplanation = 'Your consistent bedtime routine (system) boosted your score';
    } else if (item.area === 'Exercise' && trend === 'up') {
      systemExplanation = 'Walking after lunch (habit stack) is making a difference';
    } else if (item.area === 'Hydration' && trend === 'down') {
      systemExplanation = 'Consider placing a water bottle on your desk (environment design)';
    }
    
    return {
      ...item,
      trend,
      relatedTo,
      initialScore,
      trendPercentage,
      systemExplanation
    };
  });
  
  // Generate improved and declined areas for the highlights section with Atomic Habits framing
  const improvedAreas = enhancedData
    .filter(item => item.improving && item.trendPercentage && item.trendPercentage > 0)
    .map(item => ({
      area: item.area,
      change: item.trendPercentage || 0,
      systemNote: item.systemExplanation
    }))
    .sort((a, b) => b.change - a.change)
    .slice(0, 3);
    
  const declinedAreas = enhancedData
    .filter(item => !item.improving && item.trendPercentage && item.trendPercentage < 0)
    .map(item => ({
      area: item.area,
      change: item.trendPercentage || 0,
      systemNote: item.systemExplanation
    }))
    .sort((a, b) => a.change - b.change)
    .slice(0, 3);
  
  // Add environment design tips for areas needing improvement
  const environmentTips = {
    'Sleep': 'Placing your phone away from your bed reduced late-night scrolling',
    'Hydration': 'Try filling a water bottle each morning and placing it at your desk',
    'Exercise': 'Leaving gym clothes out the night before reduced morning friction',
    'Nutrition': 'Pre-cutting veggies on Sunday made healthy snacking easier all week'
  };
  
  return (
    <div>
      <HealthPulse 
        data={enhancedData}
        mostImproved={mostImproved}
        focusArea={focusArea}
        positiveAreas={positiveAreas}
        totalAreas={totalAreas}
        improvedAreas={improvedAreas}
        declinedAreas={declinedAreas}
        environmentTips={environmentTips}
      />
    </div>
  );
};

export default HealthPulseSection;
