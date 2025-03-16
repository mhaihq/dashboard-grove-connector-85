
import React from 'react';
import { Calendar } from 'lucide-react';

interface ModalHeaderProps {
  date: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ date }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Mental Health Journal</h1>
        <p className="text-gray-500">{date}</p>
      </div>
      <Calendar className="w-5 h-5 text-gray-500" />
    </div>
  );
};
