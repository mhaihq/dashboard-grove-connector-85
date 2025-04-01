
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, TrendingUp } from 'lucide-react';
import { JournalEntry } from '@/types/dashboard';

interface JourneySoFarSectionProps {
  journalEntries: any[]; // Use any[] to accommodate the points property
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
  // Calculate the total weekly points from journal entries
  const weeklyPoints = journalEntries.reduce((sum, entry: any) => sum + (entry.points || 0), 0);
  
  return (
    <div className="mb-16">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Progress Timeline</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progress Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-hana-green" />
              Progress Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Level {milestonesData.level}</span>
                  <span className="text-sm text-gray-500">{milestonesData.levelName}</span>
                </div>
                <Progress value={(milestonesData.weeklyPoints / (milestonesData.weeklyPoints + milestonesData.pointsToNextLevel)) * 100} />
                <div className="flex justify-between mt-1">
                  <span className="text-xs">{milestonesData.weeklyPoints} points</span>
                  <span className="text-xs">{milestonesData.pointsToNextLevel} points to {milestonesData.nextLevel}</span>
                </div>
              </div>
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Recent Progress</h4>
                <ul className="space-y-1 text-sm">
                  {journalEntries
                    .filter((entry: any) => entry.status === 'positive')
                    .slice(0, 3)
                    .map((entry: any, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{entry.text}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Milestones Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-amber-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestonesData.achievements.map((achievement, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      {achievement.icon}
                      <span className="text-sm font-medium ml-2">{achievement.title}</span>
                    </div>
                    <span className={`text-xs ${achievement.unlocked ? 'text-green-600' : 'text-gray-500'}`}>
                      {achievement.unlocked ? 'Unlocked' : `${Math.round(achievement.progress)}%`}
                    </span>
                  </div>
                  <Progress value={achievement.progress} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JourneySoFarSection;
