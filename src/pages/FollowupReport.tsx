
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { JournalEntry } from '@/components/JournalEntry';
import MentalHealthSummary from '@/components/MentalHealthSummary';
import { Calendar, ShowerHead } from 'lucide-react';

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
      highlight: "Patient is beginning to recognize the connection between alcohol consumption, sleep quality, and next-day mood/energy."
    },
    {
      date: "2025-03-10",
      timestamp: "09:22:15",
      title: "Sleep Improvements",
      content: "The patient reported better sleep after implementing the suggested routine changes. They're now getting an average of 7 hours per night compared to 5 hours previously. Morning fatigue has decreased notably. The evening digital detox (no screens 1 hour before bed) has been particularly effective. Still experiencing occasional night waking but able to fall back asleep more easily.",
      highlight: "Sleep duration increased by approximately 2 hours per night with new bedtime routine. Patient reports feeling 'more rested than I have in months.'"
    },
    {
      date: "2025-03-05",
      timestamp: "16:42:11",
      title: "Social Engagement Progress",
      content: "Patient met with two friends for coffee this week, marking the first social outing in over a month. They described feeling anxious before the meeting but ultimately enjoyed the interaction and felt better afterward. This positive experience has encouraged planning for another small social gathering next week. Patient used breathing techniques discussed in coaching to manage pre-event anxiety.",
      highlight: "First social engagement in a month resulted in positive emotions despite initial anxiety. Patient shared: 'I actually felt like myself again for a little while.'"
    }
  ];

  // Progress summary for high-level overview
  const summaryItems = [
    {
      title: "Health Progress Summary",
      content: [
        "Mood shows consistent improvement over last 2 weeks",
        "Sleep quality significantly better with new evening routine",
        "Social engagement increasing with reduced anticipatory anxiety"
      ],
      type: "notable" as const
    },
    {
      title: "Positive Health Indicators",
      content: [
        "Experiencing genuine joy during social interactions",
        "Finding value in morning walks and stretching routine",
        "Expressing satisfaction with health coaching progress"
      ],
      type: "joy" as const
    },
    {
      title: "Health Focus Areas",
      content: [
        "Continue monitoring alcohol consumption patterns",
        "Develop additional strategies for financial stress management",
        "Further build daily structure to support mental wellbeing"
      ],
      type: "weighing" as const
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ShowerHead className="w-5 h-5 text-hana-green" />
              Health Coaching Follow-up Report
            </h1>
            
            {/* High-level health progress overview */}
            <MentalHealthSummary
              userName={userName}
              date="March 15, 2025"
              summaryItems={summaryItems}
            />
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-hana-green" />
                Health Journal Entries
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default FollowupReport;
