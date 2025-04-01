
import React from 'react';
import { FileText } from 'lucide-react';

interface BackgroundSectionProps {
  background: string[];
}

export const BackgroundSection: React.FC<BackgroundSectionProps> = ({ background }) => {
  return (
    <div className="border border-gray-100 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
        <FileText className="h-4 w-4 text-gray-500" />
        Background
      </h4>
      <ul className="text-sm space-y-2 list-disc list-inside">
        {background.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
