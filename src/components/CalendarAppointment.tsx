
import React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { PhoneCall, PhoneMissed, Clock, Repeat, Calendar, Bell, CheckCircle2, Milestone, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface CalendarAppointmentProps {
  date: Date;
  time?: string;
  status: 'booked' | 'missed' | 'completed' | 'upcoming' | 'current' | 'inProgress';
  recurrenceType?: string;
  recurrenceFrequency?: string;
  title?: string;
  description?: string;
  stage?: number;
  icon?: React.ReactNode;
  highlight?: {
    text: string;
    color: string;
  };
  startDate?: Date;
  endDate?: Date;
  dependencies?: number[];
  progressPercent?: number;
  isGanttView?: boolean;
}

export const CalendarAppointment: React.FC<CalendarAppointmentProps> = ({
  date,
  time,
  status,
  recurrenceType,
  recurrenceFrequency,
  title,
  description,
  stage,
  icon,
  highlight,
  startDate,
  endDate,
  dependencies,
  progressPercent = 0,
  isGanttView = false
}) => {
  const isPast = date < new Date();
  const isToday = new Date().toDateString() === date.toDateString();
  
  const getStatusIcon = () => {
    if (icon) return icon;
    if (status === 'missed') return <PhoneMissed className="h-5 w-5 text-red-500" />;
    if (status === 'completed') return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (status === 'current') return <Milestone className="h-5 w-5 text-blue-500" />;
    if (status === 'inProgress') return <Milestone className="h-5 w-5 text-blue-500" />;
    if (isToday) return <Bell className="h-5 w-5 text-amber-500" />;
    return <PhoneCall className="h-5 w-5 text-green-500" />;
  };
  
  const getStatusText = () => {
    if (status === 'missed') return 'Missed';
    if (status === 'completed') return 'Completed';
    if (status === 'current') return 'Current';
    if (status === 'inProgress') return 'In Progress';
    if (isToday) return 'Today';
    if (isPast) return 'Completed';
    return 'Upcoming';
  };

  // If this component is being used in Gantt view, use special styling
  if (isGanttView) {
    const dateRangeText = startDate && endDate 
      ? `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}`
      : format(date, 'MMMM d, yyyy');
    
    return (
      <div className={cn(
        "rounded-md p-2 transition-all",
        status === 'completed' ? "bg-green-500 text-white" : 
        status === 'inProgress' ? "bg-blue-200" :
        "bg-gray-200"
      )}>
        {/* Progress indicator for in-progress items */}
        {status === 'inProgress' && progressPercent > 0 && (
          <div className="relative h-full w-full">
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-l-md"
              style={{ width: `${progressPercent}%` }}
            />
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-medium">{title || dateRangeText}</span>
              {stage && (
                <span className="text-xs font-medium bg-white/30 px-1 rounded">
                  {stage}
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Simple content for non-progress items */}
        {status !== 'inProgress' && (
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">{title || dateRangeText}</span>
            {stage && (
              <span className="text-xs font-medium bg-white/30 px-1 rounded">
                {stage}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Regular calendar appointment card
  return (
    <div className={cn(
      "border rounded-lg p-4 transition-all hover:shadow-md",
      status === 'missed' ? "border-red-200 bg-red-50" : 
      status === 'current' ? "border-blue-200 bg-blue-50" :
      status === 'inProgress' ? "border-blue-200 bg-blue-50" :
      isToday ? "border-amber-200 bg-amber-50" :
      isPast || status === 'completed' ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
    )}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          {getStatusIcon()}
          <span className={cn(
            "ml-2 text-sm font-medium px-2 py-0.5 rounded-full",
            status === 'missed' ? "bg-red-100 text-red-800" : 
            status === 'current' ? "bg-blue-100 text-blue-800" :
            status === 'inProgress' ? "bg-blue-100 text-blue-800" :
            isToday ? "bg-amber-100 text-amber-800" :
            isPast || status === 'completed' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          )}>
            {getStatusText()}
          </span>
          {stage && (
            <span className="ml-2 bg-gray-100 text-gray-800 text-sm font-medium px-2 py-0.5 rounded-full">
              Stage {stage}
            </span>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        {title && (
          <h3 className="font-medium text-gray-900">{title}</h3>
        )}
        
        {description && (
          <p className="text-sm text-gray-700">{description}</p>
        )}
        
        {/* Show date range if provided */}
        {startDate && endDate ? (
          <div className="flex items-center text-gray-700">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
            <span className="text-sm">
              {format(startDate, 'MMMM d, yyyy')} - {format(endDate, 'MMMM d, yyyy')}
            </span>
          </div>
        ) : (
          <div className="flex items-center text-gray-700">
            <Calendar className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
            <span className="text-sm">{format(date, 'MMMM d, yyyy')}</span>
          </div>
        )}
        
        {time && (
          <div className="flex items-center text-gray-700">
            <Clock className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
            <span className="text-sm">{time}</span>
          </div>
        )}
        
        {recurrenceType === 'recurring' && recurrenceFrequency && (
          <div className="flex items-center text-gray-700">
            <Repeat className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
            <span className="text-sm">Repeats {recurrenceFrequency}</span>
          </div>
        )}
        
        {/* Show dependencies if provided */}
        {dependencies && dependencies.length > 0 && (
          <div className="flex items-center text-gray-700">
            <Milestone className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
            <span className="text-sm">Depends on: Stage {dependencies.join(', Stage ')}</span>
          </div>
        )}
        
        {/* Show progress if provided and in progress */}
        {status === 'inProgress' && (
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        )}
      </div>
      
      {highlight && (
        <div className={`mt-3 bg-${highlight.color}-50 border border-${highlight.color}-100 rounded-md p-2`}>
          <p className={`text-xs text-${highlight.color}-700`}>
            {highlight.text}
          </p>
        </div>
      )}
      
      {!isPast && status !== 'missed' && status !== 'completed' && status !== 'current' && status !== 'inProgress' && (
        <div className="mt-3 flex justify-end gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-300 text-gray-700"
          >
            Reschedule
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            Cancel
          </Button>
        </div>
      )}
      
      {status === 'missed' && (
        <div className="mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-green-300 text-green-700 hover:bg-green-50"
          >
            <PhoneCall className="h-4 w-4 mr-2" />
            Reschedule
          </Button>
        </div>
      )}
    </div>
  );
};

export default CalendarAppointment;
