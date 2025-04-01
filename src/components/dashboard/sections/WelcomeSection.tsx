
import React from 'react';
import { DashboardWelcome } from '@/components/dashboard/DashboardWelcome';
import { JournalEntry } from '@/types/dashboard';

interface WelcomeSectionProps {
  userName: string;
  lastCheckIn: string;
  medicareStatus: string;
  riskScore: string;
  riskTrend: string;
  journalEntries: JournalEntry[];
  nextCheckInDate: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  userName,
  lastCheckIn,
  medicareStatus,
  riskScore,
  riskTrend,
  journalEntries,
  nextCheckInDate
}) => {
  // Get positive entries for welcome message
  const positiveEntries = journalEntries.filter(entry => entry.status === 'positive');
  
  // Create a personalized welcome message
  const welcomeMessage = positiveEntries.length > 0 
    ? `Last week, you ${positiveEntries.map(e => e.text.toLowerCase().replace(':', '')).join(', and ')}. You're doing better than you think — let's keep it going.` 
    : "Let's keep building on your progress — small steps, big impact.";

  return (
    <div className="mb-16">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Today's Check-In</h2>
      <DashboardWelcome 
        userName={userName}
        lastCheckIn={lastCheckIn}
        medicareStatus={medicareStatus}
        riskScore={riskScore}
        riskTrend={riskTrend}
        welcomeMessage={welcomeMessage}
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
  );
};

export default WelcomeSection;
