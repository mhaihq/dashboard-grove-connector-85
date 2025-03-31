
import React from 'react';
import { Activity, Heart, ClipboardList, Award, Moon, BatteryFull, Brain, Users, UtensilsCrossed, Weight, Shield, Coffee } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardWelcome } from '@/components/dashboard/DashboardWelcome';
import { MentalHealthSummary } from '@/components/MentalHealthSummary';
import { CallElement } from '@/components/CallElement';
import { KeyHealthIndicators } from '@/components/dashboard/KeyHealthIndicators';
import { HealthAssessmentSection } from '@/components/dashboard/HealthAssessmentSection';
import { DetailedAssessmentSection } from '@/components/dashboard/DetailedAssessmentSection';
import { HealthMetrics } from '@/components/HealthMetrics';
import { ProgressSection } from '@/components/ProgressSection';
import WellnessBanner from '@/components/intake/WellnessBanner';
import IntakeReportHeader from '@/components/intake/IntakeReportHeader';
import { getIntakeData, MetricItem } from '@/components/intake/IntakeSummaryData';

const Index = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  const userImage = "https://media.licdn.com/dms/image/v2/D4E03AQEF64y0nluvpw/profile-displayphoto-shrink_800_800/B4EZSgI1mgHcAc-/0/1737853459711?e=1747872000&v=beta&t=3713WkmjpsNYWB0H9Qxg7HrdB3RTyK5bZuLfj-EccRo";
  
  // Medicare program eligibility criteria data
  const eligibilityData = [
    { program: "Chronic Care Management (CCM)", eligible: true, reason: "Has 2+ chronic conditions" },
    { program: "Remote Patient Monitoring (RPM)", eligible: true, reason: "Ongoing hypertension monitoring" },
    { program: "Behavioral Health Integration (BHI)", eligible: "potential", reason: "Shows signs of mild depression" },
    { program: "Principal Care Management (PCM)", eligible: false, reason: "Does not have a single high-risk condition" }
  ];
  
  // Health assessment data - for radar chart
  const assessmentData = [
    { area: "Physical Health", score: 65 },
    { area: "Mental Wellbeing", score: 48 },
    { area: "Social Connection", score: 72 },
    { area: "Sleep Quality", score: 43 },
    { area: "Nutrition", score: 60 },
    { area: "Stress Management", score: 52 }
  ];
  
  // Next steps/actions
  const upcomingActions = [
    { title: "Complete Sleep Assessment", description: "Additional sleep quality screening needed", dueDate: "3 days", priority: "high" as const },
    { title: "Schedule Follow-up Call", description: "Review initial health coaching plan", dueDate: "1 week", priority: "medium" as const },
    { title: "Begin Medication Log", description: "Track adherence to prescribed medications", dueDate: "2 days", priority: "high" as const },
    { title: "Join Support Group", description: "Virtual heart health support group", dueDate: "2 weeks", priority: "low" as const }
  ];
  
  // Key health metrics
  const healthIndicators = [
    { title: "Chronic Conditions", value: "3", change: "unchanged", icon: <Activity className="w-5 h-5 text-blue-500" /> },
    { title: "Risk Score", value: "Medium", change: "improving", icon: <Heart className="w-5 h-5 text-red-500" /> },
    { title: "Last Check-in", value: "Feb 13", change: "recent", icon: <ClipboardList className="w-5 h-5 text-violet-500" /> },
    { title: "Medicare Status", value: "Enrolled", change: "active", icon: <Award className="w-5 h-5 text-emerald-500" /> }
  ];

  // Journal Summary Data
  const journalSummaryItems = [
    {
      title: "What's Going Well",
      content: [
        "Your morning walks are becoming more consistent - you've gone from 2 days a week to 5!",
        "You've been drinking more water throughout the day",
        "You reached out to a friend for coffee this week"
      ],
      type: 'joy' as const
    },
    {
      title: "Areas of Progress",
      content: [
        "Your sleep quality is gradually improving with the new bedtime routine",
        "You've had 2 alcohol-free days this week compared to none last week",
        "Your mood has been more stable on days when you've eaten regular meals"
      ],
      type: 'notable' as const
    },
    {
      title: "What's On Your Mind",
      content: [
        "Financial concerns with ongoing job search",
        "Finding time for self-care while managing daily responsibilities",
        "Difficulty maintaining social connections"
      ],
      type: 'weighing' as const
    }
  ];
  
  // Get intake data from our utility function
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
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        userName={userName} 
        userEmail={userEmail}
        userImage={userImage}
      />
      
      <main className="p-6 text-left">
        <div className="max-w-6xl mx-auto">
          <DashboardWelcome userName={userName} />
          
          {/* Consolidated Call Element Section - Moved to the top */}
          <div className="mb-8 mt-8">
            <CallElement userName={userName} />
          </div>
          
          {/* Journal Summary Section */}
          <MentalHealthSummary 
            userName={userName}
            userEmail={userEmail}
            date="Updated: March 15, 2025"
            summaryItems={journalSummaryItems}
          />
          
          {/* Key Health Indicators */}
          <KeyHealthIndicators healthIndicators={healthIndicators} />
          
          {/* Health Assessment Section */}
          <HealthAssessmentSection 
            assessmentData={assessmentData}
            eligibilityData={eligibilityData}
          />
          
          {/* Detailed Assessment Section */}
          <DetailedAssessmentSection
            userName={userName}
            upcomingActions={upcomingActions}
          />
          
          {/* Intake Report Section */}
          <div className="mt-10 pt-8 border-t border-gray-200">
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
        </div>
      </main>
    </div>
  );
};

export default Index;
