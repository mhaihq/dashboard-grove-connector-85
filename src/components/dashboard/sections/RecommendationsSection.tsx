
import React, { useState } from 'react';
import { Lightbulb, Stethoscope } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import BehavioralInsightsTab from './tabs/BehavioralInsightsTab';
import ClinicalGuidelinesTab from './tabs/ClinicalGuidelinesTab';

interface RecommendationsSectionProps {
  recommendations: any[];
  medicarePrograms: any[];
  onScheduleCall: () => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  recommendations,
  medicarePrograms,
  onScheduleCall
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Health Insights</h2>
      
      <Tabs defaultValue="behavioral" className="w-full">
        <TabsList className="mb-6 w-full grid grid-cols-2">
          <TabsTrigger value="behavioral" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <span>Behavioral Insights</span>
          </TabsTrigger>
          <TabsTrigger value="clinical" className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            <span>Clinical Guidelines</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="behavioral">
          <BehavioralInsightsTab />
        </TabsContent>
        
        <TabsContent value="clinical">
          <ClinicalGuidelinesTab onScheduleCall={onScheduleCall} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecommendationsSection;
