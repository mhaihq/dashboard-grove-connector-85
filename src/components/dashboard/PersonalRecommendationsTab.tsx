
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { ClinicalRecommendation, JournalEntry } from '@/types/dashboard';
import { ProgressJournal } from '@/components/dashboard/ProgressJournal';
import { CarePlan } from '@/components/dashboard/CarePlan';
import { Milestones } from '@/components/dashboard/Milestones';
import RecommendationCard from '@/components/dashboard/RecommendationCard';

interface PersonalRecommendationsTabProps {
  recommendations: ClinicalRecommendation[];
  journalEntries: JournalEntry[];
  carePlanItems: any[];
  milestonesData: any;
  onRecommendationAction: (recommendation: ClinicalRecommendation) => void;
  onSwitchTab: () => void;
}

export const PersonalRecommendationsTab: React.FC<PersonalRecommendationsTabProps> = ({
  recommendations,
  journalEntries,
  carePlanItems,
  milestonesData,
  onRecommendationAction,
  onSwitchTab
}) => {
  return (
    <div className="space-y-4">
      {recommendations.map((recommendation, index) => (
        <RecommendationCard 
          key={index} 
          recommendation={recommendation} 
          onAction={onRecommendationAction} 
        />
      ))}
      
      {/* Progress Journal, Care Plan, and Milestones sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-1">
          {journalEntries.length > 0 && <ProgressJournal entries={journalEntries} />}
        </div>
        
        <div className="lg:col-span-2">
          {carePlanItems.length > 0 && <CarePlan items={carePlanItems} />}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="lg:col-span-2">
          {milestonesData && <Milestones data={milestonesData} />}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="link" 
          className="text-hana-green hover:text-green-700"
          onClick={onSwitchTab}
        >
          View Clinical Guidelines <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PersonalRecommendationsTab;
