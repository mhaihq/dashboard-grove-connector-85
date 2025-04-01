
import React from 'react';
import { JournalEntryType } from '@/types/journal';
import { HighlightBox } from '../HighlightBox';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface GoalsTabProps {
  content: string;
  goals?: JournalEntryType['goals'];
  highlight?: string;
}

export const GoalsTab: React.FC<GoalsTabProps> = ({ 
  content, 
  goals,
  highlight 
}) => {
  // New helper function to get goal icon based on category
  const getGoalIcon = (title?: string) => {
    if (!title) return "🎯";
    if (title.toLowerCase().includes("sleep")) return "💧";
    if (title.toLowerCase().includes("stress") || title.toLowerCase().includes("mood")) return "🧠";
    if (title.toLowerCase().includes("exercise") || title.toLowerCase().includes("walk")) return "🏃";
    if (title.toLowerCase().includes("water") || title.toLowerCase().includes("hydration")) return "💦";
    if (title.toLowerCase().includes("energy")) return "⚡";
    if (title.toLowerCase().includes("alcohol")) return "🍷";
    return "🎯";
  };

  return (
    <div className="text-left">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Goals & Momentum</h2>
        <p className="text-gray-600 whitespace-pre-line text-sm">{content}</p>
        
        {goals && (
          <div className="mt-4 space-y-3">
            {goals.map((goal, idx) => (
              <Card key={idx} className={`${goal.completed ? 'bg-[#F6FFF2] border-green-100' : 'bg-[#F9F9F9] border-gray-100'}`}>
                <CardContent className="pt-4 p-4">
                  <div className="flex items-start gap-2">
                    <div className="text-xl mt-0.5">{getGoalIcon(goal.title)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium text-gray-800">{goal.title || "Goal"}</h3>
                        {goal.completed ? (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Completed</span>
                        ) : (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Momentum building...</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{goal.description || "In progress"}</p>
                      
                      {!goal.completed && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="mt-2 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-400 h-full rounded-full" style={{ width: '60%' }}></div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">3 of 5 days reported</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {!goals && (
          <div className="mt-4 space-y-3">
            <Card className="bg-[#F9F9F9] border-gray-100">
              <CardContent className="pt-4 p-4">
                <div className="flex items-start gap-2">
                  <div className="text-xl mt-0.5">🏃</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-medium text-gray-800">Better Exercise Routine</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Started this week</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">Add more structured activity alongside daily walks</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="mt-2 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-400 h-full rounded-full" style={{ width: '40%' }}></div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">2 of 5 days reported</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#F6FFF2] border-green-100">
              <CardContent className="pt-4 p-4">
                <div className="flex items-start gap-2">
                  <div className="text-xl mt-0.5">💧</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-medium text-gray-800">Daily Water Intake</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">4 of 7 days</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">Maintain current 8-glass daily hydration goal</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="mt-2 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-green-400 h-full rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Supports: Afternoon Energy Boost</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <HighlightBox highlight={highlight} />
    </div>
  );
};
