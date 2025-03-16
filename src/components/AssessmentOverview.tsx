
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
      summary: "I see you're taking medication for your blood pressure – that's a great start! Your family history means we should keep an eye on this together. Would you like to explore some gentle movement options that might help?",
      status: "needs-attention"
    },
    {
      title: "Mental Wellbeing",
      icon: <Brain className="w-5 h-5 text-violet-500" />,
      summary: "It seems like you've been feeling down lately, and that's absolutely okay. Many people go through this. Would you like to try a 5-minute mood-boosting activity together this week?",
      status: "needs-attention"
    },
    {
      title: "Social Connection",
      icon: <Users className="w-5 h-5 text-blue-500" />,
      summary: "I'm so glad to hear your spouse is such a rock for you! I noticed you've stepped back from some social activities though – would reconnecting with just one friend this week feel doable?",
      status: "moderate"
    },
    {
      title: "Sleep Quality",
      icon: <Moon className="w-5 h-5 text-indigo-500" />,
      summary: "Those 5-6 hours of interrupted sleep must be leaving you tired. That's tough! Would you like to try a simple bedtime routine together tonight? Even small changes can make a big difference.",
      status: "concerning"
    },
    {
      title: "Nutrition",
      icon: <UtensilsCrossed className="w-5 h-5 text-orange-500" />,
      summary: "Skipping breakfast happens to the best of us! What if we found one super quick morning option you might enjoy? No pressure – just something to make your day a bit easier.",
      status: "moderate"
    },
    {
      title: "Hydration",
      icon: <GlassWater className="w-5 h-5 text-cyan-500" />,
      summary: "I see coffee is your go-to drink – it does taste amazing, doesn't it? Could we try adding just one extra glass of water with each coffee? Small steps make big differences!",
      status: "concerning"
    }
  ];

  return (
    <div>
      <p className="text-gray-700 mb-4">
        Hi {userName}, here's what I've noticed about how you're doing. Remember, we're in this together, and even small changes can make a real difference in how you feel day-to-day.
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
