
import React, { useState } from 'react';
import { Moon, BatteryFull, Brain, Heart, Users, Activity, PhoneCall, Search, ArrowRight, MessageCircle } from 'lucide-react';
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
  
  // Journal entries
  const journalEntries = [
    {
      date: "2025-03-15",
      timestamp: "14:07:23",
      title: "Feeling Better Overall",
      content: "The user noted they are feeling better than before, with a definite improvement in mood and slightly better energy. Stress levels remain stable with no major changes mentioned.",
      highlight: "The user recognized their mood is definitely improving.",
      expanded: true
    },
    {
      date: "2025-03-13",
      timestamp: "18:11:23",
      title: "Reflections on Depression and Alcohol Usage",
      content: "The user shares experiences of ongoing depression and difficulty reducing alcohol intake. They've also expressed concern over job searching and financial stress, feeling generally tired, and seeking suggestions.",
      highlight: "Recognizing the link between depression and alcohol consumption, along with financial and job-search stress."
    }
  ];
  
  // Recommendations
  const recommendations = [
    {
      title: "Establish a Consistent Sleep Routine",
      description: "Regularize your sleeping pattern to help stabilize energy and mood fluctuations.",
      steps: [
        "Try setting a consistent bedtime and wake-up time",
        "Create a relaxing pre-sleep routine, avoiding screens an hour before bedtime",
        "Consider tracking sleep hours and quality to identify patterns"
      ],
      priority: "high" as const,
      relatedAreas: ["Sleep", "Energy Level"]
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
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Journal Entries</h2>
              
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
              appointmentTitle="Hana callback"
              duration="15 min"
              features={[
                "Voice-activated interaction",
                "Personalized assessment",
                "Confidential and secure"
              ]}
              message="Chat with Hana callback, your AI companion for mental health."
              callToAction="Select a time to speak with Hana callback and take a step towards better mental health."
            />
            
            <ProgressSection recommendations={recommendations} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
