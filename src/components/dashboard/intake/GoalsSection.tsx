
import React from 'react';
import { FileCheck } from 'lucide-react';

interface GoalsSectionProps {
  goals: string[];
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({ goals }) => {
  // Calculate a "start date" for display purposes (60 days ago)
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 60);
  const formattedStartDate = startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();

  return (
    <div className="border border-gray-100 rounded-lg bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-3 bg-gray-50 border-b border-gray-100">
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          <div className="bg-green-50 p-1.5 rounded-full">
            <FileCheck className="h-4 w-4 text-green-500" />
          </div>
          Primary Goals
        </h4>
      </div>
      
      {/* Streaks App Style - "Since" Header */}
      <div className="bg-gray-50 p-3 border-b border-gray-200">
        <p className="text-center text-base font-bold text-gray-800">SINCE {formattedStartDate}</p>
        <div className="flex justify-center space-x-2 mt-2">
          {goals.slice(0, Math.min(5, goals.length)).map((_, idx) => (
            <div key={idx} className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
              {idx === 0 ? '💤' : idx === 1 ? '😌' : idx === 2 ? '🍷' : idx === 3 ? '💼' : '🏃‍♂️'}
            </div>
          ))}
        </div>
      </div>
      
      {/* Goal List */}
      <div className="p-3 space-y-2.5">
        {goals.map((goal, index) => (
          <div key={index} className="flex items-start">
            <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs mr-2 mt-0.5 font-medium">
              {index + 1}
            </div>
            <p className="text-sm text-gray-700">{goal}</p>
          </div>
        ))}
      </div>
      
      {/* Streaks App Style - Stats Summary */}
      <div className="grid grid-cols-3 border-t border-gray-200 bg-gray-50">
        <div className="p-2 text-center border-r border-gray-200">
          <p className="text-lg font-bold text-gray-800">0</p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Current</p>
        </div>
        <div className="p-2 text-center border-r border-gray-200">
          <p className="text-lg font-bold text-gray-800">0%</p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Success</p>
        </div>
        <div className="p-2 text-center">
          <p className="text-lg font-bold text-gray-800">0</p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Actions</p>
        </div>
      </div>
    </div>
  );
};
