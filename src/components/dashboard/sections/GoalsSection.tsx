
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CarePlan } from '@/components/dashboard/CarePlan';
import { CarePlanItem } from '@/types/dashboard';

interface GoalsSectionProps {
  carePlanItems: CarePlanItem[];
  nextCheckInDate: string;
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({
  carePlanItems,
  nextCheckInDate
}) => {
  return (
    <div className="mb-16">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">
            🧭 Your Active Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CarePlan items={carePlanItems} />
          
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
