
import React from 'react';
import { Trophy, CalendarClock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { JournalEntry } from '@/types/dashboard';

interface WelcomeBannerProps {
  userName: string;
  recentAchievement: string;
  priorityAction: {
    task: string;
    estimatedTime: string;
  };
  streak: {
    count: number;
    behavior: string;
  };
  journeyProgress: number; // 0-100
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  userName,
  recentAchievement,
  priorityAction,
  streak,
  journeyProgress,
}) => {
  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-100 hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h2 className="text-xl font-medium text-gray-900">
              Hi {userName}! <span className="text-green-600">{recentAchievement}</span>
            </h2>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">Today:</span> {priorityAction.task} 
              <span className="inline-flex items-center ml-2 px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                <CalendarClock className="w-3 h-3 mr-1" />
                {priorityAction.estimatedTime}
              </span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <Trophy className="w-4 h-4 text-amber-500 mr-1" />
                <span className="text-sm font-medium text-gray-800">{streak.count}-day streak</span>
              </div>
              <span className="text-xs text-gray-500">{streak.behavior}</span>
            </div>
            
            <div className="w-24">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Journey</span>
                <span>{journeyProgress}%</span>
              </div>
              <Progress value={journeyProgress} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
