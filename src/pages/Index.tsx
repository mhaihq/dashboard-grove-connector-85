
import React from 'react';
import { Users, Activity, Clock, Calendar, ClipboardList, Heart, Award } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentOverview } from '@/components/AssessmentOverview';
import { HealthAssessmentChart } from '@/components/HealthAssessmentChart';
import { EligibilityStatus } from '@/components/EligibilityStatus';
import { UpcomingActions } from '@/components/UpcomingActions';

const Index = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  
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
    { title: "Complete Sleep Assessment", description: "Additional sleep quality screening needed", dueDate: "3 days", priority: "high" },
    { title: "Schedule Follow-up Call", description: "Review initial health coaching plan", dueDate: "1 week", priority: "medium" },
    { title: "Begin Medication Log", description: "Track adherence to prescribed medications", dueDate: "2 days", priority: "high" },
    { title: "Join Support Group", description: "Virtual heart health support group", dueDate: "2 weeks", priority: "low" }
  ];
  
  // Key health metrics
  const healthIndicators = [
    { title: "Chronic Conditions", value: "3", change: "unchanged", icon: <Activity className="w-5 h-5 text-blue-500" /> },
    { title: "Risk Score", value: "Medium", change: "improving", icon: <Heart className="w-5 h-5 text-red-500" /> },
    { title: "Last Assessment", value: "Feb 13", change: "recent", icon: <ClipboardList className="w-5 h-5 text-violet-500" /> },
    { title: "Medicare Status", value: "Enrolled", change: "active", icon: <Award className="w-5 h-5 text-emerald-500" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px]">
        <DashboardHeader 
          userName={userName} 
          userEmail={userEmail}
        />
        
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Comprehensive Health Assessment</h1>
              <p className="text-gray-600 mt-1">
                This assessment helps identify eligible Medicare programs while establishing your health baseline.
              </p>
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
                      {indicator.change}
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
                    Health Assessment Overview
                  </CardTitle>
                  <CardDescription>
                    Baseline measurements across key health dimensions
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
                    Medicare Program Eligibility
                  </CardTitle>
                  <CardDescription>
                    Based on your initial assessment
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
                    Assessment Summary
                  </CardTitle>
                  <CardDescription>
                    Comprehensive overview of health status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AssessmentOverview userName={userName} />
                </CardContent>
                <CardFooter>
                  <button className="text-hana-green hover:text-green-700 text-sm font-medium flex items-center">
                    View detailed assessment report
                  </button>
                </CardFooter>
              </Card>
              
              {/* Next Steps/Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 text-hana-green mr-2" />
                    Next Steps
                  </CardTitle>
                  <CardDescription>
                    Recommended actions based on assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingActions actions={upcomingActions} />
                </CardContent>
                <CardFooter>
                  <button className="text-hana-green hover:text-green-700 text-sm font-medium flex items-center">
                    View all recommendations
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
