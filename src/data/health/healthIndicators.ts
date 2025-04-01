
// Health Indicators with enhanced status details and evidence
export const healthIndicators = [
  {
    id: "indicator1",
    title: "Sleep Quality",
    value: "Poor",
    change: "worsening",
    icon: "moon",
    score: 2,
    maxScore: 5,
    status: "concerning",
    evidence: "I'm getting about 4-5 hours most nights, waking up frequently.",
    intakeReference: "From intake assessment on Feb 13, 2025",
    actionItems: [
      "Try the 4-7-8 breathing technique before bed",
      "Avoid screens one hour before sleep",
      "Keep bedroom temperature between 65-68°F"
    ]
  },
  {
    id: "indicator2",
    title: "Stress Level",
    value: "High",
    change: "improving",
    icon: "activity",
    score: 3,
    maxScore: 5,
    status: "mixed",
    evidence: "Job pressure is still there, but breathing exercises are helping a bit.",
    intakeReference: "From follow-up on March 5, 2025",
    actionItems: [
      "Practice progressive muscle relaxation",
      "Schedule short breaks throughout workday",
      "Try 5-minute mindfulness exercises"
    ]
  },
  {
    id: "indicator3",
    title: "Energy",
    value: "Variable",
    change: "stabilizing",
    icon: "brain",
    score: 3,
    maxScore: 5, 
    status: "neutral",
    evidence: "Better on days when I eat regular meals and walk in the morning.",
    intakeReference: "From journal entry on March 10, 2025",
    actionItems: [
      "Set meal reminders",
      "Prepare healthy snacks in advance",
      "Continue morning walks"
    ]
  },
  {
    id: "indicator4",
    title: "Medicare Status",
    value: "Enrolled",
    change: "stable",
    icon: "shield",
    score: 5,
    maxScore: 5,
    status: "positive",
    evidence: "All preventive services covered through your current plan.",
    intakeReference: "Verified on Feb 20, 2025",
    nextSteps: "Annual wellness visit scheduled for April 15"
  }
];
