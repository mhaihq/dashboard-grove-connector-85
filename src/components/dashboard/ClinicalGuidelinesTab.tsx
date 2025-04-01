
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Stethoscope } from 'lucide-react';
import { ClinicalRecommendation, MedicareProgram } from '@/types/dashboard';
import RecommendationCard from '@/components/dashboard/RecommendationCard';
import MedicarePrograms from '@/components/dashboard/MedicarePrograms';

interface ClinicalGuidelinesTabProps {
  recommendations: ClinicalRecommendation[];
  medicarePrograms: MedicareProgram[];
  onRecommendationAction: (recommendation: ClinicalRecommendation) => void;
  onSwitchTab: () => void;
}

export const ClinicalGuidelinesTab: React.FC<ClinicalGuidelinesTabProps> = ({
  recommendations,
  medicarePrograms,
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
      <div className="mb-4">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3 mb-5">
          <Stethoscope className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800 font-medium">Clinical Guidelines</p>
            <p className="text-sm text-blue-700">
              Based on your Medicare coverage, these clinical guidelines and programs are available to support your health needs.
            </p>
          </div>
        </div>
        
        {/* Clinical Recommendations Section */}
        {sortedRecommendations.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-900 mb-3">Recommended Clinical Interventions</h3>
            <div className="space-y-4">
              {sortedRecommendations.map((recommendation, index) => (
                <RecommendationCard 
                  key={index} 
                  recommendation={recommendation} 
                  isClinical={true}
                  onAction={onRecommendationAction} 
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Medicare Programs Section */}
        <MedicarePrograms programs={medicarePrograms.slice(0, 2)} />
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="link" 
          className="text-hana-green hover:text-green-700"
          onClick={onSwitchTab}
        >
          View Personal Recommendations <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ClinicalGuidelinesTab;
