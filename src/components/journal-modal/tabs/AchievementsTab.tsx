
import React from 'react';
import { JournalEntryType } from '@/types/journal';
import { HighlightBox } from '../HighlightBox';
import { Card, CardContent } from '@/components/ui/card';

interface AchievementsTabProps {
  content: string;
  achievements?: JournalEntryType['achievements'];
  highlight?: string;
}

export const AchievementsTab: React.FC<AchievementsTabProps> = ({ 
  content, 
  achievements,
  highlight 
}) => {
  return (
    <div className="text-left">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Achievements & Progress</h2>
        <p className="text-gray-600 whitespace-pre-line text-sm">{content}</p>
        
        {achievements && (
          <div className="mt-4 space-y-3">
            {achievements.map((achievement, idx) => (
              <Card key={idx} className="bg-[#F6FFF2] border-green-100">
                <CardContent className="pt-4 p-4">
                  <div className="flex items-start gap-2">
                    <div className="text-xl mt-0.5">🏆</div>
                    <div>
                      <h3 className="text-base font-medium text-gray-800">{achievement.title || "Achievement"}</h3>
                      <p className="text-sm text-gray-700">{achievement.description || "Completed milestone"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {!achievements && (
          <Card className="bg-[#F6FFF2] border-green-100 mt-4">
            <CardContent className="pt-4 p-4">
              <div className="flex items-start gap-2">
                <div className="text-xl mt-0.5">🏆</div>
                <div>
                  <h3 className="text-base font-medium text-gray-800">Physical Activity Progress</h3>
                  <p className="text-sm text-gray-700">Consistent with daily walks (20 minutes average)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <HighlightBox highlight={highlight} />
    </div>
  );
};
