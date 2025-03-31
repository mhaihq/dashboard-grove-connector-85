
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
                  <h4 className="font-medium text-gray-900 mb-2">Initial Health Concerns</h4>
                  <ul className="text-sm space-y-2 list-disc list-inside">
                    <li>Mild hypertension (BP 135/85)</li>
                    <li>Pre-diabetic (A1C 5.9)</li>
                    <li>Sleep disruption (avg 5.5 hrs/night)</li>
                    <li>Occasional anxiety</li>
                  </ul>
                </div>
                
                <div className="border border-gray-100 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Care Goals</h4>
                  <ul className="text-sm space-y-2 list-disc list-inside">
                    <li>Improve sleep quality and duration</li>
                    <li>Reduce stress through mindfulness</li>
                    <li>Increase physical activity gradually</li>
                    <li>Improve nutrition and hydration</li>
                  </ul>
                </div>
                
                <div className="border border-gray-100 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Current Medications</h4>
                  <ul className="text-sm space-y-2 list-disc list-inside">
                    <li>Lisinopril 10mg (daily)</li>
                    <li>Multivitamin</li>
                    <li>Occasional Melatonin (3mg)</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
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
