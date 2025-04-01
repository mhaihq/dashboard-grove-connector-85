
import React from 'react';
import { Calendar, List, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CarePlan } from '@/components/dashboard/CarePlan';
import { CarePlanItem } from '@/types/dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GoalsSectionProps {
  carePlanItems: CarePlanItem[];
  nextCheckInDate: string;
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({
  carePlanItems,
  nextCheckInDate
}) => {
  // Calculate overall progress
  const completedSteps = carePlanItems.reduce((sum, item) => sum + (item.completedSteps || 0), 0);
  const totalSteps = carePlanItems.reduce((sum, item) => sum + (item.totalSteps || 0), 0);
  const overallProgress = Math.round((completedSteps / totalSteps) * 100);

  // Get active goals count
  const activeGoals = carePlanItems.filter(item => item.status !== 'complete').length;
  
  return (
    <div className="mb-16">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">B. Goals & Milestones</h2>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center">
              <List className="w-5 h-5 text-hana-green mr-2" />
              Your SMART Goals
            </CardTitle>
            <div className="flex items-center text-sm">
              <span className="text-gray-500 mr-2">Overall Progress:</span>
              <span className="font-medium text-hana-green">{overallProgress}%</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="active" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="active">{activeGoals} Active Goals</TabsTrigger>
              <TabsTrigger value="streaks">Streak Counters</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <CarePlan items={carePlanItems} />
            </TabsContent>
            
            <TabsContent value="streaks">
              <div className="space-y-4">
                <div className="border border-green-100 rounded-lg p-4 bg-green-50">
                  <h3 className="font-medium text-green-800 mb-2">Active Streaks</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Morning walks</span>
                      <span className="font-medium text-green-800">5 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Alcohol-free evenings</span>
                      <span className="font-medium text-green-800">3 days</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-amber-100 rounded-lg p-4 bg-amber-50">
                  <h3 className="font-medium text-amber-800 mb-2">Next Milestones</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span className="text-amber-700">Next milestone: 2 consecutive weeks meeting your gym goal!</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span className="text-amber-700">You're 3 days away from a hydration streak.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-5 flex items-center text-sm text-gray-600 border-t pt-4 border-gray-100">
            <Calendar className="w-4 h-4 mr-2 text-hana-green" />
            <span>Weekly Check-in Scheduled: </span>
            <span className="font-medium ml-1">{nextCheckInDate}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalsSection;
