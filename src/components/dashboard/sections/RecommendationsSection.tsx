
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';
import { 
  MessageSquare, 
  PlusCircle, 
  BookmarkPlus, 
  RepeatCircle, 
  InfoIcon,
  Moon,
  Brain,
  Activity,
  Droplets
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

// Sample data for the charts
const sleepData = [
  { value: 68 }, { value: 72 }, { value: 70 }, { value: 69 }, 
  { value: 75 }, { value: 90 }, { value: 82 }, { value: 79 }
];

const stressData = [
  { value: 40 }, { value: 39 }, { value: 42 }, { value: 38 }, 
  { value: 30 }, { value: 29 }, { value: 35 }, { value: 32 }
];

const exerciseData = [
  { value: 2 }, { value: 3 }, { value: 2 }, { value: 4 }, 
  { value: 3 }, { value: 5 }, { value: 4 }, { value: 3 }
];

const nutritionData = [
  { value: 65 }, { value: 70 }, { value: 68 }, { value: 72 }, 
  { value: 75 }, { value: 79 }, { value: 80 }, { value: 82 }
];

interface HealthInsightCardProps {
  title: string;
  insightTitle: string;
  metric: string;
  change: string;
  changeType: 'positive' | 'negative' | 'cognitive';
  changeValue: string;
  condition: string;
  date: string;
  context: string;
  data: Array<{ value: number }>;
  chartType?: 'area' | 'bar';
  color?: string;
  tooltipInfo?: string;
  categoryIcon?: React.ReactNode;
}

const getColorByChangeType = (changeType: 'positive' | 'negative' | 'cognitive') => {
  switch (changeType) {
    case 'positive': return 'green';
    case 'negative': return 'amber';
    case 'cognitive': return 'purple';
    default: return 'blue';
  }
};

const getCategoryIcon = (metric: string) => {
  switch (metric.toLowerCase()) {
    case 'sleep quality':
      return <Moon className="w-5 h-5" />;
    case 'stress level':
      return <Activity className="w-5 h-5" />;
    case 'exercise':
      return <Activity className="w-5 h-5" />;
    case 'nutrition':
      return <Droplets className="w-5 h-5" />;
    default:
      return <Brain className="w-5 h-5" />;
  }
};

const HealthInsightCard: React.FC<HealthInsightCardProps> = ({
  insightTitle,
  metric,
  change,
  changeType,
  changeValue,
  condition,
  date,
  context,
  data,
  chartType = 'area',
  color = '#33C3F0',
  tooltipInfo = "This insight was found based on 3 weeks of conversation data.",
  categoryIcon
}) => {
  const colorClass = getColorByChangeType(changeType);
  
  return (
    <Card className="overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">{insightTitle}</h3>
            <p className="text-sm text-gray-500 mt-1">{metric}</p>
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
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <p className="text-gray-700 text-md leading-relaxed">
              {condition} on <span className="font-medium">{date}</span> when {context}
            </p>
          </div>
          
          <div className={cn(
            "flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center",
            changeType === 'positive' ? 'bg-green-100' : 
            changeType === 'negative' ? 'bg-amber-100' : 'bg-purple-100'
          )}>
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg",
              changeType === 'positive' ? 'bg-green-500' : 
              changeType === 'negative' ? 'bg-amber-500' : 'bg-purple-500'
            )}>
              {changeType === 'positive' ? '✓' : 
               changeType === 'negative' ? '!' : '?'}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="h-24 w-1/2 max-w-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'area' ? (
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id={`color${metric}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={color} 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill={`url(#color${metric})`} 
                  />
                </AreaChart>
              ) : (
                <BarChart data={data}>
                  <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-2">
            <Badge variant="outline" className={cn(
              "text-xs py-1 px-2",
              changeType === 'positive' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
              changeType === 'negative' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 
              'bg-purple-100 text-purple-800 hover:bg-purple-200'
            )}>
              {changeValue} {change}
            </Badge>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="flex space-x-2">
            {categoryIcon && (
              <div className={cn(
                "p-1 rounded-full",
                changeType === 'positive' ? 'bg-green-100 text-green-500' : 
                changeType === 'negative' ? 'bg-amber-100 text-amber-500' : 'bg-purple-100 text-purple-500'
              )}>
                {categoryIcon}
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="text-xs">
              <PlusCircle className="w-3.5 h-3.5 mr-1" />
              Add to Focus
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <BookmarkPlus className="w-3.5 h-3.5 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
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
  // Enhanced recommendations with Atomic Habits principles
  const enhancedRecommendations = recommendations.map(rec => {
    let atomicHabitsPrinciple = '';
    let systemsThinking = '';
    
    // Add Atomic Habits principles based on recommendation type
    if (rec.title.includes('Sleep')) {
      atomicHabitsPrinciple = 'Environment Design';
      systemsThinking = 'Creating a sleep-friendly environment makes good sleep automatic, not effortful';
    } else if (rec.title.includes('Stress')) {
      atomicHabitsPrinciple = 'Habit Stacking';
      systemsThinking = 'Attaching stress relief to existing routines builds consistency without willpower';
    } else if (rec.title.includes('Emotional')) {
      atomicHabitsPrinciple = 'Implementation Intentions';
      systemsThinking = 'Specifying when and where you\'ll manage emotions removes decision fatigue';
    } else if (rec.title.includes('Energy')) {
      atomicHabitsPrinciple = 'Make It Easy';
      systemsThinking = 'Reducing friction in your environment leads to more consistent energy management';
    }
    
    return {
      ...rec,
      atomicHabitsPrinciple,
      systemsThinking
    };
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Health Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <HealthInsightCard
          insightTitle="Better Sleep When Waking Early"
          title="sum of"
          metric="Sleep Quality"
          change="spiked"
          changeType="positive"
          changeValue="+23%"
          condition="Wake Time"
          date="June 25"
          context="you woke before 7am"
          data={sleepData}
          color="#33C3F0"
          tooltipInfo="This pattern was detected across 8 sleep journal entries."
          categoryIcon={<Moon className="w-5 h-5" />}
        />
        
        <HealthInsightCard
          insightTitle="Stress Increases with Long Hours"
          title="Avg of"
          metric="Stress Level"
          change="spiked"
          changeType="negative"
          changeValue="+43%"
          condition="Work Hours"
          date="February 23"
          context="you worked over 8 hours"
          data={stressData}
          color="#FFB74D"
          chartType="area"
          tooltipInfo="You also experienced this pattern last month during busy weeks."
          categoryIcon={<Activity className="w-5 h-5" />}
        />
        
        <HealthInsightCard
          insightTitle="Morning Exercise Boosts Consistency"
          title="frequency of"
          metric="Exercise"
          change="increased"
          changeType="positive"
          changeValue="+78%"
          condition="Morning Routine"
          date="March 15"
          context="you included stretching"
          data={exerciseData}
          color="#4CAF50"
          chartType="bar"
          tooltipInfo="Based on your activity tracking from the past 3 weeks."
          categoryIcon={<Activity className="w-5 h-5" />}
        />
        
        <HealthInsightCard
          insightTitle="Breakfast Improves Diet Quality"
          title="quality of"
          metric="Nutrition"
          change="improved"
          changeType="cognitive"
          changeValue="+35%"
          condition="Meal Pattern"
          date="April 10"
          context="you had breakfast"
          data={nutritionData}
          color="#9C27B0"
          tooltipInfo="This insight combines your meal tracking and energy ratings."
          categoryIcon={<Droplets className="w-5 h-5" />}
        />
      </div>
    </div>
  );
};

export default RecommendationsSection;
