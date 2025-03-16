
import React from 'react';
import { JournalEntryType } from '@/types/journal';
import { HighlightBox } from '../HighlightBox';
import { Card, CardContent } from '@/components/ui/card';

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
  return (
    <div className="text-left">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Goals & Intentions</h2>
        <p className="text-gray-600 whitespace-pre-line text-sm">{content}</p>
        
        {goals && (
          <div className="mt-4 space-y-3">
            {goals.map((goal, idx) => (
              <Card key={idx} className={`${goal.completed ? 'bg-[#F6FFF2] border-green-100' : 'bg-[#F9F9F9] border-gray-100'}`}>
                <CardContent className="pt-4 p-4">
                  <div className="flex items-start gap-2">
                    <div className="text-xl mt-0.5">{goal.completed ? '✅' : '🎯'}</div>
                    <div>
                      <h3 className="text-base font-medium text-gray-800">{goal.title || "Goal"}</h3>
                      <p className="text-sm text-gray-700">{goal.description || "In progress"}</p>
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
                  <div className="text-xl mt-0.5">🎯</div>
                  <div>
                    <h3 className="text-base font-medium text-gray-800">Regular Exercise</h3>
                    <p className="text-sm text-gray-700">Add more structured activity alongside daily walks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#F6FFF2] border-green-100">
              <CardContent className="pt-4 p-4">
                <div className="flex items-start gap-2">
                  <div className="text-xl mt-0.5">✅</div>
                  <div>
                    <h3 className="text-base font-medium text-gray-800">Daily Walks</h3>
                    <p className="text-sm text-gray-700">Maintain current 20-minute daily walks</p>
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
