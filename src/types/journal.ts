
export interface JournalEntryType {
  id: string;
  date: string;
  timestamp: string;
  title: string;
  content: string;
  highlight?: string;
  category: 'daily' | 'mood' | 'sleep' | 'achievement' | 'goals';
  mood?: {
    score: string;
    weekend: string;
    weekday: string;
    notes: string;
  };
  energy?: {
    level: string;
    notes: string;
  };
  stress?: {
    level: string;
    notes: string;
  };
  sleep?: {
    duration: string;
    quality: string;
    notes?: string;
  };
  achievements?: Array<{
    title: string;
    description: string;
    date?: string;
  }>;
  goals?: Array<{
    title: string;
    description: string;
    completed: boolean;
    dueDate?: string;
  }>;
}
