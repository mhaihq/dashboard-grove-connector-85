
import React, { useState } from 'react';
import { FolderArchive, ChevronDown, ChevronUp, FileText, FileCheck, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
        <div className="border-b border-gray-100">
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full flex justify-between items-center rounded-none p-4 h-auto"
            >
              <div className="flex items-center gap-2 text-left">
                <FolderArchive className="w-5 h-5 text-amber-500" />
                <div>
                  <CardTitle className="text-lg">🗂 Your Wellness Baseline</CardTitle>
                  <p className="text-sm text-gray-500">Completed {date}</p>
                </div>
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-gray-500 shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500 shrink-0" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        
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
                <div className="border border-gray-100 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    Background
                  </h4>
                  <ul className="text-sm space-y-2 list-disc list-inside">
                    {backgroundData.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="border border-gray-100 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-green-500" />
                    Primary Goals
                  </h4>
                  <ul className="text-sm space-y-2 list-disc list-inside">
                    {goalsData.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="border border-gray-100 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    Areas of Focus
                  </h4>
                  <ul className="text-sm space-y-2 list-disc list-inside">
                    {concernsData.map((concern, index) => (
                      <li key={index}>{concern}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {overviewSections.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Assessment Overview</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {overviewSections.map((section, idx) => (
                      <div key={idx} className="border border-gray-100 rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 mb-2">{section.title}</h5>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Detailed Assessment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-100 rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Sleep Observations</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      {detailedAssessment?.sleep.observations.map((obs, index) => (
                        <li key={index}>{obs}</li>
                      )) || (
                        <>
                          <li>Difficulty falling asleep due to racing thoughts</li>
                          <li>Reports never feeling tired despite lack of rest</li>
                          <li>Brain remains highly active at bedtime</li>
                        </>
                      )}
                    </ul>
                    <div className="bg-gray-50 p-3 mt-2 rounded border border-gray-100">
                      <p className="text-sm italic">"{detailedAssessment?.sleep.quote || "I just don't sleep... I feel that I'm never tired. I feel that my brain is always on."}"</p>
                    </div>
                  </div>
                  
                  <div className="border border-gray-100 rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Emotional Regulation Observations</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      {detailedAssessment?.emotionalRegulation.observations.map((obs, index) => (
                        <li key={index}>{obs}</li>
                      )) || (
                        <>
                          <li>Unexplained anger episodes</li>
                          <li>Frequent nervousness</li>
                          <li>Difficulty managing emotional responses</li>
                        </>
                      )}
                    </ul>
                    <div className="bg-gray-50 p-3 mt-2 rounded border border-gray-100">
                      <p className="text-sm italic">"{detailedAssessment?.emotionalRegulation.quote || "I feel nervous a lot of the time, and then... Kind of angry... That's with no reason."}"</p>
                    </div>
                  </div>
                </div>
              </div>
              
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

export default IntakeSummary;
