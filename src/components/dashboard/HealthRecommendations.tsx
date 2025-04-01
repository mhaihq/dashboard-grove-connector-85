
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';
import { ClinicalRecommendation, MedicareProgram, JournalEntry } from '@/types/dashboard';
import { toast } from '@/hooks/use-toast';
import PersonalRecommendationsTab from '@/components/dashboard/PersonalRecommendationsTab';
import ClinicalGuidelinesTab from '@/components/dashboard/ClinicalGuidelinesTab';

interface HealthRecommendationsProps {
  recommendations: ClinicalRecommendation[];
  medicarePrograms: MedicareProgram[];
  onScheduleCall: () => void;
  journalEntries?: JournalEntry[];
  carePlanItems?: any[];
  milestonesData?: any;
}

export const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({
  recommendations,
  medicarePrograms,
  onScheduleCall,
  journalEntries = [],
  carePlanItems = [],
  milestonesData = null
}) => {
  const [activeTab, setActiveTab] = useState("recommendations");

  // Handle recommendation actions
  const handleAction = (recommendation: ClinicalRecommendation) => {
    switch (recommendation.actionType) {
      case "self":
        toast({
          title: "Plan Started",
          description: `You've started the ${recommendation.title}. Check your progress journal for updates.`,
        });
        break;
      case "followup":
        toast({
          title: "Follow-up Scheduled",
          description: `We'll discuss ${recommendation.title} in detail during our next check-in.`,
        });
        break;
      case "call":
        onScheduleCall();
        break;
    }
  };

  // Filter recommendations into personal and clinical categories
  const personalRecommendations = recommendations.filter(rec => 
    !rec.relatedAreas.some(area => 
      area.toLowerCase().includes('clinical') || 
      area.toLowerCase().includes('medical') ||
      area.toLowerCase().includes('healthcare')
    )
  );
  
  const clinicalRecommendations = recommendations.filter(rec => 
    rec.relatedAreas.some(area => 
      area.toLowerCase().includes('clinical') || 
      area.toLowerCase().includes('medical') ||
      area.toLowerCase().includes('healthcare')
    )
  );

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <BarChart className="w-5 h-5 text-hana-green mr-2" />
          Health & Wellbeing Recommendations
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-3">
        <Tabs defaultValue="recommendations" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-5">
            <TabsTrigger value="recommendations">Personal Recommendations</TabsTrigger>
            <TabsTrigger value="guidelines">Clinical Guidelines</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations">
            <PersonalRecommendationsTab 
              recommendations={personalRecommendations}
              journalEntries={journalEntries}
              carePlanItems={carePlanItems}
              milestonesData={milestonesData}
              onRecommendationAction={handleAction}
              onSwitchTab={() => setActiveTab("guidelines")}
            />
          </TabsContent>

          <TabsContent value="guidelines">
            <ClinicalGuidelinesTab 
              recommendations={clinicalRecommendations}
              medicarePrograms={medicarePrograms}
              onRecommendationAction={handleAction}
              onSwitchTab={() => setActiveTab("recommendations")}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HealthRecommendations;
