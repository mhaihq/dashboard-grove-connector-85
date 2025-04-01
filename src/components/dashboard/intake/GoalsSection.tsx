
import React from 'react';
import { FileCheck } from 'lucide-react';

interface GoalsSectionProps {
  goals: string[];
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({ goals }) => {
  return (
    <div className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
        <div className="bg-green-50 p-1.5 rounded-full">
          <FileCheck className="h-4 w-4 text-green-500" />
        </div>
        Primary Goals
      </h4>
      <div className="space-y-2.5">
        {goals.map((goal, index) => (
          <div key={index} className="flex items-start">
            <div className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs mr-2 mt-0.5 font-medium">
              {index + 1}
            </div>
            <p className="text-sm text-gray-700">{goal}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
