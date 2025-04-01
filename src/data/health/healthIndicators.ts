
// Health Indicators with enhanced status details and evidence
export const healthIndicators = [
  {
    id: "indicator1",
    title: "Sleep Quality",
    value: "Improving",
    change: "improving",
    icon: "moon",
    score: 3,
    previousScore: 2,
    maxScore: 5,
    status: "mixed",
    evidence: "I'm getting about 5-6 hours most nights now, with fewer awakenings.",
    intakeReference: "From intake assessment on Feb 13, 2025",
    updatedAt: "March 15, 2025",
    actionItems: [
      "Continue the 4-7-8 breathing technique before bed",
      "Maintain screen-free hour before sleep",
      "Keep bedroom temperature between 65-68°F"
    ],
    trendData: [2, 1, 3, 2, 2, 3, 3, 2, 3, 3, 4, 3, 3], // Last 2 weeks of data
    plainLanguage: "Your sleep is on the right track, but could use more consistency",
    actionSuggestion: "Try a 10-minute stretching routine before bed tonight"
  },
  {
    id: "indicator2",
    title: "Stress Level",
    value: "High",
    change: "improving",
    icon: "activity",
    score: 3,
    previousScore: 2,
    maxScore: 5,
    status: "mixed",
    evidence: "Job pressure is still there, but breathing exercises are helping a bit.",
    intakeReference: "From follow-up on March 5, 2025",
    updatedAt: "March 14, 2025",
    actionItems: [
      "Practice progressive muscle relaxation",
      "Schedule short breaks throughout workday",
      "Try 5-minute mindfulness exercises"
    ],
    trendData: [1, 1, 2, 2, 1, 2, 2, 3, 2, 3, 3, 3, 3], // Last 2 weeks of data
    plainLanguage: "Your stress levels are high but gradually improving with new techniques",
    actionSuggestion: "Take a 2-minute breathing break right now"
  },
  {
    id: "indicator3",
    title: "Energy",
    value: "Variable",
    change: "stabilizing",
    icon: "brain",
    score: 3,
    previousScore: 3,
    maxScore: 5, 
    status: "neutral",
    evidence: "Better on days when I eat regular meals and walk in the morning.",
    intakeReference: "From journal entry on March 10, 2025",
    updatedAt: "March 10, 2025",
    actionItems: [
      "Set meal reminders",
      "Prepare healthy snacks in advance",
      "Continue morning walks"
    ],
    trendData: [2, 3, 2, 2, 3, 3, 4, 3, 2, 3, 3, 4, 3], // Last 2 weeks of data
    plainLanguage: "Your energy fluctuates but is more stable with regular meals and exercise",
    actionSuggestion: "Prepare 3 healthy snacks tonight for tomorrow"
  },
  {
    id: "indicator4",
    title: "Hydration",
    value: "Needs Focus",
    change: "stable",
    icon: "droplets",
    score: 2,
    previousScore: 2,
    maxScore: 5,
    status: "concerning",
    evidence: "I'm forgetting to drink water during busy work periods.",
    intakeReference: "From journal entry on March 12, 2025",
    updatedAt: "March 12, 2025",
    actionItems: [
      "Set hydration reminders every 2 hours",
      "Keep water bottle visible on desk",
      "Track daily water intake in journal"
    ],
    trendData: [1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2], // Last 2 weeks of data
    plainLanguage: "Your hydration needs attention, especially during work hours",
    actionSuggestion: "Fill a water bottle now and place it on your desk"
  },
  {
    id: "indicator5",
    title: "Medicare Status",
    value: "Enrolled",
    change: "stable",
    icon: "shield",
    score: 5,
    previousScore: 5,
    maxScore: 5,
    status: "positive",
    evidence: "All preventive services covered through your current plan.",
    intakeReference: "Verified on Feb 20, 2025",
    updatedAt: "Feb 20, 2025",
    nextSteps: "Annual wellness visit scheduled for April 15",
    trendData: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], // Last 2 weeks of data
    plainLanguage: "Your Medicare coverage is active and supporting your care needs",
    actionSuggestion: "Confirm your April 15 wellness visit appointment"
  }
];
