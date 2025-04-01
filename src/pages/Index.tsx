
import React from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import Dashboard from '@/components/dashboard/Dashboard';

const Index = () => {
  const handleScheduleCall = () => {
    window.location.href = '/schedule-followup';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        userName="Matteo Smith"
        userEmail="matteo.smith@example.com"
      />
      
      <main className="p-6 md:p-8 max-w-7xl mx-auto">
        <Dashboard onScheduleCall={handleScheduleCall} />
      </main>
    </div>
  );
};

export default Index;
