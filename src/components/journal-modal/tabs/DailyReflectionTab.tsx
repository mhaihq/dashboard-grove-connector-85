
import React from 'react';
import { HighlightBox } from '../HighlightBox';

interface DailyReflectionTabProps {
  title: string;
  content: string;
  highlight?: string;
}

export const DailyReflectionTab: React.FC<DailyReflectionTabProps> = ({ 
  title, 
  content,
  highlight 
}) => {
  return (
    <div className="text-left">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">{title}</h2>
        <p className="text-gray-600 whitespace-pre-line text-sm">{content}</p>
      </div>
      
      <HighlightBox highlight={highlight} />
    </div>
  );
};
