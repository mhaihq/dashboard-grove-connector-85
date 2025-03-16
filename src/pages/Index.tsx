import React, { useState } from 'react';
import { Users, Activity, Clock, Calendar, ClipboardList, Heart, Award } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentOverview } from '@/components/AssessmentOverview';
import { HealthAssessmentChart } from '@/components/HealthAssessmentChart';
import { EligibilityStatus } from '@/components/EligibilityStatus';
import { UpcomingActions } from '@/components/UpcomingActions';
import { CallElement } from '@/components/CallElement';
import { MentalHealthSummary } from '@/components/MentalHealthSummary';

const Index = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  const userImage = "https://media.licdn.com/dms/image/v2/D4E03AQEF64y0nluvpw/profile-displayphoto-shrink_800_800/B4EZSgI1mgHcAc-/0/1737853459711?e=1747872000&v=beta&t=3713WkmjpsNYWB0H9Qxg7HrdB3RTyK5bZuLfj-EccRo";
  
  // Medicare program eligibility criteria data
  const eligibilityData = [
    { program: "Chronic Care Management (CCM)", eligible: true, reason: "Has 2+ chronic conditions" },
    { program: "Remote Patient Monitoring (RPM)", eligible: true, reason: "Ongoing hypertension monitoring" },
    { program: "Behavioral Health Integration (BHI)", eligible: "potential", reason: "Shows signs of mild depression" },
    { program: "Principal Care Management (PCM)", eligible: false, reason: "Does not have a single high-risk condition" }
  ];
  
  // Health assessment data - for radar chart
  const assessmentData = [
    { area: "Physical Health", score: 65 },
    { area: "Mental Wellbeing", score: 48 },
    { area: "Social Connection", score: 72 },
    { area: "Sleep Quality", score: 43 },
    { area: "Nutrition", score: 60 },
    { area: "Stress Management", score: 52 }
  ];
  
  // Next steps/actions
  const upcomingActions = [
    { title: "Complete Sleep Assessment", description: "Additional sleep quality screening needed", dueDate: "3 days", priority: "high" as const },
    { title: "Schedule Follow-up Call", description: "Review initial health coaching plan", dueDate: "1 week", priority: "medium" as const },
    { title: "Begin Medication Log", description: "Track adherence to prescribed medications", dueDate: "2 days", priority: "high" as const },
    { title: "Join Support Group", description: "Virtual heart health support group", dueDate: "2 weeks", priority: "low" as const }
  ];
  
  // Key health metrics
  const healthIndicators = [
    { title: "Chronic Conditions", value: "3", change: "unchanged", icon: <Activity className="w-5 h-5 text-blue-500" /> },
    { title: "Risk Score", value: "Medium", change: "improving", icon: <Heart className="w-5 h-5 text-red-500" /> },
    { title: "Last Check-in", value: "Feb 13", change: "recent", icon: <ClipboardList className="w-5 h-5 text-violet-500" /> },
    { title: "Medicare Status", value: "Enrolled", change: "active", icon: <Award className="w-5 h-5 text-emerald-500" /> }
  ];

  // Journal Summary Data
  const journalSummaryItems = [
    {
      title: "What's Going Well",
      content: [
        "Your morning walks are becoming more consistent - you've gone from 2 days a week to 5!",
        "You've been drinking more water throughout the day",
        "You reached out to a friend for coffee this week"
      ],
      type: 'joy'
    },
    {
      title: "Areas of Progress",
      content: [
        "Your sleep quality is gradually improving with the new bedtime routine",
        "You've had 2 alcohol-free days this week compared to none last week",
        "Your mood has been more stable on days when you've eaten regular meals"
      ],
      type: 'notable'
    },
    {
      title: "What's On Your Mind",
      content: [
        "Financial concerns with ongoing job search",
        "Finding time for self-care while managing daily responsibilities",
        "Difficulty maintaining social connections"
      ],
      type: 'weighing'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px]">
        <DashboardHeader 
          userName={userName} 
          userEmail={userEmail}
          userImage={userImage}
        />
        
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">👋 Welcome back, {userName}!</h1>
              <p className="text-gray-600 mt-1">
                Let's check in on your health and build a plan together. I'm here to support you every step of the way!
              </p>
            </div>
            
            {/* Journal Summary Section */}
            <MentalHealthSummary 
              userName={userName}
              userEmail={userEmail}
              date="Updated: March 15, 2025"
              summaryItems={journalSummaryItems}
            />
            
            {/* Consolidated Call Element Section */}
            <div className="mb-8 mt-8">
              <CallElement userName={userName} />
            </div>
            
            {/* Key Health Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {healthIndicators.map((indicator, i) => (
                <Card key={i} className="hover-scale">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium text-gray-500">{indicator.title}</CardTitle>
                      {indicator.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{indicator.value}</div>
                    <p className={`text-xs ${
                      indicator.change === "improving" ? "text-green-600" : 
                      indicator.change === "worsening" ? "text-red-600" : 
                      "text-blue-600"
                    }`}>
                      {indicator.title === "Medicare Status" 
                        ? "Great news! You're covered for our support program" 
                        : indicator.change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Health Assessment Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 text-hana-green mr-2" />
                    Your Health Snapshot
                  </CardTitle>
                  <CardDescription>
                    Here's what we're seeing across different areas of your wellbeing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <HealthAssessmentChart data={assessmentData} />
                </CardContent>
              </Card>
              
              {/* Medicare Program Eligibility */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 text-hana-green mr-2" />
                    Programs You Qualify For
                  </CardTitle>
                  <CardDescription>
                    These programs can help support your health journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EligibilityStatus programs={eligibilityData} />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Assessment Overview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ClipboardList className="w-5 h-5 text-hana-green mr-2" />
                    Let's Talk About Your Health
                  </CardTitle>
                  <CardDescription>
                    Here's what I've noticed and how we can support you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AssessmentOverview userName={userName} />
                </CardContent>
                <CardFooter>
                  <button className="text-hana-green hover:text-green-700 text-sm font-medium flex items-center">
                    See your full health story
                  </button>
                </CardFooter>
              </Card>
              
              {/* Next Steps/Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 text-hana-green mr-2" />
                    Small Steps Forward
                  </CardTitle>
                  <CardDescription>
                    Little actions that can make a big difference
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingActions actions={upcomingActions} />
                </CardContent>
                <CardFooter>
                  <button className="text-hana-green hover:text-green-700 text-sm font-medium flex items-center">
                    See all your personalized suggestions
                  </button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
