
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, ThumbsUp, ThumbsDown } from 'lucide-react';
import { ClinicalRecommendation, MedicareProgram } from '@/types/dashboard';
import { toast } from '@/hooks/use-toast';
import PersonalRecommendationsTab from '@/components/dashboard/PersonalRecommendationsTab';
import ClinicalGuidelinesTab from '@/components/dashboard/ClinicalGuidelinesTab';
import { Button } from '@/components/ui/button';

interface HealthRecommendationsProps {
  recommendations: ClinicalRecommendation[];
  medicarePrograms: MedicareProgram[];
  onScheduleCall: () => void;
}

export const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({
  recommendations,
  medicarePrograms,
  onScheduleCall
}) => {
  const [activeTab, setActiveTab] = useState("recommendations");
  const [feedbackGiven, setFeedbackGiven] = useState(false);

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

  // Handle feedback
  const handleFeedback = (isPositive: boolean) => {
    setFeedbackGiven(true);
    toast({
      title: "Thanks for your feedback!",
      description: "Your input helps us improve your recommendations.",
    });
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
        
        <div className="mt-4 border-t pt-3 text-xs text-gray-500 flex justify-end">
          {!feedbackGiven ? (
            <div className="flex items-center gap-2">
              <span>Was this section helpful?</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 h-auto" 
                onClick={() => handleFeedback(true)}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 h-auto" 
                onClick={() => handleFeedback(false)}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <span>Thanks for your feedback!</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthRecommendations;
