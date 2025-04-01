
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
  
  // Atomic Habits - create habit stacks and implementation intentions
  const habitStacks = [
    { currentHabit: "After brewing your morning coffee", newHabit: "do a 2-minute walk in place" },
    { currentHabit: "After brushing your teeth at night", newHabit: "do 3 minutes of deep breathing" }
  ];
  
  // Implementation intentions
  const implementations = [
    { goal: "Going to the gym", when: "Mondays at 5pm", where: "right after work" },
    { goal: "Hydration", when: "Every 2 hours", where: "whenever my phone alarm rings" }
  ];
  
  return (
    <div>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <List className="w-5 h-5 text-hana-green mr-2" />
              <span className="font-medium text-gray-700">Your SMART Goals</span>
            </div>
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
              <TabsTrigger value="streaks">Consistency Tracking</TabsTrigger>
              <TabsTrigger value="habits">Habit Building</TabsTrigger>
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
            
            <TabsContent value="habits">
              <div className="space-y-4">
                <div className="border border-blue-100 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-medium text-blue-800 mb-2">Habit Stacking</h3>
                  <p className="text-xs text-blue-600 mb-3">Connect new habits to existing routines for better consistency</p>
                  <div className="space-y-3">
                    {habitStacks.map((stack, index) => (
                      <div key={index} className="rounded-md bg-white p-3 shadow-sm">
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <span className="text-blue-500 mr-2 font-bold">→</span>
                            <span className="text-sm text-gray-700"><strong>{stack.currentHabit}</strong> (existing habit),</span>
                          </div>
                          <div className="pl-6">
                            <span className="text-sm text-gray-700"><strong>{stack.newHabit}</strong> (new habit).</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border border-purple-100 rounded-lg p-4 bg-purple-50">
                  <h3 className="font-medium text-purple-800 mb-2">Implementation Intentions</h3>
                  <p className="text-xs text-purple-600 mb-3">Specifying when and where you'll take action builds consistency</p>
                  <div className="space-y-3">
                    {implementations.map((implementation, index) => (
                      <div key={index} className="rounded-md bg-white p-3 shadow-sm">
                        <p className="text-sm text-gray-700">
                          "I will <strong>{implementation.goal}</strong> on <strong>{implementation.when}</strong> {implementation.where}."
                        </p>
                      </div>
                    ))}
                  </div>
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
