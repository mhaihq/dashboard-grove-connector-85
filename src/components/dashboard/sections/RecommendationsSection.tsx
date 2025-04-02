import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageSquare, 
  PlusCircle, 
  BookmarkPlus, 
  Repeat,
  InfoIcon,
  Moon,
  Brain,
  Activity,
  Droplets,
  PenLine,
  Lightbulb,
  Stethoscope,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { clinicalRecommendations } from '@/data/recommendations/clinicalRecommendations';

interface PatternInsightCardProps {
  insightTitle: string;
  pattern: string;
  result: string;
  suggestion: string;
  status: 'positive' | 'negative' | 'cognitive' | 'curious';
  category: 'sleep' | 'stress' | 'exercise' | 'nutrition' | 'hydration' | 'social';
  tooltipInfo?: string;
  tags?: string[];
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'sleep':
      return <Moon className="w-5 h-5" />;
    case 'stress':
      return <Activity className="w-5 h-5" />;
    case 'exercise':
      return <Activity className="w-5 h-5" />;
    case 'nutrition':
      return <Droplets className="w-5 h-5" />;
    case 'hydration':
      return <Droplets className="w-5 h-5" />;
    case 'social':
      return <MessageSquare className="w-5 h-5" />;
    default:
      return <Brain className="w-5 h-5" />;
  }
};

const getStatusIcon = (status: 'positive' | 'negative' | 'cognitive' | 'curious') => {
  switch (status) {
    case 'positive': return '✅';
    case 'negative': return '⚠️';
    case 'cognitive': return '🧠';
    case 'curious': return '💡';
    default: return '✅';
  }
};

const getStatusColor = (status: 'positive' | 'negative' | 'cognitive' | 'curious') => {
  switch (status) {
    case 'positive': return 'bg-green-100 text-green-800 border-green-200';
    case 'negative': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'cognitive': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'curious': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-green-100 text-green-800 border-green-200';
  }
};

const PatternInsightCard: React.FC<PatternInsightCardProps> = ({
  insightTitle,
  pattern,
  result,
  suggestion,
  status,
  category,
  tooltipInfo = "This insight was found based on your recent activity patterns.",
  tags = []
}) => {
  const statusIcon = getStatusIcon(status);
  const statusColor = getStatusColor(status);
  const categoryIcon = getCategoryIcon(category);
  
  return (
    <Card className="overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold">{statusIcon}</span>
              <h3 className="text-lg font-bold text-gray-900">{insightTitle}</h3>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {tags.map((tag, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p>{tooltipInfo}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="space-y-4 mb-5">
          <div className="flex gap-2">
            <div className={cn(
              "p-1.5 rounded-full flex-shrink-0 mt-0.5",
              status === 'positive' ? 'bg-green-100' : 
              status === 'negative' ? 'bg-amber-100' : 
              status === 'cognitive' ? 'bg-purple-100' : 'bg-blue-100'
            )}>
              {categoryIcon}
            </div>
            <div>
              <p className="text-gray-700 font-medium">Behavioral Pattern Detected:</p>
              <p className="text-gray-600">{pattern}</p>
            </div>
          </div>
          
          <div className="pl-8">
            <p className="text-gray-700 font-medium">Observed Result:</p>
            <p className="text-gray-600">{result}</p>
          </div>
          
          <div className="pl-8">
            <p className="text-gray-700 font-medium">Suggested Action:</p>
            <p className="text-gray-600">{suggestion}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ClinicalGuidelineCard = ({ recommendation }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center bg-blue-50 p-4 border-b border-gray-200">
        <div className="bg-white p-2.5 rounded-full mr-3 shadow-sm text-blue-600">
          {recommendation.icon === 'thermometer' && <Moon className="w-5 h-5" />}
          {recommendation.icon === 'brain' && <Brain className="w-5 h-5" />}
          {recommendation.icon === 'heart' && <Activity className="w-5 h-5" />}
          {recommendation.icon === 'footprints' && <Activity className="w-5 h-5" />}
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

interface RecommendationsSectionProps {
  recommendations: any[];
  medicarePrograms: any[];
  onScheduleCall: () => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  recommendations,
  medicarePrograms,
  onScheduleCall
}) => {
  const [activeTab, setActiveTab] = useState<"behavioral" | "clinical">("behavioral");

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Health Insights</h2>
      
      <Tabs defaultValue="behavioral" className="w-full">
        <TabsList className="mb-6 w-full grid grid-cols-2">
          <TabsTrigger value="behavioral" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <span>Behavioral Insights</span>
          </TabsTrigger>
          <TabsTrigger value="clinical" className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            <span>Clinical Guidelines</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="behavioral">
          <div className="mb-5 bg-amber-50 border border-amber-100 rounded-lg p-3 flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium">How these insights work</p>
              <p className="text-sm text-amber-700">
                These patterns are observed from your conversations, tracking data, and journal entries. We focus on connections between behaviors and health outcomes.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PatternInsightCard
              insightTitle="Better Sleep When Waking Early"
              pattern="You woke before 7am on 3 days last week."
              result="Your reported sleep quality improved by +23% on those days."
              suggestion="Try keeping your wake time before 7am 3x next week."
              status="positive"
              category="sleep"
              tooltipInfo="This pattern was detected across 8 sleep journal entries."
              tags={["Morning Routine", "Sleep Quality"]}
            />
            
            <PatternInsightCard
              insightTitle="Stress Increases with Long Hours"
              pattern="You worked more than 8 hours on 4 days last week."
              result="Your reported stress level was 43% higher on those days."
              suggestion="Schedule at least 3 days with firm work boundaries under 8 hours."
              status="negative"
              category="stress"
              tooltipInfo="You also experienced this pattern last month during busy weeks."
              tags={["Workload", "Stress Triggers"]}
            />
            
            <PatternInsightCard
              insightTitle="Morning Exercise Boosts Consistency"
              pattern="You exercised before 9am on 3 days last week."
              result="You were 78% more likely to complete your planned workout when starting early."
              suggestion="Schedule 2-3 morning workout sessions this week."
              status="positive"
              category="exercise"
              tooltipInfo="Based on your activity tracking from the past 3 weeks."
              tags={["Morning Routine", "Exercise"]}
            />
            
            <PatternInsightCard
              insightTitle="Breakfast Improves Diet Quality"
              pattern="You ate breakfast within 1 hour of waking on 4 days."
              result="Your overall nutrition quality was 35% better on days with early breakfast."
              suggestion="Prepare simple breakfast options for 3-4 mornings this week."
              status="cognitive"
              category="nutrition"
              tooltipInfo="This insight combines your meal tracking and energy ratings."
              tags={["Morning Routine", "Nutrition"]}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="clinical">
          <div className="mb-5 bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800 font-medium">About clinical guidelines</p>
              <p className="text-sm text-blue-700">
                These evidence-based recommendations may be beneficial based on your health profile. Discuss with your healthcare provider before making changes.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            {clinicalRecommendations.slice(0, 3).map((recommendation, index) => (
              <ClinicalGuidelineCard key={index} recommendation={recommendation} />
            ))}
            
            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <InfoIcon className="h-5 w-5 text-blue-500" />
                <h3 className="text-base font-medium">Your Medicare Care Journey</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Based on your Medicare coverage, you have access to these different levels of care:
              </p>
              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5 mb-3">
                <li><span className="text-blue-600">Self-Help Tools</span>: Resources you can use independently</li>
                <li><span className="text-green-600">Health Coaching</span>: Personalized guidance and support</li>
                <li><span className="text-purple-600">Therapy Options</span>: Professional mental healthcare</li>
                <li><span className="text-red-600">Psychiatric Care</span>: Medical treatment when needed</li>
              </ul>
              <Button onClick={onScheduleCall} variant="secondary" size="sm">
                Discuss With Your Health Coach
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecommendationsSection;
