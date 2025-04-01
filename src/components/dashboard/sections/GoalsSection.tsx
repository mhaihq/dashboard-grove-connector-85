import React from 'react';
import { Calendar, List, CheckCircle2, Target, Droplets, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CarePlanItem } from '@/types/dashboard';
import { Progress } from '@/components/ui/progress';

interface GoalsSectionProps {
  carePlanItems: CarePlanItem[];
  nextCheckInDate: string;
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({
  carePlanItems,
  nextCheckInDate
}) => {
  // Calculate overall progress
  const completedSteps = carePlanItems.reduce((sum, item) => sum + (item.completedSteps || 0), 0);
  const totalSteps = carePlanItems.reduce((sum, item) => sum + (item.totalSteps || 0), 0);
  const overallProgress = Math.round((completedSteps / totalSteps) * 100);

  // Get active goals
  const activeGoals = carePlanItems.filter(item => item.status !== 'complete');
  
  // Active streaks for quick view
  const activeStreaks = [
    { behavior: "Morning walks", days: 5, icon: "activity" },
    { behavior: "Alcohol-free evenings", days: 3, icon: "wine" }
  ];
  
  // Implementation intentions (simplified)
  const implementations = [
    { goal: "Hydration", when: "Every 2 hours", icon: "droplets" }
  ];
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <List className="w-5 h-5 text-green-600 mr-2" />
            <CardTitle className="text-xl font-medium text-gray-800">Your Goals</CardTitle>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 mr-2">Progress:</span>
            <span className="font-medium text-green-600">{overallProgress}%</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Key Goals Section - Simplified view of the most important goals */}
        <div className="mb-6 space-y-4">
          {activeGoals.slice(0, 3).map((goal, index) => (
            <div key={index} className="border rounded-lg p-4 bg-white relative">
              <div className="absolute right-2 top-2">
                {goal.status === 'in-progress' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    In Progress
                  </span>
                )}
                {goal.status === 'started' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                    Started
                  </span>
                )}
                {goal.status === 'not-started' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                    Not Started
                  </span>
                )}
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {goal.icon === 'moon' && <Target className="w-5 h-5 text-indigo-500" />}
                  {goal.icon === 'activity' && <Target className="w-5 h-5 text-red-500" />}
                  {goal.icon === 'heart' && <Target className="w-5 h-5 text-pink-500" />}
                  {goal.icon === 'users' && <Target className="w-5 h-5 text-blue-500" />}
                  {goal.icon === 'droplets' && <Droplets className="w-5 h-5 text-cyan-500" />}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{goal.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{goal.nextStep}</p>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-gray-500">{goal.completedSteps}/{goal.totalSteps} steps</span>
                    </div>
                    <Progress 
                      value={(goal.completedSteps! / goal.totalSteps!) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Stats - Streaks & Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Active Streaks */}
          <div className="border border-green-100 rounded-lg p-4 bg-green-50">
            <h3 className="font-medium text-green-800 mb-3 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
              Active Streaks
            </h3>
            <div className="space-y-3">
              {activeStreaks.map((streak, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-green-700">{streak.behavior}</span>
                  <div className="flex items-center">
                    <span className="font-medium text-green-800">{streak.days} days</span>
                    <div className="ml-2 flex">
                      {[...Array(Math.min(streak.days, 5))].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-2 h-2 rounded-full bg-green-500 mr-0.5"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Implementation Intentions */}
          <div className="border border-purple-100 rounded-lg p-4 bg-purple-50">
            <h3 className="font-medium text-purple-800 mb-3 flex items-center">
              <Award className="w-4 h-4 mr-2 text-purple-600" />
              Action Plans
            </h3>
            <div className="space-y-3">
              {implementations.map((implementation, index) => (
                <div key={index} className="rounded-md bg-white p-3 shadow-sm">
                  <p className="text-sm text-gray-700 flex items-center">
                    <span className="mr-2">
                      {implementation.icon === 'droplets' && <Droplets className="w-4 h-4 text-blue-500" />}
                    </span>
                    <span>
                      <strong>{implementation.goal}</strong> check-in {implementation.when}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Next Check-in Section - Keeps the appointment reminder */}
        <div className="flex items-center text-sm text-gray-600 border-t pt-4 border-gray-100">
          <Calendar className="w-4 h-4 mr-2 text-green-600" />
          <span>Next Check-in: </span>
          <span className="font-medium ml-1">{nextCheckInDate}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalsSection;
