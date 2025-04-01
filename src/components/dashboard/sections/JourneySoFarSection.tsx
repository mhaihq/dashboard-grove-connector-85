import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, TrendingUp, Clock, ArrowRight } from 'lucide-react';
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
      <Card className="shadow-sm hover:shadow-md transition-shadow mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            Your Progress Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative py-4">
            <div className="absolute top-0 bottom-0 left-[22px] w-1 bg-gray-200"></div>
            
            <div className="flex mb-8 relative z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 border-4 border-white text-blue-500 mr-4">
                <span className="text-lg font-bold">1</span>
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900">Intake (February 13, 2025)</h3>
                <p className="text-sm text-gray-600 mt-1">Initial health assessment established your baseline scores across key health dimensions.</p>
              </div>
            </div>
            
            <div className="flex mb-8 relative z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 border-4 border-white text-green-500 mr-4">
                <span className="text-lg font-bold">2</span>
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900">Now (March 15, 2025)</h3>
                <p className="text-sm text-gray-600 mt-1">You've shown improvement in sleep quality and reduced alcohol consumption. Hydration remains an area for focus.</p>
              </div>
            </div>
            
            <div className="flex relative z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 border-4 border-white text-gray-500 mr-4">
                <span className="text-lg font-bold">3</span>
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900">Future (Coming Soon)</h3>
                <p className="text-sm text-gray-600 mt-1">Continued progress will unlock deeper insights and personalized recommendations.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Call Summaries */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-hana-green" />
              Recent Call Summaries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border border-gray-100 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">March 15, 2025</span>
                  <span className="text-xs text-gray-500">Weekly Check-in</span>
                </div>
                <ul className="space-y-1 text-sm mt-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Morning walks streak is making a difference in energy levels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">!</span>
                    <span>Discussed strategies for improving hydration throughout the day</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-100 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">March 8, 2025</span>
                  <span className="text-xs text-gray-500">Weekly Check-in</span>
                </div>
                <ul className="space-y-1 text-sm mt-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Reached out to friend for coffee - social connection improving</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">!</span>
                    <span>Sleep disrupted by work stress - implemented evening routine</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Progress Highlights */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-amber-500" />
              Progress Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {journalEntries
                .filter((entry: any) => entry.status === 'positive')
                .slice(0, 3)
                .map((entry: any, idx: number) => (
                  <div key={idx} className="border border-green-100 rounded-lg p-3 bg-green-50">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-green-800">{entry.text}</span>
                      <span className="text-xs text-green-700">{entry.date}</span>
                    </div>
                    {entry.evidence && (
                      <p className="text-sm text-green-700 mt-1">{entry.evidence}</p>
                    )}
                  </div>
                ))}
              
              <div className="pt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-gray-500">{milestonesData.weeklyPoints} points earned</span>
                </div>
                <Progress value={(milestonesData.weeklyPoints / (milestonesData.weeklyPoints + milestonesData.pointsToNextLevel)) * 100} />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>Current: Level {milestonesData.level}</span>
                  <span>Next: {milestonesData.pointsToNextLevel} points to {milestonesData.nextLevel}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JourneySoFarSection;
