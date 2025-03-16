
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
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="area" 
            tick={{ fill: '#4b5563', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            domain={[0, 100]} 
            tickCount={5}
            stroke="#9ca3af"
          />
          <Radar
            name="Health Score"
            dataKey="score"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.3}
          />
          <Tooltip 
            formatter={(value) => [`${value}/100`, 'Score']}
            labelFormatter={(label) => `${label} Assessment`}
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthAssessmentChart;
