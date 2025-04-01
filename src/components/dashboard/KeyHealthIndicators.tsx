
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
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
          Your Health Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {healthIndicators.map((indicator, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg p-5 border border-gray-100 shadow-sm hover:shadow transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{indicator.title}</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-700 flex justify-between">
                  <span>Value:</span>
                  <span className="font-medium">{indicator.value}</span>
                </p>
                <p className="text-sm text-gray-700 flex justify-between">
                  <span>Change:</span>
                  <span className={`font-medium ${
                    indicator.change === 'improving' ? 'text-green-600' :
                    indicator.change === 'declining' ? 'text-red-600' : 'text-amber-600'
                  }`}>
                    {indicator.change}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyHealthIndicators;
