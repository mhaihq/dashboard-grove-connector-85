
import React from 'react';
import { ChevronRight, Award, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecommendationProps {
  title: string;
  description: string;
  steps: string[];
  priority: 'high' | 'medium' | 'low';
  relatedAreas?: string[];
  timeframe?: string;
  difficulty?: 'easy' | 'moderate' | 'challenging';
}

export const ProgressSection: React.FC<{ recommendations: RecommendationProps[] }> = ({ 
  recommendations 
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm mt-4 text-left">
      <div className="flex items-center gap-2 mb-3">
        <Award className="w-5 h-5 text-hana-green" />
        <h2 className="text-xl font-semibold text-gray-900">Your Action Plan</h2>
      </div>
      
      <p className="text-gray-700 mb-4">
        Based on your initial health coaching assessment, we've developed the following care recommendations to help you reach your health goals and manage your wellness effectively.
      </p>
      
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <div key={index} className="border border-gray-100 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
              <h3 className="text-lg font-medium text-gray-900">{recommendation.title}</h3>
              <div className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-medium",
                recommendation.priority === 'high' ? "bg-red-100 text-red-800" :
                recommendation.priority === 'medium' ? "bg-amber-100 text-amber-800" :
                "bg-green-100 text-green-800"
              )}>
                {recommendation.priority === 'high' ? 'Primary Focus' :
                 recommendation.priority === 'medium' ? 'Recommended' :
                 'Supportive Measure'}
              </div>
            </div>
            
            <div className="p-3">
              <p className="text-gray-700 mb-3">{recommendation.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {recommendation.timeframe && (
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Calendar className="h-3 w-3 text-hana-green" />
                    <span>{recommendation.timeframe}</span>
                  </div>
                )}
                
                {recommendation.difficulty && (
                  <div className="flex items-center gap-1 text-xs">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs",
                      recommendation.difficulty === 'easy' ? "bg-green-100 text-green-800" :
                      recommendation.difficulty === 'moderate' ? "bg-blue-100 text-blue-800" :
                      "bg-amber-100 text-amber-800"
                    )}>
                      {recommendation.difficulty === 'easy' ? 'Simple to Implement' :
                       recommendation.difficulty === 'moderate' ? 'Moderate Effort' :
                       'Requires Commitment'}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="mb-3">
                <h4 className="text-xs font-medium text-gray-900 mb-1.5">Action Plan</h4>
                <ol className="space-y-1 pl-5 list-decimal text-sm">
                  {recommendation.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-gray-700">{step}</li>
                  ))}
                </ol>
              </div>
              
              {recommendation.relatedAreas && recommendation.relatedAreas.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-gray-900 mb-1">Health Areas Addressed</h4>
                  <div className="flex flex-wrap gap-1">
                    {recommendation.relatedAreas.map((area, areaIndex) => (
                      <span 
                        key={areaIndex} 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-500">Weekly check-in calls scheduled to monitor progress</span>
        <button className="inline-flex items-center text-hana-green hover:text-green-800 text-sm font-medium">
          View Full Care Plan
          <ChevronRight className="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProgressSection;
