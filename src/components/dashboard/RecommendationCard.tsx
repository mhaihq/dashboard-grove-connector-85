
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, PhoneCall } from 'lucide-react';
import { ClinicalRecommendation } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface RecommendationCardProps {
  recommendation: ClinicalRecommendation;
  isClinical?: boolean;
  onAction: (recommendation: ClinicalRecommendation) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  isClinical = false,
  onAction
}) => {
  const getActionButton = (recommendation: ClinicalRecommendation) => {
    switch (recommendation.actionType) {
      case "self": 
        return (
          <Button
            onClick={() => onAction(recommendation)}
            className="bg-hana-green hover:bg-hana-green/90 text-white"
            size="sm"
          >
            {recommendation.actionLabel}
          </Button>
        );
      case "followup":
        return (
          <Button
            onClick={() => onAction(recommendation)}
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
            size="sm"
          >
            <Clock className="mr-1.5 h-3.5 w-3.5" />
            {recommendation.actionLabel}
          </Button>
        );
      case "call":
        return (
          <Button
            onClick={() => onAction(recommendation)}
            variant="outline"
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
            size="sm"
          >
            <PhoneCall className="mr-1.5 h-3.5 w-3.5" />
            {recommendation.actionLabel}
          </Button>
        );
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors">
      <div className={`flex items-center justify-between p-4 ${isClinical ? 'bg-blue-50' : 'bg-gray-50'} border-b border-gray-200`}>
        <div className="flex items-center">
          <span 
            className={cn(
              "w-2 h-2 rounded-full mr-3",
              isClinical ? "bg-blue-500" :
              recommendation.priority === "high" ? "bg-red-500" :
              recommendation.priority === "medium" ? "bg-amber-500" : "bg-blue-500"
            )}
          />
          <h3 className="font-medium text-gray-900">{recommendation.title}</h3>
        </div>
        <span 
          className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-medium",
            isClinical ? "bg-blue-100 text-blue-800" :
            recommendation.priority === "high" ? "bg-red-100 text-red-800" :
            recommendation.priority === "medium" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
          )}
        >
          {isClinical ? "Clinical Intervention" : 
           recommendation.priority === "high" ? "Primary Focus" : 
           recommendation.priority === "medium" ? "Recommended" : "Supportive"}
        </span>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <p className="text-gray-700 text-sm">{recommendation.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {recommendation.relatedAreas && recommendation.relatedAreas.map((area, areaIndex) => (
              <span 
                key={areaIndex}
                className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span>{recommendation.timeframe}</span>
            {!isClinical && (
              <>
                {" • "}
                <span>
                  {recommendation.difficulty === "easy" ? "Simple to implement" :
                  recommendation.difficulty === "moderate" ? "Moderate effort" : "Requires commitment"}
                </span>
              </>
            )}
          </div>
          <div>
            {getActionButton(recommendation)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
