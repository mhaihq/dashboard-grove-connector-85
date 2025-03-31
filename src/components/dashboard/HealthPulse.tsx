
import React from 'react';
import { Activity, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface HealthPulseItem {
  area: string;
  score: number;
  improving: boolean;
}

interface HealthPulseProps {
  data: HealthPulseItem[];
}

export const HealthPulse: React.FC<HealthPulseProps> = ({ data }) => {
  // Calculate most improved area and area to focus
  const improving = data.filter(item => item.improving);
  const needsWork = data.filter(item => !item.improving);
  
  const mostImproved = improving.length > 0 
    ? improving.reduce((prev, current) => (prev.score > current.score) ? prev : current) 
    : null;
    
  const focusArea = needsWork.length > 0 
    ? needsWork.reduce((prev, current) => (prev.score < current.score) ? prev : current) 
    : null;
  
  // Count positive trends
  const positiveCount = data.filter(item => item.improving).length;

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Activity className="w-5 h-5 text-hana-green mr-2" />
          Health Pulse
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-3">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <PolarAngleAxis 
                dataKey="area" 
                tick={{ fill: '#4b5563', fontSize: 13, fontWeight: 500 }}
                stroke="#e5e7eb"
                tickLine={false}
              />
              <PolarRadiusAxis 
                domain={[0, 100]} 
                tickCount={5}
                tick={{ fontSize: 11 }}
                stroke="#9ca3af"
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#1C6E4A"
                fill="#1C6E4A"
                fillOpacity={0.45}
                strokeWidth={2}
              />
              <Tooltip 
                formatter={(value) => [`${value}/100`, 'Score']}
                labelFormatter={(label) => `${label}`}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '10px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)',
                  padding: '10px 14px',
                  fontSize: '14px'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex flex-col gap-2 text-sm">
          <div className="flex items-center text-gray-700">
            <Sparkles className="w-4 h-4 text-amber-500 mr-2" />
            {mostImproved && <span>Most Improved: <span className="font-medium">{mostImproved.area}</span>.</span>}
            {focusArea && <span className="ml-2">Area to Focus: <span className="font-medium">{focusArea.area}</span>.</span>}
          </div>
          <p className="text-gray-600">
            You're trending positively in <span className="font-medium text-green-600">{positiveCount} out of {data.length}</span> areas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthPulse;
