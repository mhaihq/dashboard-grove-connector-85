
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PhoneCall, BookOpen, ChevronRight, ArrowRight, Clock, BarChart } from 'lucide-react';
import { ClinicalRecommendation, MedicareProgram } from '@/types/dashboard';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface HealthRecommendationsProps {
  recommendations: ClinicalRecommendation[];
  medicarePrograms: MedicareProgram[];
  onScheduleCall: () => void;
}

export const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({
  recommendations,
  medicarePrograms,
  onScheduleCall
}) => {
  const [activeTab, setActiveTab] = useState("guidelines");

  const handleAction = (recommendation: ClinicalRecommendation) => {
    switch (recommendation.actionType) {
      case "self":
        toast({
          title: "Plan Started",
          description: `You've started the ${recommendation.title}. Check your progress journal for updates.`,
        });
        break;
      case "followup":
        toast({
          title: "Follow-up Scheduled",
          description: `We'll discuss ${recommendation.title} in detail during our next check-in.`,
        });
        break;
      case "call":
        onScheduleCall();
        break;
    }
  };

  const getActionButton = (recommendation: ClinicalRecommendation) => {
    switch (recommendation.actionType) {
      case "self": 
        return (
          <Button
            onClick={() => handleAction(recommendation)}
            className="bg-hana-green hover:bg-hana-green/90 text-white"
            size="sm"
          >
            {recommendation.actionLabel}
          </Button>
        );
      case "followup":
        return (
          <Button
            onClick={() => handleAction(recommendation)}
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
            onClick={() => handleAction(recommendation)}
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
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <BarChart className="w-5 h-5 text-hana-green mr-2" />
          Health & Wellbeing Recommendations
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-3">
        <Tabs defaultValue="guidelines" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-5">
            <TabsTrigger value="guidelines">Clinical Guidelines</TabsTrigger>
            <TabsTrigger value="recommendations">Personal Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guidelines">
            <div className="space-y-4 mb-4">
              <p className="text-sm text-gray-700">
                Based on your Medicare coverage, you may be eligible for these programs to support your health goals.
              </p>
              
              {medicarePrograms.map((program, index) => (
                <div 
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 mb-1">{program.name}</h3>
                  <p className="text-sm text-gray-700 mb-3">{program.description}</p>
                  
                  <div className="text-xs text-gray-600 mb-3">
                    <div className="mb-1.5">
                      <span className="font-medium text-gray-800">Eligibility:</span> {program.eligibility}
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">Coverage:</span> {program.coverage}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-xs font-medium text-gray-800">Benefits:</span>
                    <ul className="mt-1 space-y-1">
                      {program.benefits.map((benefit, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start">
                          <ArrowRight className="h-3 w-3 text-hana-green mt-0.5 mr-1.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-hana-green border-hana-green hover:bg-hana-lightGreen"
                    >
                      <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="link" 
                className="text-hana-green hover:text-green-700"
                onClick={() => setActiveTab("recommendations")}
              >
                View Personal Recommendations <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center">
                    <span 
                      className={cn(
                        "w-2 h-2 rounded-full mr-3",
                        recommendation.priority === "high" ? "bg-red-500" :
                        recommendation.priority === "medium" ? "bg-amber-500" : "bg-blue-500"
                      )}
                    />
                    <h3 className="font-medium text-gray-900">{recommendation.title}</h3>
                  </div>
                  <span 
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-medium",
                      recommendation.priority === "high" ? "bg-red-100 text-red-800" :
                      recommendation.priority === "medium" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                    )}
                  >
                    {recommendation.priority === "high" ? "Primary Focus" : 
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
                      <span>{recommendation.timeframe}</span> • 
                      <span className="ml-1">
                        {recommendation.difficulty === "easy" ? "Simple to implement" :
                         recommendation.difficulty === "moderate" ? "Moderate effort" : "Requires commitment"}
                      </span>
                    </div>
                    <div>
                      {getActionButton(recommendation)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-end">
              <Button 
                variant="link" 
                className="text-hana-green hover:text-green-700"
                onClick={() => setActiveTab("guidelines")}
              >
                View Medicare Guidelines <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HealthRecommendations;
