
import React from 'react';
import { Users } from 'lucide-react';
import { DashboardWelcome } from '@/components/dashboard/DashboardWelcome';
import { IntakeSummary } from '@/components/dashboard/IntakeSummary';
import { KeyHealthIndicators } from '@/components/dashboard/KeyHealthIndicators';
import { HealthPulse } from '@/components/dashboard/HealthPulse';
import { ContextBanner } from '@/components/dashboard/ContextBanner';
import { HealthRecommendations } from '@/components/dashboard/HealthRecommendations';
import { 
  userInfo, welcome, userBackground, overview, 
  healthIndicators, journalEntries, carePlanItems, 
  suggestedPrograms, medicarePrograms, milestones, functionalAreas,
  clinicalRecommendations
} from '@/data/dashboardData';
import { HealthPulseItem } from '@/types/dashboard';

interface DashboardProps {
  onScheduleCall: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onScheduleCall }) => {
  const healthAssessmentData: HealthPulseItem[] = functionalAreas.map(area => ({
    area: area.title,
    score: area.rating * 25,
    improving: area.key === 'sleep'
  }));

  const notableLifeChanges = overview.find(section => 
    section.title === "Notable Life Changes"
  )?.items || [];

  return (
    <>
      <div className="mb-8">
        <DashboardWelcome 
          userName={userInfo.name.split(' ')[0]}
          lastCheckIn="March 15, 2025"
          medicareStatus="Enrolled"
          riskScore="Medium"
          riskTrend="Improving"
        />
        <div className="mt-4">
          <a 
            href="/schedule-followup" 
            className="inline-flex items-center text-hana-green hover:text-green-700 font-medium"
          >
            ✨ Want to check in today? Book your next AI call here.
          </a>
        </div>
      </div>

      <div className="mb-8">
        <ContextBanner
          title="Ongoing Context From Your Intake"
          items={notableLifeChanges}
          date={userInfo.date}
          variant="primary"
        />
      </div>
      
      <div className="mb-8">
        <KeyHealthIndicators healthIndicators={healthIndicators} />
      </div>
      
      <div className="mb-8">
        <HealthPulse 
          data={healthAssessmentData}
          mostImproved="Sleep"
          focusArea="Hydration"
          positiveAreas={4}
          totalAreas={6}
        />
      </div>
      
      <div className="mb-8">
        <HealthRecommendations 
          recommendations={clinicalRecommendations} 
          medicarePrograms={medicarePrograms}
          onScheduleCall={onScheduleCall}
        />
      </div>
      
      <div className="mb-8">
        <IntakeSummary 
          date="February 13, 2025"
          welcomeMessage={welcome.message}
          background={userBackground}
          goals={overview.find(item => item.title === "Goals and Desires")?.items || []}
          overviewSections={overview}
          concerns={[
            `Sleep disruption (rating: ${functionalAreas.find(area => area.key === 'sleep')?.rating}/5)`,
            `Stress management (rating: ${functionalAreas.find(area => area.key === 'stressManagement')?.rating}/5)`,
            `Emotional regulation (rating: ${functionalAreas.find(area => area.key === 'emotionalRegulation')?.rating}/5)`
          ]}
          detailedAssessment={{
            sleep: {
              observations: functionalAreas.find(area => area.key === 'sleep')?.observations || [],
              quote: functionalAreas.find(area => area.key === 'sleep')?.evidence || ""
            },
            emotionalRegulation: {
              observations: functionalAreas.find(area => area.key === 'emotionalRegulation')?.observations || [],
              quote: functionalAreas.find(area => area.key === 'emotionalRegulation')?.evidence || ""
            }
          }}
        />
      </div>
    </>
  );
};

export default Dashboard;
