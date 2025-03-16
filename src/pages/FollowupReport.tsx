
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { HealthJournalTable } from '@/components/HealthJournalTable';
import { JournalEntryModal } from '@/components/journal-modal/JournalEntryModal';
import { HealthJournalLayout } from '@/components/health-journal/HealthJournalLayout';
import { journalEntries } from '@/data/journalEntries';
import { JournalEntryType } from '@/types/journal';

const FollowupReport = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  
  const [selectedEntry, setSelectedEntry] = useState<JournalEntryType | null>(null);
  
  const handleOpenEntry = (entry: JournalEntryType) => {
    setSelectedEntry(entry);
  };

  const handleCloseModal = () => {
    setSelectedEntry(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <DashboardHeader 
          userName={userName} 
          userEmail={userEmail}
        />
        
        <main className="p-8">
          <HealthJournalLayout>
            <HealthJournalTable journalEntries={journalEntries} onViewEntry={handleOpenEntry} />
            
            <JournalEntryModal 
              entry={selectedEntry} 
              isOpen={!!selectedEntry} 
              onClose={handleCloseModal} 
            />
          </HealthJournalLayout>
        </main>
      </div>
    </div>
  );
};

export default FollowupReport;
