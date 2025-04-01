
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthIndicator } from '@/types/dashboard';
import { Sparkles } from 'lucide-react';

interface KeyHealthIndicatorsProps {
  healthIndicators: HealthIndicator[];
}

export const KeyHealthIndicators: React.FC<KeyHealthIndicatorsProps> = ({
  healthIndicators
}) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
          Key Health Indicators
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {healthIndicators.map((indicator, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900">{indicator.title}</h3>
              <p className="text-sm text-gray-600 mt-1">Value: {indicator.value}</p>
              <p className="text-sm text-gray-600">Change: {indicator.change}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
