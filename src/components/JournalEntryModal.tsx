import React from 'react';
import { JournalEntryType } from '@/pages/FollowupReport';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Calendar, 
  Heart, 
  Moon, 
  Award, 
  Target, 
  Zap,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

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
        return <Heart className="w-5 h-5" />;
      case 'mood':
        return <Award className="w-5 h-5" />;
      case 'sleep':
        return <Moon className="w-5 h-5" />;
      case 'achievement':
        return <Award className="w-5 h-5" />;
      case 'goals':
        return <Target className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Mental Health Journal</h1>
              <p className="text-gray-500">{entry.date}</p>
            </div>
            <Calendar className="w-5 h-5 text-gray-500" />
          </div>
          
          <Tabs defaultValue={entry.category} className="w-full">
            <TabsList className="mb-6 w-full grid grid-cols-5">
              <TabsTrigger value="daily" className="flex items-center gap-1 text-sm py-2">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Daily Reflection</span>
              </TabsTrigger>
              <TabsTrigger value="mood" className="flex items-center gap-1 text-sm py-2">
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Mood & Energy</span>
              </TabsTrigger>
              <TabsTrigger value="sleep" className="flex items-center gap-1 text-sm py-2">
                <Moon className="w-4 h-4" />
                <span className="hidden sm:inline">Sleep</span>
              </TabsTrigger>
              <TabsTrigger value="achievement" className="flex items-center gap-1 text-sm py-2">
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Achievements</span>
              </TabsTrigger>
              <TabsTrigger value="goals" className="flex items-center gap-1 text-sm py-2">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Goals</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="text-left">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">{entry.title}</h2>
                <p className="text-gray-600 whitespace-pre-line text-sm">{entry.content}</p>
              </div>
              
              {entry.highlight && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-blue-700 text-sm">
                  <div className="font-medium text-xs text-blue-800 mb-1">Key Observation</div>
                  <div>{entry.highlight}</div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="mood">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">Mood and Stress Check-In</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {entry.mood && (
                    <Card className="bg-[#FFF8E6] border-amber-100">
                      <CardContent className="pt-4 p-4">
                        <div className="text-3xl mb-2">😊</div>
                        <h3 className="text-lg font-medium text-gray-800 mb-1">Mood: {entry.mood.score}</h3>
                        <div className="space-y-1 text-sm text-gray-700">
                          <p>Weekend: {entry.mood.weekend}</p>
                          <p>Weekday: {entry.mood.weekday}</p>
                        </div>
                        <p className="mt-3 text-sm text-gray-700">{entry.mood.notes}</p>
                      </CardContent>
                    </Card>
                  )}
                  
                  {entry.energy && (
                    <Card className="bg-[#E5F0FF] border-blue-100">
                      <CardContent className="pt-4 p-4">
                        <div className="text-3xl mb-2">⚡</div>
                        <h3 className="text-lg font-medium text-gray-800 mb-1">Energy: {entry.energy.level}</h3>
                        <p className="mt-3 text-sm text-gray-700">{entry.energy.notes}</p>
                      </CardContent>
                    </Card>
                  )}
                  
                  {entry.stress && (
                    <Card className="bg-[#FFDEE2] border-pink-100">
                      <CardContent className="pt-4 p-4">
                        <div className="text-3xl mb-2">😓</div>
                        <h3 className="text-lg font-medium text-gray-800 mb-1">Stress: {entry.stress.level}</h3>
                        <p className="mt-3 text-sm text-gray-700">{entry.stress.notes}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
              
              {entry.highlight && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-blue-700 text-sm">
                  <div className="font-medium text-xs text-blue-800 mb-1">Key Observation</div>
                  <div>{entry.highlight}</div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="sleep" className="text-left">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">{entry.title}</h2>
                <p className="text-gray-600 whitespace-pre-line text-sm">{entry.content}</p>
              </div>
              
              {entry.highlight && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-blue-700 text-sm">
                  <div className="font-medium text-xs text-blue-800 mb-1">Key Observation</div>
                  <div>{entry.highlight}</div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="achievement" className="text-left">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">{entry.title}</h2>
                <p className="text-gray-600 whitespace-pre-line text-sm">{entry.content}</p>
              </div>
              
              {entry.highlight && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-blue-700 text-sm">
                  <div className="font-medium text-xs text-blue-800 mb-1">Key Observation</div>
                  <div>{entry.highlight}</div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="goals" className="text-left">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">{entry.title}</h2>
                <p className="text-gray-600 whitespace-pre-line text-sm">{entry.content}</p>
              </div>
              
              {entry.highlight && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-blue-700 text-sm">
                  <div className="font-medium text-xs text-blue-800 mb-1">Key Observation</div>
                  <div>{entry.highlight}</div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JournalEntryModal;
