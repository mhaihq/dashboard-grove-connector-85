
import React from 'react';
import { BookOpen, ArrowRight, Check, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MedicareProgram } from '@/types/dashboard';
import { cn } from '@/lib/utils';

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
          className={cn(
            "border rounded-lg p-4 hover:border-gray-300 transition-colors",
            program.isEligible ? "bg-white" : "bg-gray-50"
          )}
        >
          {/* Program name and eligibility badge */}
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-gray-900">{program.name}</h3>
            {program.isEligible ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Check className="h-3.5 w-3.5 mr-1" />
                You Qualify
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                <HelpCircle className="h-3.5 w-3.5 mr-1" />
                Check Eligibility
              </span>
            )}
          </div>
          
          {/* Original Medicare acronym */}
          <div className="text-xs text-gray-500 mb-2">
            Medicare term: {program.originalName}
          </div>
          
          <p className="text-sm text-gray-700 mb-3">{program.description}</p>
          
          {/* Key benefits */}
          <div className="mb-3">
            <span className="text-xs font-medium text-gray-800">Key Benefits:</span>
            <ul className="mt-1 space-y-1">
              {program.benefits.slice(0, 2).map((benefit, i) => (
                <li key={i} className="text-xs text-gray-700 flex items-start">
                  <ArrowRight className="h-3 w-3 text-hana-green mt-0.5 mr-1.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Progressive disclosure */}
          <details className="group text-xs mb-3">
            <summary className="list-none flex items-center cursor-pointer text-blue-600 hover:text-blue-800">
              <span className="mr-1">View eligibility and coverage details</span>
              <svg 
                className="h-4 w-4 transition-transform group-open:rotate-180" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </summary>
            <div className="pt-2 text-gray-600">
              <div className="mb-1.5">
                <span className="font-medium text-gray-800">Eligibility:</span> {program.eligibility}
              </div>
              <div>
                <span className="font-medium text-gray-800">Coverage:</span> {program.coverage}
              </div>
            </div>
          </details>
          
          <div className="flex justify-end space-x-2">
            {program.isEligible ? (
              <Button
                variant="outline"
                size="sm"
                className="text-hana-green border-hana-green hover:bg-hana-lightGreen"
              >
                <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                Start Now
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-gray-600 border-gray-300"
              >
                <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                Learn More
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicarePrograms;
