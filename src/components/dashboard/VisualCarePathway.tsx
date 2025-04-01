
import React from 'react';
import { cn } from '@/lib/utils';

interface VisualCarePathwayProps {
  currentLevel: 'self-help' | 'coaching' | 'therapy' | 'psychiatry';
}

export const VisualCarePathway: React.FC<VisualCarePathwayProps> = ({ 
  currentLevel 
}) => {
  const levels = [
    { id: 'self-help', label: 'Self-help', color: 'blue' },
    { id: 'coaching', label: 'Coaching', color: 'green' },
    { id: 'therapy', label: 'Therapy', color: 'purple' },
    { id: 'psychiatry', label: 'Psychiatry', color: 'red' }
  ];

  const getCurrentIndex = () => {
    return levels.findIndex(level => level.id === currentLevel);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        {levels.map((level, index) => {
          const currentIndex = getCurrentIndex();
          const isActive = index === currentIndex;
          const isPast = index < currentIndex;
          const isFuture = index > currentIndex;
          
          return (
            <div key={level.id} className="flex flex-col items-center relative flex-1">
              <div 
                className={cn(
                  "z-10 w-8 h-8 rounded-full flex items-center justify-center",
                  isActive && `bg-${level.color}-500 text-white`,
                  isPast && `bg-${level.color}-200 text-${level.color}-800`,
                  isFuture && "bg-gray-200 text-gray-500"
                )}
              >
                {index + 1}
              </div>
              
              <span 
                className={cn(
                  "text-xs font-medium mt-1",
                  isActive && `text-${level.color}-700`,
                  isPast && `text-${level.color}-500`,
                  isFuture && "text-gray-500"
                )}
              >
                {level.label}
              </span>
              
              {isActive && (
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded whitespace-nowrap">
                  You Are Here
                </span>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Connecting lines */}
      <div className="flex items-center justify-between relative h-0.5">
        {levels.map((level, index) => {
          if (index === levels.length - 1) return null;
          
          const currentIndex = getCurrentIndex();
          const isPast = index < currentIndex;
          
          return (
            <div 
              key={`line-${index}`} 
              className={cn(
                "flex-1 h-0.5",
                isPast ? `bg-${levels[index].color}-400` : "bg-gray-200"
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VisualCarePathway;
