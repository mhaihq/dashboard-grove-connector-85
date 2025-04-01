
import React from 'react';
import { Book, ClipboardCheck, Footprints, HeartPulse, Brain, Thermometer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RecommendationStep {
  text: string;
}

export interface Recommendation {
  title: string;
  description: string;
  steps: string[];
  priority: 'high' | 'medium' | 'low';
  relatedAreas?: string[];
  icon?: 'book' | 'clipboard' | 'footprints' | 'heart' | 'brain' | 'thermometer';
  timeframe?: string;
  difficulty?: 'easy' | 'moderate' | 'challenging';
  actionLabel?: string;
}

interface ClinicalRecommendationsProps {
  recommendations: Recommendation[];
  activeTab?: 'all' | 'physical' | 'mental' | 'substance';
}

export const ClinicalRecommendations: React.FC<ClinicalRecommendationsProps> = ({ 
  recommendations,
  activeTab = 'all'
}) => {
  const [selectedTab, setSelectedTab] = React.useState<'all' | 'physical' | 'mental' | 'substance'>(activeTab);
  
  const filteredRecommendations = React.useMemo(() => {
    if (selectedTab === 'all') return recommendations;
    
    return recommendations.filter(rec => {
      switch (selectedTab) {
        case 'physical':
          return rec.relatedAreas?.some(area => 
            ['sleep', 'energyLevel', 'nutrition', 'hydration', 'physicalActivity'].includes(area.toLowerCase())
          );
        case 'mental':
          return rec.relatedAreas?.some(area => 
            ['emotionalRegulation', 'cognitiveFunction', 'stress', 'stressManagement', 'anxiety', 'depression'].includes(area.toLowerCase())
          );
        case 'substance':
          return rec.relatedAreas?.some(area => 
            ['alcohol', 'substance', 'recovery', 'addiction'].includes(area.toLowerCase())
          );
        default:
          return true;
      }
    });
  }, [recommendations, selectedTab]);

  const getIconForRecommendation = (recommendation: Recommendation) => {
    switch (recommendation.icon) {
      case 'book':
        return <Book className="h-5 w-5 text-blue-500" />;
      case 'clipboard':
        return <ClipboardCheck className="h-5 w-5 text-green-500" />;
      case 'footprints':
        return <Footprints className="h-5 w-5 text-purple-500" />;
      case 'heart':
        return <HeartPulse className="h-5 w-5 text-red-500" />;
      case 'brain':
        return <Brain className="h-5 w-5 text-violet-500" />;
      case 'thermometer':
        return <Thermometer className="h-5 w-5 text-orange-500" />;
      default: {
        // Default icon based on first related area
        const area = recommendation.relatedAreas && recommendation.relatedAreas[0]?.toLowerCase();
        if (area?.includes('sleep')) return <Thermometer className="h-5 w-5 text-indigo-500" />;
        if (area?.includes('emotional') || area?.includes('stress')) return <Brain className="h-5 w-5 text-violet-500" />;
        if (area?.includes('energy') || area?.includes('physical')) return <Footprints className="h-5 w-5 text-amber-500" />;
        return <ClipboardCheck className="h-5 w-5 text-green-500" />;
      }
    }
  };

  const getDifficultyBadge = (difficulty?: string) => {
    if (!difficulty) return null;
    
    let color = '';
    let text = '';
    
    switch (difficulty) {
      case 'easy':
        color = 'bg-green-100 text-green-800';
        text = 'Simple to Implement';
        break;
      case 'moderate':
        color = 'bg-blue-100 text-blue-800';
        text = 'Moderate Effort';
        break;
      case 'challenging':
        color = 'bg-amber-100 text-amber-800';
        text = 'Requires Commitment';
        break;
    }
    
    return (
      <Badge variant="outline" className={cn(color)}>
        {text}
      </Badge>
    );
  };

  const getPriorityClass = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return "border-l-4 border-l-red-500";
      case 'medium':
        return "border-l-4 border-l-amber-500";
      case 'low':
        return "border-l-4 border-l-blue-500";
      default:
        return "";
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <HeartPulse className="w-5 h-5 text-hana-green mr-2" />
          Clinical Recommendations
        </CardTitle>
        <CardDescription className="text-gray-600 mt-1">
          Personalized guidance based on your health assessment
        </CardDescription>
        
        <div className="flex mt-3 space-x-2">
          <Button 
            variant={selectedTab === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedTab('all')}
          >
            All
          </Button>
          <Button 
            variant={selectedTab === 'physical' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedTab('physical')}
          >
            Physical Health
          </Button>
          <Button 
            variant={selectedTab === 'mental' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedTab('mental')}
          >
            Mental Wellness
          </Button>
          <Button 
            variant={selectedTab === 'substance' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedTab('substance')}
          >
            Substance Support
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map((recommendation, index) => (
              <div 
                key={index} 
                className={cn("border rounded-lg overflow-hidden hover-scale", 
                  getPriorityClass(recommendation.priority)
                )}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getIconForRecommendation(recommendation)}
                      <h3 className="font-medium text-gray-900">{recommendation.title}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {recommendation.timeframe && (
                        <span className="text-xs text-gray-600 whitespace-nowrap">
                          {recommendation.timeframe}
                        </span>
                      )}
                      {getDifficultyBadge(recommendation.difficulty)}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{recommendation.description}</p>
                  
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Action Steps:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-1 pl-1">
                      {recommendation.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-gray-600">{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  {recommendation.relatedAreas && recommendation.relatedAreas.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {recommendation.relatedAreas.map((area, i) => (
                        <span 
                          key={i} 
                          className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <Button size="sm" variant="default" className="mt-1">
                    {recommendation.actionLabel || "Start Now"}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">No recommendations found for this category.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicalRecommendations;
