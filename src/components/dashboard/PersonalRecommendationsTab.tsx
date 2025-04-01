
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Lightbulb } from 'lucide-react';
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
  // Limit to 3-4 recommendations, prioritizing by high/medium/low
  const sortedRecommendations = [...recommendations]
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 3); // Limit to 3 recommendations

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex items-start gap-3 mb-5">
        <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-amber-800 font-medium">Why these recommendations?</p>
          <p className="text-sm text-amber-700">
            These personalized suggestions are based on your health assessment data and are most likely to improve your overall wellbeing.
          </p>
        </div>
      </div>
      
      {sortedRecommendations.map((recommendation, index) => (
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
