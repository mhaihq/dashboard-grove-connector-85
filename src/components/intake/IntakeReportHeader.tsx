
import React from 'react';
import { Clipboard } from 'lucide-react';

const IntakeReportHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-8">
      <Clipboard className="h-5 w-5 text-hana-green" />
      <h1 className="text-2xl font-bold text-gray-900">Initial Health Coaching Assessment</h1>
    </div>
  );
};

export default IntakeReportHeader;
