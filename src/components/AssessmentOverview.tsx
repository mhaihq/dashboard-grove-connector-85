
import React from 'react';
import { GlassWater, Brain, Users, HeartPulse, Moon, UtensilsCrossed } from 'lucide-react';

interface AssessmentOverviewProps {
  userName: string;
}

export const AssessmentOverview: React.FC<AssessmentOverviewProps> = ({ userName }) => {
  const assessmentAreas = [
    {
      title: "Physical Health",
      icon: <HeartPulse className="w-5 h-5 text-red-500" />,
      summary: "Managing hypertension with medication. Family history of heart disease presents increased risk. Regular exercise needed.",
      status: "needs-attention"
    },
    {
      title: "Mental Wellbeing",
      icon: <Brain className="w-5 h-5 text-violet-500" />,
      summary: "Showing signs of mild depression with decreased interest in activities. Reports feeling down and tired frequently.",
      status: "needs-attention"
    },
    {
      title: "Social Connection",
      icon: <Users className="w-5 h-5 text-blue-500" />,
      summary: "Strong relationship with spouse provides good support. Has withdrawn from some friendships and community activities.",
      status: "moderate"
    },
    {
      title: "Sleep Quality",
      icon: <Moon className="w-5 h-5 text-indigo-500" />,
      summary: "Averaging 5-6 hours per night with frequent waking. Reports difficulty falling asleep and inconsistent bedtime.",
      status: "concerning"
    },
    {
      title: "Nutrition",
      icon: <UtensilsCrossed className="w-5 h-5 text-orange-500" />,
      summary: "Skips meals frequently, especially breakfast. Limited vegetable intake and reliance on convenience foods.",
      status: "moderate"
    },
    {
      title: "Hydration",
      icon: <GlassWater className="w-5 h-5 text-cyan-500" />,
      summary: "Primary fluid intake is coffee. Estimated water consumption below recommended levels throughout the day.",
      status: "concerning"
    }
  ];

  return (
    <div>
      <p className="text-gray-700 mb-4">
        Based on your initial assessment, we've identified key areas of focus for your health journey.
        This overview will help guide your Medicare-eligible care programs.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {assessmentAreas.map((area, index) => (
          <div 
            key={index} 
            className="border rounded-lg p-3 hover-scale"
          >
            <div className="flex items-center gap-2 mb-2">
              {area.icon}
              <span className="font-medium text-gray-900">{area.title}</span>
              <span 
                className={`ml-auto inline-block w-3 h-3 rounded-full ${
                  area.status === 'concerning' ? 'bg-red-500' :
                  area.status === 'needs-attention' ? 'bg-amber-500' :
                  area.status === 'moderate' ? 'bg-blue-500' : 'bg-green-500'
                }`}
              />
            </div>
            <p className="text-sm text-gray-600">{area.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentOverview;
