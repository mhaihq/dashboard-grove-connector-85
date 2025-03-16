
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { JournalEntry } from '@/components/JournalEntry';
import { BookOpen, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FollowupReport = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  
  // Health journal entries
  const journalEntries = [
    {
      date: "2025-03-15",
      timestamp: "14:07:23",
      title: "Feeling Better Overall",
      content: "The patient is showing improvement in multiple areas of health. Mood has noticeably improved, and energy levels are slightly better than baseline. Sleep quality remains an area for continued work, but the implementation of a consistent bedtime on weekdays (5/7 days) is a positive step. Patient reports finding the morning stretching exercises helpful.",
      highlight: "Mood improvement correlates with days of higher physical activity and better sleep quality.",
      expanded: true
    },
    {
      date: "2025-03-13",
      timestamp: "18:11:23",
      title: "Reflections on Depression and Alcohol Usage",
      content: "Patient continues to work on reducing alcohol intake with modest success (2 alcohol-free days this week vs 0 last week). Depression symptoms are still present but less intense than during initial assessment. Financial stressors remain significant with ongoing job search. Fatigue levels fluctuate but show slight improvement on days following adequate sleep.",
      highlight: "Patient is beginning to recognize the connection between alcohol consumption, sleep quality, and next-day mood/energy.",
      expanded: true
    },
    {
      date: "2025-03-10",
      timestamp: "09:22:15",
      title: "Sleep Improvements",
      content: "The patient reported better sleep after implementing the suggested routine changes. They're now getting an average of 7 hours per night compared to 5 hours previously. Morning fatigue has decreased notably. The evening digital detox (no screens 1 hour before bed) has been particularly effective. Still experiencing occasional night waking but able to fall back asleep more easily.",
      highlight: "Sleep duration increased by approximately 2 hours per night with new bedtime routine. Patient reports feeling 'more rested than I have in months.'",
      expanded: true
    },
    {
      date: "2025-03-05",
      timestamp: "16:42:11",
      title: "Social Engagement Progress",
      content: "Patient met with two friends for coffee this week, marking the first social outing in over a month. They described feeling anxious before the meeting but ultimately enjoyed the interaction and felt better afterward. This positive experience has encouraged planning for another small social gathering next week. Patient used breathing techniques discussed in coaching to manage pre-event anxiety.",
      highlight: "First social engagement in a month resulted in positive emotions despite initial anxiety. Patient shared: 'I actually felt like myself again for a little while.'",
      expanded: true
    },
    {
      date: "2025-02-28",
      timestamp: "11:30:45",
      title: "Nutrition and Meal Planning",
      content: "We discussed strategies for improving nutrition despite financial constraints. Patient has started preparing simple batch meals on weekends to avoid skipping meals during low-energy days. Incorporated more affordable protein sources (eggs, beans, canned tuna) into weekly shopping. Patient reports feeling more stable energy levels on days when eating 3 regular meals.",
      highlight: "Meal consistency appears to correlate with improved mood stability and reduced anxiety episodes."
    },
    {
      date: "2025-02-20",
      timestamp: "15:22:10",
      title: "Physical Activity Assessment",
      content: "Patient has been more consistent with daily walks (average 20 minutes) and reports improved mood afterward. Still struggling with motivation for more structured exercise. We discussed simple body-weight exercises that can be done at home with minimal equipment. Most successful when done immediately after morning walk before work demands begin.",
      highlight: "Morning activity appears to have positive cascading effect on other health behaviors throughout the day."
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-hana-green" />
              Health Journal Entries
            </h1>
            
            <Alert className="mb-6 border-hana-green/20 bg-hana-green/10">
              <Info className="h-4 w-4 text-hana-green" />
              <AlertDescription>
                These journal entries automatically update your dashboard summary, helping us track your progress and provide better support.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-5">
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default FollowupReport;
