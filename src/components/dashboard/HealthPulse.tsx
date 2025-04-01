
import React from 'react';
import { Activity, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  priority?: boolean;
}

interface HealthPulseProps {
  data: HealthPulseItem[];
  mostImproved?: string;
  focusArea?: string;
  positiveAreas?: number;
  totalAreas?: number;
}

export const HealthPulse: React.FC<HealthPulseProps> = ({ 
  data, 
  mostImproved,
  focusArea,
  positiveAreas,
  totalAreas
}) => {
  // Calculate most improved area and area to focus if not provided
  const improving = data.filter(item => item.improving);
  const needsWork = data.filter(item => !item.improving);
  
  const calculatedMostImproved = mostImproved || (improving.length > 0 
    ? improving.reduce((prev, current) => (prev.score > current.score) ? prev : current).area
    : null);
    
  const calculatedFocusArea = focusArea || (needsWork.length > 0 
    ? needsWork.reduce((prev, current) => (prev.score < current.score) ? prev : current).area
    : null);
  
  // Count positive trends
  const calculatedPositiveCount = positiveAreas || data.filter(item => item.improving).length;
  const calculatedTotalAreas = totalAreas || data.length;
  
  // Format the data to highlight priority areas
  const formattedData = data.map(item => ({
    ...item,
    fill: item.priority ? "#ef4444" : "#1C6E4A"
  }));

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-xl">
          <div className="flex items-center">
            <Activity className="w-5 h-5 text-hana-green mr-2" />
            Health Pulse
          </div>
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
            Updated Today
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-3">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={formattedData}>
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
                cursor={{ strokeDasharray: '8 8' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex flex-col gap-2 text-sm">
          <div className="flex flex-wrap gap-3">
            {calculatedMostImproved && (
              <div className="flex items-center text-gray-700">
                <Sparkles className="w-4 h-4 text-amber-500 mr-1.5" />
                <span>Most Improved: <span className="font-medium">{calculatedMostImproved}</span></span>
              </div>
            )}
            
            {calculatedFocusArea && (
              <div className="flex items-center text-gray-700">
                <AlertTriangle className="w-4 h-4 text-orange-500 mr-1.5" />
                <span>Focus Area: <span className="font-medium">{calculatedFocusArea}</span></span>
              </div>
            )}
          </div>
          
          <div className="flex items-center text-gray-600">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1.5" />
            <span>Trending positively in <span className="font-medium text-green-600">{calculatedPositiveCount} out of {calculatedTotalAreas}</span> areas</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthPulse;
