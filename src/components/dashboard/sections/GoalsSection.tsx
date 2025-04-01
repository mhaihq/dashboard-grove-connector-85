
import React, { useState } from 'react';
import { CarePlanItem, HabitStreak, SystemSuggestion } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List, CheckCircle2, Target, Droplets, Award, Brain, Footprints, Thermometer, Heart, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  const [showNotStarted, setShowNotStarted] = useState(false);
  const [showAllHabits, setShowAllHabits] = useState(false);
  
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
  
  // Get active goals (in-progress and started)
  const activeGoals = sortedGoals.filter(item => item.status === 'in-progress' || item.status === 'started');
  
  // Get not-started goals
  const notStartedGoals = sortedGoals.filter(item => item.status === 'not-started');
  
  // Calculate progress percentage for each goal
  const getProgressPercentage = (goal: CarePlanItem) => {
    if (goal.completedSteps === undefined || goal.totalSteps === undefined) return 0;
    return Math.round((goal.completedSteps / goal.totalSteps) * 100);
  };
  
  // Get the progress color based on the percentage - using softer colors as requested
  const getProgressColor = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-400';
    if (percentage >= 30) return 'bg-amber-400';
    return 'bg-red-300';
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
  
  // Get user-friendly names for the goals
  const getFriendlyName = (title: string) => {
    switch (title) {
      case "Sleep Restoration Protocol": return "Evening Wind-down";
      case "Stress Management Toolkit": return "Calm Moments";
      case "Emotional Regulation Framework": return "Mood Balancing";
      default: return title;
    }
  };

  // Calculate streaks stats
  const activeStreakCount = activeStreaks.filter(streak => streak.status === 'improved' || streak.status === 'stable').length;
  const needsWorkStreakCount = activeStreaks.filter(streak => streak.status === 'declined').length;
  const consistencyPoints = activeStreaks.reduce((sum, streak) => sum + (streak.status === 'improved' ? 2 : streak.status === 'stable' ? 1 : 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Panel A: This Week's Smart Goals */}
      <Card className="shadow-sm overflow-hidden border-gray-200 bg-white rounded-xl">
        <CardHeader className="pb-2 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Target className="w-5 h-5 text-green-600 mr-2" />
              <CardTitle className="text-lg font-medium text-gray-800">This Week's Smart Goals</CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="px-4 py-3 space-y-3">
            {activeGoals.map((goal, index) => {
              const progressPercentage = getProgressPercentage(goal);
              const progressColor = getProgressColor(progressPercentage);
              const friendlyName = getFriendlyName(goal.title);
              
              return (
                <div key={index} className="rounded-xl p-4 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-gray-50 p-2 rounded-full">
                      {getIconComponent(goal.icon)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-800">{friendlyName}</h3>
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
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{goal.nextStep}</p>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">
                            Progress: {progressPercentage}%
                          </span>
                          <span className="text-gray-500">
                            {goal.completedSteps && goal.totalSteps && 
                              `${goal.completedSteps}/${goal.totalSteps} days`
                            }
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full", progressColor)}
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                        
                        {/* Only show insight if personalized */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="text-xs italic text-gray-600 mt-2">
                                {goal.insights ? `"${goal.insights}"` : "Tap for more insight"}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs max-w-[200px]">
                                {goal.insights || "This goal supports your priority areas of focus."}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Not Started Goals - Collapsible */}
          {notStartedGoals.length > 0 && (
            <Collapsible
              open={showNotStarted}
              onOpenChange={setShowNotStarted}
              className="px-4 py-2 border-t border-gray-100"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full text-sm text-gray-500 hover:text-gray-700 py-1">
                <span>Not Started Goals ({notStartedGoals.length})</span>
                {showNotStarted ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 pt-2">
                {notStartedGoals.map((goal, index) => (
                  <div key={index} className="rounded-xl p-3 bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="bg-white p-1.5 rounded-full border border-gray-200">
                        {getIconComponent(goal.icon)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700">{getFriendlyName(goal.title)}</h4>
                        <p className="text-xs text-gray-500">{goal.nextStep}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
          
          {/* Next Check-in Reminder */}
          {nextCheckInDate && (
            <div className="flex items-center justify-end text-xs text-gray-400 p-2 border-t border-gray-100">
              <Calendar className="w-3 h-3 mr-1 text-gray-400" />
              <span>Next Check-in: {nextCheckInDate}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Panel B: Your Weekly Habits */}
      <Card className="shadow-sm overflow-hidden border-gray-200 bg-white rounded-xl">
        <CardHeader className="pb-2 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Award className="w-5 h-5 text-amber-500 mr-2" />
              <CardTitle className="text-lg font-medium text-gray-800">Your Weekly Habits</CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="space-y-5">
            {activeStreaks.slice(0, showAllHabits ? activeStreaks.length : 3).map((streak, index) => {
              // For each day of the week (up to target)
              const days = Array.from({ length: streak.target }, (_, i) => {
                if (i < streak.days) {
                  return streak.status === 'declined' && i === 0 ? 'red' : 'green';
                }
                return 'gray';
              });
              
              return (
                <div key={index} className="relative">
                  <div className="mb-1.5 flex justify-between items-center">
                    <span className="font-medium text-sm text-gray-700 flex items-center">
                      <span className="mr-2">{streak.icon}</span>
                      {streak.habit}
                    </span>
                    <span className="text-xs text-gray-500">
                      {streak.days}/{streak.target} days
                    </span>
                  </div>
                  
                  <div className="flex space-x-2 mb-1">
                    {days.map((status, dayIndex) => (
                      <TooltipProvider key={dayIndex}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center",
                                status === 'green' ? "bg-green-400 text-white" : 
                                status === 'red' ? "bg-red-400 text-white" : 
                                "bg-gray-200 text-gray-400"
                              )}
                            >
                              {status === 'green' ? '✓' : status === 'red' ? '✗' : ''}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-[150px]">
                              Day {dayIndex + 1}: {status === 'green' ? 'Completed' : status === 'red' ? 'Missed' : 'Upcoming'}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                  
                  <p className="text-xs text-gray-600 mt-1">
                    {streak.supportedGoal && `Supports: ${streak.supportedGoal}`}
                  </p>
                </div>
              );
            })}
            
            {activeStreaks.length > 3 && !showAllHabits && (
              <button 
                className="text-xs text-blue-600 hover:text-blue-800 font-medium py-1"
                onClick={() => setShowAllHabits(true)}
              >
                + Show {activeStreaks.length - 3} more habits
              </button>
            )}
            
            {/* System Suggestion */}
            {systemSuggestion && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Brain className="w-4 h-4 mr-1.5 text-blue-600" />
                  Suggested Habit This Week:
                </h3>
                <p className="text-sm text-gray-700">
                  {systemSuggestion.suggestion}
                </p>
                {systemSuggestion.basedOn && (
                  <p className="text-xs text-gray-500 mt-1">
                    Based on: {systemSuggestion.basedOn}
                  </p>
                )}
              </div>
            )}
            
            {/* Gamified Feedback */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-green-50 rounded-lg p-2">
                  <p className="text-lg text-green-700 font-bold">🔥</p>
                  <p className="text-xs text-gray-700">{activeStreakCount} active streaks</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-2">
                  <p className="text-lg text-amber-700 font-bold">🎯</p>
                  <p className="text-xs text-gray-700">{needsWorkStreakCount} needs work</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-2">
                  <p className="text-lg text-blue-700 font-bold">+{consistencyPoints}</p>
                  <p className="text-xs text-gray-700">Consistency Points</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalsSection;
