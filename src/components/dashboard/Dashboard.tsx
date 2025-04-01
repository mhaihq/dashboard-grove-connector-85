
import React from 'react';
import { 
  userInfo, welcome, userBackground, overview, 
  healthIndicators, journalEntries, carePlanItems, 
  suggestedPrograms, medicarePrograms, milestones, functionalAreas,
  clinicalRecommendations
} from '@/data/index';
import { HealthPulseItem } from '@/types/dashboard';

// Import our components
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import HealthPulseSection from '@/components/dashboard/sections/HealthPulseSection';
import GoalsSection from '@/components/dashboard/sections/GoalsSection';
import RecommendationsSection from '@/components/dashboard/sections/RecommendationsSection';
import JourneySoFarSection from '@/components/dashboard/sections/JourneySoFarSection';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';

interface DashboardProps {
  onScheduleCall: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onScheduleCall }) => {
  // Format health assessment data for the pulse chart
  const healthAssessmentData: HealthPulseItem[] = functionalAreas.map(area => ({
    area: area.title,
    score: area.rating * 25,
    improving: area.key === 'sleep',
    priority: area.key === 'sleep' || area.key === 'stressManagement'
  }));

  // Calculate milestone achievement metrics
  const milestonesData = {
    weeklyPoints: journalEntries.reduce((sum, entry: any) => sum + (entry.points || 0), 0),
    level: 2,
    levelName: "Consistent Mover",
    nextLevel: "Level 3",
    pointsToNextLevel: 55,
    achievements: milestones.map(milestone => ({
      title: milestone.title,
      unlocked: milestone.completed,
      progress: milestone.completed ? 100 : (milestone.currentStreak / milestone.requiredStreak) * 100,
      icon: <Trophy className="w-5 h-5 text-gray-400" />
    }))
  };
  
  // Get relevant life events for context
  const notableLifeChanges = overview.find(section => 
    section.title === "Notable Life Changes"
  )?.items || [];
  
  // Calculate next scheduled check-in date
  const today = new Date();
  const nextWednesday = new Date(today);
  nextWednesday.setDate(today.getDate() + (3 - today.getDay() + 7) % 7);
  nextWednesday.setHours(17, 30, 0); // 5:30 PM
  const nextCheckInDate = nextWednesday.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
  
  // Get recent positive achievement for welcome banner
  const recentAchievement = journalEntries.find(entry => entry.status === 'positive')?.text || 'Making progress!';
  
  // Get streak data
  const streakBehavior = journalEntries.find(entry => (entry as any).streakCount > 2);
  const streak = {
    count: streakBehavior ? (streakBehavior as any).streakCount : 3,
    behavior: streakBehavior ? streakBehavior.relatedTo.replace('_', ' ') : 'morning walks'
  };
  
  return (
    <DashboardLayout>
      {/* Banner with quick summary */}
      <WelcomeBanner
        userName={userInfo.name.split(' ')[0]}
        recentAchievement="Your morning walks are making a difference!"
        priorityAction={{
          task: "Log your water intake",
          estimatedTime: "2 min"
        }}
        streak={streak}
        journeyProgress={35}
      />
      
      {/* A. Current Health Snapshot */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Health Snapshot</h2>
        <HealthPulseSection 
          data={healthAssessmentData}
          mostImproved="Sleep"
          focusArea="Hydration"
          positiveAreas={4}
          totalAreas={6}
        />
      </div>
      
      {/* B. Goals & Milestones */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Goals & Milestones</h2>
        <GoalsSection 
          carePlanItems={carePlanItems}
          nextCheckInDate={nextCheckInDate}
        />
      </div>
      
      {/* C. Recommendations (Systems) */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recommendations (Systems)</h2>
        <RecommendationsSection 
          recommendations={clinicalRecommendations}
          medicarePrograms={medicarePrograms}
          onScheduleCall={onScheduleCall}
        />
      </div>
      
      {/* D. Your Journey So Far */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Journey So Far</h2>
        <JourneySoFarSection 
          journalEntries={journalEntries}
          milestonesData={milestonesData}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
