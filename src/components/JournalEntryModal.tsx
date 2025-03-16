
import React from 'react';
import { JournalEntryType } from '@/pages/FollowupReport';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from '@/components/ui/dialog';
import { Calendar, Heart, Moon, Award, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'daily':
        return <Heart className="w-5 h-5 text-pink-500" />;
      case 'mood':
        return <Award className="w-5 h-5 text-amber-500" />;
      case 'sleep':
        return <Moon className="w-5 h-5 text-indigo-500" />;
      case 'achievement':
        return <Award className="w-5 h-5 text-green-500" />;
      case 'goals':
        return <Target className="w-5 h-5 text-blue-500" />;
      default:
        return <Heart className="w-5 h-5 text-pink-500" />;
    }
  };
  
  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'daily':
        return 'Daily Reflection';
      case 'mood':
        return 'Mood & Energy';
      case 'sleep':
        return 'Sleep';
      case 'achievement':
        return 'Achievements';
      case 'goals':
        return 'Goals';
      default:
        return 'Daily Reflection';
    }
  };
  
  const getCategoryClass = (category: string) => {
    switch(category) {
      case 'daily':
        return 'bg-pink-50 border-pink-100 text-pink-800';
      case 'mood':
        return 'bg-amber-50 border-amber-100 text-amber-800';
      case 'sleep':
        return 'bg-indigo-50 border-indigo-100 text-indigo-800';
      case 'achievement':
        return 'bg-green-50 border-green-100 text-green-800';
      case 'goals':
        return 'bg-blue-50 border-blue-100 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-100 text-gray-800';
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
            <Calendar className="w-4 h-4" />
            <span>{entry.date}</span>
            <span>{entry.timestamp}</span>
          </div>
          <DialogTitle className="text-xl text-left flex items-center gap-2">
            {getCategoryIcon(entry.category)}
            {entry.title}
          </DialogTitle>
          <DialogDescription className="text-left">
            <span className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
              getCategoryClass(entry.category)
            )}>
              {getCategoryLabel(entry.category)}
            </span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <div className="text-gray-700 text-left whitespace-pre-line">
            {entry.content}
          </div>
          
          {entry.highlight && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6 text-left">
              <div className="font-medium text-sm text-blue-800 mb-2">Key Observation</div>
              <div className="text-blue-700">{entry.highlight}</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JournalEntryModal;
