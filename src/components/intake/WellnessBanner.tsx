
import React from 'react';
import { Shield } from 'lucide-react';

const WellnessBanner = () => {
  return (
    <div className="p-5 bg-blue-50 border border-blue-100 rounded-lg mb-10 shadow-sm">
      <div className="flex items-start gap-4">
        <Shield className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-blue-800 text-lg mb-2">Comprehensive Wellness Profile</h3>
          <p className="text-blue-700 leading-relaxed">
            This assessment was completed on February 13, 2025 and establishes your baseline health metrics. 
            Your personalized coaching plan is based on this information and will be updated as you progress.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WellnessBanner;
