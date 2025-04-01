
import React from 'react';
import { Activity, Sparkles, TrendingUp, AlertTriangle, ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Line
} from 'recharts';

interface HealthPulseItem {
  area: string;
  score: number;
  improving: boolean;
  priority?: boolean;
  tooltip?: string;
  trend?: 'up' | 'down' | 'stable';
  relatedTo?: string[];
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
  
  // Default tooltips if not provided
  const tooltips = {
    'Sleep': 'Quality and consistency of your rest patterns.',
    'Nutrition': 'Balance and quality of your dietary choices.',
    'Exercise': 'Frequency and intensity of physical activity.',
    'Stress': 'Your ability to manage daily pressures.',
    'Hydration': 'Daily water intake and hydration habits.',
    'Mood': 'Emotional well-being and stability.',
    'Energy': 'Overall vitality and stamina throughout the day.',
    'Social': 'Quality of your interpersonal connections.',
  };
  
  // Format the data with softer gradient fills and tooltips
  const formattedData = data.map(item => {
    // Generate a softer gradient fill based on priority and improvement
    let fillColor = item.priority 
      ? "url(#priorityGradient)" 
      : item.improving 
        ? "url(#improvingGradient)" 
        : "url(#neutralGradient)";
    
    // Check if this is the most improved or focus area for highlighting
    const isMostImproved = item.area === calculatedMostImproved;
    const isFocusArea = item.area === calculatedFocusArea;
    
    if (isMostImproved) fillColor = "url(#mostImprovedGradient)";
    if (isFocusArea) fillColor = "url(#focusAreaGradient)";
    
    return {
      ...item,
      fill: fillColor,
      tooltip: item.tooltip || tooltips[item.area as keyof typeof tooltips] || `Your ${item.area.toLowerCase()} health dimension.`
    };
  });

  // Determine connections between health dimensions
  const connections = [
    { source: 'Sleep', target: 'Energy' },
    { source: 'Exercise', target: 'Mood' },
    { source: 'Nutrition', target: 'Energy' },
    { source: 'Stress', target: 'Sleep' },
    { source: 'Hydration', target: 'Energy' }
  ];

  // Helper function to get trend icon
  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-3 h-3 text-green-500" />;
      case 'down':
        return <ArrowDown className="w-3 h-3 text-red-500" />;
      case 'stable':
      default:
        return <ArrowRight className="w-3 h-3 text-gray-500" />;
    }
  };

  return (
    <TooltipProvider>
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
                {/* Define gradients */}
                <defs>
                  <linearGradient id="priorityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f87171" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.5} />
                  </linearGradient>
                  <linearGradient id="improvingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.5} />
                  </linearGradient>
                  <linearGradient id="neutralGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1C6E4A" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#1C6E4A" stopOpacity={0.4} />
                  </linearGradient>
                  <linearGradient id="mostImprovedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.5} />
                  </linearGradient>
                  <linearGradient id="focusAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb7185" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.5} />
                  </linearGradient>
                  <linearGradient id="connectionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                
                {/* Connection lines between related dimensions */}
                {connections.map((connection, idx) => {
                  const sourceIndex = formattedData.findIndex(item => item.area === connection.source);
                  const targetIndex = formattedData.findIndex(item => item.area === connection.target);
                  
                  if (sourceIndex >= 0 && targetIndex >= 0) {
                    const angle = (2 * Math.PI) / formattedData.length;
                    const sourceAngle = sourceIndex * angle;
                    const targetAngle = targetIndex * angle;
                    
                    const radius = 70;
                    const sourceX = 50 + radius * Math.sin(sourceAngle);
                    const sourceY = 50 - radius * Math.cos(sourceAngle);
                    const targetX = 50 + radius * Math.sin(targetAngle);
                    const targetY = 50 - radius * Math.cos(targetAngle);
                    
                    return (
                      <Line 
                        key={idx} 
                        type="straight" 
                        dataKey="score" 
                        stroke="url(#connectionGradient)" 
                        fill="none" 
                        strokeWidth={1} 
                        strokeDasharray="3 3"
                        dot={false}
                        activeDot={false}
                        data={[
                          { x: sourceX, y: sourceY, score: 0 },
                          { x: targetX, y: targetY, score: 0 }
                        ]}
                      />
                    );
                  }
                  return null;
                })}
                
                <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="area" 
                  tick={(props) => {
                    const { x, y, payload, textAnchor, stroke, radius } = props;
                    const item = formattedData.find(d => d.area === payload.value);
                    
                    return (
                      <g>
                        <text 
                          x={x} 
                          y={y} 
                          textAnchor={textAnchor} 
                          stroke="none" 
                          fill="#4b5563" 
                          fontSize={13} 
                          fontWeight={500}
                        >
                          {payload.value}
                        </text>
                        {item?.trend && (
                          <foreignObject 
                            x={x - 8} 
                            y={y + 2} 
                            width={16} 
                            height={16}
                          >
                            <div className="flex justify-center">
                              {getTrendIcon(item.trend)}
                            </div>
                          </foreignObject>
                        )}
                      </g>
                    );
                  }}
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
                  fillOpacity={0.45}
                  strokeWidth={2}
                />
                <RechartsTooltip 
                  formatter={(value) => [`${value}/100`, 'Score']}
                  labelFormatter={(label) => {
                    const item = formattedData.find(d => d.area === label);
                    return (
                      <div>
                        <div className="font-medium text-gray-800">{label}</div>
                        <div className="text-xs text-gray-600 mt-1">{item?.tooltip}</div>
                      </div>
                    );
                  }}
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
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center text-gray-700 cursor-help">
                      <Sparkles className="w-4 h-4 text-amber-500 mr-1.5" />
                      <span>Most Improved: <span className="font-medium">{calculatedMostImproved}</span></span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white p-2 text-xs max-w-[200px]">
                    <p>This area has shown the greatest improvement over the past 2 weeks.</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              {calculatedFocusArea && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center text-gray-700 cursor-help">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mr-1.5" />
                      <span>Focus Area: <span className="font-medium">{calculatedFocusArea}</span></span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white p-2 text-xs max-w-[200px]">
                    <p>This dimension needs your attention in the coming weeks.</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            
            <div className="flex items-center text-gray-600">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1.5" />
              <span>Trending positively in <span className="font-medium text-green-600">{calculatedPositiveCount} out of {calculatedTotalAreas}</span> areas</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default HealthPulse;
