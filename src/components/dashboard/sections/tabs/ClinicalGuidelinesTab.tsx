
import React from 'react';
import { InfoIcon, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clinicalRecommendations } from '@/data/recommendations/clinicalRecommendations';
import { medicarePrograms } from '@/data/medicare/programsData';
import ClinicalGuidelineCard from '../cards/ClinicalGuidelineCard';
import MedicareProgramCard from '../cards/MedicareProgramCard';

interface ClinicalGuidelinesTabProps {
  onScheduleCall: () => void;
}

const ClinicalGuidelinesTab: React.FC<ClinicalGuidelinesTabProps> = ({ onScheduleCall }) => {
  return (
    <>
      <div className="mb-5 bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3">
        <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-blue-800 font-medium">About Medicare programs</p>
          <p className="text-sm text-blue-700">
            Based on your health profile, you may be eligible for these Medicare programs that provide additional support. Eligibility is determined by your healthcare provider.
          </p>
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Medicare Care Management Programs</h3>
        <p className="text-sm text-gray-600 mb-4">
          These programs offer coordinated care services that could help manage your conditions more effectively:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medicarePrograms.slice(0, 2).map((program, index) => (
            <MedicareProgramCard key={index} program={program} />
          ))}
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Specialized Care Options</h3>
        <p className="text-sm text-gray-600 mb-4">
          Based on your health assessment, these specialized interventions may be beneficial:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clinicalRecommendations.slice(0, 2).map((recommendation, index) => (
            <ClinicalGuidelineCard key={index} recommendation={recommendation} />
          ))}
        </div>
      </div>
      
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <InfoIcon className="h-5 w-5 text-blue-500" />
          <h3 className="text-base font-medium">Your Medicare Care Journey</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Based on your Medicare coverage, you may be eligible for these programs:
        </p>
        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5 mb-3">
          <li><span className="font-medium text-blue-600">Chronic Care Management (CCM)</span>: For managing multiple chronic conditions</li>
          <li><span className="font-medium text-green-600">Behavioral Health Integration (BHI)</span>: For coordinating mental health care</li>
          <li><span className="font-medium text-purple-600">Principal Care Management (PCM)</span>: For focused management of a single condition</li>
          <li><span className="font-medium text-amber-600">Advanced Primary Care Management (APCM)</span>: For comprehensive primary care support</li>
        </ul>
        <p className="text-sm text-gray-600 mb-3">
          Your physician can help determine your specific eligibility and refer you to specialist care if needed.
        </p>
        <Button onClick={onScheduleCall} variant="secondary" size="sm">
          Discuss With Your Health Coach
        </Button>
      </div>
    </>
  );
};

export default ClinicalGuidelinesTab;
