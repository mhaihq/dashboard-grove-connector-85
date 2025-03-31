
import React, { useState } from 'react';
import { FolderArchive, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

interface IntakeSummaryProps {
  date: string;
}

export const IntakeSummary: React.FC<IntakeSummaryProps> = ({ date }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Detailed background information from intake assessment
  const background = [
    "Family history of anxiety disorders on maternal side",
    "No significant physical health conditions",
    "Started experiencing sleep issues 6 months ago coinciding with work promotion",
    "Previous therapy experience 2 years ago for work-related stress",
    "Regular alcohol consumption started gradually over the past year",
    "Strong family support system with particularly close relationship with wife"
  ];

  // Primary goals from the assessment
  const goals = [
    "Improve sleep quality and routine",
    "Develop better emotional regulation strategies",
    "Reduce reliance on alcohol for relaxation",
    "Create healthier work-life boundaries"
  ];

  // Functional areas of concern
  const concerns = [
    "Sleep disruption (rating: 2/5)",
    "Stress management (rating: 2/5)",
    "Emotional regulation (rating: 2/5)"
  ];

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
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
              <p>This is your initial wellness assessment that we completed when you first joined the program. It serves as a baseline to measure your progress.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-100 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Background</h4>
                  <ul className="text-sm space-y-2 list-disc list-inside">
                    {background.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="border border-gray-100 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Primary Goals</h4>
                  <ul className="text-sm space-y-2 list-disc list-inside">
                    {goals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="border border-gray-100 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Areas of Focus</h4>
                  <ul className="text-sm space-y-2 list-disc list-inside">
                    {concerns.map((concern, index) => (
                      <li key={index}>{concern}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Detailed Assessment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-100 rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Sleep Observations</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Difficulty falling asleep due to racing thoughts</li>
                      <li>Reports never feeling tired despite lack of rest</li>
                      <li>Brain remains highly active at bedtime</li>
                    </ul>
                    <p className="text-sm italic mt-2">"I just don't sleep... I feel that I'm never tired. I feel that my brain is always on."</p>
                  </div>
                  
                  <div className="border border-gray-100 rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Emotional Regulation Observations</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Unexplained anger episodes</li>
                      <li>Frequent nervousness</li>
                      <li>Difficulty managing emotional responses</li>
                    </ul>
                    <p className="text-sm italic mt-2">"I feel nervous a lot of the time, and then... Kind of angry... That's with no reason."</p>
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
