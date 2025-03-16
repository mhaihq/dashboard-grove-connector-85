
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
    <div className="w-full h-[350px] mt-2 mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="area" 
            tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 500 }}
            stroke="#e5e7eb"
          />
          <PolarRadiusAxis 
            domain={[0, 100]} 
            tickCount={5}
            tick={{ fontSize: 10 }}
            stroke="#9ca3af"
            axisLine={false}
          />
          <Radar
            name="Health Score"
            dataKey="score"
            stroke="#1C6E4A"
            fill="#1C6E4A"
            fillOpacity={0.4}
          />
          <Tooltip 
            formatter={(value) => [`${value}/100`, 'Score']}
            labelFormatter={(label) => `${label}`}
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '8px 12px'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthAssessmentChart;
