
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
  // Enhance data with additional metrics for the new design
  const enhancedData = data.map(item => ({
    ...item,
    trend: item.improving ? 'up' as const : 'stable' as const,
    relatedTo: ['sleep', 'nutrition'],
    initialScore: item.score - (item.improving ? 15 : 0),
    trendPercentage: item.improving ? 15 : 0,
    systemExplanation: item.improving 
      ? `Your ${item.area.toLowerCase()} system is working well`
      : `Consider adjusting your ${item.area.toLowerCase()} routine`,
    lastCheckInMention: Math.random() > 0.5, // Simulate if it was mentioned in recent check-ins
    streakData: {
      current: Math.floor(Math.random() * 7) + 1,
      target: 7,
      change: Math.floor(Math.random() * 5) - 2,
      status: Math.random() > 0.6 ? 'improved' : (Math.random() > 0.5 ? 'declined' : 'stable')
    }
  }));
  
  // Find the most significant improvements for weekly change summary
  const improvements = enhancedData
    .filter(item => item.trend === 'up')
    .sort((a, b) => (b.trendPercentage || 0) - (a.trendPercentage || 0));
  
  // Calculate improved and declined areas for visualization
  const improvedAreas = improvements.map(item => ({
    area: item.area,
    change: item.trendPercentage || 0
  }));
  
  const needsAttentionAreas = enhancedData
    .filter(item => item.trend === 'stable' && item.score < 60)
    .map(item => ({
      area: item.area,
      change: 0
    }));
  
  // Create weekly insights based on the data patterns
  const weeklyInsights = [
    `You report less stress on days with evening routines and 7+ hours of sleep.`,
    `Stress is lower on days with a structured evening routine.`,
    `Mood stabilized on days with social interaction.`
  ];

  // Track habits for micro-habit tracker
  const habitTrends = [
    {
      habit: 'Morning Walks',
      icon: '🥾',
      trend: '+1 day',
      direction: 'up' as const,
      current: 5,
      target: 7,
      status: 'improved' as const
    },
    {
      habit: 'Hydration',
      icon: '💧',
      trend: '-2 days',
      direction: 'down' as const,
      current: 3,
      target: 7,
      status: 'declined' as const
    },
    {
      habit: 'Alcohol-Free Days',
      icon: '🍷',
      trend: '=',
      direction: 'stable' as const,
      current: 2,
      target: 7,
      status: 'stable' as const
    }
  ];
  
  // Generate improvement summaries
  const improvementSummaries = [
    "Stress regulation ↑ 8% — better sleep on structured days.",
    "Slight boost in energy levels."
  ];
  
  // Generate needs attention summaries
  const needsAttentionSummaries = [
    "Hydration remains low. Correlated with afternoon fatigue.",
    "Emotional regulation unchanged."
  ];
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Activity className="w-5 h-5 text-blue-500 mr-2" />
          Your Weekly Health Pulse
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-1">
          <p className="text-sm text-gray-600">
            A snapshot of how your habits and health are trending — drawn from your recent conversations.
          </p>
        </div>
        
        <HealthPulse 
          data={enhancedData}
          mostImproved={mostImproved}
          focusArea={focusArea}
          positiveAreas={positiveAreas}
          totalAreas={totalAreas}
          improvedAreas={improvedAreas}
          declinedAreas={needsAttentionAreas}
          weeklyInsights={weeklyInsights}
          improvementSummaries={improvementSummaries}
          needsAttentionSummaries={needsAttentionSummaries}
          habitTrends={habitTrends}
        />
      </CardContent>
    </Card>
  );
};

export default HealthPulseSection;
