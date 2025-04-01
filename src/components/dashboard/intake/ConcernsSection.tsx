
import React from 'react';
import { Calendar } from 'lucide-react';

interface ConcernsSectionProps {
  concerns: string[];
}

export const ConcernsSection: React.FC<ConcernsSectionProps> = ({ concerns }) => {
  return (
    <div className="border border-gray-100 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
        <Calendar className="h-4 w-4 text-blue-500" />
        Areas of Focus
      </h4>
      <ul className="text-sm space-y-2 list-disc list-inside">
        {concerns.map((concern, index) => (
          <li key={index}>{concern}</li>
        ))}
      </ul>
    </div>
  );
};
