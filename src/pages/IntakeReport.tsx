
import React from 'react';
import { Moon, BatteryFull, Brain, Heart, Users, Activity, UtensilsCrossed, Weight, Shield, Coffee, Clipboard } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { MentalHealthSummary } from '@/components/MentalHealthSummary';
import { HealthMetrics } from '@/components/HealthMetrics';
import { ProgressSection } from '@/components/ProgressSection';

const IntakeReport = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  
  // Health summary data
  const summaryItems = [
    {
      title: "Health History",
      content: [
        "Hypertension diagnosed in 2019, currently managed with medication",
        "Family history of heart disease (father)",
        "No major surgeries or hospitalizations",
        "Occasional lower back pain, not formally diagnosed"
      ],
      type: 'notable' as const
    },
    {
      title: "Current Wellness Practices",
      content: [
        "Supportive relationship with spouse provides emotional stability",
        "Uses breathing techniques during stressful moments",
        "Enjoys weight training when consistent with routine",
        "Values outdoor activities but doesn't prioritize them currently"
      ],
      type: 'joy' as const
    },
    {
      title: "Self-Identified Challenges",
      content: [
        "Periodic low mood, especially in mornings",
        "Decreased social engagement in past 3 months",
        "Inconsistent sleep routine affecting energy levels",
        "Work-related stress impacting overall well-being",
        "Medication adherence varies with stress levels"
      ],
      type: 'weighing' as const
    }
  ];
  
  // Health metrics data
  const metrics = [
    {
      title: "Sleep Quality",
      status: "concerning" as const,
      icon: <Moon className="w-5 h-5 text-indigo-500" />,
      description: "Irregular sleep patterns with difficulty falling asleep and frequent night waking. Average 5-6 hours per night with inconsistent bedtime routine."
    },
    {
      title: "Social Support",
      status: "mixed" as const,
      icon: <Users className="w-5 h-5 text-blue-500" />,
      description: "Strong support from spouse but limited social connections outside the home. Has withdrawn from some friendships and social activities in recent months."
    },
    {
      title: "Energy Level",
      status: "mixed" as const,
      icon: <BatteryFull className="w-5 h-5 text-amber-500" />,
      description: "Energy fluctuates throughout the day with notable afternoon fatigue. Morning energy is better but declines significantly after lunch."
    },
    {
      title: "Stress Management",
      status: "mixed" as const,
      icon: <Activity className="w-5 h-5 text-red-500" />,
      description: "Has some effective coping mechanisms like breathing exercises but struggles during high-stress periods. Business fluctuations are a primary stressor."
    },
    {
      title: "Cognitive Function",
      status: "positive" as const,
      icon: <Brain className="w-5 h-5 text-green-500" />,
      description: "Strong problem-solving abilities and mental clarity. No reported issues with memory or concentration despite sleep challenges."
    },
    {
      title: "Emotional Regulation",
      status: "concerning" as const,
      icon: <Heart className="w-5 h-5 text-pink-500" />,
      description: "Experiences mood fluctuations with periods of feeling down. Has difficulty managing emotions during stressful periods. Would benefit from emotional regulation strategies."
    },
    {
      title: "Nutrition Habits",
      status: "mixed" as const,
      icon: <UtensilsCrossed className="w-5 h-5 text-orange-500" />,
      description: "Skips breakfast frequently. Lunch and dinner are moderate in quality with room for improvement in vegetable intake and portion control."
    },
    {
      title: "Physical Activity",
      status: "mixed" as const,
      icon: <Weight className="w-5 h-5 text-blue-600" />,
      description: "Inconsistent exercise pattern with 2-3 workouts per week. Shows good engagement when exercising but struggles with consistency."
    },
    {
      title: "Hydration",
      status: "concerning" as const,
      icon: <Coffee className="w-5 h-5 text-brown-500" />,
      description: "Consumes primarily coffee throughout the morning with limited water intake. Estimated daily water consumption below recommended levels."
    }
  ];
  
  // Initial recommendations
  const recommendations = [
    {
      title: "Establish a Consistent Sleep Routine",
      description: "Regularize your sleeping pattern to help stabilize energy and mood fluctuations.",
      steps: [
        "Set a consistent bedtime and wake-up time 7 days a week",
        "Create a relaxing pre-sleep routine, avoiding screens an hour before bedtime",
        "Keep bedroom cool, dark and quiet; consider blackout curtains",
        "Track sleep hours and quality in the provided sleep journal"
      ],
      priority: "high" as const,
      relatedAreas: ["Sleep", "Energy Level", "Mood"],
      timeframe: "Start within 2 days",
      difficulty: "moderate" as const
    },
    {
      title: "Build Daily Hydration Habits",
      description: "Increase water intake throughout the day to improve energy and cognitive function.",
      steps: [
        "Start each morning with a full glass of water before coffee",
        "Keep a water bottle visible at your desk or workspace",
        "Set hydration reminders on your phone every 2 hours",
        "Gradually reduce caffeine intake, especially after 2pm"
      ],
      priority: "medium" as const,
      relatedAreas: ["Energy", "Physical Wellness"],
      timeframe: "Begin immediately",
      difficulty: "easy" as const
    },
    {
      title: "Reconnect with Social Support Network",
      description: "Gradually rebuild social connections to enhance emotional well-being and support systems.",
      steps: [
        "Schedule one brief social interaction each week (call, coffee, walk)",
        "Join the online support group discussed in our session",
        "Practice the communication techniques we reviewed when feeling overwhelmed",
        "Share your health goals with at least one trusted friend"
      ],
      priority: "medium" as const,
      relatedAreas: ["Social Support", "Emotional Regulation"],
      timeframe: "Begin within 1 week",
      difficulty: "challenging" as const
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
            <div className="flex items-center gap-2 mb-6">
              <Clipboard className="h-5 w-5 text-hana-green" />
              <h1 className="text-2xl font-bold text-gray-900">Initial Health Coaching Assessment</h1>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg mb-8">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-800">Comprehensive Wellness Profile</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    This assessment was completed on February 13, 2025 and establishes your baseline health metrics. 
                    Your personalized coaching plan is based on this information and will be updated as you progress.
                  </p>
                </div>
              </div>
            </div>
            
            <MentalHealthSummary
              userName={userName}
              userEmail={userEmail}
              date="February 13, 2025"
              summaryItems={summaryItems}
            />
            
            <HealthMetrics metrics={metrics} />
            
            <ProgressSection recommendations={recommendations} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default IntakeReport;
