import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CalendarAppointment } from '@/components/CalendarAppointment';
import { Calendar as CalendarIcon, Milestone, CheckCircle2, Brain, FileText, Sparkles, Stars, ArrowRight, ChevronRight, ChevronLeft, Info } from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface JourneySoFarSectionProps {
  journalEntries: any[]; 
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
  const today = new Date();
  const [calendarDate, setCalendarDate] = useState(today);
  
  const startDate = new Date(2025, 1, 1);
  const endDate = new Date(2025, 7, 31);
  
  const journeyMilestones = [
    {
      stage: 1,
      label: "Intake Complete",
      description: "Initial assessment done. We know your baseline.",
      startDate: new Date(2025, 1, 13),
      endDate: new Date(2025, 1, 19),
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      completed: true,
      color: "green",
      dependencies: []
    },
    {
      stage: 2,
      label: "AI Follow-Ups Started",
      description: "You're now receiving weekly check-ins.",
      startDate: new Date(2025, 1, 20),
      endDate: new Date(2025, 2, 5),
      icon: <CalendarIcon className="w-5 h-5 text-blue-500" />,
      completed: true,
      color: "blue",
      dependencies: [1]
    },
    {
      stage: 3,
      label: "First Habit Momentum",
      description: "You're showing consistency with morning walks (5-day streak).",
      startDate: new Date(2025, 2, 1),
      endDate: new Date(2025, 2, 10),
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      completed: true,
      color: "amber",
      dependencies: [2],
      highlight: {
        text: "Environmental Win: Moving your phone charger away from your bed helped establish this habit.",
        color: "amber"
      }
    },
    {
      stage: 4,
      label: "First Insight Unlocked",
      description: "System detected: your sleep is better when you avoid screens at night.",
      startDate: new Date(2025, 2, 5),
      endDate: new Date(2025, 2, 15),
      icon: <Brain className="w-5 h-5 text-purple-500" />,
      completed: true,
      color: "purple",
      dependencies: [2],
      highlight: {
        text: "AI Pattern Discovery: \"We noticed your sleep quality improves by 30% when you avoid screens 1 hour before bed.\"",
        color: "purple"
      }
    },
    {
      stage: 5,
      label: "Care Plan Adapted",
      description: "Goals personalized based on your check-ins and progress.",
      startDate: new Date(2025, 2, 15),
      endDate: new Date(2025, 3, 15),
      icon: <FileText className="w-5 h-5 text-green-500" />,
      completed: false,
      inProgress: true,
      currentPosition: true,
      color: "green",
      dependencies: [3, 4],
      progressPercent: 30
    },
    {
      stage: 6,
      label: "Sustained Progress",
      description: "Over 4 weeks of engagement with notable wins.",
      startDate: new Date(2025, 3, 1),
      endDate: new Date(2025, 4, 15),
      icon: <Stars className="w-5 h-5 text-amber-500" />,
      completed: false,
      color: "amber",
      dependencies: [5],
      progressPercent: 0
    },
    {
      stage: 7,
      label: "Next Step",
      description: "Specialist review of your progress and adjustments to your care path.",
      startDate: new Date(2025, 4, 1),
      endDate: new Date(2025, 5, 15),
      icon: <Milestone className="w-5 h-5 text-blue-500" />,
      completed: false,
      color: "blue",
      dependencies: [6],
      progressPercent: 0
    }
  ];

  const currentStage = 5;

  const generateJourneySummary = () => {
    const completedCount = journeyMilestones.filter(m => m.completed).length;
    const inProgressCount = journeyMilestones.filter(m => m.inProgress).length;
    const remainingCount = journeyMilestones.length - completedCount - inProgressCount;
    
    let currentFocus = journeyMilestones.find(m => m.currentPosition)?.label || "Care Plan Adaptation";
    
    return {
      text: `You've completed ${completedCount} milestones on your health journey with ${inProgressCount} in progress and ${remainingCount} ahead. Currently focusing on ${currentFocus}.`,
      progress: (completedCount / journeyMilestones.length) * 100,
      currentMilestone: currentFocus
    };
  };
  
  const journeySummary = generateJourneySummary();

  const calculateWidthPercentage = (start: Date, end: Date) => {
    const totalDuration = endDate.getTime() - startDate.getTime();
    const taskStart = Math.max(start.getTime(), startDate.getTime());
    const taskEnd = Math.min(end.getTime(), endDate.getTime());
    const taskDuration = taskEnd - taskStart;
    
    return (taskDuration / totalDuration) * 100;
  };
  
  const calculateLeftPercentage = (start: Date) => {
    const totalDuration = endDate.getTime() - startDate.getTime();
    const taskStartOffset = Math.max(start.getTime() - startDate.getTime(), 0);
    
    return (taskStartOffset / totalDuration) * 100;
  };
  
  const monthLabels = [];
  let currentMonth = startOfMonth(startDate);
  const lastMonth = startOfMonth(endDate);
  
  while (currentMonth <= lastMonth) {
    monthLabels.push(format(currentMonth, 'MMM yyyy'));
    currentMonth = startOfMonth(addDays(endOfMonth(currentMonth), 1));
  }
  
  const monthBoundaries = [];
  currentMonth = startOfMonth(startDate);
  
  while (currentMonth <= lastMonth) {
    const leftPos = calculateLeftPercentage(currentMonth);
    monthBoundaries.push({ 
      date: currentMonth,
      left: leftPos 
    });
    currentMonth = startOfMonth(addDays(endOfMonth(currentMonth), 1));
  }
  
  const todayPosition = calculateLeftPercentage(today);
  
  const renderDependencyLines = () => {
    return journeyMilestones.map(milestone => {
      return milestone.dependencies.map(depId => {
        const dependencyMilestone = journeyMilestones.find(m => m.stage === depId);
        if (!dependencyMilestone) return null;
        
        const fromX = calculateLeftPercentage(dependencyMilestone.endDate);
        const toX = calculateLeftPercentage(milestone.startDate);
        const fromY = (dependencyMilestone.stage - 1) * 100 + 50;
        const toY = (milestone.stage - 1) * 100 + 50;
        
        return (
          <svg 
            key={`dep-${depId}-to-${milestone.stage}`}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <line 
              x1={`${fromX}%`}
              y1={`${fromY}px`}
              x2={`${toX}%`}
              y2={`${toY}px`}
              stroke={`#${milestone.color}-300`}
              strokeWidth="1.5"
              strokeDasharray="4"
            />
            <circle 
              cx={`${toX}%`}
              cy={`${toY}px`}
              r="3"
              fill={`#${milestone.color}-500`}
            />
          </svg>
        );
      });
    }).flat().filter(Boolean);
  };
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow mb-6 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Milestone className="w-5 h-5 mr-2 text-blue-500" />
            <span className="text-gray-700">Health Journey Roadmap</span>
          </CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p>This Gantt chart shows your personalized health journey roadmap with milestones, dependencies, and progress indicators.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
          <h3 className="text-md font-medium text-blue-800 mb-2">Your Journey So Far</h3>
          <p className="text-sm text-blue-700 mb-2">{journeySummary.text}</p>
          <p className="text-xs text-blue-600 italic">Current focus: {journeySummary.currentMilestone}</p>
        </div>
        
        <div className="relative mb-2 mt-8 border-b border-gray-200">
          <div className="flex">
            <div className="w-1/6 pr-2 flex-shrink-0">
              <div className="h-8 font-medium text-sm text-gray-700">Milestone</div>
            </div>
            
            <div className="w-5/6 relative">
              <div className="flex justify-between absolute w-full">
                {monthLabels.map((month, idx) => (
                  <div 
                    key={month}
                    className="text-xs text-gray-500 font-medium"
                    style={{ position: 'absolute', left: `${calculateLeftPercentage(startOfMonth(new Date(2025, idx + 1, 1)))}%` }}
                  >
                    {month}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative overflow-x-auto">
          {monthBoundaries.map((month, idx) => (
            <div 
              key={`month-line-${idx}`}
              className="absolute h-full border-l border-gray-200"
              style={{ 
                left: `${month.left}%`,
                top: 0,
                bottom: 0,
                zIndex: 1
              }}
            />
          ))}
          
          <div 
            className="absolute h-full border-l-2 border-red-500 z-10"
            style={{ 
              left: `${todayPosition}%`,
              top: 0,
              bottom: 0
            }}
          >
            <div className="absolute -left-[26px] -top-6 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
              Today
            </div>
          </div>
          
          <div className="relative">
            {renderDependencyLines()}
          </div>
          
          {journeyMilestones.map((milestone, index) => {
            const leftPos = calculateLeftPercentage(milestone.startDate);
            const barWidth = calculateWidthPercentage(milestone.startDate, milestone.endDate);
            
            return (
              <div key={milestone.stage} className={cn(
                "flex items-start py-4 border-b border-gray-100",
                milestone.currentPosition && "bg-blue-50"
              )}>
                <div className="w-1/6 pr-2 flex items-start">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="mr-2">{milestone.icon}</span>
                      <h3 className="text-sm font-medium text-gray-900">
                        {milestone.label}
                        {milestone.currentPosition && 
                          <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full whitespace-nowrap">
                            You are here
                          </span>
                        }
                      </h3>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="w-5/6 relative h-14">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        className="absolute h-10 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md"
                        style={{ 
                          left: `${leftPos}%`, 
                          width: `${barWidth}%`, 
                          top: '8px',
                          backgroundColor: milestone.completed ? 'transparent' : 
                                          milestone.inProgress ? 'transparent' : 
                                          '#f3f4f6'
                        }}
                      >
                        <div className="w-full h-full rounded-lg overflow-hidden bg-gray-100">
                          <div 
                            className={cn(
                              "h-full rounded-lg transition-all",
                              milestone.completed ? `bg-${milestone.color}-500` :
                              milestone.inProgress && milestone.progressPercent ? `bg-${milestone.color}-500` :
                              milestone.inProgress ? `bg-${milestone.color}-200` : 
                              "bg-gray-200"
                            )}
                            style={{ 
                              width: milestone.inProgress && milestone.progressPercent ? 
                                    `${milestone.progressPercent}%` : '100%',
                              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
                            }}
                          >
                            {barWidth > 15 && (
                              <div className="absolute inset-0 flex items-center justify-start px-3">
                                <span className={cn(
                                  "text-xs font-medium whitespace-nowrap",
                                  milestone.completed || 
                                  (milestone.inProgress && milestone.progressPercent > 50) ? 
                                  "text-white" : "text-gray-700"
                                )}>
                                  {format(milestone.startDate, 'MMM d')} - {format(milestone.endDate, 'MMM d')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="p-0 overflow-hidden">
                      <div className="p-3 max-w-xs">
                        <div className="font-medium mb-1">{milestone.label} (Stage {milestone.stage})</div>
                        <div className="text-sm mb-2">{milestone.description}</div>
                        <div className="flex items-center text-xs text-gray-500 mb-1">
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          {format(milestone.startDate, 'MMMM d, yyyy')} - {format(milestone.endDate, 'MMMM d, yyyy')}
                        </div>
                        
                        {milestone.dependencies.length > 0 && (
                          <div className="text-xs text-gray-500 mb-1">
                            Depends on: {milestone.dependencies.map(d => `Stage ${d}`).join(', ')}
                          </div>
                        )}
                        
                        {milestone.inProgress && (
                          <div className="mt-2">
                            <div className="text-xs mb-1">Progress: {milestone.progressPercent}%</div>
                            <Progress value={milestone.progressPercent} className="h-2" />
                          </div>
                        )}
                        
                        {milestone.highlight && (
                          <div className={`mt-2 p-2 bg-${milestone.highlight.color}-50 rounded-sm border border-${milestone.highlight.color}-100 text-xs text-${milestone.highlight.color}-700`}>
                            {milestone.highlight.text}
                          </div>
                        )}
                      </div>
                      
                      {milestone.completed && (
                        <div className="bg-green-500 text-white text-xs py-1 px-3 font-medium text-center">
                          Completed
                        </div>
                      )}
                      
                      {milestone.inProgress && (
                        <div className="bg-blue-500 text-white text-xs py-1 px-3 font-medium text-center">
                          In Progress
                        </div>
                      )}
                      
                      {!milestone.completed && !milestone.inProgress && (
                        <div className="bg-gray-500 text-white text-xs py-1 px-3 font-medium text-center">
                          Upcoming
                        </div>
                      )}
                    </TooltipContent>
                  </Tooltip>
                  
                  {barWidth <= 15 && (
                    <div className="absolute text-xs text-gray-500" style={{ left: `${leftPos + barWidth + 0.5}%`, top: '10px' }}>
                      {format(milestone.startDate, 'MM/dd')}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 flex flex-wrap gap-4 justify-start">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
            <span className="text-xs text-gray-600">Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-200 rounded-sm mr-2 relative">
              <div className="w-1/3 h-full bg-blue-500 rounded-sm"></div>
            </div>
            <span className="text-xs text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-200 rounded-sm mr-2"></div>
            <span className="text-xs text-gray-600">Upcoming</span>
          </div>
          <div className="flex items-center ml-4">
            <div className="h-3 w-px bg-red-500 mr-2"></div>
            <span className="text-xs text-gray-600">Today</span>
          </div>
          <div className="flex items-center ml-4">
            <div className="h-0.5 w-5 bg-amber-300 dashed mr-2"></div>
            <span className="text-xs text-gray-600">Dependencies</span>
          </div>
        </div>
        
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p className="text-sm text-gray-700 italic">
            "Small changes consistently applied create remarkable results over time."
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default JourneySoFarSection;
