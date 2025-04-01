import React, { useState } from 'react';
import { CarePlanItem, HabitStreak, SystemSuggestion } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List, CheckCircle2, Target, Droplets, Award, Brain, Footprints, Thermometer, Heart, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

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
  
  const sortedGoals = [...carePlanItems].sort((a, b) => {
    if (a.priority && b.priority) {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    const statusOrder = { 'in-progress': 1, 'started': 2, 'not-started': 3, 'complete': 4 };
    return statusOrder[a.status] - statusOrder[b.status];
  });
  
  const activeGoals = sortedGoals.filter(item => item.status === 'in-progress' || item.status === 'started');
  
  const notStartedGoals = sortedGoals.filter(item => item.status === 'not-started');
  
  const getProgressPercentage = (goal: CarePlanItem) => {
    if (goal.completedSteps === undefined || goal.totalSteps === undefined) return 0;
    return Math.round((goal.completedSteps / goal.totalSteps) * 100);
  };
  
  const getProgressColor = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-400';
    if (percentage >= 30) return 'bg-amber-400';
    return 'bg-red-300';
  };
  
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
  
  const getFriendlyName = (title: string) => {
    switch (title) {
      case "Sleep Restoration Protocol": return "Better Sleep Routine";
      case "Stress Management Toolkit": return "Midday Stress Reset";
      case "Emotional Regulation Framework": return "Mood Balancing";
      case "Hydration Plan": return "Afternoon Energy Boost";
      default: return title;
    }
  };
  
  const getFocusTag = (title: string) => {
    if (title.includes("Sleep")) return "💧 Sleep";
    if (title.includes("Stress")) return "🧠 Focus";
    if (title.includes("Emotional")) return "❤️ Mood";
    if (title.includes("Hydration")) return "💦 Energy";
    return null;
  };

  const activeStreakCount = activeStreaks.filter(streak => streak.status === 'improved' || streak.status === 'stable').length;
  const needsWorkStreakCount = activeStreaks.filter(streak => streak.status === 'declined').length;
  const consistencyPoints = activeStreaks.reduce((sum, streak) => sum + (streak.status === 'improved' ? 2 : streak.status === 'stable' ? 1 : 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="shadow-sm overflow-hidden border-gray-200 bg-white rounded-xl">
        <CardHeader className="pb-2 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Target className="w-5 h-5 text-green-600 mr-2" />
              <CardTitle className="text-lg font-medium text-gray-800">This Week's Goals</CardTitle>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Supportive routines you're building towards</p>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="px-4 py-3 space-y-3">
            {activeGoals.map((goal, index) => {
              const progressPercentage = getProgressPercentage(goal);
              const progressColor = getProgressColor(progressPercentage);
              const friendlyName = getFriendlyName(goal.title);
              const focusTag = getFocusTag(goal.title);
              
              return (
                <div key={index} className="rounded-xl p-4 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-gray-50 p-2 rounded-full">
                      {getIconComponent(goal.icon)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-800">{friendlyName}</h3>
                        {focusTag && (
                          <span className="text-xs text-gray-600">{focusTag}</span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{goal.nextStep}</p>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">
                            {goal.status === 'in-progress' ? `In progress (${goal.completedSteps} of ${goal.totalSteps} days reported)` :
                             goal.status === 'started' ? 'Started this week' : 'Momentum building...'}
                          </span>
                          <span className="text-gray-500">
                            {progressPercentage}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full", progressColor)}
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                        
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
          
          {nextCheckInDate && (
            <div className="flex items-center justify-end text-xs text-gray-400 p-2 border-t border-gray-100">
              <Calendar className="w-3 h-3 mr-1 text-gray-400" />
              <span>Next Check-in: {nextCheckInDate}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm overflow-hidden border-gray-200 bg-white rounded-xl">
        <CardHeader className="pb-2 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Award className="w-5 h-5 text-amber-500 mr-2" />
              <CardTitle className="text-lg font-medium text-gray-800">Your Momentum This Week</CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {activeStreaks.slice(0, showAllHabits ? activeStreaks.length : 4).map((streak, index) => {
                const progressPercent = (streak.days / streak.target) * 100;
                const strokeColor = streak.status === 'improved' ? '#4ade80' : // green
                                   streak.status === 'declined' ? '#f87171' : // red
                                   '#fbbf24'; // amber
                const strokeWidth = 10; // Thicker stroke for more prominence
                const size = 70; // Larger circle
                const radius = (size - strokeWidth) / 2;
                const circumference = 2 * Math.PI * radius;
                const strokeDasharray = `${(circumference * progressPercent) / 100} ${circumference}`;
                const rotation = -90; // Start from the top
                
                return (
                  <div key={index} className="relative p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                    <div className="mb-2">
                      <span className="font-medium text-sm text-gray-700 flex items-center">
                        <span className="text-xl mr-2">{streak.icon}</span>
                        {streak.habit}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
                              <svg className="w-full h-full">
                                <circle 
                                  cx={size/2} 
                                  cy={size/2} 
                                  r={radius}
                                  fill="transparent"
                                  stroke="#e5e7eb" 
                                  strokeWidth={strokeWidth}
                                />
                              </svg>
                              
                              <svg 
                                className="absolute inset-0 w-full h-full" 
                                style={{ transform: `rotate(${rotation}deg)` }}
                              >
                                <circle 
                                  cx={size/2} 
                                  cy={size/2} 
                                  r={radius}
                                  fill="transparent"
                                  stroke={strokeColor}
                                  strokeWidth={strokeWidth}
                                  strokeDasharray={strokeDasharray}
                                  strokeLinecap="round"
                                  style={{ 
                                    transition: "stroke-dasharray 0.5s ease-in-out",
                                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))"
                                  }}
                                />
                              </svg>
                              
                              <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <div className="text-lg font-bold" style={{ color: strokeColor }}>
                                  {streak.days}
                                </div>
                                <div className="text-xs text-gray-500">
                                  of {streak.target}
                                </div>
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-[150px]">
                              {streak.status === 'improved' 
                                ? "You've been consistent with this habit" 
                                : streak.status === 'declined'
                                ? "This habit needs attention this week"
                                : "You're maintaining this habit"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 whitespace-nowrap">
                          {streak.supportedGoal}
                        </p>
                        <p className="text-xs flex items-center mt-1 font-medium">
                          <span className={cn(
                            streak.status === 'improved' ? 'text-green-600' : 
                            streak.status === 'declined' ? 'text-red-600' : 
                            'text-amber-600'
                          )}>
                            {streak.trend}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {activeStreaks.length > 4 && !showAllHabits && (
              <button 
                className="text-xs text-blue-600 hover:text-blue-800 font-medium py-1"
                onClick={() => setShowAllHabits(true)}
              >
                + Show {activeStreaks.length - 4} more habits
              </button>
            )}
            
            {systemSuggestion && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mt-4">
                <h3 className="text-sm font-medium text-blue-700 mb-1 flex items-center">
                  <Brain className="w-4 h-4 mr-1.5 text-blue-600" />
                  Suggested Habit This Week:
                </h3>
                <p className="text-sm text-blue-800">
                  {systemSuggestion.suggestion}
                </p>
                {systemSuggestion.basedOn && (
                  <p className="text-xs text-blue-600 mt-1">
                    Based on: {systemSuggestion.basedOn}
                  </p>
                )}
              </div>
            )}
            
            <div className="mt-4 pt-3 border-t border-gray-100">
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
                  <p className="text-xs text-gray-700">Momentum Score</p>
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
