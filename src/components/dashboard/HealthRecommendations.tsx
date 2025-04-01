
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Brain, Heart, Footprints, Clipboard, Shield, Book, Tabs, TabsContent, TabsList, TabsTrigger } from 'lucide-react';
import { ClinicalRecommendation, MedicareProgram } from '@/types/dashboard';
import PersonalRecommendationsTab from '@/components/dashboard/PersonalRecommendationsTab';
import ClinicalGuidelinesTab from '@/components/dashboard/ClinicalGuidelinesTab';

interface HealthRecommendationsProps {
  recommendations: ClinicalRecommendation[];
  medicarePrograms: MedicareProgram[];
  onScheduleCall: () => void;
}

const getIcon = (icon: string) => {
  switch (icon) {
    case "thermometer": return <Calendar className="w-4 h-4 mr-2" />;
    case "brain": return <Brain className="w-4 h-4 mr-2" />;
    case "heart": return <Heart className="w-4 h-4 mr-2" />;
    case "footprints": return <Footprints className="w-4 h-4 mr-2" />;
    case "clipboard": return <Clipboard className="w-4 h-4 mr-2" />;
    case "shield": return <Shield className="w-4 h-4 mr-2" />;
    case "book": return <Book className="w-4 h-4 mr-2" />;
    default: return null;
  }
};

export const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({
  recommendations,
  medicarePrograms,
  onScheduleCall
}) => {
  const [activeTab, setActiveTab] = useState<"personal" | "clinical">("personal");

  const handleRecommendationAction = (recommendation: ClinicalRecommendation) => {
    if (recommendation.actionType === "call") {
      onScheduleCall();
    }
    // Handle other action types as needed
  };

  const switchTab = () => {
    setActiveTab(activeTab === "personal" ? "clinical" : "personal");
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Health Recommendations</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-4">
          <Button
            variant={activeTab === "personal" ? "default" : "ghost"}
            className={`flex-1 ${activeTab === "personal" ? "bg-white shadow-sm" : ""}`}
            onClick={() => setActiveTab("personal")}
          >
            Personal Tips
          </Button>
          <Button
            variant={activeTab === "clinical" ? "default" : "ghost"}
            className={`flex-1 ${activeTab === "clinical" ? "bg-white shadow-sm" : ""}`}
            onClick={() => setActiveTab("clinical")}
          >
            Care Guidelines
          </Button>
        </div>

        {activeTab === "personal" ? (
          <PersonalRecommendationsTab
            recommendations={recommendations}
            onRecommendationAction={handleRecommendationAction}
            onSwitchTab={switchTab}
          />
        ) : (
          <ClinicalGuidelinesTab
            recommendations={recommendations}
            medicarePrograms={medicarePrograms}
            onRecommendationAction={handleRecommendationAction}
            onSwitchTab={switchTab}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default HealthRecommendations;
