
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { HealthJournalTable } from '@/components/HealthJournalTable';
import { JournalEntryModal } from '@/components/JournalEntryModal';
import { BookOpen, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export interface JournalEntryType {
  id: string;
  date: string;
  timestamp: string;
  title: string;
  content: string;
  highlight?: string;
  category: 'daily' | 'mood' | 'sleep' | 'achievement' | 'goals';
  mood?: {
    score: string;
    weekend: string;
    weekday: string;
    notes: string;
  };
  energy?: {
    level: string;
    notes: string;
  };
  stress?: {
    level: string;
    notes: string;
  };
  sleep?: {
    duration: string;
    quality: string;
    notes?: string;
  };
  achievements?: Array<{
    title: string;
    description: string;
    date?: string;
  }>;
  goals?: Array<{
    title: string;
    description: string;
    completed: boolean;
    dueDate?: string;
  }>;
}

const FollowupReport = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  
  const [selectedEntry, setSelectedEntry] = useState<JournalEntryType | null>(null);
  
  // Health journal entries
  const journalEntries: JournalEntryType[] = [
    {
      id: "1",
      date: "2025-03-15",
      timestamp: "14:07:23",
      title: "Feeling Better Overall",
      content: "The patient is showing improvement in multiple areas of health. Mood has noticeably improved, and energy levels are slightly better than baseline. Sleep quality remains an area for continued work, but the implementation of a consistent bedtime on weekdays (5/7 days) is a positive step. Patient reports finding the morning stretching exercises helpful.",
      highlight: "Mood improvement correlates with days of higher physical activity and better sleep quality.",
      category: 'mood',
      mood: {
        score: "6/10",
        weekend: "7/10",
        weekday: "5/10",
        notes: "Patient reports improved mood compared to previous weeks, especially on days with morning exercise."
      },
      energy: {
        level: "Medium",
        notes: "Energy levels have improved slightly, especially in the mornings after good sleep."
      },
      stress: {
        level: "Medium",
        notes: "Stress levels remain significant but managed better with new coping strategies."
      }
    },
    {
      id: "2",
      date: "2025-03-13",
      timestamp: "18:11:23",
      title: "Reflections on Depression and Alcohol Usage",
      content: "Patient continues to work on reducing alcohol intake with modest success (2 alcohol-free days this week vs 0 last week). Depression symptoms are still present but less intense than during initial assessment. Financial stressors remain significant with ongoing job search. Fatigue levels fluctuate but show slight improvement on days following adequate sleep.",
      highlight: "Patient is beginning to recognize the connection between alcohol consumption, sleep quality, and next-day mood/energy.",
      category: 'mood',
      mood: {
        score: "4/10",
        weekend: "4/10",
        weekday: "4/10",
        notes: "User reports feeling depressed and stressed. Overall mood is low to moderate."
      },
      energy: {
        level: "Low",
        notes: "The user feels tired, possibly due to diet or the emotional toll of depression."
      },
      stress: {
        level: "High",
        notes: "Financial and job-search concerns contribute to elevated stress levels."
      }
    },
    {
      id: "3",
      date: "2025-03-10",
      timestamp: "09:22:15",
      title: "Sleep Improvements",
      content: "The patient reported better sleep after implementing the suggested routine changes. They're now getting an average of 7 hours per night compared to 5 hours previously. Morning fatigue has decreased notably. The evening digital detox (no screens 1 hour before bed) has been particularly effective. Still experiencing occasional night waking but able to fall back asleep more easily.",
      highlight: "Sleep duration increased by approximately 2 hours per night with new bedtime routine. Patient reports feeling 'more rested than I have in months.'",
      category: 'sleep',
      sleep: {
        duration: "7 hours",
        quality: "Improved",
        notes: "Digital detox one hour before bed has been effective"
      }
    },
    {
      id: "4",
      date: "2025-03-05",
      timestamp: "16:42:11",
      title: "Social Engagement Progress",
      content: "Patient met with two friends for coffee this week, marking the first social outing in over a month. They described feeling anxious before the meeting but ultimately enjoyed the interaction and felt better afterward. This positive experience has encouraged planning for another small social gathering next week. Patient used breathing techniques discussed in coaching to manage pre-event anxiety.",
      highlight: "First social engagement in a month resulted in positive emotions despite initial anxiety. Patient shared: 'I actually felt like myself again for a little while.'",
      category: 'daily'
    },
    {
      id: "5",
      date: "2025-02-28",
      timestamp: "11:30:45",
      title: "Nutrition and Meal Planning",
      content: "We discussed strategies for improving nutrition despite financial constraints. Patient has started preparing simple batch meals on weekends to avoid skipping meals during low-energy days. Incorporated more affordable protein sources (eggs, beans, canned tuna) into weekly shopping. Patient reports feeling more stable energy levels on days when eating 3 regular meals.",
      highlight: "Meal consistency appears to correlate with improved mood stability and reduced anxiety episodes.",
      category: 'daily'
    },
    {
      id: "6",
      date: "2025-02-20",
      timestamp: "15:22:10",
      title: "Physical Activity Assessment",
      content: "Patient has been more consistent with daily walks (average 20 minutes) and reports improved mood afterward. Still struggling with motivation for more structured exercise. We discussed simple body-weight exercises that can be done at home with minimal equipment. Most successful when done immediately after morning walk before work demands begin.",
      highlight: "Morning activity appears to have positive cascading effect on other health behaviors throughout the day.",
      category: 'achievement',
      achievements: [
        {
          title: "Consistent Daily Walks",
          description: "20 minutes average daily"
        },
        {
          title: "Morning Routine",
          description: "Successfully integrated stretching exercises"
        }
      ]
    },
    {
      id: "7",
      date: "2025-02-15",
      timestamp: "10:15:30",
      title: "Health Goals Planning",
      content: "Set realistic health improvement goals with the patient for the next month. Focus on gradual, sustainable changes rather than dramatic shifts. Created a prioritized list of behaviors to target, starting with sleep hygiene and daily movement. Patient expressed genuine interest in building an evening relaxation ritual to address persistent sleep difficulties.",
      highlight: "Patient shows increased readiness for change compared to initial assessment. Motivational factors appear primarily health-driven rather than appearance-driven.",
      category: 'goals',
      goals: [
        {
          title: "Improve Sleep Hygiene",
          description: "Consistent bedtime routine and digital detox",
          completed: true
        },
        {
          title: "Increase Physical Activity",
          description: "Daily 20-minute walks and basic strength exercises",
          completed: true 
        },
        {
          title: "Reduce Alcohol Consumption",
          description: "At least 3 alcohol-free days per week",
          completed: false
        }
      ]
    }
  ];

  const handleOpenEntry = (entry: JournalEntryType) => {
    setSelectedEntry(entry);
  };

  const handleCloseModal = () => {
    setSelectedEntry(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px]">
        <DashboardHeader 
          userName={userName} 
          userEmail={userEmail}
        />
        
        <main className="p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2 text-left">
              <BookOpen className="w-5 h-5 text-hana-green" />
              Health Journal Entries
            </h1>
            
            <Alert className="mb-6 border-hana-green/20 bg-hana-green/10">
              <Info className="h-4 w-4 text-hana-green" />
              <AlertDescription className="text-left">
                These journal entries automatically update your dashboard summary, helping us track your progress and provide better support.
              </AlertDescription>
            </Alert>
            
            <HealthJournalTable journalEntries={journalEntries} onViewEntry={handleOpenEntry} />
            
            <JournalEntryModal 
              entry={selectedEntry} 
              isOpen={!!selectedEntry} 
              onClose={handleCloseModal} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FollowupReport;
