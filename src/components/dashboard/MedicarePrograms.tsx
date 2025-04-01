
import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MedicareProgram } from '@/types/dashboard';

interface MedicareProgramsProps {
  programs: MedicareProgram[];
}

export const MedicarePrograms: React.FC<MedicareProgramsProps> = ({ programs }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-900 mb-3">Medicare Programs</h3>
      {programs.map((program, index) => (
        <div 
          key={index}
          className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
        >
          <h3 className="font-medium text-gray-900 mb-1">{program.name}</h3>
          <p className="text-sm text-gray-700 mb-3">{program.description}</p>
          
          <div className="text-xs text-gray-600 mb-3">
            <div className="mb-1.5">
              <span className="font-medium text-gray-800">Eligibility:</span> {program.eligibility}
            </div>
            <div>
              <span className="font-medium text-gray-800">Coverage:</span> {program.coverage}
            </div>
          </div>
          
          <div className="mb-3">
            <span className="text-xs font-medium text-gray-800">Benefits:</span>
            <ul className="mt-1 space-y-1">
              {program.benefits.map((benefit, i) => (
                <li key={i} className="text-xs text-gray-700 flex items-start">
                  <ArrowRight className="h-3 w-3 text-hana-green mt-0.5 mr-1.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="text-hana-green border-hana-green hover:bg-hana-lightGreen"
            >
              <BookOpen className="mr-1.5 h-3.5 w-3.5" />
              Learn More
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicarePrograms;
