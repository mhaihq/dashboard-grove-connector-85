
import React from 'react';
import { ScrollText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface JournalEntry {
  text: string;
  status: 'positive' | 'neutral' | 'negative';
}

interface ProgressJournalProps {
  entries: JournalEntry[];
}

export const ProgressJournal: React.FC<ProgressJournalProps> = ({ entries }) => {
  const getStatusIcon = (status: 'positive' | 'neutral' | 'negative') => {
    switch (status) {
      case 'positive':
        return '🟢';
      case 'neutral':
        return '🟡';
      case 'negative':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <ScrollText className="w-5 h-5 text-hana-green mr-2" />
          Progress Journal
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-3">
        <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2">
          {entries.map((entry, index) => (
            <div key={index} className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(entry.status)}
              </div>
              <p className="text-sm text-gray-700">{entry.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressJournal;
