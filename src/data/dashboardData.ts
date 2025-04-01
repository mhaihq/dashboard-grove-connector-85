import React from 'react';
import { Moon, BatteryFull, Brain, Heart, Users, Activity, UtensilsCrossed, Weight, Shield, Coffee } from 'lucide-react';

// User Information
export const userInfo = {
  name: "Matteo Smith",
  email: "matteo.smith@example.com",
  date: "January 29, 2025"
};

// Welcome Message
export const welcome = {
  greeting: "Hi Matteo",
  message: "Thanks for our conversation. I've analyzed our discussion to provide you with meaningful insights about your wellbeing. Let me know if anything doesn't resonate so we can refine these observations together."
};

// User Background Information
export const userBackground = [
  "Family history of anxiety disorders on maternal side",
  "No significant physical health conditions",
  "Started experiencing sleep issues 6 months ago coinciding with work promotion",
  "Previous therapy experience 2 years ago for work-related stress",
  "Regular alcohol consumption started gradually over the past year",
  "Strong family support system with particularly close relationship with wife",
  "No history of substance abuse or major mental health conditions",
  "Recent lifestyle changes include increased work responsibilities and remote work transition"
];

// Overview Categories
export const overview = [
  {
    title: "Notable Life Changes",
    items: [
      "Experiencing fluctuating moods with periods of intense focus",
      "Difficulty 'switching off' from work mode",
      "Changes in sleep patterns affecting daily routine"
    ]
  },
  {
    title: "What's Bringing Joy",
    items: [
      "Strong relationship with wife providing emotional support",
      "Available family support network",
      "Periods of high productivity and focus"
    ]
  },
  {
    title: "What's Weighing on You",
    items: [
      "Sleep disruption affecting daily energy",
      "Unexpected emotional reactions causing concern",
      "Daily alcohol use impacting overall wellbeing"
    ]
  },
  {
    title: "Goals and Desires",
    items: [
      "Improve sleep quality and routine",
      "Develop better emotional regulation strategies",
      "Reduce reliance on alcohol for relaxation"
    ]
  }
];

// Health Indicators
export const healthIndicators = [
  {
    title: "Sleep Quality",
    value: "Poor",
    change: "worsening",
    icon: () => <Moon className="h-5 w-5 text-indigo-500" />
  },
  {
    title: "Stress Level",
    value: "High",
    change: "improving",
    icon: () => <Activity className="h-5 w-5 text-red-500" />
  },
  {
    title: "Energy",
    value: "Variable",
    change: "stabilizing",
    icon: () => <Brain className="h-5 w-5 text-amber-500" />
  },
  {
    title: "Medicare Status",
    value: "Enrolled",
    change: "stable",
    icon: () => <Shield className="h-5 w-5 text-hana-green" />
  }
];

// Journal Entries
export const journalEntries = [
  {
    text: "Morning walks: 5 days (up from 2!)",
    status: "positive" as const
  },
  {
    text: "Water intake improved",
    status: "positive" as const
  },
  {
    text: "Reached out to a friend this week ☕",
    status: "positive" as const
  },
  {
    text: "Still feeling low after skipped meals",
    status: "neutral" as const
  },
  {
    text: "Sleep interrupted – let's revisit your routine",
    status: "negative" as const
  }
];

// Care Plan Items
export const carePlanItems = [
  {
    title: "Sleep Restoration Protocol",
    icon: () => <Moon className="w-5 h-5 text-indigo-500" />,
    status: "in-progress",
    description: "A structured approach to improve sleep quality and mental wind-down."
  },
  {
    title: "Stress Management Toolkit",
    icon: () => <Activity className="w-5 h-5 text-red-500" />,
    status: "started",
    description: "Alternative stress relief methods to replace alcohol use."
  },
  {
    title: "Emotional Regulation Framework",
    icon: () => <Heart className="w-5 h-5 text-pink-500" />,
    status: "not-started",
    description: "Structured approach to understanding and managing emotional responses."
  },
  {
    title: "Social Check-In",
    icon: () => <Users className="w-5 h-5 text-blue-500" />,
    status: "complete",
    description: "Regular connection with support system."
  }
];

// Suggested Programs
export const suggestedPrograms = [
  {
    program: "Chronic Care Management (CCM)",
    match: "perfect",
    status: "Enrolled",
    description: "Ongoing support for chronic conditions",
    action: "Monitor BP 🩺",
    relevantAreas: ["Sleep", "Stress Management"]
  },
  {
    program: "Remote Patient Monitoring (RPM)",
    match: "perfect",
    status: "Available",
    description: "Track health metrics from home",
    action: "Enroll Now",
    relevantAreas: ["Sleep", "Energy Level"]
  },
  {
    program: "Behavioral Health Integration (BHI)",
    match: "possible",
    status: "Eligible",
    description: "Mental health support services",
    action: "Learn More",
    relevantAreas: ["Emotional Regulation"]
  },
  {
    program: "Principal Care Management (PCM)",
    match: "none",
    status: "Not Eligible",
    description: "Focused on single condition management"
  }
];

// Milestones
export const milestones = [
  {
    title: "2 Weeks Consistent Sleep",
    description: "Maintain your sleep schedule for 2 weeks straight",
    completed: false,
    points: 50
  },
  {
    title: "Hydration Hero",
    description: "Drink 8 glasses of water daily for a week",
    completed: true,
    points: 25
  },
  {
    title: "First Peer Group Chat",
    description: "Join your first group support session",
    completed: true,
    points: 30
  },
  {
    title: "Logged 3 AI Calls",
    description: "Complete 3 follow-up calls with your AI coach",
    completed: false,
    points: 45
  }
];

// Functional Areas Assessment
export const functionalAreas = [
  {
    title: "Sleep",
    key: "sleep",
    rating: 2,
    status: "Concerning",
    observations: [
      "Difficulty falling asleep due to racing thoughts",
      "Reports never feeling tired despite lack of rest",
      "Brain remains highly active at bedtime"
    ],
    evidence: "I just don't sleep... I feel that I'm never tired. I feel that my brain is always on."
  },
  {
    title: "Social Support",
    key: "socialSupport",
    rating: 4,
    status: "Positive",
    observations: [
      "Supportive relationship with wife",
      "Family readily available for assistance",
      "Open communication channels"
    ],
    evidence: "My wife understands what I'm going through, and my family is always there."
  },
  {
    title: "Energy Level",
    key: "energyLevel",
    rating: 3,
    status: "Mixed",
    observations: [
      "High energy during work hours",
      "Sudden energy crashes",
      "Difficulty maintaining consistent energy levels"
    ],
    evidence: "I can work intensely for hours, but then I crash completely."
  },
  {
    title: "Stress Management",
    key: "stressManagement",
    rating: 2,
    status: "Concerning",
    observations: [
      "Relying on alcohol for stress relief",
      "Limited healthy coping mechanisms",
      "Stress affecting sleep and mood"
    ],
    evidence: "I find myself drinking daily to wind down."
  },
  {
    title: "Cognitive Function",
    key: "cognitiveFunction",
    rating: 3,
    status: "Mixed",
    observations: [
      "Excellent focus during work",
      "Racing thoughts during downtime",
      "Challenges with mental relaxation"
    ],
    evidence: "I can focus intensely at work, but can't quiet my mind afterward."
  },
  {
    title: "Emotional Regulation",
    key: "emotionalRegulation",
    rating: 2,
    status: "Concerning",
    observations: [
      "Unexplained anger episodes",
      "Frequent nervousness",
      "Difficulty managing emotional responses"
    ],
    evidence: "I feel nervous a lot of the time, and then... Kind of angry... That's with no reason."
  }
];

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

// Medicare Programs
export const medicarePrograms = [
  {
    name: "Chronic Care Management (CCM)",
    description: "Ongoing support for chronic conditions with regular monitoring and care coordination.",
    eligibility: "Medicare beneficiaries with 2+ chronic conditions expected to last at least 12 months.",
    coverage: "Medicare Part B covers 80% of the approved amount after you've met your Part B deductible.",
    benefits: [
      "24/7 access to healthcare providers for urgent care needs",
      "Regular review of medications to prevent interactions",
      "Coordination between all your healthcare providers",
      "Personalized care plan that's regularly updated"
    ],
    icon: "shield"
  },
  {
    name: "Remote Patient Monitoring (RPM)",
    description: "Track health metrics from home with devices that send data to your healthcare provider.",
    eligibility: "Medicare beneficiaries whose providers have ordered RPM services.",
    coverage: "Medicare Part B covers RPM services for patients with acute and chronic conditions.",
    benefits: [
      "Reduce need for in-person visits",
      "Early detection of health issues",
      "More consistent monitoring of vital signs",
      "Real-time alerts for concerning measurements"
    ],
    icon: "heart"
  },
  {
    name: "Behavioral Health Integration (BHI)",
    description: "Mental health services integrated with your primary care.",
    eligibility: "Medicare beneficiaries with behavioral health conditions like depression or anxiety.",
    coverage: "Medicare Part B covers BHI services when provided by eligible professionals.",
    benefits: [
      "Regular assessment of your condition",
      "Care planning for behavioral health needs",
      "Brief interventions using evidence-based techniques",
      "Monitoring your progress with regular follow-ups"
    ],
    icon: "brain"
  },
  {
    name: "Principal Care Management (PCM)",
    description: "Focused care management for a single high-risk condition.",
    eligibility: "Medicare beneficiaries with one complex chronic condition that's expected to last at least 3 months.",
    coverage: "Medicare Part B covers PCM services when provided by eligible professionals.",
    benefits: [
      "Dedicated focus on your most serious health concern",
      "Development of a disease-specific care plan",
      "Medication management for your condition",
      "Coordination with specialists for your condition"
    ],
    icon: "clipboard"
  }
];
