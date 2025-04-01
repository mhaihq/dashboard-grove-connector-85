
import React from 'react';
import { HealthRecommendations } from '@/components/dashboard/HealthRecommendations';
import { ClinicalRecommendation, MedicareProgram } from '@/types/dashboard';

interface RecommendationsSectionProps {
  recommendations: ClinicalRecommendation[];
  medicarePrograms: MedicareProgram[];
  onScheduleCall: () => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  recommendations,
  medicarePrograms,
  onScheduleCall
}) => {
  return (
    <div className="mb-16">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">C. Recommendations (Systems)</h2>
      <HealthRecommendations 
        recommendations={recommendations} 
        medicarePrograms={medicarePrograms}
        onScheduleCall={onScheduleCall}
      />
    </div>
  );
};

export default RecommendationsSection;
