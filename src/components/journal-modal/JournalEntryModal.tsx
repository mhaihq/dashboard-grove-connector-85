
import React from 'react';
import { JournalEntryType } from '@/types/journal';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Calendar } from 'lucide-react';
import { ModalHeader } from './ModalHeader';
import { JournalTabs } from './JournalTabs';

interface JournalEntryModalProps {
  entry: JournalEntryType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const JournalEntryModal: React.FC<JournalEntryModalProps> = ({
  entry,
  isOpen,
  onClose
}) => {
  if (!entry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">Journal Entry Details</DialogTitle>
        <DialogDescription className="sr-only">Detailed view of the selected journal entry</DialogDescription>
        
        <div className="bg-gray-50 p-4 flex items-center gap-2 text-blue-600">
          <Calendar className="w-5 h-5" />
          <span className="text-base font-medium">{entry.date} {entry.timestamp}</span>
        </div>
        
        <div className="p-6">
          <ModalHeader date={entry.date} />
          <JournalTabs entry={entry} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JournalEntryModal;
