
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
  const getPersonalizedMessage = (program: Program) => {
    if (program.eligible === true) {
      if (program.program.includes("Chronic Care")) {
        return "Great news! Your health needs qualify you for this supportive program.";
      } else if (program.program.includes("Remote Patient")) {
        return "We can help monitor your blood pressure from the comfort of your home!";
      } else {
        return program.reason;
      }
    } else if (program.eligible === "potential") {
      return "We might be able to help with this. Let's talk more about it.";
    } else {
      return "Not a match right now, but let's focus on what will help you most.";
    }
  };

  return (
    <div className="space-y-3">
      {programs.map((program, index) => (
        <div key={index} className="border rounded-lg p-3 hover-scale">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-gray-900">{program.program}</span>
            {program.eligible === true ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Check className="w-3.5 h-3.5 mr-1" />
                Perfect Match
              </span>
            ) : program.eligible === "potential" ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                <HelpCircle className="w-3.5 h-3.5 mr-1" />
                Possible
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <X className="w-3.5 h-3.5 mr-1" />
                Not a Match
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600">{getPersonalizedMessage(program)}</p>
        </div>
      ))}
    </div>
  );
};

export default EligibilityStatus;
