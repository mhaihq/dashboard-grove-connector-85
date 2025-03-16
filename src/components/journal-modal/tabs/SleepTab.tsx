
import React from 'react';
import { JournalEntryType } from '@/types/journal';
import { HighlightBox } from '../HighlightBox';
import { Card, CardContent } from '@/components/ui/card';

interface SleepTabProps {
  content: string;
  sleep?: JournalEntryType['sleep'];
  highlight?: string;
}

export const SleepTab: React.FC<SleepTabProps> = ({ 
  content, 
  sleep,
  highlight 
}) => {
  return (
    <div className="text-left">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Sleep Quality</h2>
        <p className="text-gray-600 whitespace-pre-line text-sm">{content}</p>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="bg-[#F0EEFF] border-indigo-100">
            <CardContent className="pt-4 p-4">
              <div className="text-3xl mb-2">😴</div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">Sleep Duration</h3>
              <p className="text-sm text-gray-700">
                {sleep?.duration || "7 hours (average)"}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#E6F7FF] border-blue-100">
            <CardContent className="pt-4 p-4">
              <div className="text-3xl mb-2">🌙</div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">Sleep Quality</h3>
              <p className="text-sm text-gray-700">
                {sleep?.quality || "Improved from previous weeks"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <HighlightBox highlight={highlight} />
    </div>
  );
};
