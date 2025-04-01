
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
      <HealthRecommendations 
        recommendations={recommendations} 
        medicarePrograms={medicarePrograms}
        onScheduleCall={onScheduleCall}
      />
    </div>
  );
};

export default RecommendationsSection;
