import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Brain, Heart, Footprints, Clipboard, Shield, Book } from 'lucide-react';
import { ClinicalRecommendation, MedicareProgram } from '@/types/dashboard';

interface HealthRecommendationsProps {
  recommendations: ClinicalRecommendation[];
  medicarePrograms: MedicareProgram[];
  onScheduleCall: () => void;
}

const getIcon = (icon: string) => {
  switch (icon) {
    case "thermometer": return <Calendar className="w-4 h-4 mr-2" />;
    case "brain": return <Brain className="w-4 h-4 mr-2" />;
    case "heart": return <Heart className="w-4 h-4 mr-2" />;
    case "footprints": return <Footprints className="w-4 h-4 mr-2" />;
    case "clipboard": return <Clipboard className="w-4 h-4 mr-2" />;
    case "shield": return <Shield className="w-4 h-4 mr-2" />;
    case "book": return <Book className="w-4 h-4 mr-2" />;
    default: return null;
  }
};

export const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({
  recommendations,
  medicarePrograms,
  onScheduleCall
}) => {
  return (
    <div>
      {recommendations.map((recommendation, index) => (
        <Card key={index} className="mb-4 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center">
              {getIcon(recommendation.icon)}
              <CardTitle className="text-base font-semibold">{recommendation.title}</CardTitle>
            </div>
            <span className="text-xs text-gray-500">{recommendation.timeframe}</span>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-3">{recommendation.description}</p>
            <ul className="list-disc pl-5 mb-4 text-sm text-gray-600">
              {recommendation.steps.map((step, stepIndex) => (
                <li key={stepIndex}>{step}</li>
              ))}
            </ul>
            <Button variant="outline" size="sm" onClick={onScheduleCall}>
              {recommendation.actionLabel}
            </Button>
          </CardContent>
        </Card>
      ))}

      {medicarePrograms.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Explore Medicare Programs</h3>
          {medicarePrograms.map((program, index) => (
            <Card key={index} className="mb-4 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center">
                  {getIcon(program.icon)}
                  <CardTitle className="text-base font-semibold">{program.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-3">{program.description}</p>
                <ul className="list-disc pl-5 mb-4 text-sm text-gray-600">
                  {program.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex}>{benefit}</li>
                  ))}
                </ul>
                {program.isEligible === false ? (
                  <Button variant="destructive" size="sm" disabled>
                    Not Eligible
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthRecommendations;
