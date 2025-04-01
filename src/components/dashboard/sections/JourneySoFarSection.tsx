
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Milestone, CheckCircle2, Brain, FileSparkles, Sparkles, Stars, ArrowRight } from 'lucide-react';
import { JournalEntry } from '@/types/dashboard';

interface JourneySoFarSectionProps {
  journalEntries: any[]; 
  milestonesData: {
    weeklyPoints: number;
    level: number;
    levelName: string;
    nextLevel: string;
    pointsToNextLevel: number;
    achievements: {
      title: string;
      unlocked: boolean;
      progress: number;
      icon: React.ReactNode;
    }[];
  };
}

export const JourneySoFarSection: React.FC<JourneySoFarSectionProps> = ({
  journalEntries,
  milestonesData
}) => {
  // Define the milestone stages for the health journey roadmap
  const journeyMilestones = [
    {
      stage: 1,
      label: "Intake Complete",
      description: "Initial assessment done. We know your baseline.",
      date: "February 13, 2025",
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      completed: true
    },
    {
      stage: 2,
      label: "AI Follow-Ups Started",
      description: "You're now receiving weekly check-ins.",
      date: "February 20, 2025",
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      completed: true
    },
    {
      stage: 3,
      label: "First Habit Momentum",
      description: "You're showing consistency with morning walks (5-day streak).",
      date: "March 5, 2025",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      completed: true
    },
    {
      stage: 4,
      label: "First Insight Unlocked",
      description: "System detected: your sleep is better when you avoid screens at night.",
      date: "March 10, 2025",
      icon: <Brain className="w-5 h-5 text-purple-500" />,
      completed: true
    },
    {
      stage: 5,
      label: "Care Plan Adapted",
      description: "Goals personalized based on your check-ins and progress.",
      date: "March 15, 2025",
      icon: <FileSparkles className="w-5 h-5 text-green-500" />,
      completed: true
    },
    {
      stage: 6,
      label: "Sustained Progress",
      description: "Over 4 weeks of engagement with notable wins.",
      date: "Expected: April 5, 2025",
      icon: <Stars className="w-5 h-5 text-amber-500" />,
      completed: false
    },
    {
      stage: 7,
      label: "Next Step",
      description: "Specialist review of your progress and adjustments to your care path.",
      date: "Expected: April 20, 2025",
      icon: <Milestone className="w-5 h-5 text-blue-500" />,
      completed: false
    }
  ];

  // Calculate the user's current position in the journey (where they are now)
  const currentStage = 5; // They've completed 5 stages based on the data
  const progressPercentage = (currentStage / journeyMilestones.length) * 100;
  
  return (
    <div>
      <Card className="shadow-sm hover:shadow-md transition-shadow mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <Milestone className="w-5 h-5 mr-2 text-blue-500" />
            <span className="text-gray-700">Health Journey Roadmap</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Progress indicator */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Your Journey Progress</span>
              <span className="text-sm text-gray-500">{currentStage} of {journeyMilestones.length} milestones</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          {/* Timeline display */}
          <div className="relative py-4">
            {/* Vertical timeline line */}
            <div className="absolute top-0 bottom-0 left-[22px] w-1 bg-gray-200"></div>
            
            {/* Milestone points */}
            {journeyMilestones.map((milestone, index) => (
              <div key={index} className={`flex mb-8 relative z-10 ${index === currentStage - 1 ? "animate-pulse" : ""}`}>
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  milestone.completed 
                    ? "bg-green-100 border-4 border-white text-green-500" 
                    : "bg-gray-200 border-4 border-white text-gray-500"
                } mr-4`}>
                  <span className="text-lg font-bold">{milestone.stage}</span>
                </div>
                <div className={milestone.completed ? "" : "opacity-60"}>
                  <h3 className="text-md font-medium text-gray-900 flex items-center">
                    {milestone.label}
                    {index === currentStage - 1 && 
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                        You are here
                      </span>
                    }
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500 mr-2">{milestone.date}</span>
                    {milestone.icon}
                  </div>
                  
                  {/* Special highlights for completed milestones */}
                  {milestone.completed && milestone.stage === 3 && (
                    <div className="mt-2 bg-amber-50 rounded-md p-2">
                      <p className="text-xs text-amber-700">
                        <span className="font-medium">Environmental Win:</span> Moving your phone charger away from your bed helped establish this habit.
                      </p>
                    </div>
                  )}
                  
                  {milestone.completed && milestone.stage === 4 && (
                    <div className="mt-2 bg-purple-50 rounded-md p-2">
                      <p className="text-xs text-purple-700">
                        <span className="font-medium">AI Pattern Discovery:</span> "We noticed your sleep quality improves by 30% when you avoid screens 1 hour before bed."
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Quote at the bottom */}
          <div className="mt-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-sm text-gray-700 italic">
              "Small changes consistently applied create remarkable results over time."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JourneySoFarSection;
