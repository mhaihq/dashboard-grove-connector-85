
import React from 'react';
import { Check, X, HelpCircle } from 'lucide-react';

interface Program {
  program: string;
  eligible: boolean | string;
  reason: string;
}

interface EligibilityStatusProps {
  programs: Program[];
}

export const EligibilityStatus: React.FC<EligibilityStatusProps> = ({ programs }) => {
  return (
    <div className="space-y-3">
      {programs.map((program, index) => (
        <div key={index} className="border rounded-lg p-3 hover-scale">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-gray-900">{program.program}</span>
            {program.eligible === true ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Check className="w-3.5 h-3.5 mr-1" />
                Eligible
              </span>
            ) : program.eligible === "potential" ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                <HelpCircle className="w-3.5 h-3.5 mr-1" />
                Potential
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <X className="w-3.5 h-3.5 mr-1" />
                Not Eligible
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600">{program.reason}</p>
        </div>
      ))}
    </div>
  );
};

export default EligibilityStatus;
