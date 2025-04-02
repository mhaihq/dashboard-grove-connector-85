
import React from 'react';
import { Moon, Brain, Activity, Footprints } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClinicalGuidelineCardProps {
  recommendation: {
    title: string;
    description: string;
    steps: string[];
    whyItMatters: string;
    icon: string;
    timeframe: string;
    timeToResults: string;
    actionLabel: string;
  }
}

const ClinicalGuidelineCard: React.FC<ClinicalGuidelineCardProps> = ({ recommendation }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center bg-blue-50 p-4 border-b border-gray-200">
        <div className="bg-white p-2.5 rounded-full mr-3 shadow-sm text-blue-600">
          {recommendation.icon === 'thermometer' && <Moon className="w-5 h-5" />}
          {recommendation.icon === 'brain' && <Brain className="w-5 h-5" />}
          {recommendation.icon === 'heart' && <Activity className="w-5 h-5" />}
          {recommendation.icon === 'footprints' && <Footprints className="w-5 h-5" />}
        </div>
        <h3 className="text-lg font-medium text-gray-900">{recommendation.title}</h3>
      </div>
      
      <div className="p-5">
        <p className="text-gray-700 mb-4">{recommendation.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Recommended Steps:</h4>
          <ol className="space-y-2 pl-5 list-decimal">
            {recommendation.steps.map((step, index) => (
              <li key={index} className="text-sm text-gray-700">{step}</li>
            ))}
          </ol>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
          <h4 className="text-sm font-medium text-blue-900 mb-1">Why it matters:</h4>
          <p className="text-sm text-blue-800">{recommendation.whyItMatters}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span>{recommendation.timeframe}</span> • <span>Results in: {recommendation.timeToResults}</span>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
            {recommendation.actionLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClinicalGuidelineCard;
