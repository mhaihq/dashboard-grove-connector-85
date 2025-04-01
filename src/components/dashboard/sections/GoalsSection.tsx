import React from 'react';
import { CarePlanItem, HabitStreak, SystemSuggestion } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List, CheckCircle2, Target, Droplets, Award, Brain, Footprints, Thermometer, Heart, LineChart, BarChart } from 'lucide-react';
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

  // Calculate aggregated stats (like in the Streaks app)
  const totalCompletions = activeStreaks.reduce((total, streak) => total + streak.days, 0);
  const avgCompletion = activeStreaks.length > 0 
    ? Math.round((totalCompletions / (activeStreaks.length * 7)) * 1000) / 10 
    : 0;
  const currentStreak = activeStreaks.length > 0 ? Math.max(...activeStreaks.map(s => s.days)) : 0;
  
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
        
        {/* Streaks App Style - "Since" Header */}
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <p className="text-center text-lg font-bold text-gray-800">SINCE FEB 15, 2025</p>
          <div className="flex justify-center space-x-2 mt-3">
            {activeStreaks.slice(0, 5).map((streak, idx) => (
              <div key={idx} className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white text-lg font-bold">
                {streak.icon}
              </div>
            ))}
          </div>
        </div>
        
        {/* Streaks App Style - Stats Summary */}
        <div className="grid grid-cols-3 border-b border-gray-200">
          <div className="p-4 text-center border-r border-gray-200">
            <p className="text-3xl font-bold text-gray-800">{currentStreak}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Current Streak</p>
          </div>
          <div className="p-4 text-center border-r border-gray-200">
            <p className="text-3xl font-bold text-gray-800">{avgCompletion}%</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">All Time</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-3xl font-bold text-gray-800">{totalCompletions}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Completions</p>
          </div>
        </div>
        
        {/* Streaks App Style - Timeline Chart */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500">FEB 15</p>
            <p className="text-xs text-gray-500 font-medium">30 DAYS</p>
            <p className="text-xs text-gray-500">TODAY</p>
          </div>
          <div className="relative h-16 bg-gray-50 rounded-lg overflow-hidden">
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
        
        {/* Streaks App Style - Weekly Completions */}
        <div className="p-4 border-b border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-3 text-center uppercase">Completions</p>
          <div className="flex justify-between items-end h-24 px-4">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div 
                  className="w-8 bg-red-500 rounded-md" 
                  style={{ height: `${Math.max(20, Math.random() * 80)}px` }}
                ></div>
                <p className="text-xs font-medium text-gray-700 mt-2">{day}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 mb-2">
            <p className="text-xs text-gray-500">6 AM</p>
            <p className="text-xs text-gray-500">6 PM</p>
          </div>
          <div className="relative h-16 bg-gray-50 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center">
              <svg className="w-full" height="40" viewBox="0 0 300 40">
                <path 
                  d="M0,35 Q30,30 60,25 T120,10 T180,15 T240,20 T300,30" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="2"
                />
                {[0, 60, 120, 180, 240, 300].map((x, i) => (
                  <circle key={i} cx={x} cy={i === 2 ? 10 : i === 0 ? 35 : 15 + i * 3} r="3" fill="#ef4444" />
                ))}
              </svg>
            </div>
          </div>
        </div>
        
        {/* Top Module: Active Goals - Keep the original implementation */}
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
        
        {/* Streaks App Style - Navigation Dots */}
        <div className="flex justify-center items-center py-3 border-t border-gray-200">
          <div className="w-5 h-5 text-red-500">★</div>
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="w-2 h-2 rounded-full bg-gray-300 mx-1"></div>
          ))}
        </div>
        
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
