
import React from 'react';

interface HighlightBoxProps {
  highlight?: string;
}

export const HighlightBox: React.FC<HighlightBoxProps> = ({ highlight }) => {
  if (!highlight) return null;
  
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-blue-700 text-sm">
      <div className="font-medium text-xs text-blue-800 mb-1">Key Observation</div>
      <div>{highlight}</div>
    </div>
  );
};
