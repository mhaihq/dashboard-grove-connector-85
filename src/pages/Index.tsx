
import React, { useState } from 'react';
import { Moon, BatteryFull, Brain, Heart, Users, Activity, PhoneCall, Search, ArrowRight, MessageCircle, Coffee, UtensilsCrossed, Weight, ShowerHead } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { MentalHealthSummary } from '@/components/MentalHealthSummary';
import { HealthMetrics } from '@/components/HealthMetrics';
import { JournalEntry } from '@/components/JournalEntry';
import { AppointmentScheduler } from '@/components/AppointmentScheduler';
import { ProgressSection } from '@/components/ProgressSection';
import { CallbackPlanner } from '@/components/CallbackPlanner';
import { CallTypeSelector } from '@/components/CallTypeSelector';

const Index = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  
  // Call type state
  const [selectedCallType, setSelectedCallType] = useState<string | null>(null);
  
  // Mental health summary data
  const summaryItems = [
    {
      title: "Health History",
      content: [
        "Hypertension diagnosed in 2019",
        "Family history of heart disease",
        "No major surgeries",
        "Occasional lower back pain"
      ],
      type: 'notable' as const
    },
    {
      title: "Wellness Strengths",
      content: [
        "Supportive relationship with wife",
        "Breathing techniques and working out provide relief",
        "Motivated to improve health",
        "Good cognitive function"
      ],
      type: 'joy' as const
    },
    {
      title: "Areas for Improvement",
      content: [
        "Feeling down and not wanting to get out of bed at times",
        "Avoiding seeing friends and feeling tired most of the time",
        "Irregular sleep schedule",
        "Inconsistent medication adherence"
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
  
  // Journal entries
  const journalEntries = [
    {
      date: "2025-03-15",
      timestamp: "14:07:23",
      title: "Weekly Health Coaching Check-in",
      content: "Patient reported feeling better than previous week, with a definite improvement in mood and slightly better energy. Made progress on morning routine with 3/7 days including stretching exercises. Sleep quality still a challenge but implementing earlier bedtime on weekdays.",
      highlight: "Patient recognized mood improvement correlates with days of higher physical activity.",
      expanded: true
    },
    {
      date: "2025-03-13",
      timestamp: "18:11:23",
      title: "Initial Health Coaching Assessment",
      content: "Completed comprehensive health assessment. Patient shares experiences of ongoing low mood and difficulty reducing alcohol intake. Expressed concern over job searching and financial stress, feeling generally tired. Baseline metrics established for all key health areas.",
      highlight: "Identified key focus areas: sleep quality improvement, stress management techniques, and building social connections."
    }
  ];
  
  // Recommendations
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
            <CallTypeSelector onSelect={setSelectedCallType} selectedType={selectedCallType} />
            
            <MentalHealthSummary
              userName={userName}
              userEmail={userEmail}
              date="February 13, 2025"
              summaryItems={summaryItems}
            />
            
            <HealthMetrics metrics={metrics} />
            
            <CallbackPlanner userName={userName} />
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ShowerHead className="w-5 h-5 text-hana-green" />
                Health Coaching Journal
              </h2>
              
              {journalEntries.map((entry, index) => (
                <JournalEntry
                  key={index}
                  date={entry.date}
                  timestamp={entry.timestamp}
                  title={entry.title}
                  content={entry.content}
                  highlight={entry.highlight}
                  expanded={entry.expanded}
                />
              ))}
            </div>
            
            <AppointmentScheduler
              name={userName}
              appointmentTitle="Health Coaching Follow-up"
              duration="30 min"
              features={[
                "Review progress on health plan",
                "Address challenges and barriers",
                "Adjust recommendations as needed",
                "Celebrate milestones and wins"
              ]}
              message="Schedule your next health coaching session with Hana to continue your wellness journey."
              callToAction="Select a time for your follow-up and take the next step in your personalized health plan."
            />
            
            <ProgressSection recommendations={recommendations} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
