
import React from 'react';

interface DetailedAssessment {
  sleep: {
    observations: string[];
    quote: string;
  };
  emotionalRegulation: {
    observations: string[];
    quote: string;
  };
}

interface DetailedAssessmentSectionProps {
  detailedAssessment?: DetailedAssessment;
}

export const DetailedAssessmentSection: React.FC<DetailedAssessmentSectionProps> = ({ 
  detailedAssessment 
}) => {
  return (
    <div className="mt-4">
      <h4 className="font-medium text-gray-900 mb-2">Detailed Assessment</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-100 rounded-lg p-4">
          <h5 className="font-medium text-gray-800 mb-2">Sleep Observations</h5>
          <ul className="text-sm space-y-1 list-disc list-inside">
            {detailedAssessment?.sleep.observations.map((obs, index) => (
              <li key={index}>{obs}</li>
            )) || (
              <>
                <li>Difficulty falling asleep due to racing thoughts</li>
                <li>Reports never feeling tired despite lack of rest</li>
                <li>Brain remains highly active at bedtime</li>
              </>
            )}
          </ul>
          <div className="bg-gray-50 p-3 mt-2 rounded border border-gray-100">
            <p className="text-sm italic">"{detailedAssessment?.sleep.quote || "I just don't sleep... I feel that I'm never tired. I feel that my brain is always on."}"</p>
          </div>
        </div>
        
        <div className="border border-gray-100 rounded-lg p-4">
          <h5 className="font-medium text-gray-800 mb-2">Emotional Regulation Observations</h5>
          <ul className="text-sm space-y-1 list-disc list-inside">
            {detailedAssessment?.emotionalRegulation.observations.map((obs, index) => (
              <li key={index}>{obs}</li>
            )) || (
              <>
                <li>Unexplained anger episodes</li>
                <li>Frequent nervousness</li>
                <li>Difficulty managing emotional responses</li>
              </>
            )}
          </ul>
          <div className="bg-gray-50 p-3 mt-2 rounded border border-gray-100">
            <p className="text-sm italic">"{detailedAssessment?.emotionalRegulation.quote || "I feel nervous a lot of the time, and then... Kind of angry... That's with no reason."}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};
