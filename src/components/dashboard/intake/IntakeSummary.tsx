
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { 
  SummaryHeader, 
  BackgroundSection, 
  GoalsSection, 
  ConcernsSection,
  OverviewSectionsGrid,
  DetailedAssessmentSection
} from '@/components/dashboard/intake';

interface DetailedAssessment {
  sleep: {
    observations: string[];
    quote: string;
  };
  emotionalRegulation: {
    observations: string[];
    quote: string;
  };
}

interface OverviewSection {
  title: string;
  items: string[];
}

interface IntakeSummaryProps {
  date: string;
  welcomeMessage?: string;
  background?: string[];
  goals?: string[];
  concerns?: string[];
  overviewSections?: OverviewSection[];
  detailedAssessment?: DetailedAssessment;
}

export const IntakeSummary: React.FC<IntakeSummaryProps> = ({ 
  date, 
  welcomeMessage,
  background = [],
  goals = [],
  concerns = [],
  overviewSections = [],
  detailedAssessment
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Default data if not provided
  const defaultBackground = [
    "Family history of anxiety disorders on maternal side",
    "No significant physical health conditions",
    "Started experiencing sleep issues 6 months ago coinciding with work promotion",
    "Previous therapy experience 2 years ago for work-related stress",
    "Regular alcohol consumption started gradually over the past year",
    "Strong family support system with particularly close relationship with wife"
  ];

  // Primary goals from the assessment
  const defaultGoals = [
    "Improve sleep quality and routine",
    "Develop better emotional regulation strategies",
    "Reduce reliance on alcohol for relaxation",
    "Create healthier work-life boundaries"
  ];

  // Functional areas of concern
  const defaultConcerns = [
    "Sleep disruption (rating: 2/5)",
    "Stress management (rating: 2/5)",
    "Emotional regulation (rating: 2/5)"
  ];

  // Use provided data or fallback to defaults
  const backgroundData = background.length > 0 ? background : defaultBackground;
  const goalsData = goals.length > 0 ? goals : defaultGoals;
  const concernsData = concerns.length > 0 ? concerns : defaultConcerns;

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow border-amber-100">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <SummaryHeader date={date} isOpen={isOpen} />
        
        <CollapsibleContent>
          <CardContent className="pt-6">
            <div className="text-gray-600 space-y-4">
              {welcomeMessage ? (
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6">
                  <p className="text-amber-800">{welcomeMessage}</p>
                </div>
              ) : (
                <p>This is your initial wellness assessment that we completed when you first joined the program. It serves as a baseline to measure your progress.</p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BackgroundSection background={backgroundData} />
                <GoalsSection goals={goalsData} />
                <ConcernsSection concerns={concernsData} />
              </div>
              
              <OverviewSectionsGrid sections={overviewSections} />
              
              <DetailedAssessmentSection detailedAssessment={detailedAssessment} />
              
              <div className="flex justify-center mt-6">
                <Button variant="outline" size="sm">
                  View Full Intake Report
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
