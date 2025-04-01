
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HealthIndicator {
  title: string;
  value: string;
  change: string;
  icon: () => React.ReactNode;
}

interface KeyHealthIndicatorsProps {
  healthIndicators: HealthIndicator[];
}

export const KeyHealthIndicators: React.FC<KeyHealthIndicatorsProps> = ({ 
  healthIndicators 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {healthIndicators.map((indicator, i) => (
        <Card key={i} className="hover-scale text-left">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-gray-500">{indicator.title}</CardTitle>
              {indicator.icon()}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{indicator.value}</div>
            <p className={`text-xs ${
              indicator.change === "improving" ? "text-green-600" : 
              indicator.change === "worsening" ? "text-red-600" : 
              "text-blue-600"
            }`}>
              {indicator.title === "Medicare Status" 
                ? "Great news! You're covered for our support program" 
                : indicator.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KeyHealthIndicators;
