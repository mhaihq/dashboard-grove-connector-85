
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IntakeSummary } from '@/components/dashboard/IntakeSummary';

interface HealthStorySectionProps {
  date: string;
  welcomeMessage: string;
  background: string[];
  goals: string[];
  concerns: string[];
  overviewSections: {
    title: string;
    items: string[];
  }[];
  detailedAssessment: {
    sleep: {
      observations: string[];
      quote: string;
    };
    emotionalRegulation: {
      observations: string[];
      quote: string;
    };
  };
}

export const HealthStorySection: React.FC<HealthStorySectionProps> = ({
  date,
  welcomeMessage,
  background,
  goals,
  concerns,
  overviewSections,
  detailedAssessment
}) => {
  return (
    <div className="mb-8">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">
            📘 Your Full Health Story
          </CardTitle>
        </CardHeader>
        <CardContent>
          <IntakeSummary 
            date={date}
            welcomeMessage={welcomeMessage}
            background={background}
            goals={goals}
            overviewSections={overviewSections}
            concerns={concerns}
            detailedAssessment={detailedAssessment}
          />
          
          <div className="mt-6 border-t pt-4 text-xs text-gray-500 flex justify-end">
            <span className="mr-2">Was this section helpful?</span>
            <button className="text-gray-500 hover:text-gray-700">👍</button>
            <button className="ml-2 text-gray-500 hover:text-gray-700">👎</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthStorySection;
