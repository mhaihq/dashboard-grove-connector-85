
import React from 'react';

interface DashboardWelcomeProps {
  userName: string;
}

export const DashboardWelcome: React.FC<DashboardWelcomeProps> = ({ userName }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">👋 Welcome back, {userName}!</h1>
      <p className="text-gray-600 mt-1">
        Let's check in on your health and build a plan together. I'm here to support you every step of the way!
      </p>
    </div>
  );
};

export default DashboardWelcome;
