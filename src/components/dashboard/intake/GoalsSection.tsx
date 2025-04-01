
import React from 'react';
import { FileCheck, Calendar, Award } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface GoalsSectionProps {
  goals: string[];
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({ goals }) => {
  // Group goals to match the weekly habit style
  const startDate = "Feb 15, 2025";
  
  return (
    <div className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          <div className="bg-green-50 p-1.5 rounded-full">
            <FileCheck className="h-4 w-4 text-green-500" />
          </div>
          This Week's Smart Goals
        </h4>
        <div className="text-xs text-gray-500 flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          <span>Since: {startDate}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {goals.map((goal, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
            <div className="flex items-start">
              <div className="w-7 h-7 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs mr-3 font-medium">
                {index + 1}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800">{goal}</h3>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-5 h-5 rounded-full flex items-center justify-center mr-1 ${
                              i < 3 ? "bg-green-400 text-white" : "bg-gray-200"
                            }`}
                          >
                            {i < 3 && "✓"}
                          </div>
                        ))}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-[200px]">
                        3 out of 5 action steps completed for this goal
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        ))}
        
        {/* Consistency Stats */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center">
              <Award className="w-4 h-4 text-amber-500 mr-1" />
              <span>Progress Score: <span className="font-medium">14 pts</span></span>
            </div>
            <span>3/4 goals on track</span>
          </div>
        </div>
      </div>
    </div>
  );
};
