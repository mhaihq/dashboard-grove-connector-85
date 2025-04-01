
import React from 'react';
import { CheckCircle2, TrendingUp, Calendar, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DashboardWelcomeProps {
  userName: string;
  lastCheckIn: string;
  medicareStatus: string;
  riskScore: string;
  riskTrend: string;
  welcomeMessage?: string;
}

export const DashboardWelcome: React.FC<DashboardWelcomeProps> = ({ 
  userName, 
  lastCheckIn,
  medicareStatus,
  riskScore,
  riskTrend,
  welcomeMessage
}) => {
  return (
    <div className="text-left">
      <h1 className="text-2xl font-bold text-gray-900">👋 Welcome back, {userName}!</h1>
      <p className="text-gray-600 mt-1 mb-4">
        {welcomeMessage || "You're making progress in key areas. Let's keep building momentum — small steps, big impact."}
      </p>
      
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-hana-green" />
          <span>Last Check-in: <span className="font-medium">{lastCheckIn}</span></span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ShieldCheck className="w-4 h-4 text-blue-500" />
          <span>Status: <span className="font-medium">Medicare {medicareStatus}</span></span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4 text-amber-500" />
          <span>Risk Score: <span className="font-medium">{riskScore}</span>{' '}
            <Badge variant="outline" className="ml-1 bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
              <TrendingUp className="w-3 h-3 mr-1" /> {riskTrend}
            </Badge>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcome;
