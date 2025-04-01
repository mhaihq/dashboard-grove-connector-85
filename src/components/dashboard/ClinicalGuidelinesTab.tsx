
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
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
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-4">
          Based on your Medicare coverage, these clinical guidelines and programs are available to support your health needs.
        </p>
        
        {/* Clinical Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-900 mb-3">Recommended Clinical Interventions</h3>
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
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
        <MedicarePrograms programs={medicarePrograms} />
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
