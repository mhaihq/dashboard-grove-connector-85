
import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface HealthAssessmentChartProps {
  data: {
    area: string;
    score: number;
  }[];
}

export const HealthAssessmentChart: React.FC<HealthAssessmentChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[380px] mt-4 mb-6">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid 
            stroke="#e5e7eb" 
            strokeDasharray="3 3" 
          />
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
            name="Health Score"
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
  );
};

export default HealthAssessmentChart;
