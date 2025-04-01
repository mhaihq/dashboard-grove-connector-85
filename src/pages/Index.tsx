
import React from 'react';
import { Moon, BatteryFull, Brain, Heart, Users, Activity, UtensilsCrossed, Weight, Shield, Coffee } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardWelcome } from '@/components/dashboard/DashboardWelcome';
import { IntakeSummary } from '@/components/dashboard/IntakeSummary';
import { KeyHealthIndicators } from '@/components/dashboard/KeyHealthIndicators';
import { ProgressJournal } from '@/components/dashboard/ProgressJournal';
import { CarePlan } from '@/components/dashboard/CarePlan';
import { Milestones } from '@/components/dashboard/Milestones';
import { HealthPulse } from '@/components/dashboard/HealthPulse';
import { SuggestedPrograms, ProgramItem } from '@/components/dashboard/SuggestedPrograms';
import { ContextBanner } from '@/components/dashboard/ContextBanner';
import { ClinicalRecommendations } from '@/components/dashboard/ClinicalRecommendations';

// Types needed for components
interface HealthIndicator {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

interface CarePlanItem {
  title: string;
  icon: React.ReactNode;
  status: "not-started" | "started" | "in-progress" | "complete";
  description: string;
}

interface Milestone {
  title: string;
  description: string;
  completed: boolean;
  points: number;
}

interface HealthPulseItem {
  area: string;
  score: number;
  improving: boolean;
}

interface OverviewItem {
  title: string;
  items: string[];
}

const Index = () => {
  // User information from intake
  const userInfo = {
    name: "Matteo Smith",
    email: "matteo.smith@example.com",
    date: "January 29, 2025"
  };
  
  // Welcome message
  const welcome = {
    greeting: "Hi Matteo",
    message: "Thanks for our conversation. I've analyzed our discussion to provide you with meaningful insights about your wellbeing. Let me know if anything doesn't resonate so we can refine these observations together."
  };
  
  // Detailed user background from intake
  const userBackground = [
    "Family history of anxiety disorders on maternal side",
    "No significant physical health conditions",
    "Started experiencing sleep issues 6 months ago coinciding with work promotion",
    "Previous therapy experience 2 years ago for work-related stress",
    "Regular alcohol consumption started gradually over the past year",
    "Strong family support system with particularly close relationship with wife",
    "No history of substance abuse or major mental health conditions",
    "Recent lifestyle changes include increased work responsibilities and remote work transition"
  ];
  
  // Overview sections
  const overview: OverviewItem[] = [
    {
      title: "Notable Life Changes",
      items: [
        "Experiencing fluctuating moods with periods of intense focus",
        "Difficulty 'switching off' from work mode",
        "Changes in sleep patterns affecting daily routine"
      ]
    },
    {
      title: "What's Bringing Joy",
      items: [
        "Strong relationship with wife providing emotional support",
        "Available family support network",
        "Periods of high productivity and focus"
      ]
    },
    {
      title: "What's Weighing on You",
      items: [
        "Sleep disruption affecting daily energy",
        "Unexpected emotional reactions causing concern",
        "Daily alcohol use impacting overall wellbeing"
      ]
    },
    {
      title: "Goals and Desires",
      items: [
        "Improve sleep quality and routine",
        "Develop better emotional regulation strategies",
        "Reduce reliance on alcohol for relaxation"
      ]
    }
  ];
  
  // Health indicators data
  const healthIndicators: HealthIndicator[] = [
    {
      title: "Sleep Quality",
      value: "Poor",
      change: "worsening",
      icon: <Moon className="h-5 w-5 text-indigo-500" />
    },
    {
      title: "Stress Level",
      value: "High",
      change: "improving",
      icon: <Activity className="h-5 w-5 text-red-500" />
    },
    {
      title: "Energy",
      value: "Variable",
      change: "stabilizing",
      icon: <Brain className="h-5 w-5 text-amber-500" />
    },
    {
      title: "Medicare Status",
      value: "Enrolled",
      change: "stable",
      icon: <Shield className="h-5 w-5 text-hana-green" />
    }
  ];
  
  // Progress journal entries
  const journalEntries = [
    {
      text: "Morning walks: 5 days (up from 2!)",
      status: "positive" as const
    },
    {
      text: "Water intake improved",
      status: "positive" as const
    },
    {
      text: "Reached out to a friend this week ☕",
      status: "positive" as const
    },
    {
      text: "Still feeling low after skipped meals",
      status: "neutral" as const
    },
    {
      text: "Sleep interrupted – let's revisit your routine",
      status: "negative" as const
    }
  ];
  
  // Care plan items
  const carePlanItems: CarePlanItem[] = [
    {
      title: "Sleep Restoration Protocol",
      icon: <Moon className="w-5 h-5 text-indigo-500" />,
      status: "in-progress",
      description: "A structured approach to improve sleep quality and mental wind-down."
    },
    {
      title: "Stress Management Toolkit",
      icon: <Activity className="w-5 h-5 text-red-500" />,
      status: "started",
      description: "Alternative stress relief methods to replace alcohol use."
    },
    {
      title: "Emotional Regulation Framework",
      icon: <Heart className="w-5 h-5 text-pink-500" />,
      status: "not-started",
      description: "Structured approach to understanding and managing emotional responses."
    },
    {
      title: "Social Check-In",
      icon: <Users className="w-5 h-5 text-blue-500" />,
      status: "complete",
      description: "Regular connection with support system."
    }
  ];
  
  // Suggested programs with added relevantAreas
  const suggestedPrograms: ProgramItem[] = [
    {
      program: "Chronic Care Management (CCM)",
      match: "perfect",
      status: "Enrolled",
      description: "Ongoing support for chronic conditions",
      action: "Monitor BP 🩺",
      relevantAreas: ["Sleep", "Stress Management"]
    },
    {
      program: "Remote Patient Monitoring (RPM)",
      match: "perfect",
      status: "Available",
      description: "Track health metrics from home",
      action: "Enroll Now",
      relevantAreas: ["Sleep", "Energy Level"]
    },
    {
      program: "Behavioral Health Integration (BHI)",
      match: "possible",
      status: "Eligible",
      description: "Mental health support services",
      action: "Learn More",
      relevantAreas: ["Emotional Regulation"]
    },
    {
      program: "Principal Care Management (PCM)",
      match: "none",
      status: "Not Eligible",
      description: "Focused on single condition management"
    }
  ];
  
  // Recommendations from intake assessment
  const clinicalRecommendations = [
    {
      title: "Sleep Restoration Protocol",
      relatedAreas: ["Sleep", "Cognitive Function"],
      description: "A structured approach to improve sleep quality and mental wind-down.",
      priority: "high" as const,
      icon: "thermometer" as const,
      timeframe: "Start within 2 days",
      difficulty: "moderate" as const,
      steps: [
        "Set a firm 'work end' time at 8 PM to begin wind-down routine",
        "Practice 4-7-8 breathing: Inhale for 4 counts, hold for 7, exhale for 8. Repeat 5 times",
        "Create a sleep-friendly environment: dim lights, cool temperature, no screens",
        "Use white noise or nature sounds to mask racing thoughts"
      ],
      actionLabel: "Start Sleep Plan"
    },
    {
      title: "Stress Management Toolkit",
      relatedAreas: ["Stress Management", "Emotional Regulation"],
      description: "Alternative stress relief methods to replace alcohol use.",
      priority: "high" as const,
      icon: "brain" as const,
      timeframe: "Begin within 1 week",
      difficulty: "moderate" as const,
      steps: [
        "Replace evening alcohol with calming tea ritual",
        "Practice progressive muscle relaxation before bed",
        "Use 'stress journaling' to identify triggers",
        "Schedule daily 15-minute mindfulness breaks"
      ],
      actionLabel: "Explore Toolkit"
    },
    {
      title: "Emotional Regulation Framework",
      relatedAreas: ["Emotional Regulation", "Stress Management"],
      description: "Structured approach to understanding and managing emotional responses.",
      priority: "high" as const,
      icon: "heart" as const,
      timeframe: "Begin within 2 weeks",
      difficulty: "challenging" as const,
      steps: [
        "Use PLEASE skills: treat PhysicaL illness, balanced Eating, avoid mood-Altering substances, balanced Sleep, get Exercise",
        "Practice STOP technique: Stop, Take a step back, Observe, Proceed mindfully",
        "Implement daily mood tracking with trigger identification",
        "Schedule regular check-ins with support system"
      ],
      actionLabel: "Learn Framework"
    },
    {
      title: "Energy Management Strategy",
      relatedAreas: ["Energy Level", "Cognitive Function"],
      description: "Optimize energy levels throughout the day.",
      priority: "medium" as const,
      icon: "footprints" as const,
      timeframe: "Begin when ready",
      difficulty: "easy" as const,
      steps: [
        "Schedule work in 90-minute focused blocks with mandatory breaks",
        "Create a 'transition ritual' between work tasks",
        "Set up regular movement reminders",
        "Plan meals and snacks to maintain stable blood sugar"
      ],
      actionLabel: "Try Strategy"
    }
  ];
  
  // Milestones & gamification
  const milestones: Milestone[] = [
    {
      title: "2 Weeks Consistent Sleep",
      description: "Maintain your sleep schedule for 2 weeks straight",
      completed: false,
      points: 50
    },
    {
      title: "Hydration Hero",
      description: "Drink 8 glasses of water daily for a week",
      completed: true,
      points: 25
    },
    {
      title: "First Peer Group Chat",
      description: "Join your first group support session",
      completed: true,
      points: 30
    },
    {
      title: "Logged 3 AI Calls",
      description: "Complete 3 follow-up calls with your AI coach",
      completed: false,
      points: 45
    }
  ];

  // Functional areas from intake assessment
  const functionalAreas = [
    {
      title: "Sleep",
      key: "sleep",
      rating: 2,
      status: "Concerning",
      observations: [
        "Difficulty falling asleep due to racing thoughts",
        "Reports never feeling tired despite lack of rest",
        "Brain remains highly active at bedtime"
      ],
      evidence: "I just don't sleep... I feel that I'm never tired. I feel that my brain is always on."
    },
    {
      title: "Social Support",
      key: "socialSupport",
      rating: 4,
      status: "Positive",
      observations: [
        "Supportive relationship with wife",
        "Family readily available for assistance",
        "Open communication channels"
      ],
      evidence: "My wife understands what I'm going through, and my family is always there."
    },
    {
      title: "Energy Level",
      key: "energyLevel",
      rating: 3,
      status: "Mixed",
      observations: [
        "High energy during work hours",
        "Sudden energy crashes",
        "Difficulty maintaining consistent energy levels"
      ],
      evidence: "I can work intensely for hours, but then I crash completely."
    },
    {
      title: "Stress Management",
      key: "stressManagement",
      rating: 2,
      status: "Concerning",
      observations: [
        "Relying on alcohol for stress relief",
        "Limited healthy coping mechanisms",
        "Stress affecting sleep and mood"
      ],
      evidence: "I find myself drinking daily to wind down."
    },
    {
      title: "Cognitive Function",
      key: "cognitiveFunction",
      rating: 3,
      status: "Mixed",
      observations: [
        "Excellent focus during work",
        "Racing thoughts during downtime",
        "Challenges with mental relaxation"
      ],
      evidence: "I can focus intensely at work, but can't quiet my mind afterward."
    },
    {
      title: "Emotional Regulation",
      key: "emotionalRegulation",
      rating: 2,
      status: "Concerning",
      observations: [
        "Unexplained anger episodes",
        "Frequent nervousness",
        "Difficulty managing emotional responses"
      ],
      evidence: "I feel nervous a lot of the time, and then... Kind of angry... That's with no reason."
    }
  ];
  
  // Health assessment data for radar chart
  const healthAssessmentData: HealthPulseItem[] = functionalAreas.map(area => ({
    area: area.title,
    score: area.rating * 25, // Convert 1-4 rating to percentage
    improving: area.key === 'sleep' // Just for example - sleep is improving
  }));
  
  // Milestones data
  const milestonesData = {
    weeklyPoints: 45,
    level: 2,
    levelName: "Consistent Mover",
    nextLevel: "Level 3",
    pointsToNextLevel: 55,
    achievements: milestones.map(milestone => ({
      title: milestone.title,
      unlocked: milestone.completed,
      progress: milestone.completed ? 100 : 50,
      icon: <Users className="w-5 h-5 text-gray-400" />
    }))
  };
  
  // Get notable life changes from overview
  const notableLifeChanges = overview.find(section => 
    section.title === "Notable Life Changes"
  )?.items || [];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        userName={userInfo.name}
        userEmail={userInfo.email}
      />
      
      <main className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Welcome & Current Status */}
        <div className="mb-8">
          <DashboardWelcome 
            userName={userInfo.name.split(' ')[0]}
            lastCheckIn="March 15, 2025"
            medicareStatus="Enrolled"
            riskScore="Medium"
            riskTrend="Improving"
          />
          <div className="mt-4">
            <a 
              href="/schedule-followup" 
              className="inline-flex items-center text-hana-green hover:text-green-700 font-medium"
            >
              ✨ Want to check in today? Book your next AI call here.
            </a>
          </div>
        </div>

        {/* Notable Life Changes from Intake - Context Banner */}
        <div className="mb-8">
          <ContextBanner
            title="Ongoing Context From Your Intake"
            items={notableLifeChanges}
            date={userInfo.date}
            variant="primary"
          />
        </div>
        
        {/* Key Health Indicators */}
        <div className="mb-8">
          <KeyHealthIndicators healthIndicators={healthIndicators} />
        </div>
        
        {/* Health Pulse (Snapshot Panel) */}
        <div className="mb-8">
          <HealthPulse 
            data={healthAssessmentData}
            mostImproved="Sleep"
            focusArea="Hydration"
            positiveAreas={4}
            totalAreas={6}
          />
        </div>
        
        {/* Clinical Recommendations Section */}
        <div className="mb-8">
          <ClinicalRecommendations recommendations={clinicalRecommendations} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Progress Journal */}
          <div className="lg:col-span-1">
            <ProgressJournal entries={journalEntries} />
          </div>
          
          {/* Your Care Plan (Mini Cards) */}
          <div className="lg:col-span-2">
            <CarePlan items={carePlanItems} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Suggested Programs */}
          <div>
            <SuggestedPrograms 
              programs={suggestedPrograms} 
              title="Medicare Programs"
              description="Based on your intake assessment and Medicare eligibility"
            />
          </div>
          
          {/* Milestones & Gamification */}
          <div>
            <Milestones data={milestonesData} />
          </div>
        </div>
        
        {/* Intake Summary (Collapsible) */}
        <div className="mb-8">
          <IntakeSummary 
            date="February 13, 2025"
            welcomeMessage={welcome.message}
            background={userBackground}
            goals={overview.find(item => item.title === "Goals and Desires")?.items || []}
            overviewSections={overview}
            concerns={[
              `Sleep disruption (rating: ${functionalAreas.find(area => area.key === 'sleep')?.rating}/5)`,
              `Stress management (rating: ${functionalAreas.find(area => area.key === 'stressManagement')?.rating}/5)`,
              `Emotional regulation (rating: ${functionalAreas.find(area => area.key === 'emotionalRegulation')?.rating}/5)`
            ]}
            detailedAssessment={{
              sleep: {
                observations: functionalAreas.find(area => area.key === 'sleep')?.observations || [],
                quote: functionalAreas.find(area => area.key === 'sleep')?.evidence || ""
              },
              emotionalRegulation: {
                observations: functionalAreas.find(area => area.key === 'emotionalRegulation')?.observations || [],
                quote: functionalAreas.find(area => area.key === 'emotionalRegulation')?.evidence || ""
              }
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
