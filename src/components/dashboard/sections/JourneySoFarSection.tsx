
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, Trophy, Clock } from 'lucide-react';
import { ProgressJournal } from '@/components/dashboard/ProgressJournal';
import { Milestones } from '@/components/dashboard/Milestones';
import { JournalEntry } from '@/types/dashboard';

interface JourneySoFarSectionProps {
  journalEntries: JournalEntry[];
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
  // Calculate total journal points for summary
  const totalJournalPoints = journalEntries.reduce((sum, entry) => sum + (entry.points || 0), 0);
  
  return (
    <div className="mb-16">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">
            📘 Your Journey So Far
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Progress Journal Section */}
            <div>
              <div className="flex items-center mb-3">
                <ScrollText className="w-5 h-5 text-hana-green mr-2" />
                <h3 className="font-medium">Weekly Journal</h3>
                <div className="ml-auto text-sm font-medium text-hana-green">{totalJournalPoints} points earned</div>
              </div>
              <ProgressJournal entries={journalEntries} />
              
              <div className="mt-4 text-sm text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Last updated: March 15, 2025</span>
              </div>
            </div>
            
            {/* Milestones Section */}
            <div>
              <div className="flex items-center mb-3">
                <Trophy className="w-5 h-5 text-hana-green mr-2" />
                <h3 className="font-medium">Achievements & Progress</h3>
              </div>
              <Milestones data={milestonesData} />
            </div>
          </div>
          
          <div className="mt-6 border-t pt-4 text-xs text-gray-500 flex justify-end">
            <span className="mr-2">Was this section helpful?</span>
            <button className="text-gray-500 hover:text-gray-700">👍</button>
            <button className="ml-2 text-gray-500 hover:text-gray-700">👎</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JourneySoFarSection;
