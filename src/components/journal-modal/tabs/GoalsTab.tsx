
import React from 'react';
import { JournalEntryType } from '@/types/journal';
import { HighlightBox } from '../HighlightBox';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, BarChart } from 'lucide-react';

interface GoalsTabProps {
  content: string;
  goals?: JournalEntryType['goals'];
  highlight?: string;
}

export const GoalsTab: React.FC<GoalsTabProps> = ({ 
  content, 
  goals,
  highlight 
}) => {
  // Calculate a "start date" for display purposes (30 days ago)
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  const formattedStartDate = startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();

  // Fake stats for UI purposes
  const currentStreak = 14;
  const allTimePercentage = 67.5;
  const totalCompletions = 123;

  return (
    <div className="text-left">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Goals & Intentions</h2>
        <p className="text-gray-600 whitespace-pre-line text-sm">{content}</p>
        
        {/* Streaks App Style UI */}
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
          {/* "Since" Header */}
          <div className="bg-gray-50 p-3 border-b border-gray-200">
            <p className="text-center text-sm font-bold text-gray-800">SINCE {formattedStartDate}</p>
            <div className="flex justify-center space-x-2 mt-2">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                🎯
              </div>
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                🏃‍♂️
              </div>
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                💤
              </div>
            </div>
          </div>
          
          {/* Stats Summary */}
          <div className="grid grid-cols-3 border-b border-gray-200">
            <div className="p-3 text-center border-r border-gray-200">
              <p className="text-xl font-bold text-gray-800">{currentStreak}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Current Streak</p>
            </div>
            <div className="p-3 text-center border-r border-gray-200">
              <p className="text-xl font-bold text-gray-800">{allTimePercentage}%</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">All Time</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-xl font-bold text-gray-800">{totalCompletions}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Completions</p>
            </div>
          </div>
          
          {/* Chart Section */}
          <div className="p-3 border-b border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <LineChart className="w-4 h-4 text-gray-500" />
              <p className="text-xs text-gray-500 font-medium">LAST 30 DAYS</p>
              <BarChart className="w-4 h-4 text-gray-500" />
            </div>
            <div className="h-16 bg-gray-50 rounded-lg overflow-hidden mt-1 relative">
              <div className="absolute inset-0 flex items-center">
                <svg className="w-full" height="40" viewBox="0 0 300 40">
                  <path 
                    d="M0,20 Q10,10 20,15 T40,20 T60,10 T80,20 T100,15 T120,25 T140,15 T160,20 T180,10 T200,20 T220,5 T240,20 T260,15 T280,20 T300,10" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="2"
                  />
                  {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300].map((x, i) => (
                    <circle key={i} cx={x} cy={x % 30 === 0 ? 15 : 25} r="3" fill="#ef4444" />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Goals List */}
        <div className="mt-4 space-y-3">
          {goals ? (
            goals.map((goal, idx) => (
              <Card key={idx} className={`${goal.completed ? 'bg-[#F6FFF2] border-green-100' : 'bg-[#F9F9F9] border-gray-100'}`}>
                <CardContent className="pt-4 p-4">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm">
                      {goal.completed ? '✅' : '🎯'}
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-800">{goal.title || "Goal"}</h3>
                      <p className="text-sm text-gray-700">{goal.description || "In progress"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <Card className="bg-[#F9F9F9] border-gray-100">
                <CardContent className="pt-4 p-4">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm">
                      🎯
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-800">Regular Exercise</h3>
                      <p className="text-sm text-gray-700">Add more structured activity alongside daily walks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#F6FFF2] border-green-100">
                <CardContent className="pt-4 p-4">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm">
                      ✅
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-800">Daily Walks</h3>
                      <p className="text-sm text-gray-700">Maintain current 20-minute daily walks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
      
      <HighlightBox highlight={highlight} />
    </div>
  );
};
