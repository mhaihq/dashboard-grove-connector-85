
import React from 'react';
import { FolderArchive, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { CollapsibleTrigger } from '@/components/ui/collapsible';

interface SummaryHeaderProps {
  date: string;
  isOpen: boolean;
}

export const SummaryHeader: React.FC<SummaryHeaderProps> = ({ date, isOpen }) => {
  return (
    <div className="border-b border-gray-100">
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          className="w-full flex justify-between items-center rounded-none p-4 h-auto"
        >
          <div className="flex items-center gap-2 text-left">
            <FolderArchive className="w-5 h-5 text-amber-500" />
            <div>
              <CardTitle className="text-lg">🗂 Your Wellness Baseline</CardTitle>
              <p className="text-sm text-gray-500">Completed {date}</p>
            </div>
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-500 shrink-0" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500 shrink-0" />
          )}
        </Button>
      </CollapsibleTrigger>
    </div>
  );
};
