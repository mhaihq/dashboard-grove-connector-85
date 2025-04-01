
import React from 'react';
import { CarePlanItem, HabitStreak, SystemSuggestion } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List, CheckCircle2, Target, Droplets, Award, Brain, Footprints, Thermometer, Heart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface GoalsSectionProps {
  carePlanItems: CarePlanItem[];
  nextCheckInDate?: string;
  activeStreaks?: HabitStreak[];
  systemSuggestion?: SystemSuggestion;
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({
  carePlanItems,
  nextCheckInDate,
  activeStreaks = [],
  systemSuggestion
}) => {
  // Sort goals by priority and progress
  const sortedGoals = [...carePlanItems].sort((a, b) => {
    // First by priority if available
    if (a.priority && b.priority) {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Then by progress (in-progress first, then started, then not-started)
    const statusOrder = { 'in-progress': 1, 'started': 2, 'not-started': 3, 'complete': 4 };
    return statusOrder[a.status] - statusOrder[b.status];
  });
  
  // Get active goals that are not complete
  const activeGoals = sortedGoals.filter(item => item.status !== 'complete');
  
  // Calculate progress percentage for each goal
  const getProgressPercentage = (goal: CarePlanItem) => {
    if (goal.completedSteps === undefined || goal.totalSteps === undefined) return 0;
    return Math.round((goal.completedSteps / goal.totalSteps) * 100);
  };
  
  // Get the progress color based on the percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-500';
    if (percentage >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  // Get the icon component based on the icon string
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'moon': return <Thermometer className="w-5 h-5 text-indigo-500" />;
      case 'activity': return <Target className="w-5 h-5 text-red-500" />;
      case 'heart': return <Heart className="w-5 h-5 text-pink-500" />;
      case 'users': return <Award className="w-5 h-5 text-blue-500" />;
      case 'droplets': return <Droplets className="w-5 h-5 text-cyan-500" />;
      case 'brain': return <Brain className="w-5 h-5 text-purple-500" />;
      default: return <Footprints className="w-5 h-5 text-amber-500" />;
    }
  };
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <List className="w-5 h-5 text-green-600 mr-2" />
            <CardTitle className="text-xl font-medium text-gray-800">Where You're Headed</CardTitle>
          </div>
          <div className="text-sm text-gray-500">
            A glance at the personal goals you've committed to
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-gray-600 mb-4">
          Personalized goals and how your habits support them
        </div>
        
        {/* Top Module: Active Goals */}
        <div className="mb-6 space-y-4">
          {activeGoals.slice(0, 3).map((goal, index) => {
            const progressPercentage = getProgressPercentage(goal);
            const progressColor = getProgressColor(progressPercentage);
            
            return (
              <div key={index} className="border rounded-lg p-4 bg-white relative hover:shadow-sm transition-all duration-200">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getIconComponent(goal.icon)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-800">{goal.title}</h3>
                      {goal.status === 'in-progress' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          Active
                        </span>
                      )}
                      {goal.status === 'started' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                          Just Started
                        </span>
                      )}
                      {goal.status === 'not-started' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                          Not Started
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">{goal.nextStep}</p>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">
                          Progress: {progressPercentage}% — 
                          {goal.completedSteps && goal.totalSteps && 
                            ` Tracked ${goal.completedSteps} out of ${goal.totalSteps} days`
                          }
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full", progressColor)}
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      
                      {/* AI-generated insight based on goal */}
                      {goal.insights && (
                        <p className="text-sm italic text-gray-600 mt-2">
                          "{goal.insights}"
                        </p>
                      )}
                      {!goal.insights && goal.status === 'in-progress' && (
                        <p className="text-sm italic text-gray-600 mt-2">
                          "Reported better results on days you followed this."
                        </p>
                      )}
                      {!goal.insights && goal.status === 'started' && (
                        <p className="text-sm italic text-gray-600 mt-2">
                          "Most helpful on high-stress days when used consistently."
                        </p>
                      )}
                      {!goal.insights && goal.status === 'not-started' && (
                        <p className="text-sm italic text-gray-600 mt-2">
                          "Let's revisit this after building momentum with your other tools."
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Middle Module: Micro-Habit Streaks */}
        {activeStreaks.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Micro-Habit Streaks</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                {activeStreaks.map((streak, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="mr-2 text-lg">{streak.icon}</span>
                      <span className="text-sm text-gray-700">{streak.habit}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={cn(
                        "font-medium text-sm",
                        streak.status === 'improved' ? "text-green-600" : 
                        streak.status === 'declined' ? "text-red-600" : "text-amber-600"
                      )}>
                        {streak.days} {streak.days === 1 ? 'day' : 'days'} 
                        {streak.trend && (
                          <span className="ml-1">
                            {streak.trend === '+1 day ↑' ? '✅' : 
                             streak.trend === '-2 days ↓' ? '🔻' : '🟨'}
                          </span>
                        )}
                      </span>
                      <div className="ml-2 flex">
                        {[...Array(streak.target)].map((_, i) => (
                          <div 
                            key={i} 
                            className={cn(
                              "w-2 h-2 rounded-full mr-0.5",
                              i < streak.days ? 
                                streak.status === 'improved' ? "bg-green-500" : 
                                streak.status === 'declined' ? "bg-red-400" : "bg-amber-400"
                              : "bg-gray-200"
                            )}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-gray-500 mt-3">
                These habits support your top goal: better sleep.
              </p>
            </div>
          </div>
        )}
        
        {/* Bottom Module: Action Cue */}
        {systemSuggestion && (
          <div className="border-t pt-4 border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">This Week's System Suggestion</h3>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <p className="text-sm text-blue-800">
                📌 "{systemSuggestion.suggestion}"
              </p>
              {systemSuggestion.basedOn && (
                <p className="text-xs text-gray-600 mt-2">
                  Based on: {systemSuggestion.basedOn}
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Next Check-in Reminder */}
        {nextCheckInDate && (
          <div className="flex items-center text-sm text-gray-600 border-t pt-4 mt-4 border-gray-100">
            <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
            <span>Next Check-in: </span>
            <span className="font-medium ml-1">{nextCheckInDate}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalsSection;
