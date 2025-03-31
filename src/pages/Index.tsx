
import React from 'react';
import { Activity, Heart, ClipboardList, Award, Moon, BatteryFull, Brain, Users, Calendar, CheckCircle2, Circle, ArrowUpRight, Trophy, BookOpen } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardWelcome } from '@/components/dashboard/DashboardWelcome';
import { CallElement } from '@/components/CallElement';
import { HealthPulse } from '@/components/dashboard/HealthPulse';
import { ProgressJournal } from '@/components/dashboard/ProgressJournal';
import { CarePlan } from '@/components/dashboard/CarePlan';
import { SuggestedPrograms } from '@/components/dashboard/SuggestedPrograms';
import { Milestones } from '@/components/dashboard/Milestones';
import { IntakeSummary } from '@/components/dashboard/IntakeSummary';

const Index = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  const userImage = "https://media.licdn.com/dms/image/v2/D4E03AQEF64y0nluvpw/profile-displayphoto-shrink_800_800/B4EZSgI1mgHcAc-/0/1737853459711?e=1747872000&v=beta&t=3713WkmjpsNYWB0H9Qxg7HrdB3RTyK5bZuLfj-EccRo";
  
  // Last check-in and status data
  const statusData = {
    lastCheckIn: "March 15, 2025",
    medicareStatus: "Enrolled",
    riskScore: "Medium",
    riskTrend: "Improving"
  };
  
  // Health pulse data for radar chart
  const healthPulseData = [
    { area: "Sleep", score: 65, improving: true },
    { area: "Mood", score: 58, improving: true },
    { area: "Energy", score: 52, improving: false },
    { area: "Stress", score: 43, improving: false },
    { area: "Nutrition", score: 60, improving: true },
    { area: "Social", score: 72, improving: true }
  ];
  
  // Progress journal entries
  const journalEntries = [
    { text: "Morning walks: 5 days (up from 2!)", status: "positive" },
    { text: "Water intake improved", status: "positive" },
    { text: "Reached out to a friend this week ☕", status: "positive" },
    { text: "Still feeling low after skipped meals", status: "neutral" },
    { text: "Sleep interrupted – let's revisit your routine", status: "negative" }
  ];
  
  // Care plan items
  const carePlanItems = [
    { title: "Sleep Routine", icon: <Moon className="w-5 h-5 text-indigo-500" />, status: "in-progress", description: "Consistent bedtime and morning routine" },
    { title: "Hydration Habit", icon: <BatteryFull className="w-5 h-5 text-blue-500" />, status: "started", description: "Drink water before each meal" },
    { title: "Stress Journal", icon: <Brain className="w-5 h-5 text-violet-500" />, status: "not-started", description: "Log stress triggers and responses" },
    { title: "Social Check-In", icon: <Users className="w-5 h-5 text-green-500" />, status: "complete", description: "Connect with a friend or family member" }
  ];
  
  // Program eligibility data
  const programsData = [
    { program: "Chronic Care Management (CCM)", match: "perfect", status: "enrolled", description: "Ongoing support for multiple chronic conditions" },
    { program: "Remote Patient Monitoring (RPM)", match: "perfect", status: "active", description: "Monitor your blood pressure regularly", action: "Monitor BP 🩺" },
    { program: "Behavioral Health Integration (BHI)", match: "possible", status: "eligible", description: "Support for mental health alongside physical health", action: "Learn More" },
    { program: "Principal Care Management (PCM)", match: "none", status: "ineligible", description: "Focused care for a single complex condition", action: "Explore Others" }
  ];
  
  // Milestone and achievement data
  const milestonesData = {
    weeklyPoints: 45,
    level: 2,
    levelName: "Consistent Mover",
    nextLevel: "Self-Care Champ",
    pointsToNextLevel: 15,
    achievements: [
      { title: "2 Weeks Consistent Sleep", unlocked: true, icon: <Moon className="w-4 h-4" /> },
      { title: "Hydration Hero", unlocked: false, progress: 60, icon: <BatteryFull className="w-4 h-4" /> },
      { title: "First Peer Group Chat Joined", unlocked: true, icon: <Users className="w-4 h-4" /> },
      { title: "Logged 3 AI Calls", unlocked: false, progress: 33, icon: <Activity className="w-4 h-4" /> }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        userName={userName} 
        userEmail={userEmail}
        userImage={userImage}
      />
      
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section with Status Info */}
          <div className="mb-6 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <DashboardWelcome 
              userName={userName} 
              lastCheckIn={statusData.lastCheckIn}
              medicareStatus={statusData.medicareStatus}
              riskScore={statusData.riskScore}
              riskTrend={statusData.riskTrend}
            />
            
            {/* Call to Action Element - Kept from original */}
            <div className="mt-4">
              <CallElement userName={userName} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Health Pulse Section */}
            <div className="lg:col-span-2">
              <HealthPulse data={healthPulseData} />
            </div>
            
            {/* Progress Journal Section */}
            <div>
              <ProgressJournal entries={journalEntries} />
            </div>
          </div>
          
          {/* Care Plan Section */}
          <div className="mb-6">
            <CarePlan items={carePlanItems} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Suggested Programs Section */}
            <SuggestedPrograms programs={programsData} />
            
            {/* Milestones & Gamification Section */}
            <Milestones data={milestonesData} />
          </div>
          
          {/* Collapsible Intake Summary */}
          <div className="mb-8">
            <IntakeSummary date="February 13, 2025" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
