
import React from 'react';
import { Shield, Brain, HeartPulse, ClipboardCheck, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MedicareProgramCardProps {
  program: {
    name: string;
    originalName: string;
    description: string;
    benefits: string[];
    coverage: string;
    icon: string;
    isEligible?: boolean;
  }
}

const MedicareProgramCard: React.FC<MedicareProgramCardProps> = ({ program }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 mb-4">
      <div className="flex items-center bg-blue-50 p-4 border-b border-gray-200">
        <div className="bg-white p-2.5 rounded-full mr-3 shadow-sm text-blue-600">
          {program.icon === 'shield' && <Shield className="w-5 h-5" />}
          {program.icon === 'brain' && <Brain className="w-5 h-5" />}
          {program.icon === 'heart' && <HeartPulse className="w-5 h-5" />}
          {program.icon === 'clipboard' && <ClipboardCheck className="w-5 h-5" />}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{program.name}</h3>
          <p className="text-sm text-gray-500">{program.originalName}</p>
        </div>
        {program.isEligible && (
          <span className="ml-auto flex items-center text-green-700 bg-green-50 px-2 py-1 rounded-full text-sm">
            <CheckCircle className="w-3.5 h-3.5 mr-1" />
            Eligible
          </span>
        )}
        {!program.isEligible && (
          <span className="ml-auto flex items-center text-amber-700 bg-amber-50 px-2 py-1 rounded-full text-sm">
            <AlertTriangle className="w-3.5 h-3.5 mr-1" />
            Possibly Eligible
          </span>
        )}
      </div>
      
      <div className="p-5">
        <p className="text-gray-700 mb-4">{program.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Program Benefits:</h4>
          <ul className="space-y-2 pl-5 list-disc">
            {program.benefits.map((benefit, index) => (
              <li key={index} className="text-sm text-gray-700">{benefit}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
          <h4 className="text-sm font-medium text-blue-900 mb-1">Coverage Details:</h4>
          <p className="text-sm text-blue-800">{program.coverage}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span>Medicare Part B</span>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
            Discuss Eligibility
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MedicareProgramCard;
