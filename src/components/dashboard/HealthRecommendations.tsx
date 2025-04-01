
import React from 'react';
import { Book, ClipboardCheck, Footprints, HeartPulse, Brain, Thermometer, Calendar, PhoneCall, ArrowRight, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  actionType?: 'self' | 'call' | 'followup';
}

export interface MedicareProgram {
  name: string;
  description: string;
  eligibility: string;
  coverage: string;
  benefits: string[];
  icon?: 'book' | 'clipboard' | 'footprints' | 'heart' | 'brain' | 'thermometer' | 'shield';
}

interface HealthRecommendationsProps {
  recommendations: Recommendation[];
  medicarePrograms?: MedicareProgram[];
  activeTab?: 'all' | 'physical' | 'mental' | 'substance';
  onScheduleCall?: () => void;
}

export const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({ 
  recommendations,
  medicarePrograms = [],
  activeTab = 'all',
  onScheduleCall
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

  const getIconForRecommendation = (recommendation: Recommendation | MedicareProgram) => {
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
      case 'shield':
        return <Shield className="h-5 w-5 text-hana-green" />;
      default: {
        // Default icon based on first related area
        if ('relatedAreas' in recommendation) {
          const area = recommendation.relatedAreas && recommendation.relatedAreas[0]?.toLowerCase();
          if (area?.includes('sleep')) return <Thermometer className="h-5 w-5 text-indigo-500" />;
          if (area?.includes('emotional') || area?.includes('stress')) return <Brain className="h-5 w-5 text-violet-500" />;
          if (area?.includes('energy') || area?.includes('physical')) return <Footprints className="h-5 w-5 text-amber-500" />;
        }
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

  const getActionTypeButton = (recommendation: Recommendation) => {
    const actionType = recommendation.actionType || 'self';
    const actionLabel = recommendation.actionLabel || "Start Now";
    
    switch (actionType) {
      case 'call':
        return (
          <Button 
            size="sm" 
            variant="default" 
            className="mt-1 bg-green-600 hover:bg-green-700"
            onClick={() => {
              toast({
                title: "Scheduling a call",
                description: `We'll discuss your ${recommendation.title} during your next call.`
              });
              if (onScheduleCall) onScheduleCall();
            }}
          >
            <PhoneCall className="mr-1 h-4 w-4" />
            Discuss in Next Call
          </Button>
        );
      case 'followup':
        return (
          <Button 
            size="sm" 
            variant="default" 
            className="mt-1 bg-amber-500 hover:bg-amber-600"
            onClick={() => {
              toast({
                title: "Added to follow-up plan",
                description: `We'll address ${recommendation.title} in your follow-up session.`
              });
            }}
          >
            <Calendar className="mr-1 h-4 w-4" />
            Add to Follow-up
          </Button>
        );
      case 'self':
      default:
        return (
          <Button 
            size="sm" 
            variant="default" 
            className="mt-1"
            onClick={() => {
              toast({
                title: "Action added",
                description: `${recommendation.title} has been added to your plan.`
              });
            }}
          >
            <ArrowRight className="mr-1 h-4 w-4" />
            {actionLabel}
          </Button>
        );
    }
  };

  const getActionTypeTag = (actionType?: 'self' | 'call' | 'followup') => {
    if (!actionType || actionType === 'self') return null;
    
    let color = '';
    let text = '';
    let icon = null;
    
    switch (actionType) {
      case 'call':
        color = 'bg-green-100 text-green-800';
        text = 'Coaching Call';
        icon = <PhoneCall className="h-3 w-3 mr-1" />;
        break;
      case 'followup':
        color = 'bg-amber-100 text-amber-800';
        text = 'Follow-up';
        icon = <Calendar className="h-3 w-3 mr-1" />;
        break;
    }
    
    return (
      <span className={cn("inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full mr-2", color)}>
        {icon}
        {text}
      </span>
    );
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <HeartPulse className="w-5 h-5 text-hana-green mr-2" />
          Health & Wellbeing Recommendations
        </CardTitle>
        <CardDescription className="text-gray-600 mt-1">
          Personalized guidance based on your health assessment
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <Tabs defaultValue="health" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="health" className="flex-1">Health & Wellbeing</TabsTrigger>
            <TabsTrigger value="clinical" className="flex-1">Clinical Guidelines</TabsTrigger>
          </TabsList>
          
          <TabsContent value="health">
            <div className="flex mt-3 mb-4 space-x-2">
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
                          {getActionTypeTag(recommendation.actionType)}
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
                      
                      {getActionTypeButton(recommendation)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No recommendations found for this category.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="clinical">
            <div className="space-y-4">
              {medicarePrograms.length > 0 ? (
                medicarePrograms.map((program, index) => (
                  <div 
                    key={index} 
                    className="border rounded-lg overflow-hidden hover-scale"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getIconForRecommendation(program)}
                          <h3 className="font-medium text-gray-900">{program.name}</h3>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-3">{program.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 mb-2">Eligibility:</h4>
                          <p className="text-sm text-gray-600">{program.eligibility}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 mb-2">Coverage:</h4>
                          <p className="text-sm text-gray-600">{program.coverage}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="text-xs font-medium text-gray-700 mb-2">Benefits:</h4>
                        <ul className="list-disc list-inside text-sm space-y-1 pl-1">
                          {program.benefits.map((benefit, i) => (
                            <li key={i} className="text-gray-600">{benefit}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="default" 
                        className="mt-1"
                        onClick={() => {
                          toast({
                            title: "Program information",
                            description: `Details about ${program.name} have been sent to your email.`
                          });
                        }}
                      >
                        <ArrowRight className="mr-1 h-4 w-4" />
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No Medicare programs available at this time.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HealthRecommendations;
