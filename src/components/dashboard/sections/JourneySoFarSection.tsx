
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
  
  // Add environmental changes highlights (Atomic Habits principle)
  const environmentalChanges = [
    { week: "Week 3", change: "Moved phone charger away from bed to improve sleep habits" },
    { week: "Week 5", change: "Set up a dedicated meditation corner in the living room" }
  ];
  
  // Add consistency highlights (emphasizing systems over goals)
  const consistencyHighlights = [
    { behavior: "Morning walks", count: 5, impact: "Improved energy levels throughout the day" },
    { behavior: "Hydration tracking", count: 7, impact: "Reduced afternoon fatigue" }
  ];
  
  return (
    <div>
      <Card className="shadow-sm hover:shadow-md transition-shadow mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            <span className="text-gray-700">Your Progress Path</span>
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
                
                <div className="mt-2 bg-blue-50 rounded-md p-2">
                  <h4 className="text-sm font-medium text-blue-700">Environmental Changes (Atomic Habits)</h4>
                  <ul className="mt-1 space-y-1">
                    {environmentalChanges.map((change, idx) => (
                      <li key={idx} className="text-xs text-blue-600 flex">
                        <span className="text-blue-500 mr-1.5">•</span>
                        <span><strong>{change.week}:</strong> {change.change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex relative z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 border-4 border-white text-gray-500 mr-4">
                <span className="text-lg font-bold">3</span>
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900">Future (Coming Soon)</h3>
                <p className="text-sm text-gray-600 mt-1">Continued progress will unlock deeper insights and personalized recommendations.</p>
                <p className="text-xs text-amber-600 italic mt-1">"You don't rise to the level of your goals; you fall to the level of your systems." - James Clear</p>
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
              <span className="text-gray-700">Recent Call Summaries</span>
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
        
        {/* Consistency Highlights */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-amber-500" />
              <span className="text-gray-700">Consistency Over Perfection</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 bg-amber-50 border border-amber-100 rounded-lg p-3">
              <p className="text-sm text-amber-800 italic">"We are what we repeatedly do. Excellence, then, is not an act, but a habit."</p>
            </div>
            
            <div className="space-y-4">
              {consistencyHighlights.map((highlight, idx) => (
                <div key={idx} className="border border-green-100 rounded-lg p-3 bg-green-50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-green-800">{highlight.behavior}</span>
                    <span className="text-xs font-bold bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                      {highlight.count} times
                    </span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">{highlight.impact}</p>
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
