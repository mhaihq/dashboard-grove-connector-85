
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';
import { MessageSquare, Eye, User } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  metric: string;
  change: string;
  changeType: 'positive' | 'negative';
  changeValue: string;
  condition: string;
  date: string;
  context: string;
  data: Array<{ value: number }>;
  chartType?: 'area' | 'bar';
  color?: string;
}

const HealthInsightCard: React.FC<HealthInsightCardProps> = ({
  title,
  metric,
  change,
  changeType,
  changeValue,
  condition,
  date,
  context,
  data,
  chartType = 'area',
  color = '#33C3F0'
}) => {
  return (
    <Card className="overflow-hidden border-gray-200 shadow-sm hover:shadow transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`bg-${changeType === 'positive' ? 'blue' : 'amber'}-100 p-2 rounded-full`}>
              <div className={`bg-${changeType === 'positive' ? 'blue' : 'amber'}-500 w-6 h-6 rounded-full flex items-center justify-center`}>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-3 w-1/2 bg-gray-200 rounded mt-1"></div>
            </div>
          </div>
          <div className="flex space-x-1">
            <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
            <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
            <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>
        
        <div className="mt-8">
          <p className="text-gray-700 text-xl">
            The <span className="font-medium">{title}</span> of <span className="text-blue-500">{metric}</span> <span className={cn(
              "font-medium",
              changeType === 'positive' ? 'text-blue-500' : 'text-amber-500'
            )}>{change}</span> on the {date} where the {condition} is {context}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="h-16">
            <ResponsiveContainer width={160} height={60}>
              {chartType === 'area' ? (
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id={`color${title}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={color} 
                    fillOpacity={1} 
                    fill={`url(#color${title})`} 
                  />
                </AreaChart>
              ) : (
                <BarChart data={data}>
                  <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          <div className={cn(
            "text-4xl font-bold",
            changeType === 'positive' ? 'text-blue-500' : 'text-amber-500'
          )}>
            {changeValue}
          </div>
        </div>
        
        <div className="h-px bg-gray-200 w-full my-4"></div>
        
        <div className="flex justify-between items-center">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="flex space-x-4">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <Eye className="w-5 h-5 text-gray-400" />
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-500" />
            </div>
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
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Health Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HealthInsightCard
          title="sum of"
          metric="Sleep Quality"
          change="spiked"
          changeType="positive"
          changeValue="+23%"
          condition="Wake Time"
          date="June 25"
          context="before 7am"
          data={sleepData}
          color="#33C3F0"
        />
        
        <HealthInsightCard
          title="Avg of"
          metric="Stress Level"
          change="spiked"
          changeType="negative"
          changeValue="+43%"
          condition="Work Hours"
          date="February 23"
          context="over 8 hours"
          data={stressData}
          color="#FFB74D"
          chartType="area"
        />
        
        <HealthInsightCard
          title="frequency of"
          metric="Exercise"
          change="increased"
          changeType="positive"
          changeValue="+78%"
          condition="Morning Routine"
          date="March 15"
          context="includes stretching"
          data={exerciseData}
          color="#4CAF50"
          chartType="bar"
        />
        
        <HealthInsightCard
          title="quality of"
          metric="Nutrition"
          change="improved"
          changeType="positive"
          changeValue="+35%"
          condition="Meal Pattern"
          date="April 10"
          context="includes breakfast"
          data={nutritionData}
          color="#9C27B0"
        />
      </div>
    </div>
  );
};

export default RecommendationsSection;
