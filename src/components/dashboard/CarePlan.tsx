
import React from 'react';
import { Clipboard, Check, Clock, Play, X, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CarePlanItem {
  title: string;
  icon: () => React.ReactNode;
  status: 'not-started' | 'started' | 'in-progress' | 'complete';
  description: string;
}

interface CarePlanProps {
  items: CarePlanItem[];
}

export const CarePlan: React.FC<CarePlanProps> = ({ items }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-0"><Check className="w-3 h-3 mr-1" /> Complete!</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-0"><Clock className="w-3 h-3 mr-1" /> In Progress</Badge>;
      case 'started':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-0"><Play className="w-3 h-3 mr-1" /> Started</Badge>;
      case 'not-started':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-0"><X className="w-3 h-3 mr-1" /> Not Started</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Clipboard className="w-5 h-5 text-hana-green mr-2" />
          Your Care Plan
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all hover:border-gray-200 bg-white cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                {item.icon()}
                <h3 className="font-medium text-gray-900">{item.title}</h3>
              </div>
              
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex justify-between items-center">
                {getStatusBadge(item.status)}
                
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarePlan;
