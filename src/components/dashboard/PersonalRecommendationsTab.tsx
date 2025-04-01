
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { ClinicalRecommendation } from '@/types/dashboard';
import RecommendationCard from '@/components/dashboard/RecommendationCard';

interface PersonalRecommendationsTabProps {
  recommendations: ClinicalRecommendation[];
  onRecommendationAction: (recommendation: ClinicalRecommendation) => void;
  onSwitchTab: () => void;
}

export const PersonalRecommendationsTab: React.FC<PersonalRecommendationsTabProps> = ({
  recommendations,
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
      
      <div className="flex justify-between mt-6">
        <div className="text-sm">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            Was this helpful? <span className="ml-1">👍</span><span className="ml-1">👎</span>
          </Button>
        </div>
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
