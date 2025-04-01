import { ReactNode } from 'react';

export interface HealthIndicator {
  title: string;
  value: string;
  change: string;
  icon: string; // Changed from function returning ReactNode to string
  score?: number;
  previousScore?: number;
  maxScore?: number;
  status?: string;
  evidence?: string;
  intakeReference?: string;
  updatedAt?: string;
  actionItems?: string[];
  trendData?: number[]; // Added for trend mini-charts
  plainLanguage?: string; // Added for user-friendly descriptions
  actionSuggestion?: string; // Added for direct action item
}

export interface CarePlanItem {
  title: string;
  icon: string; // Changed from function returning ReactNode to string
  status: "not-started" | "started" | "in-progress" | "complete";
  description: string;
  completedSteps?: number;
  totalSteps?: number;
  timeCommitment?: string;
  benefit?: string;
  nextStep?: string;
  relatedMetric?: string;
  currentScore?: number;
  previousScore?: number;
  targetScore?: number;
  evidence?: string;
  lastUpdated?: string;
  weeklyTargets?: string[];
}

export interface Milestone {
  title: string;
  description: string;
  completed: boolean;
  points: number;
}

export interface HealthPulseItem {
  area: string;
  score: number;
  initialScore?: number; // Added for comparing with previous state
  improving: boolean;
  priority?: boolean;
  tooltip?: string;
  trend?: 'up' | 'down' | 'stable';
  trendPercentage?: number; // Added to show percentage improvement
  relatedTo?: string[];
}

export interface OverviewItem {
  title: string;
  items: string[];
}

export interface JournalEntry {
  text: string;
  status: 'positive' | 'neutral' | 'negative';
}

export interface ProgramItem {
  program: string;
  match: "none" | "perfect" | "good" | "possible";
  status: "Enrolled" | "Available" | "Eligible" | "Not Eligible";
  description: string;
  action?: string;
  relevantAreas?: string[];
}

export interface FunctionalArea {
  title: string;
  key: string;
  rating: number;
  status: string;
  observations: string[];
  evidence: string;
}

export interface ClinicalRecommendation {
  title: string;
  relatedAreas: string[];
  description: string;
  priority: "high" | "medium" | "low";
  icon: "thermometer" | "brain" | "heart" | "footprints" | "clipboard" | "shield" | "book";
  timeframe: string;
  difficulty: "easy" | "moderate" | "challenging";
  steps: string[];
  actionLabel: string;
  actionType: "self" | "followup" | "call";
  whyItMatters?: string;
  timeToResults?: string;
  quickTip?: string;
}

export interface MedicareProgram {
  name: string;
  originalName: string;
  description: string;
  eligibility: string;
  coverage: string;
  benefits: string[];
  icon: "thermometer" | "brain" | "heart" | "footprints" | "clipboard" | "shield" | "book";
  isEligible?: boolean;
}

export interface MilestonesData {
  weeklyPoints: number;
  level: number;
  levelName: string;
  nextLevel: string;
  pointsToNextLevel: number;
  achievements: {
    title: string;
    unlocked: boolean;
    progress: number;
    icon: ReactNode;
  }[];
}
