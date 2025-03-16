
import React from 'react';
import { BookOpen, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface HealthJournalLayoutProps {
  children: React.ReactNode;
}

export const HealthJournalLayout: React.FC<HealthJournalLayoutProps> = ({ children }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2 text-left">
        <BookOpen className="w-5 h-5 text-hana-green" />
        Health Journal Entries
      </h1>
      
      <Alert className="mb-6 border-hana-green/20 bg-hana-green/10">
        <Info className="h-4 w-4 text-hana-green" />
        <AlertDescription className="text-left">
          These journal entries automatically update your dashboard summary, helping us track your progress and provide better support.
        </AlertDescription>
      </Alert>
      
      {children}
    </div>
  );
};

export default HealthJournalLayout;
