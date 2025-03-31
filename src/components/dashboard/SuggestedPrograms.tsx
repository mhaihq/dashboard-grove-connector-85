
import React from 'react';
import { CheckCircle2, AlertCircle, HelpCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ProgramItem {
  program: string;
  match: "none" | "perfect" | "good" | "possible";
  status: "Enrolled" | "Available" | "Eligible" | "Not Eligible";
  description: string;
  action?: string;
}

interface SuggestedProgramsProps {
  programs: ProgramItem[];
}

export const SuggestedPrograms: React.FC<SuggestedProgramsProps> = ({ programs }) => {
  const getMatchIcon = (match: ProgramItem['match']) => {
    switch (match) {
      case 'perfect':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'good':
        return <CheckCircle2 className="h-5 w-5 text-blue-500" />;
      case 'possible':
        return <HelpCircle className="h-5 w-5 text-amber-500" />;
      case 'none':
        return <XCircle className="h-5 w-5 text-gray-400" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-400" />;
    }
  };
  
  const getStatusBadge = (status: ProgramItem['status']) => {
    let colorClasses = "bg-gray-100 text-gray-700";
    
    switch (status) {
      case 'Enrolled':
        colorClasses = "bg-green-100 text-green-800";
        break;
      case 'Available':
        colorClasses = "bg-blue-100 text-blue-800";
        break;
      case 'Eligible':
        colorClasses = "bg-amber-100 text-amber-800";
        break;
      case 'Not Eligible':
        colorClasses = "bg-gray-100 text-gray-600";
        break;
    }
    
    return (
      <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", colorClasses)}>
        {status}
      </span>
    );
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <CheckCircle2 className="w-5 h-5 text-hana-green mr-2" />
          Suggested Programs
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-3">
        <div className="space-y-4">
          {programs.map((program, index) => (
            <div key={index} className="flex gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex-shrink-0 mt-1">
                {getMatchIcon(program.match)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{program.program}</h3>
                    <p className="text-sm text-gray-600 mt-0.5">{program.description}</p>
                  </div>
                  <div>
                    {getStatusBadge(program.status)}
                  </div>
                </div>
                
                {program.action && (
                  <div className="mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={
                        program.status === 'Enrolled' 
                          ? "text-green-700 border-green-300 hover:bg-green-50"
                          : ""
                      }
                    >
                      {program.action}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedPrograms;
