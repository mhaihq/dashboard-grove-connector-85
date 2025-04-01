
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
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center">
              <List className="w-5 h-5 text-hana-green mr-2" />
              Your Action Plan
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
              <TabsTrigger value="analytics">Progress Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <CarePlan items={carePlanItems} />
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="p-6 text-center text-gray-500 border border-dashed border-gray-200 rounded-lg">
                <BarChart className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p>Detailed progress analytics will be available after 2 weeks of activity.</p>
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
