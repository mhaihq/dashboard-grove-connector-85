
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
    <Card className="shadow-sm overflow-hidden border-gray-200 bg-white">
      <CardHeader className="pb-2 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <List className="w-5 h-5 text-green-600 mr-2" />
            <CardTitle className="text-xl font-medium text-gray-800">Where You're Headed</CardTitle>
          </div>
          <div className="text-sm text-gray-500">
            <span className="hidden md:inline">A glance at the personal goals you've committed to</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="text-sm text-gray-600 p-4 border-b border-gray-100 bg-gray-50">
          Personalized goals and how your habits support them
        </div>
        
        {/* Top Module: Active Goals */}
        <div className="px-4 py-3 space-y-3">
          {activeGoals.slice(0, 3).map((goal, index) => {
            const progressPercentage = getProgressPercentage(goal);
            const progressColor = getProgressColor(progressPercentage);
            
            return (
              <div key={index} className="rounded-xl p-4 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-gray-50 p-2 rounded-full">
                    {getIconComponent(goal.icon)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800">{goal.title}</h3>
                      {goal.status === 'in-progress' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Active
                        </span>
                      )}
                      {goal.status === 'started' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Just Started
                        </span>
                      )}
                      {goal.status === 'not-started' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Not Started
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{goal.nextStep}</p>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-500">
                          Progress: {progressPercentage}%
                        </span>
                        <span className="text-gray-500">
                          {goal.completedSteps && goal.totalSteps && 
                            `${goal.completedSteps}/${goal.totalSteps} days`
                          }
                        </span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full", progressColor)}
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      
                      {/* AI-generated insight based on goal */}
                      {goal.insights && (
                        <p className="text-sm italic text-gray-600 mt-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                          "{goal.insights}"
                        </p>
                      )}
                      {!goal.insights && goal.status === 'in-progress' && (
                        <p className="text-sm italic text-gray-600 mt-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                          "Reported better results on days you followed this."
                        </p>
                      )}
                      {!goal.insights && goal.status === 'started' && (
                        <p className="text-sm italic text-gray-600 mt-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                          "Most helpful on high-stress days when used consistently."
                        </p>
                      )}
                      {!goal.insights && goal.status === 'not-started' && (
                        <p className="text-sm italic text-gray-600 mt-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
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
          <div className="px-4 py-3 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Micro-Habit Streaks</h3>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="space-y-4">
                {activeStreaks.map((streak, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center mr-3">
                        <span className="text-lg">{streak.icon}</span>
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{streak.habit}</span>
                    </div>
                    <div className="flex items-center">
                      <div className={cn(
                        "font-medium text-sm mr-2 px-2.5 py-0.5 rounded-full",
                        streak.status === 'improved' ? "text-green-800 bg-green-100" : 
                        streak.status === 'declined' ? "text-red-800 bg-red-100" : "text-amber-800 bg-amber-100"
                      )}>
                        {streak.days} {streak.days === 1 ? 'day' : 'days'} 
                        {streak.trend && (
                          <span className="ml-1">
                            {streak.trend === '+1 day ↑' ? '↑' : 
                             streak.trend === '-2 days ↓' ? '↓' : '•'}
                          </span>
                        )}
                      </div>
                      <div className="flex">
                        {[...Array(streak.target)].map((_, i) => (
                          <div 
                            key={i} 
                            className={cn(
                              "w-2.5 h-2.5 rounded-full mr-0.5",
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
          <div className="px-4 py-3 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">This Week's System Suggestion</h3>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm text-blue-800 font-medium">
                {systemSuggestion.suggestion}
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
          <div className="flex items-center text-sm text-gray-600 p-4 border-t border-gray-100 bg-gray-50">
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
