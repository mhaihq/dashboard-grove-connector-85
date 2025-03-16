
import React from 'react';
import { JournalEntryType } from '@/pages/FollowupReport';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle
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

  // Mock data for the mood entry
  const moodData = {
    mood: {
      score: "4/10",
      weekend: "4/10",
      weekday: "4/10",
      notes: "User reports feeling depressed and stressed. Overall mood is low to moderate."
    },
    energy: {
      level: "Low",
      notes: "The user feels tired, possibly due to diet or the emotional toll of depression."
    },
    stress: {
      level: "High",
      notes: "Financial and job-search concerns contribute to elevated stress levels."
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <div className="bg-gray-50 p-4 flex items-center gap-2 text-blue-600">
          <Calendar className="w-6 h-6" />
          <span className="text-xl font-medium">{entry.date} {entry.timestamp}</span>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Mental Health Journal</h1>
              <p className="text-gray-500">{entry.date}</p>
            </div>
            <Calendar className="w-6 h-6 text-gray-500" />
          </div>
          
          <Tabs defaultValue={entry.category} className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="daily" className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>Daily Reflection</span>
              </TabsTrigger>
              <TabsTrigger value="mood" className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>Mood & Energy</span>
              </TabsTrigger>
              <TabsTrigger value="sleep" className="flex items-center gap-2">
                <Moon className="w-5 h-5" />
                <span>Sleep</span>
              </TabsTrigger>
              <TabsTrigger value="achievement" className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>Achievements</span>
              </TabsTrigger>
              <TabsTrigger value="goals" className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span>Goals</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="text-left">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{entry.title}</h2>
                <p className="text-gray-600 whitespace-pre-line">{entry.content}</p>
              </div>
              
              {entry.highlight && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-700">
                  <div className="font-medium text-sm text-blue-800 mb-2">Key Observation</div>
                  <div>{entry.highlight}</div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="mood">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Mood and Stress Check-In</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-[#FFF8E6] border-amber-100">
                    <CardContent className="pt-6">
                      <div className="text-4xl mb-4">😊</div>
                      <h3 className="text-xl font-medium text-gray-800 mb-2">Mood: {moodData.mood.score}</h3>
                      <div className="space-y-2 text-gray-700">
                        <p>Weekend: {moodData.mood.weekend}</p>
                        <p>Weekday: {moodData.mood.weekday}</p>
                      </div>
                      <p className="mt-4 text-gray-700">{moodData.mood.notes}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[#E5F0FF] border-blue-100">
                    <CardContent className="pt-6">
                      <div className="text-4xl mb-4">⚡</div>
                      <h3 className="text-xl font-medium text-gray-800 mb-2">Energy: {moodData.energy.level}</h3>
                      <p className="mt-4 text-gray-700">{moodData.energy.notes}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[#FFDEE2] border-pink-100">
                    <CardContent className="pt-6">
                      <div className="text-4xl mb-4">😓</div>
                      <h3 className="text-xl font-medium text-gray-800 mb-2">Stress: {moodData.stress.level}</h3>
                      <p className="mt-4 text-gray-700">{moodData.stress.notes}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {entry.highlight && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-700 mt-6">
                  <div className="font-medium text-sm text-blue-800 mb-2">Key Observation</div>
                  <div>{entry.highlight}</div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="sleep" className="text-left">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{entry.title}</h2>
                <p className="text-gray-600 whitespace-pre-line">{entry.content}</p>
              </div>
              
              {entry.highlight && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-700">
                  <div className="font-medium text-sm text-blue-800 mb-2">Key Observation</div>
                  <div>{entry.highlight}</div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="achievement" className="text-left">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{entry.title}</h2>
                <p className="text-gray-600 whitespace-pre-line">{entry.content}</p>
              </div>
              
              {entry.highlight && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-700">
                  <div className="font-medium text-sm text-blue-800 mb-2">Key Observation</div>
                  <div>{entry.highlight}</div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="goals" className="text-left">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{entry.title}</h2>
                <p className="text-gray-600 whitespace-pre-line">{entry.content}</p>
              </div>
              
              {entry.highlight && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-700">
                  <div className="font-medium text-sm text-blue-800 mb-2">Key Observation</div>
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
