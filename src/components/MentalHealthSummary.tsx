import React from 'react';
import { cn } from '@/lib/utils';
import { Clipboard, Heart, Briefcase, TrendingUp } from 'lucide-react';
interface SummaryItem {
  title: string;
  content: string[];
  type: 'notable' | 'joy' | 'weighing';
}
interface MentalHealthSummaryProps {
  userName: string;
  userEmail?: string;
  date: string;
  summaryItems: SummaryItem[];
}
export const MentalHealthSummary: React.FC<MentalHealthSummaryProps> = ({
  userName,
  userEmail,
  date,
  summaryItems
}) => {
  return <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm animate-slide-up text-left py-[67px] my-[38px]">
      
      
      <div className="text-sm text-gray-500 mb-3">{date}</div>
      
      <h1 className="text-3xl font-semibold text-gray-900 mb-1">Hi there, {userName}!</h1>
      {userEmail && <div className="text-gray-500 mb-6">{userEmail}</div>}
      
      <p className="text-gray-700 mb-8 max-w-2xl">
        I've noticed some really positive changes in your health journey! Here's what I'm seeing from our conversations and your journal. I'm so proud of the progress you're making.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryItems.map((item, index) => <div key={index} className={cn("bg-white rounded-lg border p-5 hover-scale text-left", item.type === 'notable' ? "border-blue-100" : item.type === 'joy' ? "border-green-100" : "border-amber-100")}>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              {item.type === 'notable' && <Briefcase className="h-4 w-4 text-blue-500" />}
              {item.type === 'joy' && <Heart className="h-4 w-4 text-green-500" />}
              {item.type === 'weighing' && <Clipboard className="h-4 w-4 text-amber-500" />}
              {item.title}
            </h3>
            <ul className="space-y-3">
              {item.content.map((point, pointIndex) => <li key={pointIndex} className="flex gap-3">
                  <span className={cn("flex-shrink-0 w-2 h-2 rounded-full mt-2", item.type === 'notable' ? "bg-blue-400" : item.type === 'joy' ? "bg-green-400" : "bg-amber-400")}></span>
                  <span className="text-gray-700">{point}</span>
                </li>)}
            </ul>
          </div>)}
      </div>
    </div>;
};
export default MentalHealthSummary;