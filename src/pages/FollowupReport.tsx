
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { JournalEntry } from '@/components/JournalEntry';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const FollowupReport = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  
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
    },
    {
      date: "2025-03-10",
      timestamp: "09:23:45",
      title: "Sleep Disruption and Anxiety",
      content: "The user reported difficulties with sleep, waking up multiple times during the night. Anxiety levels have increased slightly, particularly around work deadlines. Some improvement in social interactions was noted.",
      highlight: "Connection between sleep disruption and increased workload noted."
    },
    {
      date: "2025-03-07",
      timestamp: "16:42:19",
      title: "Weekend Reflection and Progress",
      content: "The user had a positive weekend with family, reporting improved mood and energy levels. They practiced breathing exercises as recommended and found them helpful. Some lingering concerns about work-life balance were mentioned.",
      highlight: "Positive effects of family time and breathing techniques on overall well-being."
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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Health Journal</h1>
              <Button className="bg-hana-green hover:bg-hana-green/90 gap-2">
                <Plus className="h-4 w-4" />
                New Entry
              </Button>
            </div>
            
            <Card className="shadow-sm mb-6">
              <CardHeader>
                <CardTitle>Recent Journal Entries</CardTitle>
              </CardHeader>
              <CardContent>
                {journalEntries.map((entry, index) => (
                  <JournalEntry
                    key={index}
                    date={entry.date}
                    timestamp={entry.timestamp}
                    title={entry.title}
                    content={entry.content}
                    highlight={entry.highlight}
                    expanded={index === 0}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FollowupReport;
