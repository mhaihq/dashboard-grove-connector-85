
// Care Plan Items with connections to health pulse data
export const carePlanItems = [
  {
    title: "Sleep Restoration Protocol",
    icon: "moon",
    status: "in-progress" as const,
    description: "A structured approach to improve sleep quality and mental wind-down.",
    relatedMetric: "Sleep Quality",
    currentScore: 2,
    targetScore: 4,
    evidence: "I've been struggling with racing thoughts at night",
    nextStep: "Try the 4-7-8 breathing technique before bed tonight",
    completedSteps: 1,
    totalSteps: 4
  },
  {
    title: "Stress Management Toolkit",
    icon: "activity",
    status: "started" as const,
    description: "Alternative stress relief methods to replace alcohol use.",
    relatedMetric: "Stress Level",
    currentScore: 3,
    targetScore: 4,
    evidence: "Work deadlines are creating anxiety spikes",
    nextStep: "Practice progressive muscle relaxation during lunch break",
    completedSteps: 1,
    totalSteps: 4
  },
  {
    title: "Emotional Regulation Framework",
    icon: "heart",
    status: "not-started" as const,
    description: "Structured approach to understanding and managing emotional responses.",
    relatedMetric: "Emotional Health",
    currentScore: 2,
    targetScore: 4,
    evidence: "Mood swings are affecting my relationships",
    nextStep: "Read introduction to PLEASE skills framework",
    completedSteps: 0,
    totalSteps: 4
  },
  {
    title: "Social Check-In",
    icon: "users",
    status: "complete" as const,
    description: "Regular connection with support system.",
    relatedMetric: "Social Connection",
    currentScore: 4,
    targetScore: 4,
    evidence: "Reaching out to friends has improved my outlook",
    nextStep: "Schedule next coffee meetup within 2 weeks",
    completedSteps: 4,
    totalSteps: 4
  }
];
