
import React from 'react';
import { JournalEntryType } from '@/types/journal';
import { HighlightBox } from '../HighlightBox';
import { Card, CardContent } from '@/components/ui/card';

interface MoodEnergyTabProps {
  mood?: JournalEntryType['mood'];
  energy?: JournalEntryType['energy'];
  stress?: JournalEntryType['stress'];
  highlight?: string;
}

export const MoodEnergyTab: React.FC<MoodEnergyTabProps> = ({ 
  mood,
  energy,
  stress,
  highlight
}) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Mood and Stress Check-In</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {mood && (
            <Card className="bg-[#FFF8E6] border-amber-100">
              <CardContent className="pt-4 p-4">
                <div className="text-3xl mb-2">😊</div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">Mood: {mood.score}</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>Weekend: {mood.weekend}</p>
                  <p>Weekday: {mood.weekday}</p>
                </div>
                <p className="mt-3 text-sm text-gray-700">{mood.notes}</p>
              </CardContent>
            </Card>
          )}
          
          {energy && (
            <Card className="bg-[#E5F0FF] border-blue-100">
              <CardContent className="pt-4 p-4">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">Energy: {energy.level}</h3>
                <p className="mt-3 text-sm text-gray-700">{energy.notes}</p>
              </CardContent>
            </Card>
          )}
          
          {stress && (
            <Card className="bg-[#FFDEE2] border-pink-100">
              <CardContent className="pt-4 p-4">
                <div className="text-3xl mb-2">😓</div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">Stress: {stress.level}</h3>
                <p className="mt-3 text-sm text-gray-700">{stress.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <HighlightBox highlight={highlight} />
    </div>
  );
};
