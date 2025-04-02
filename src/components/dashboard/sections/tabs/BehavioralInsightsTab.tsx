
import React from 'react';
import { HelpCircle } from 'lucide-react';
import PatternInsightCard from '../cards/PatternInsightCard';

const BehavioralInsightsTab: React.FC = () => {
  return (
    <>
      <div className="mb-5 bg-amber-50 border border-amber-100 rounded-lg p-3 flex items-start gap-3">
        <HelpCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-amber-800 font-medium">How these insights work</p>
          <p className="text-sm text-amber-700">
            These patterns are observed from your conversations, tracking data, and journal entries. We focus on connections between behaviors and health outcomes.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PatternInsightCard
          insightTitle="Better Sleep When Waking Early"
          pattern="You woke before 7am on 3 days last week."
          result="Your reported sleep quality improved by +23% on those days."
          suggestion="Try keeping your wake time before 7am 3x next week."
          status="positive"
          category="sleep"
          tooltipInfo="This pattern was detected across 8 sleep journal entries."
          tags={["Morning Routine", "Sleep Quality"]}
        />
        
        <PatternInsightCard
          insightTitle="Stress Increases with Long Hours"
          pattern="You worked more than 8 hours on 4 days last week."
          result="Your reported stress level was 43% higher on those days."
          suggestion="Schedule at least 3 days with firm work boundaries under 8 hours."
          status="negative"
          category="stress"
          tooltipInfo="You also experienced this pattern last month during busy weeks."
          tags={["Workload", "Stress Triggers"]}
        />
        
        <PatternInsightCard
          insightTitle="Morning Exercise Boosts Consistency"
          pattern="You exercised before 9am on 3 days last week."
          result="You were 78% more likely to complete your planned workout when starting early."
          suggestion="Schedule 2-3 morning workout sessions this week."
          status="positive"
          category="exercise"
          tooltipInfo="Based on your activity tracking from the past 3 weeks."
          tags={["Morning Routine", "Exercise"]}
        />
        
        <PatternInsightCard
          insightTitle="Breakfast Improves Diet Quality"
          pattern="You ate breakfast within 1 hour of waking on 4 days."
          result="Your overall nutrition quality was 35% better on days with early breakfast."
          suggestion="Prepare simple breakfast options for 3-4 mornings this week."
          status="cognitive"
          category="nutrition"
          tooltipInfo="This insight combines your meal tracking and energy ratings."
          tags={["Morning Routine", "Nutrition"]}
        />
      </div>
    </>
  );
};

export default BehavioralInsightsTab;
