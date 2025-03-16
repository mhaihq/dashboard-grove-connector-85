
import React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Clock, Mic, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

interface AppointmentSchedulerProps {
  name: string;
  appointmentTitle: string;
  duration: string;
  features: string[];
  message: string;
  callToAction: string;
}

export const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  name,
  appointmentTitle,
  duration,
  features,
  message,
  callToAction,
}) => {
  const featureIcons = {
    voice: <Mic className="w-4 h-4 text-green-500" />,
    personalized: <ShieldCheck className="w-4 h-4 text-green-500" />,
    confidential: <ShieldCheck className="w-4 h-4 text-green-500" />
  };
  
  const currentDate = new Date();
  const currentMonth = format(currentDate, 'MMMM yyyy');
  
  // Generate days of the month for our calendar
  const days = [];
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }
  
  // Demo selected dates
  const selectedDates = [16, 18, 20, 22, 24, 26, 31];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm animate-slide-up delay-300">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 bg-hana-green rounded-full flex items-center justify-center">
            <span className="text-white font-medium">H</span>
          </div>
          <div>
            <h3 className="text-lg font-medium">Hi, {name}</h3>
            <h2 className="text-xl font-semibold text-hana-green">{appointmentTitle}</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-5 text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
        
        <p className="text-gray-700 mb-5">{message}</p>
        
        <div className="space-y-3 mb-6">
          {features.map((feature, index) => {
            const featureKey = feature.toLowerCase().includes('voice') ? 'voice' : 
                             feature.toLowerCase().includes('personalized') ? 'personalized' : 'confidential';
            
            return (
              <div key={index} className="flex items-center gap-2">
                {featureIcons[featureKey as keyof typeof featureIcons]}
                <span className="text-gray-700">{feature}</span>
              </div>
            );
          })}
        </div>
        
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mb-6">
          <p className="text-amber-800 text-sm">If in crisis, please contact emergency services.</p>
        </div>
        
        <p className="text-gray-700 mb-2">{callToAction}</p>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm animate-slide-up delay-400">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">March 2025</h3>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-4 text-center mb-4">
          {weekdays.map((day, index) => (
            <div key={index} className="text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2 text-center">
          {days.map((day) => {
            const isSelected = selectedDates.includes(day);
            const isPast = day < currentDate.getDate();
            
            return (
              <button
                key={day}
                disabled={isPast}
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center text-sm transition-all",
                  isSelected && !isPast ? "bg-black text-white" : 
                  isPast ? "text-gray-300" : 
                  "hover:bg-gray-100 text-gray-900"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
        
        <div className="mt-8 border-t border-gray-100 pt-5">
          <div className="mb-4">
            <div className="text-sm text-gray-500">Default Timezone:</div>
            <div className="flex items-center">
              <span className="font-medium">Europe/Dublin</span>
              <button className="ml-2 text-gray-400">
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500">Current Time:</div>
            <div className="font-medium">{format(new Date(), 'h:mma')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
