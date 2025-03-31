
import React from 'react';
import { Trophy, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Achievement {
  title: string;
  unlocked: boolean;
  progress?: number;
  icon: React.ReactNode;
}

interface MilestonesData {
  weeklyPoints: number;
  level: number;
  levelName: string;
  nextLevel: string;
  pointsToNextLevel: number;
  achievements: Achievement[];
}

interface MilestonesProps {
  data: MilestonesData;
}

export const Milestones: React.FC<MilestonesProps> = ({ data }) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Trophy className="w-5 h-5 text-hana-green mr-2" />
          Milestones
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-3">
        <div className="mb-4 bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-sm text-gray-600">Level {data.level}</span>
              <h3 className="font-medium text-gray-900">{data.levelName}</h3>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-600">Weekly Points</span>
              <div className="text-xl font-bold text-hana-green">{data.weeklyPoints}</div>
            </div>
          </div>
          
          <Progress value={(data.weeklyPoints / (data.weeklyPoints + data.pointsToNextLevel)) * 100} className="h-2 mt-1" />
          
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Current</span>
            <span>{data.pointsToNextLevel} points to {data.nextLevel}</span>
          </div>
        </div>
        
        <h3 className="font-medium text-gray-700 mb-3">Achievements</h3>
        
        <div className="space-y-3">
          {data.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                achievement.unlocked ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {achievement.unlocked ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  achievement.icon
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${
                    achievement.unlocked ? 'text-gray-900' : 'text-gray-600'
                  }`}>
                    {achievement.title}
                  </span>
                  {achievement.unlocked && (
                    <span className="text-xs text-green-600 font-medium">Unlocked!</span>
                  )}
                </div>
                
                {!achievement.unlocked && achievement.progress !== undefined && (
                  <Progress value={achievement.progress} className="h-1.5 mt-1" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Milestones;
