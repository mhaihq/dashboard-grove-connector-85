
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Stethoscope, Info } from 'lucide-react';
import { ClinicalRecommendation, MedicareProgram } from '@/types/dashboard';
import RecommendationCard from '@/components/dashboard/RecommendationCard';
import MedicarePrograms from '@/components/dashboard/MedicarePrograms';
import VisualCarePathway from '@/components/dashboard/VisualCarePathway';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ClinicalGuidelinesTabProps {
  recommendations: ClinicalRecommendation[];
  medicarePrograms: MedicareProgram[];
  onRecommendationAction: (recommendation: ClinicalRecommendation) => void;
  onSwitchTab: () => void;
}

export const ClinicalGuidelinesTab: React.FC<ClinicalGuidelinesTabProps> = ({
  recommendations,
  medicarePrograms,
  onRecommendationAction,
  onSwitchTab
}) => {
  // Limit to 3-4 recommendations, prioritizing by high/medium/low
  const sortedRecommendations = [...recommendations]
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 3); // Limit to 3 recommendations

  // Current care level (could be from user data)
  const currentCareLevel = "coaching";

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3 mb-5">
          <Stethoscope className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800 font-medium">Clinical Guidelines</p>
            <p className="text-sm text-blue-700">
              Based on your Medicare coverage, these clinical guidelines and programs are available to support your health needs.
            </p>
          </div>
        </div>
        
        {/* Visual Care Pathway */}
        <div className="mb-8">
          <h3 className="text-base font-medium text-gray-900 mb-3">Your Care Journey</h3>
          <VisualCarePathway currentLevel={currentCareLevel} />
        </div>
        
        {/* Mental Health Care Options */}
        <div className="mb-8">
          <h3 className="text-base font-medium text-gray-900 mb-3">Mental Health Support Options</h3>
          <Accordion type="single" collapsible className="border rounded-lg overflow-hidden">
            <AccordionItem value="self-help" className="border-b">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Self-Help</span>
                  <span className="font-medium">Tools you can use on your own</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3 pt-0">
                <p className="text-sm text-gray-600">
                  Self-help resources include guided activities, educational materials, and wellness tools you can access anytime. 
                  These tools are designed to give you skills for managing stress, improving sleep, and enhancing your wellbeing.
                </p>
                <div className="mt-2">
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                    Explore Self-Help Tools
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="coaching" className="border-b">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Coaching</span>
                  <span className="font-medium">Personalized guidance and support</span>
                  <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full">You Are Here</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3 pt-0">
                <p className="text-sm text-gray-600">
                  Health coaching provides personalized guidance to help you reach your health goals. Your coach will help you develop 
                  action plans, provide accountability, and connect you with appropriate resources for your needs.
                </p>
                <div className="mt-2">
                  <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                    Schedule Coaching Session
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="therapy" className="border-b">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Therapy</span>
                  <span className="font-medium">Professional mental healthcare</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3 pt-0">
                <p className="text-sm text-gray-600">
                  Therapy (like CBT - Cognitive Behavioral Therapy) involves working with a licensed mental health professional 
                  to address specific concerns through evidence-based treatments. It's effective for managing depression, anxiety, and other conditions.
                </p>
                <div className="mt-2">
                  <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                    Learn About Therapy Options
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="psychiatry">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Psychiatry</span>
                  <span className="font-medium">Medical treatment for mental health</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3 pt-0">
                <p className="text-sm text-gray-600">
                  Psychiatrists are medical doctors who can diagnose mental health conditions and prescribe medications. 
                  This level of care is appropriate when symptoms are severe or when medication may be beneficial alongside other treatments.
                </p>
                <div className="mt-2">
                  <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                    Discuss With Your Coach
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Clinical Recommendations Section */}
        {sortedRecommendations.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-900 mb-3">Recommended Clinical Interventions</h3>
            <div className="space-y-4">
              {sortedRecommendations.map((recommendation, index) => (
                <RecommendationCard 
                  key={index} 
                  recommendation={recommendation} 
                  isClinical={true}
                  onAction={onRecommendationAction} 
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Medicare Programs Section */}
        <MedicarePrograms programs={medicarePrograms} />
        
        {/* Decision Helper */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-5 w-5 text-blue-500" />
            <h3 className="text-base font-medium">Not sure what you need?</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Consider these questions to help determine the right level of care:
          </p>
          <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5 mb-3">
            <li>Are you looking for tools to manage everyday stress? <span className="text-blue-600">Try Self-Help</span></li>
            <li>Do you need personalized support and accountability? <span className="text-green-600">Stay with Coaching</span></li> 
            <li>Are you struggling with persistent symptoms? <span className="text-purple-600">Consider Therapy</span></li>
            <li>Do you think medication might help? <span className="text-red-600">Discuss Psychiatry</span></li>
          </ul>
          <Button variant="secondary" size="sm">Talk to Your Health Coach</Button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="link" 
          className="text-hana-green hover:text-green-700"
          onClick={onSwitchTab}
        >
          View Personal Recommendations <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ClinicalGuidelinesTab;
