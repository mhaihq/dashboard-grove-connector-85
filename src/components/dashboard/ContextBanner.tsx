
import React from 'react';
import { Info, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContextItem {
  text: string;
  type?: 'info' | 'warning' | 'success' | 'neutral';
}

interface ContextBannerProps {
  title: string;
  items: ContextItem[] | string[];
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'neutral';
  date?: string;
}

export const ContextBanner: React.FC<ContextBannerProps> = ({ 
  title, 
  items,
  icon = <Info className="h-5 w-5 text-blue-600" />,
  variant = 'primary',
  date
}) => {
  // Determine styling based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return "bg-blue-50 border-blue-100 text-blue-700";
      case 'secondary':
        return "bg-amber-50 border-amber-100 text-amber-700";
      case 'neutral':
        return "bg-gray-50 border-gray-100 text-gray-700";
      default:
        return "bg-blue-50 border-blue-100 text-blue-700";
    }
  };

  // Check if items are strings or ContextItems
  const isStringArray = (arr: any[]): arr is string[] => {
    return typeof arr[0] === 'string';
  };

  // Get icon color based on context item type
  const getItemTypeColor = (type?: 'info' | 'warning' | 'success' | 'neutral') => {
    switch (type) {
      case 'info':
        return "text-blue-600";
      case 'warning':
        return "text-amber-600";
      case 'success':
        return "text-green-600";
      case 'neutral':
        return "text-gray-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <div className={cn("p-4 border rounded-lg", getVariantStyles())}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-lg">{title}</h3>
            {date && (
              <div className="flex items-center text-xs gap-1 text-gray-600">
                <Clock className="h-3.5 w-3.5" />
                <span>{date}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            {isStringArray(items) ? (
              // If items is a string array
              items.map((item, idx) => (
                <p key={idx} className="text-sm">
                  • {item}
                </p>
              ))
            ) : (
              // If items is a ContextItem array
              items.map((item, idx) => (
                <p key={idx} className={cn("text-sm", getItemTypeColor(item.type))}>
                  • {item.text}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextBanner;
