
import React from 'react';
import { JournalEntryType } from '@/types/journal';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Heart, Moon, Award, Target, Zap } from 'lucide-react';
import { DailyReflectionTab } from './tabs/DailyReflectionTab';
import { MoodEnergyTab } from './tabs/MoodEnergyTab';
import { SleepTab } from './tabs/SleepTab';
import { AchievementsTab } from './tabs/AchievementsTab';
import { GoalsTab } from './tabs/GoalsTab';

interface JournalTabsProps {
  entry: JournalEntryType;
}

export const JournalTabs: React.FC<JournalTabsProps> = ({ entry }) => {
  return (
    <Tabs defaultValue={entry.category} className="w-full">
      <TabsList className="mb-6 w-full grid grid-cols-5">
        <TabsTrigger value="daily" className="flex items-center gap-1 text-sm py-2">
          <Heart className="w-4 h-4" />
          <span className="hidden sm:inline">Daily Reflection</span>
        </TabsTrigger>
        <TabsTrigger value="mood" className="flex items-center gap-1 text-sm py-2">
          <Zap className="w-4 h-4" />
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
      
      <TabsContent value="daily">
        <DailyReflectionTab title={entry.title} content={entry.content} highlight={entry.highlight} />
      </TabsContent>
      
      <TabsContent value="mood">
        <MoodEnergyTab mood={entry.mood} energy={entry.energy} stress={entry.stress} highlight={entry.highlight} />
      </TabsContent>
      
      <TabsContent value="sleep">
        <SleepTab content={entry.content} sleep={entry.sleep} highlight={entry.highlight} />
      </TabsContent>
      
      <TabsContent value="achievement">
        <AchievementsTab content={entry.content} achievements={entry.achievements} highlight={entry.highlight} />
      </TabsContent>
      
      <TabsContent value="goals">
        <GoalsTab content={entry.content} goals={entry.goals} highlight={entry.highlight} />
      </TabsContent>
    </Tabs>
  );
};
