
import React from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Heart, Moon, Award, Target } from 'lucide-react';

interface JournalEntryProps {
  date: string;
  timestamp: string;
  title: string;
  content: string;
  highlight?: string;
  expanded?: boolean;
}

export const JournalEntry: React.FC<JournalEntryProps> = ({
  date,
  timestamp,
  title,
  content,
  highlight,
  expanded = false,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(expanded);
  
  const categories = [
    { icon: <Heart className="w-4 h-4 text-pink-500" />, label: 'Daily Reflection' },
    { icon: <Award className="w-4 h-4 text-amber-500" />, label: 'Mood & Energy' },
    { icon: <Moon className="w-4 h-4 text-indigo-500" />, label: 'Sleep' },
    { icon: <Award className="w-4 h-4 text-green-500" />, label: 'Achievements' },
    { icon: <Target className="w-4 h-4 text-blue-500" />, label: 'Goals' },
  ];
  
  const activeCategory = 0; // Index of active category (Daily Reflection)
  
  return (
    <div className={cn(
      "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 animate-slide-up delay-200",
      isExpanded ? "my-6" : "my-4"
    )}>
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="text-blue-500">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-900">{date}</span>
              <span className="text-xs text-gray-500">{timestamp}</span>
            </div>
          </div>
        </div>
        <svg 
          className={cn(
            "w-5 h-5 text-gray-500 transition-transform duration-300",
            isExpanded ? "transform rotate-180" : ""
          )} 
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      
      {isExpanded && (
        <div className="p-5 border-t border-gray-100">
          <div className="mb-5">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Mental Health Journal</h3>
            <div className="text-sm text-gray-500 mb-4">{date}</div>
            
            <div className="flex gap-2 flex-wrap mb-6">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={cn(
                    "focus-pill",
                    index === activeCategory ? "focus-pill-active" : "focus-pill-inactive"
                  )}
                >
                  {category.icon}
                  <span className="ml-1">{category.label}</span>
                </button>
              ))}
            </div>
            
            <div className="mb-6">
              <h4 className="text-base font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                {title}
              </h4>
              <p className="text-gray-700 leading-relaxed">{content}</p>
            </div>
            
            {highlight && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-4">
                <div className="font-medium text-sm text-blue-800 mb-2">Highlight</div>
                <div className="text-blue-700">{highlight}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalEntry;
