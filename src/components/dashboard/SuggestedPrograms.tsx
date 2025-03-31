
import React from 'react';
import { Medal, ChevronRight, CheckCircle2, Circle, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProgramItem {
  program: string;
  match: 'perfect' | 'good' | 'possible' | 'none';
  status: 'enrolled' | 'active' | 'eligible' | 'ineligible';
  description: string;
  action?: string;
}

interface SuggestedProgramsProps {
  programs: ProgramItem[];
}

export const SuggestedPrograms: React.FC<SuggestedProgramsProps> = ({ programs }) => {
  const getMatchBadge = (match: string) => {
    switch (match) {
      case 'perfect':
        return <Badge className="bg-green-100 text-green-800 border-0 gap-1"><CheckCircle2 className="w-3 h-3" /> Perfect</Badge>;
      case 'good':
        return <Badge className="bg-blue-100 text-blue-800 border-0 gap-1"><CheckCircle2 className="w-3 h-3" /> Good</Badge>;
      case 'possible':
        return <Badge className="bg-amber-100 text-amber-800 border-0 gap-1"><HelpCircle className="w-3 h-3" /> Possible</Badge>;
      case 'none':
        return <Badge className="bg-gray-100 text-gray-500 border-0 gap-1"><Circle className="w-3 h-3" /> No Match</Badge>;
      default:
        return null;
    }
  };

  const getActionButton = (status: string, action?: string) => {
    switch (status) {
      case 'enrolled':
        return <Button size="sm" variant="outline" className="text-green-700 bg-green-50 hover:bg-green-100 border-green-200">Enrolled</Button>;
      case 'active':
        return <Button size="sm" variant="outline" className="text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-200">{action || 'Active'}</Button>;
      case 'eligible':
        return <Button size="sm" variant="outline" className="text-amber-700 bg-amber-50 hover:bg-amber-100 border-amber-200">{action || 'Learn More'}</Button>;
      case 'ineligible':
        return <Button size="sm" variant="outline" className="text-gray-500 hover:bg-gray-100">{action || 'Not Available'}</Button>;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Medal className="w-5 h-5 text-hana-green mr-2" />
          Suggested Programs
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-3">
        <div className="space-y-3">
          {programs.map((program, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">{program.program}</h3>
                  {getMatchBadge(program.match)}
                </div>
                <p className="text-xs text-gray-600">{program.description}</p>
              </div>
              
              <div>
                {getActionButton(program.status, program.action)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedPrograms;
