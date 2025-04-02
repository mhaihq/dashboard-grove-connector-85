
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
  // Get current date and set date range for the Gantt chart
  const today = new Date();
  const [calendarDate, setCalendarDate] = useState(today);
  
  // Define start and end dates for the Gantt chart (past 2 months to future 4 months)
  const startDate = new Date(2025, 1, 1); // Feb 1, 2025
  const endDate = new Date(2025, 7, 31);  // Aug 31, 2025
  
  // Define the milestone stages for the health journey roadmap
  const journeyMilestones = [
    {
      stage: 1,
      label: "Intake Complete",
      description: "Initial assessment done. We know your baseline.",
      startDate: new Date(2025, 1, 13), // Feb 13, 2025
      endDate: new Date(2025, 1, 19),   // Feb 19, 2025
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      completed: true,
      color: "green",
      dependencies: []
    },
    {
      stage: 2,
      label: "AI Follow-Ups Started",
      description: "You're now receiving weekly check-ins.",
      startDate: new Date(2025, 1, 20), // Feb 20, 2025
      endDate: new Date(2025, 2, 5),    // March 5, 2025
      icon: <CalendarIcon className="w-5 h-5 text-blue-500" />,
      completed: true,
      color: "blue",
      dependencies: [1]
    },
    {
      stage: 3,
      label: "First Habit Momentum",
      description: "You're showing consistency with morning walks (5-day streak).",
      startDate: new Date(2025, 2, 1),  // March 1, 2025
      endDate: new Date(2025, 2, 10),   // March 10, 2025
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
      startDate: new Date(2025, 2, 5),  // March 5, 2025
      endDate: new Date(2025, 2, 15),   // March 15, 2025
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
      startDate: new Date(2025, 2, 15), // March 15, 2025
      endDate: new Date(2025, 3, 15),   // April 15, 2025
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
      startDate: new Date(2025, 3, 1),  // April 1, 2025
      endDate: new Date(2025, 4, 15),   // May 15, 2025
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
      startDate: new Date(2025, 4, 1),  // May 1, 2025
      endDate: new Date(2025, 5, 15),   // June 15, 2025
      icon: <Milestone className="w-5 h-5 text-blue-500" />,
      completed: false,
      color: "blue",
      dependencies: [6],
      progressPercent: 0
    }
  ];

  // Calculate the user's current position in the journey
  const currentStage = 5; // They've completed stages 1-4 and are on stage 5
  const progressPercentage = (currentStage / journeyMilestones.length) * 100;
  
  // Helper to calculate width percentage for Gantt bars based on date range
  const calculateWidthPercentage = (start: Date, end: Date) => {
    const totalDuration = endDate.getTime() - startDate.getTime();
    const taskStart = Math.max(start.getTime(), startDate.getTime());
    const taskEnd = Math.min(end.getTime(), endDate.getTime());
    const taskDuration = taskEnd - taskStart;
    
    return (taskDuration / totalDuration) * 100;
  };
  
  // Helper to calculate left position percentage for Gantt bars
  const calculateLeftPercentage = (start: Date) => {
    const totalDuration = endDate.getTime() - startDate.getTime();
    const taskStartOffset = Math.max(start.getTime() - startDate.getTime(), 0);
    
    return (taskStartOffset / totalDuration) * 100;
  };
  
  // Generate month labels for the timeline
  const monthLabels = [];
  let currentMonth = startOfMonth(startDate);
  const lastMonth = startOfMonth(endDate);
  
  while (currentMonth <= lastMonth) {
    monthLabels.push(format(currentMonth, 'MMM yyyy'));
    currentMonth = startOfMonth(addDays(endOfMonth(currentMonth), 1));
  }
  
  // Prepare month boundaries for grid lines
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
  
  // Calculate the position of "today" marker
  const todayPosition = calculateLeftPercentage(today);
  
  // Function to handle dependency lines
  const renderDependencyLines = () => {
    return journeyMilestones.map(milestone => {
      return milestone.dependencies.map(depId => {
        const dependencyMilestone = journeyMilestones.find(m => m.stage === depId);
        if (!dependencyMilestone) return null;
        
        // Calculate positions
        const fromX = calculateLeftPercentage(dependencyMilestone.endDate);
        const toX = calculateLeftPercentage(milestone.startDate);
        const fromY = (dependencyMilestone.stage - 1) * 100 + 50; // Center of dependency milestone
        const toY = (milestone.stage - 1) * 100 + 50; // Center of current milestone
        
        // Simple straight line for now
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
        {/* Progress indicator */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Your Journey Progress</span>
            <span className="text-sm text-gray-500">{currentStage} of {journeyMilestones.length} milestones</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        {/* Gantt Chart Timeline Header */}
        <div className="relative mb-2 mt-8 border-b border-gray-200">
          <div className="flex">
            {/* Left sidebar for milestone names */}
            <div className="w-1/3 pr-4 flex-shrink-0">
              <div className="h-8 font-medium text-sm text-gray-700">Milestone</div>
            </div>
            
            {/* Timeline header with month labels */}
            <div className="w-2/3 relative">
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
        
        {/* Gantt Chart Container */}
        <div className="relative overflow-x-auto">
          {/* Month boundary lines */}
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
          
          {/* Today marker */}
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
          
          {/* Render dependency lines */}
          <div className="relative">
            {renderDependencyLines()}
          </div>
          
          {/* Milestone rows */}
          {journeyMilestones.map((milestone, index) => {
            const leftPos = calculateLeftPercentage(milestone.startDate);
            const barWidth = calculateWidthPercentage(milestone.startDate, milestone.endDate);
            
            return (
              <div key={milestone.stage} className={cn(
                "flex items-start py-4 border-b border-gray-100",
                milestone.currentPosition && "bg-blue-50"
              )}>
                {/* Left sidebar with milestone info */}
                <div className="w-1/3 pr-4 flex items-start">
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full mr-3 flex-shrink-0",
                    milestone.completed ? `bg-${milestone.color}-100 text-${milestone.color}-500` : 
                    milestone.inProgress ? `bg-${milestone.color}-100 text-${milestone.color}-500` :
                    "bg-gray-100 text-gray-500"
                  )}>
                    <span className="text-sm font-bold">{milestone.stage}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium text-gray-900 flex items-center">
                      {milestone.label}
                      {milestone.currentPosition && 
                        <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full whitespace-nowrap">
                          You are here
                        </span>
                      }
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5">{milestone.description}</p>
                  </div>
                </div>
                
                {/* Right side with Gantt bar */}
                <div className="w-2/3 relative h-14">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        className={cn(
                          "absolute h-8 rounded-md transition-all hover:brightness-95",
                          milestone.completed ? `bg-${milestone.color}-500` :
                          milestone.inProgress ? `bg-${milestone.color}-200` :
                          "bg-gray-200"
                        )}
                        style={{ 
                          left: `${leftPos}%`, 
                          width: `${barWidth}%`, 
                          top: '10px'
                        }}
                      >
                        {/* Progress indicator for in-progress tasks */}
                        {milestone.inProgress && milestone.progressPercent > 0 && (
                          <div 
                            className={`h-full rounded-l-md bg-${milestone.color}-500`}
                            style={{ width: `${milestone.progressPercent}%` }}
                          />
                        )}
                        
                        {/* Label inside the bar if enough width */}
                        {barWidth > 15 && (
                          <div className="absolute inset-0 flex items-center justify-start px-3">
                            <span className={cn(
                              "text-xs font-medium whitespace-nowrap",
                              milestone.completed || milestone.inProgress ? "text-white" : "text-gray-700"
                            )}>
                              {format(milestone.startDate, 'MMM d')} - {format(milestone.endDate, 'MMM d')}
                            </span>
                          </div>
                        )}
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
                            <Progress value={milestone.progressPercent} className="h-1.5" />
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
                  
                  {/* Date labels if bar is too small */}
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
        
        {/* Legend */}
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
        
        {/* Quote at the bottom */}
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
