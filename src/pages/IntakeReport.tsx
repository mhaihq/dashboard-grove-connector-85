
import React from 'react';
import { Moon, BatteryFull, Brain, Heart, Users, Activity, UtensilsCrossed, Weight, Shield, Coffee } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { MentalHealthSummary } from '@/components/MentalHealthSummary';
import { HealthMetrics } from '@/components/HealthMetrics';
import { ProgressSection } from '@/components/ProgressSection';
import WellnessBanner from '@/components/intake/WellnessBanner';
import IntakeReportHeader from '@/components/intake/IntakeReportHeader';
import { getIntakeData, MetricItem } from '@/components/intake/IntakeSummaryData';

const IntakeReport = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  
  // Get data from our utility function
  const { summaryItems, metrics: metricItems, recommendations } = getIntakeData();
  
  // Add icons to the metrics data
  const metrics = metricItems.map(metric => {
    const iconMap: Record<string, React.ReactNode> = {
      "Sleep Quality": <Moon className="w-5 h-5 text-indigo-500" />,
      "Social Support": <Users className="w-5 h-5 text-blue-500" />,
      "Energy Level": <BatteryFull className="w-5 h-5 text-amber-500" />,
      "Stress Management": <Activity className="w-5 h-5 text-red-500" />,
      "Cognitive Function": <Brain className="w-5 h-5 text-green-500" />,
      "Emotional Regulation": <Heart className="w-5 h-5 text-pink-500" />,
      "Nutrition Habits": <UtensilsCrossed className="w-5 h-5 text-orange-500" />,
      "Physical Activity": <Weight className="w-5 h-5 text-blue-600" />,
      "Hydration": <Coffee className="w-5 h-5 text-brown-500" />
    };
    
    return {
      ...metric,
      icon: iconMap[metric.title] || null
    } as MetricItem;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 ml-[70px] transition-all duration-300">
        <DashboardHeader 
          userName={userName} 
          userEmail={userEmail}
        />
        
        <main className="p-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <IntakeReportHeader />
            <WellnessBanner />
            
            <div className="space-y-10">
              <MentalHealthSummary
                userName={userName}
                userEmail={userEmail}
                date="February 13, 2025"
                summaryItems={summaryItems}
              />
              
              <HealthMetrics metrics={metrics} />
              
              <ProgressSection recommendations={recommendations} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IntakeReport;
