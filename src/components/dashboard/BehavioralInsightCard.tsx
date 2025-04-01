
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Calendar, Brain, Heart, Footprints, Clipboard, Shield, Book, TrendingUp } from 'lucide-react';

interface BehavioralInsight {
  title: string;
  pattern: string;
  impact: string[];
  suggestion: string;
  icon: string;
  source: string;
  timeObserved: string;
  relatedAreas: string[];
}

interface BehavioralInsightCardProps {
  insight: BehavioralInsight;
  onMakeGoal: () => void;
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
    default: return <TrendingUp className="w-5 h-5" />;
  }
};

const getSourceBadge = (source: string) => {
  switch (source) {
    case "call-data":
      return (
        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
          Voice Conversations
        </span>
      );
    case "journal-patterns":
      return (
        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
          Journal Entries
        </span>
      );
    case "voice-analysis":
      return (
        <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">
          Voice Analysis
        </span>
      );
    default:
      return (
        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">
          System Analysis
        </span>
      );
  }
};

export const BehavioralInsightCard: React.FC<BehavioralInsightCardProps> = ({
  insight,
  onMakeGoal
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-all">
      <div className="flex items-center bg-gray-50 p-4 border-b border-gray-200">
        <div className="bg-white p-2 rounded-full mr-3 shadow-sm">
          {getIcon(insight.icon)}
        </div>
        <h3 className="text-lg font-medium text-gray-900">{insight.title}</h3>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <p className="text-gray-600 italic mb-3">{insight.pattern}</p>
          
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Why It Matters:</h4>
            <ul className="space-y-1 pl-5 list-disc">
              {insight.impact.map((point, index) => (
                <li key={index} className="text-sm text-gray-700">{point}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-amber-50 p-3 rounded-md border border-amber-100 mb-4">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-amber-600 mr-2" />
              <h4 className="text-sm font-medium text-amber-900">Suggested System Adjustment:</h4>
            </div>
            <p className="text-sm text-amber-800 mt-1">{insight.suggestion}</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
            <span>Observed over: {insight.timeObserved}</span>
            <span>•</span>
            {getSourceBadge(insight.source)}
            <span>•</span>
            <div className="flex flex-wrap gap-1">
              {insight.relatedAreas.map((area, index) => (
                <span key={index} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            className="border-green-300 text-green-700 hover:bg-green-50"
            onClick={onMakeGoal}
          >
            <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
            Make This a Goal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BehavioralInsightCard;
