
import React from 'react';
import { FileCheck } from 'lucide-react';

interface GoalsSectionProps {
  goals: string[];
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({ goals }) => {
  return (
    <div className="border border-gray-100 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
        <FileCheck className="h-4 w-4 text-green-500" />
        Primary Goals
      </h4>
      <ul className="text-sm space-y-2 list-disc list-inside">
        {goals.map((goal, index) => (
          <li key={index}>{goal}</li>
        ))}
      </ul>
    </div>
  );
};
