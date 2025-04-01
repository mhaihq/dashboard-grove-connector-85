
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, Activity, Brain, Shield, Heart, Users } from 'lucide-react';

interface HealthIndicator {
  title: string;
  value: string;
  change: string;
  icon: string;
}

interface KeyHealthIndicatorsProps {
  healthIndicators: HealthIndicator[];
}

export const KeyHealthIndicators: React.FC<KeyHealthIndicatorsProps> = ({ 
  healthIndicators 
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'moon':
        return <Moon className="h-5 w-5 text-indigo-500" />;
      case 'activity':
        return <Activity className="h-5 w-5 text-red-500" />;
      case 'brain':
        return <Brain className="h-5 w-5 text-amber-500" />;
      case 'shield':
        return <Shield className="h-5 w-5 text-hana-green" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {healthIndicators.map((indicator, i) => (
        <Card key={i} className="hover-scale text-left">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-gray-500">{indicator.title}</CardTitle>
              {getIcon(indicator.icon)}
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
