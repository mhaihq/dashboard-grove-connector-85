
import { WalkthroughPage } from '@/types/walkthrough';

export const walkthroughData: WalkthroughPage[] = [
  {
    path: '/',
    name: 'Dashboard',
    description: 'Main overview of your health status and tasks',
    steps: [
      {
        id: 'dashboard-intro',
        title: 'Welcome to Your Health Dashboard',
        description: 'This is your personal health hub where you can track your progress, view insights, and manage your health journey.',
        page: 'dashboard',
        order: 1
      },
      {
        id: 'dashboard-sidebar',
        title: 'Navigation Sidebar',
        description: 'Use this sidebar to navigate between different sections of your health portal. You can expand or collapse it by clicking the arrow at the bottom.',
        elementId: 'sidebar',
        position: 'right',
        page: 'dashboard',
        order: 2
      },
      {
        id: 'dashboard-welcome',
        title: 'Personalized Welcome',
        description: 'Here you\'ll see a personalized greeting and a brief overview of what you can do today.',
        elementId: 'welcome-section',
        position: 'bottom',
        page: 'dashboard',
        order: 3
      },
      {
        id: 'dashboard-call',
        title: 'Schedule a Call',
        description: 'Need to talk to a health professional? You can quickly schedule a call right from your dashboard.',
        elementId: 'call-element',
        position: 'bottom',
        page: 'dashboard',
        order: 4
      },
      {
        id: 'dashboard-journal',
        title: 'Health Journal Summary',
        description: 'This section shows insights from your health journal entries, highlighting what\'s going well and areas that need attention.',
        elementId: 'journal-summary',
        position: 'top',
        page: 'dashboard',
        order: 5
      },
      {
        id: 'dashboard-indicators',
        title: 'Key Health Indicators',
        description: 'These cards show important metrics about your health status, including chronic conditions and risk factors.',
        elementId: 'health-indicators',
        position: 'top',
        page: 'dashboard',
        order: 6
      },
      {
        id: 'dashboard-assessment',
        title: 'Health Assessment',
        description: 'This chart provides a visual representation of different areas of your health, helping you identify strengths and improvement opportunities.',
        elementId: 'health-assessment',
        position: 'left',
        page: 'dashboard',
        order: 7
      },
      {
        id: 'dashboard-programs',
        title: 'Eligible Programs',
        description: 'Based on your health profile, you may qualify for specific health programs. They\'re listed here for your convenience.',
        elementId: 'eligible-programs',
        position: 'left',
        page: 'dashboard',
        order: 8
      },
      {
        id: 'dashboard-overview',
        title: 'Health Overview',
        description: 'This section provides a narrative about your health status and personalized recommendations.',
        elementId: 'health-overview',
        position: 'right',
        page: 'dashboard',
        order: 9
      },
      {
        id: 'dashboard-actions',
        title: 'Recommended Actions',
        description: 'These are suggested next steps to improve your health, prioritized by importance and urgency.',
        elementId: 'recommended-actions',
        position: 'right',
        page: 'dashboard',
        order: 10
      }
    ]
  },
  {
    path: '/intake-report',
    name: 'Intake Report',
    description: 'Detailed analysis of your initial health assessment',
    steps: [
      {
        id: 'intake-intro',
        title: 'Intake Report Overview',
        description: 'This page shows the results of your initial health assessment, providing a baseline for your health journey.',
        page: 'intake',
        order: 1
      },
      {
        id: 'intake-header',
        title: 'Report Header',
        description: 'This section provides a summary of when your assessment was completed and the key areas covered.',
        elementId: 'intake-header',
        position: 'bottom',
        page: 'intake',
        order: 2
      },
      {
        id: 'intake-banner',
        title: 'Wellness Banner',
        description: 'This inspirational banner reminds you of the importance of holistic wellbeing in your health journey.',
        elementId: 'wellness-banner',
        position: 'bottom',
        page: 'intake',
        order: 3
      },
      {
        id: 'intake-summary',
        title: 'Mental Health Summary',
        description: 'This section highlights insights about your mental wellbeing, including strengths and areas for attention.',
        elementId: 'mental-health-summary',
        position: 'top',
        page: 'intake',
        order: 4
      },
      {
        id: 'intake-metrics',
        title: 'Health & Wellness Assessment',
        description: 'These metrics show detailed scores across various dimensions of your health, giving you a comprehensive view of your wellbeing.',
        elementId: 'health-metrics',
        position: 'top',
        page: 'intake',
        order: 5
      },
      {
        id: 'intake-progress',
        title: 'Progress & Recommendations',
        description: 'Based on your assessment, here are personalized recommendations to help improve your health outcomes.',
        elementId: 'progress-section',
        position: 'top',
        page: 'intake',
        order: 6
      }
    ]
  },
  {
    path: '/schedule-followup',
    name: 'Schedule Followup',
    description: 'Book your next appointment with a health professional',
    steps: [
      {
        id: 'schedule-intro',
        title: 'Appointment Scheduler',
        description: 'This page allows you to schedule follow-up appointments with your health team.',
        page: 'schedule',
        order: 1
      },
      {
        id: 'schedule-calendar',
        title: 'Calendar Selection',
        description: 'Use this calendar to select your preferred date for the appointment. Dates with dots indicate existing appointments.',
        elementId: 'date-calendar',
        position: 'right',
        page: 'schedule',
        order: 2
      },
      {
        id: 'schedule-info',
        title: 'Appointment Information',
        description: 'Once you select a date, this section will show your appointment details and allow you to confirm or modify them.',
        elementId: 'appointment-info',
        position: 'left',
        page: 'schedule',
        order: 3
      },
      {
        id: 'schedule-time',
        title: 'Time Selection',
        description: 'After selecting a date, you\'ll be prompted to choose a convenient time slot for your appointment.',
        elementId: 'time-selector',
        position: 'top',
        page: 'schedule',
        order: 4
      },
      {
        id: 'schedule-recurring',
        title: 'Recurring Options',
        description: 'You can set up recurring appointments if you need regular check-ins with your health team.',
        elementId: 'recurring-options',
        position: 'bottom',
        page: 'schedule',
        order: 5
      },
      {
        id: 'schedule-upcoming',
        title: 'Upcoming Appointments',
        description: 'This section displays all your scheduled appointments, allowing you to keep track of your health calendar.',
        elementId: 'upcoming-appointments',
        position: 'top',
        page: 'schedule',
        order: 6
      }
    ]
  },
  {
    path: '/followup-report',
    name: 'Health Journal',
    description: 'Review and manage your health journal entries',
    steps: [
      {
        id: 'journal-intro',
        title: 'Health Journal Overview',
        description: 'This page contains your health journal entries, allowing you to track your progress and reflect on your health journey.',
        page: 'journal',
        order: 1
      },
      {
        id: 'journal-table',
        title: 'Journal Entries Table',
        description: 'This table lists all your journal entries, organized by date. You can click on any entry to view its details.',
        elementId: 'journal-table',
        position: 'top',
        page: 'journal',
        order: 2
      },
      {
        id: 'journal-entry',
        title: 'Journal Entry Details',
        description: 'When you click on an entry, a detailed view will appear showing your reflections, goals, and health metrics for that day.',
        elementId: 'journal-entry',
        position: 'top',
        page: 'journal',
        order: 3
      },
      {
        id: 'journal-tabs',
        title: 'Journal Entry Tabs',
        description: 'Each entry contains multiple sections accessible through these tabs, including daily reflections, mood tracking, and sleep quality.',
        elementId: 'journal-tabs',
        position: 'bottom',
        page: 'journal',
        order: 4
      },
      {
        id: 'journal-create',
        title: 'Create New Entry',
        description: 'You can create a new journal entry by clicking the "New Entry" button at the top of the table.',
        elementId: 'new-entry-button',
        position: 'left',
        page: 'journal',
        order: 5
      }
    ]
  }
];
