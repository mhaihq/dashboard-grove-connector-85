
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
  // Enhance recommendations with Atomic Habits principles
  const enhancedRecommendations = recommendations.map(rec => {
    let atomicHabitsPrinciple = '';
    let systemsThinking = '';
    
    // Add Atomic Habits principles based on recommendation type
    if (rec.title.includes('Sleep')) {
      atomicHabitsPrinciple = 'Environment Design';
      systemsThinking = 'Creating a sleep-friendly environment makes good sleep automatic, not effortful';
    } else if (rec.title.includes('Stress')) {
      atomicHabitsPrinciple = 'Habit Stacking';
      systemsThinking = 'Attaching stress relief to existing routines builds consistency without willpower';
    } else if (rec.title.includes('Emotional')) {
      atomicHabitsPrinciple = 'Implementation Intentions';
      systemsThinking = 'Specifying when and where you'll manage emotions removes decision fatigue';
    } else if (rec.title.includes('Energy')) {
      atomicHabitsPrinciple = 'Make It Easy';
      systemsThinking = 'Reducing friction in your environment leads to more consistent energy management';
    }
    
    return {
      ...rec,
      atomicHabitsPrinciple,
      systemsThinking
    };
  });

  return (
    <div>
      <HealthRecommendations 
        recommendations={enhancedRecommendations}
        medicarePrograms={medicarePrograms}
        onScheduleCall={onScheduleCall}
      />
    </div>
  );
};

export default RecommendationsSection;
