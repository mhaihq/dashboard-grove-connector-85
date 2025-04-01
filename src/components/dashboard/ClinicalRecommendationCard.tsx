
import React from 'react';
import { Button } from '@/components/ui/button';
import { PhoneCall, Calendar, Brain, Heart, Footprints, Clipboard, Shield, Book, CheckCircle, AlertTriangle } from 'lucide-react';
import { MedicareProgram } from '@/types/dashboard';

interface ClinicalRecommendationCardProps {
  program: MedicareProgram;
  onAction: () => void;
}

const getIcon = (icon: string) => {
  switch (icon) {
    case "thermometer": return <Calendar className="w-5 h-5" />;
    case "brain": return <Brain className="w-5 h-5" />;
    case "heart": return <Heart className="w-5 h-5" />;
    case "footprints": return <Footprints className="w-5 h-5" />;
    case "clipboard": return <Clipboard className="w-5 h-5" />;
    case "shield": return <Shield className="w-5 h-5" />;
    case "book": return <Book className="w-5 h-5" />;
    default: return <Clipboard className="w-5 h-5" />;
  }
};

export const ClinicalRecommendationCard: React.FC<ClinicalRecommendationCardProps> = ({
  program,
  onAction
}) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 bg-white">
      <div className="flex items-center bg-blue-50 p-4 border-b border-gray-200">
        <div className="bg-white p-2.5 rounded-full mr-3 shadow-sm text-blue-600 flex items-center justify-center w-10 h-10">
          {getIcon(program.icon)}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{program.name}</h3>
          <p className="text-sm text-gray-600">{program.originalName}</p>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-5">
          <p className="text-gray-700 mb-4 leading-relaxed">{program.description}</p>
          
          <div className="flex items-center mb-4">
            {program.isEligible !== false ? (
              <div className="flex items-center text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                <CheckCircle className="h-4 w-4 mr-1.5" />
                <span className="text-sm font-medium">You may be eligible</span>
              </div>
            ) : (
              <div className="flex items-center text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full">
                <AlertTriangle className="h-4 w-4 mr-1.5" />
                <span className="text-sm font-medium">Eligibility unclear</span>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-5">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Coverage includes:</h4>
            <p className="text-sm text-blue-800 leading-relaxed">{program.coverage}</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2.5">Benefits:</h4>
            <ul className="space-y-2 pl-5 list-disc">
              {program.benefits.map((benefit, index) => (
                <li key={index} className="text-sm text-gray-700">{benefit}</li>
              ))}
            </ul>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mb-5">
            <h4 className="text-sm font-medium text-gray-900 mb-1.5">Eligibility criteria:</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{program.eligibility}</p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            className="border-blue-300 text-blue-700 hover:bg-blue-50 rounded-full px-4 shadow-sm"
            onClick={onAction}
          >
            <PhoneCall className="mr-1.5 h-3.5 w-3.5" />
            Speak to Your Doctor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClinicalRecommendationCard;
