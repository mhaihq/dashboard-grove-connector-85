
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Brain, Heart, Footprints, Clipboard, Shield, Book, Lightbulb, Activity, HelpCircle } from 'lucide-react';
import { ClinicalRecommendation, MedicareProgram } from '@/types/dashboard';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BehavioralInsightCard from '@/components/dashboard/BehavioralInsightCard';
import ClinicalRecommendationCard from '@/components/dashboard/ClinicalRecommendationCard';

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

// Create behavioral insights from recommendations data
const createBehavioralInsights = (recommendations: ClinicalRecommendation[]) => {
  return [
    {
      title: "When you walk in the morning, your stress score drops by 15%",
      pattern: "We noticed this pattern over the last 3 weeks, especially on workdays with structured routines.",
      impact: ["Improved emotional regulation scores", "Higher sleep quality on those days", "Fewer alcohol cravings reported"],
      suggestion: "Try continuing morning walks 4x/week for the next 2 weeks.",
      icon: "footprints",
      source: "call-data",
      timeObserved: "3 weeks",
      relatedAreas: ["Stress Management", "Physical Activity"]
    },
    {
      title: "Evening screen time correlates with 40% worse sleep quality",
      pattern: "On nights when you use screens within 1 hour of bedtime, you report significantly poorer sleep.",
      impact: ["Decreased morning energy levels", "Higher stress the following day", "Reduced focus during work hours"],
      suggestion: "Try a digital sunset 1 hour before bed at least 4 nights this week.",
      icon: "thermometer",
      source: "journal-patterns",
      timeObserved: "2 weeks",
      relatedAreas: ["Sleep", "Digital Wellness"]
    },
    {
      title: "Social interactions boost your mood for up to 2 days",
      pattern: "After conversations with friends or family, your mood scores remain elevated for 24-48 hours.",
      impact: ["Higher self-reported wellbeing", "Increased likelihood of exercise", "Reduced anxiety symptoms"],
      suggestion: "Schedule at least one social interaction each week, even briefly.",
      icon: "heart",
      source: "voice-analysis",
      timeObserved: "4 weeks",
      relatedAreas: ["Social Connection", "Emotional Regulation"]
    }
  ];
};

export const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({
  recommendations,
  medicarePrograms,
  onScheduleCall
}) => {
  const [activeTab, setActiveTab] = useState<"behavioral" | "clinical">("behavioral");
  const behavioralInsights = createBehavioralInsights(recommendations);

  const handleRecommendationAction = (recommendation: ClinicalRecommendation) => {
    if (recommendation.actionType === "call") {
      onScheduleCall();
    }
    // Handle other action types as needed
  };

  const handleMakeGoal = (insight: any) => {
    // Would track this insight as a goal
    console.log("Making a goal from insight:", insight.title);
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Actionable Insights</CardTitle>
        <p className="text-sm text-gray-600">
          What we've learned from your conversations and habits.
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-4">
          <Button
            variant={activeTab === "behavioral" ? "default" : "ghost"}
            className={`flex-1 ${activeTab === "behavioral" ? "bg-white shadow-sm" : ""}`}
            onClick={() => setActiveTab("behavioral")}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Behavioral Insights
          </Button>
          <Button
            variant={activeTab === "clinical" ? "default" : "ghost"}
            className={`flex-1 ${activeTab === "clinical" ? "bg-white shadow-sm" : ""}`}
            onClick={() => setActiveTab("clinical")}
          >
            <Activity className="w-4 h-4 mr-2" />
            Clinical Recommendations
          </Button>
        </div>

        {activeTab === "behavioral" ? (
          <div>
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex items-start gap-3 mb-5">
              <HelpCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800 font-medium">How these insights work</p>
                <p className="text-sm text-amber-700">
                  These patterns are observed from your conversations, tracking data, and journal entries. We focus on connections between behaviors and health outcomes.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {behavioralInsights.map((insight, index) => (
                <BehavioralInsightCard 
                  key={index}
                  insight={insight}
                  onMakeGoal={() => handleMakeGoal(insight)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3 mb-5">
              <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 font-medium">About clinical recommendations</p>
                <p className="text-sm text-blue-700">
                  These suggestions are based on your health profile and potential coverage options. Discuss with your healthcare provider before making changes.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {medicarePrograms.slice(0, 2).map((program, index) => (
                <ClinicalRecommendationCard
                  key={index}
                  program={program}
                  onAction={() => onScheduleCall()}
                />
              ))}
              
              {recommendations.slice(0, 2).map((recommendation, index) => (
                <ClinicalRecommendationCard
                  key={`rec-${index}`}
                  program={{
                    ...recommendation,
                    name: recommendation.title,
                    description: recommendation.description,
                    benefits: recommendation.steps,
                    coverage: recommendation.whyItMatters,
                    isEligible: true
                  }}
                  onAction={() => handleRecommendationAction(recommendation)}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthRecommendations;
