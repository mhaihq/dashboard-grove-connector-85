
import React from 'react';
import { Moon, BatteryFull, Brain, Heart, Users, Activity } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { MentalHealthSummary } from '@/components/MentalHealthSummary';
import { HealthMetrics } from '@/components/HealthMetrics';

const IntakeReport = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  
  // Mental health summary data
  const summaryItems = [
    {
      title: "Notable Life Changes",
      content: [
        "No major new life changes other than the usual business fluctuations"
      ],
      type: 'notable' as const
    },
    {
      title: "What's Bringing Joy",
      content: [
        "Supportive relationship with wife",
        "Breathing techniques and working out provide relief"
      ],
      type: 'joy' as const
    },
    {
      title: "What's Weighing on You",
      content: [
        "Feeling down and not wanting to get out of bed at times",
        "Avoiding seeing friends and feeling tired most of the time"
      ],
      type: 'weighing' as const
    }
  ];
  
  // Health metrics data
  const metrics = [
    {
      title: "Sleep Quality",
      status: "concerning" as const,
      icon: <Moon className="w-5 h-5 text-indigo-500" />
    },
    {
      title: "Social Support",
      status: "mixed" as const,
      icon: <Users className="w-5 h-5 text-blue-500" />
    },
    {
      title: "Energy Level",
      status: "mixed" as const,
      icon: <BatteryFull className="w-5 h-5 text-amber-500" />
    },
    {
      title: "Stress Management",
      status: "mixed" as const,
      icon: <Activity className="w-5 h-5 text-red-500" />
    },
    {
      title: "Cognitive Function",
      status: "positive" as const,
      icon: <Brain className="w-5 h-5 text-green-500" />
    },
    {
      title: "Emotional Regulation",
      status: "concerning" as const,
      icon: <Heart className="w-5 h-5 text-pink-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px]">
        <DashboardHeader 
          userName={userName} 
          userEmail={userEmail}
        />
        
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Intake Assessment</h1>
            
            <MentalHealthSummary
              userName={userName}
              userEmail={userEmail}
              date="February 13, 2025"
              summaryItems={summaryItems}
            />
            
            <HealthMetrics metrics={metrics} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default IntakeReport;
