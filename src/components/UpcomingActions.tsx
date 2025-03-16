
import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Action {
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

interface UpcomingActionsProps {
  actions: Action[];
}

export const UpcomingActions: React.FC<UpcomingActionsProps> = ({ actions }) => {
  return (
    <div className="space-y-3">
      {actions.map((action, index) => (
        <div key={index} className="border rounded-lg p-3 hover-scale group cursor-pointer">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
              <p className="text-xs text-gray-600 mb-2">{action.description}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-hana-green transition-colors" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5 mr-1" />
              Due in {action.dueDate}
            </div>
            <span 
              className={cn(
                "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
                action.priority === 'high' ? "bg-red-100 text-red-800" :
                action.priority === 'medium' ? "bg-amber-100 text-amber-800" :
                "bg-blue-100 text-blue-800"
              )}
            >
              {action.priority === 'high' ? 'High' : 
               action.priority === 'medium' ? 'Medium' : 'Low'} Priority
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingActions;
