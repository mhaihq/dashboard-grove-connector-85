
// Clinical Recommendations
export const clinicalRecommendations = [
  {
    title: "Sleep Restoration Protocol",
    relatedAreas: ["Sleep", "Cognitive Function"],
    description: "A structured approach to improve sleep quality and mental wind-down.",
    priority: "high" as const,
    icon: "thermometer" as const,
    timeframe: "Start within 2 days",
    difficulty: "moderate" as const,
    steps: [
      "Set a firm 'work end' time at 8 PM to begin wind-down routine",
      "Practice 4-7-8 breathing: Inhale for 4 counts, hold for 7, exhale for 8. Repeat 5 times",
      "Create a sleep-friendly environment: dim lights, cool temperature, no screens",
      "Use white noise or nature sounds to mask racing thoughts"
    ],
    actionLabel: "Start Sleep Plan",
    actionType: "self" as const
  },
  {
    title: "Stress Management Toolkit",
    relatedAreas: ["Stress Management", "Emotional Regulation"],
    description: "Alternative stress relief methods to replace alcohol use.",
    priority: "high" as const,
    icon: "brain" as const,
    timeframe: "Begin within 1 week",
    difficulty: "moderate" as const,
    steps: [
      "Replace evening alcohol with calming tea ritual",
      "Practice progressive muscle relaxation before bed",
      "Use 'stress journaling' to identify triggers",
      "Schedule daily 15-minute mindfulness breaks"
    ],
    actionLabel: "Explore Toolkit",
    actionType: "followup" as const
  },
  {
    title: "Emotional Regulation Framework",
    relatedAreas: ["Emotional Regulation", "Stress Management"],
    description: "Structured approach to understanding and managing emotional responses.",
    priority: "high" as const,
    icon: "heart" as const,
    timeframe: "Begin within 2 weeks",
    difficulty: "challenging" as const,
    steps: [
      "Use PLEASE skills: treat PhysicaL illness, balanced Eating, avoid mood-Altering substances, balanced Sleep, get Exercise",
      "Practice STOP technique: Stop, Take a step back, Observe, Proceed mindfully",
      "Implement daily mood tracking with trigger identification",
      "Schedule regular check-ins with support system"
    ],
    actionLabel: "Learn Framework",
    actionType: "call" as const
  },
  {
    title: "Energy Management Strategy",
    relatedAreas: ["Energy Level", "Cognitive Function"],
    description: "Optimize energy levels throughout the day.",
    priority: "medium" as const,
    icon: "footprints" as const,
    timeframe: "Begin when ready",
    difficulty: "easy" as const,
    steps: [
      "Schedule work in 90-minute focused blocks with mandatory breaks",
      "Create a 'transition ritual' between work tasks",
      "Set up regular movement reminders",
      "Plan meals and snacks to maintain stable blood sugar"
    ],
    actionLabel: "Try Strategy",
    actionType: "self" as const
  }
];
