
// Journal Entries with enhanced tracking for progress visibility
export const journalEntries = [
  {
    text: "Morning walks: 5 days (up from 2!)",
    status: "positive" as const,
    date: "March 15, 2025",
    relatedTo: "physical_activity",
    streakCount: 5,
    points: 10
  },
  {
    text: "Water intake improved",
    status: "positive" as const,
    date: "March 14, 2025",
    relatedTo: "hydration",
    streakCount: 7,
    points: 15
  },
  {
    text: "Reached out to a friend this week ☕",
    status: "positive" as const,
    date: "March 12, 2025",
    relatedTo: "social_connection",
    streakCount: 1,
    points: 5
  },
  {
    text: "Still feeling low after skipped meals",
    status: "neutral" as const,
    date: "March 10, 2025",
    relatedTo: "nutrition",
    streakCount: 0,
    points: 0
  },
  {
    text: "Sleep interrupted – let's revisit your routine",
    status: "negative" as const,
    date: "March 8, 2025",
    relatedTo: "sleep",
    streakCount: 0,
    points: 0
  }
];
