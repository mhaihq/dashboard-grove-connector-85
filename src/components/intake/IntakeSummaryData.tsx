
import React from 'react';

// Define interfaces for the data structures
export interface SummaryItem {
  title: string;
  content: string[];
  type: 'notable' | 'joy' | 'weighing';
}

export interface MetricItem {
  title: string;
  status: 'positive' | 'mixed' | 'concerning';
  icon: React.ReactNode;
  description: string;
}

export interface RecommendationItem {
  title: string;
  description: string;
  steps: string[];
  priority: 'high' | 'medium' | 'low';
  relatedAreas?: string[];
  timeframe?: string;
  difficulty?: 'easy' | 'moderate' | 'challenging';
}

// Function to get the sample data for the intake report
export const getIntakeData = () => {
  // Health summary data
  const summaryItems: SummaryItem[] = [
    {
      title: "Health History",
      content: [
        "Hypertension diagnosed in 2019, currently managed with medication",
        "Family history of heart disease (father)",
        "No major surgeries or hospitalizations",
        "Occasional lower back pain, not formally diagnosed"
      ],
      type: 'notable'
    },
    {
      title: "Current Wellness Practices",
      content: [
        "Supportive relationship with spouse provides emotional stability",
        "Uses breathing techniques during stressful moments",
        "Enjoys weight training when consistent with routine",
        "Values outdoor activities but doesn't prioritize them currently"
      ],
      type: 'joy'
    },
    {
      title: "Self-Identified Challenges",
      content: [
        "Periodic low mood, especially in mornings",
        "Decreased social engagement in past 3 months",
        "Inconsistent sleep routine affecting energy levels",
        "Work-related stress impacting overall well-being",
        "Medication adherence varies with stress levels"
      ],
      type: 'weighing'
    }
  ];
  
  // Health metrics data
  const metrics: MetricItem[] = [
    {
      title: "Sleep Quality",
      status: "concerning",
      icon: null, // Icons will be added in the parent component
      description: "Irregular sleep patterns with difficulty falling asleep and frequent night waking. Average 5-6 hours per night with inconsistent bedtime routine."
    },
    {
      title: "Social Support",
      status: "mixed",
      icon: null,
      description: "Strong support from spouse but limited social connections outside the home. Has withdrawn from some friendships and social activities in recent months."
    },
    {
      title: "Energy Level",
      status: "mixed",
      icon: null,
      description: "Energy fluctuates throughout the day with notable afternoon fatigue. Morning energy is better but declines significantly after lunch."
    },
    {
      title: "Stress Management",
      status: "mixed",
      icon: null,
      description: "Has some effective coping mechanisms like breathing exercises but struggles during high-stress periods. Business fluctuations are a primary stressor."
    },
    {
      title: "Cognitive Function",
      status: "positive",
      icon: null,
      description: "Strong problem-solving abilities and mental clarity. No reported issues with memory or concentration despite sleep challenges."
    },
    {
      title: "Emotional Regulation",
      status: "concerning",
      icon: null,
      description: "Experiences mood fluctuations with periods of feeling down. Has difficulty managing emotions during stressful periods. Would benefit from emotional regulation strategies."
    },
    {
      title: "Nutrition Habits",
      status: "mixed",
      icon: null,
      description: "Skips breakfast frequently. Lunch and dinner are moderate in quality with room for improvement in vegetable intake and portion control."
    },
    {
      title: "Physical Activity",
      status: "mixed",
      icon: null,
      description: "Inconsistent exercise pattern with 2-3 workouts per week. Shows good engagement when exercising but struggles with consistency."
    },
    {
      title: "Hydration",
      status: "concerning",
      icon: null,
      description: "Consumes primarily coffee throughout the morning with limited water intake. Estimated daily water consumption below recommended levels."
    }
  ];
  
  // Initial recommendations
  const recommendations: RecommendationItem[] = [
    {
      title: "Establish a Consistent Sleep Routine",
      description: "Regularize your sleeping pattern to help stabilize energy and mood fluctuations.",
      steps: [
        "Set a consistent bedtime and wake-up time 7 days a week",
        "Create a relaxing pre-sleep routine, avoiding screens an hour before bedtime",
        "Keep bedroom cool, dark and quiet; consider blackout curtains",
        "Track sleep hours and quality in the provided sleep journal"
      ],
      priority: "high",
      relatedAreas: ["Sleep", "Energy Level", "Mood"],
      timeframe: "Start within 2 days",
      difficulty: "moderate"
    },
    {
      title: "Build Daily Hydration Habits",
      description: "Increase water intake throughout the day to improve energy and cognitive function.",
      steps: [
        "Start each morning with a full glass of water before coffee",
        "Keep a water bottle visible at your desk or workspace",
        "Set hydration reminders on your phone every 2 hours",
        "Gradually reduce caffeine intake, especially after 2pm"
      ],
      priority: "medium",
      relatedAreas: ["Energy", "Physical Wellness"],
      timeframe: "Begin immediately",
      difficulty: "easy"
    },
    {
      title: "Reconnect with Social Support Network",
      description: "Gradually rebuild social connections to enhance emotional well-being and support systems.",
      steps: [
        "Schedule one brief social interaction each week (call, coffee, walk)",
        "Join the online support group discussed in our session",
        "Practice the communication techniques we reviewed when feeling overwhelmed",
        "Share your health goals with at least one trusted friend"
      ],
      priority: "medium",
      relatedAreas: ["Social Support", "Emotional Regulation"],
      timeframe: "Begin within 1 week",
      difficulty: "challenging"
    }
  ];

  return { summaryItems, metrics, recommendations };
};
