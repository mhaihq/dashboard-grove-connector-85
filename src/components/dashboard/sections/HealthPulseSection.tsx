
import React from 'react';
import { HealthPulse } from '@/components/dashboard/HealthPulse';
import { HealthPulseItem } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

interface HealthPulseSectionProps {
  data: HealthPulseItem[];
  mostImproved: string;
  focusArea: string;
  positiveAreas: number;
  totalAreas: number;
  environmentTips?: {
    title: string;
    tips: string[];
  };
}

export const HealthPulseSection: React.FC<HealthPulseSectionProps> = ({
  data,
  mostImproved,
  focusArea,
  positiveAreas,
  totalAreas,
  environmentTips
}) => {
  // Add trend data to each item - fixed to use proper enum values for trend
  const enhancedData = data.map(item => ({
    ...item,
    trend: item.improving ? 'up' as const : 'stable' as const, // Fixed: using proper enum values with type assertion
    relatedTo: ['sleep', 'nutrition'],
    initialScore: item.score - (item.improving ? 15 : 0),
    trendPercentage: item.improving ? 15 : 0,
    systemExplanation: item.improving 
      ? `Your ${item.area.toLowerCase()} system is working well`
      : `Consider adjusting your ${item.area.toLowerCase()} routine`
  }));
  
  // Find the most significant improvements for weekly change summary
  const improvements = enhancedData
    .filter(item => item.trend === 'up')
    .sort((a, b) => b.trendPercentage - a.trendPercentage);
  
  // Calculate improved and declined areas for visualization
  const improvedAreas = improvements.map(item => ({
    area: item.area,
    change: item.trendPercentage
  }));
  
  const declinedAreas = enhancedData
    .filter(item => item.trend === 'stable' && item.score < 60)
    .map(item => ({
      area: item.area,
      change: 0
    }));
  
  // Create weekly change insights
  const weeklyInsights = [
    `You've improved in ${mostImproved} this week — ${improvements[0]?.trendPercentage}% increase in positive self-reports.`,
    `Stress is lower on days with a structured evening routine.`,
    `Mood stabilized on days with social interaction.`
  ];
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Activity className="w-5 h-5 text-blue-500 mr-2" />
          Health Pulse
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex flex-wrap justify-between mb-2">
            <div>
              <span className="text-sm font-medium text-gray-600">
                Most Improved:
              </span>{" "}
              <span className="text-sm font-semibold text-emerald-600">
                {mostImproved}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">
                Focus Area:
              </span>{" "}
              <span className="text-sm font-semibold text-amber-600">
                {focusArea}
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {positiveAreas} of {totalAreas} areas are trending positively
          </div>
        </div>
        
        <HealthPulse 
          data={enhancedData}
          mostImproved={mostImproved}
          focusArea={focusArea}
          positiveAreas={positiveAreas}
          totalAreas={totalAreas}
          improvedAreas={improvedAreas}
          declinedAreas={declinedAreas}
          weeklyInsights={weeklyInsights}
        />
      </CardContent>
    </Card>
  );
};

export default HealthPulseSection;
