
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ArrowRight, MessageCircle, PhoneCall } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CallTypeSelectorProps {
  onSelect: (type: string) => void;
  selectedType: string | null;
}

export const CallTypeSelector: React.FC<CallTypeSelectorProps> = ({ 
  onSelect,
  selectedType
}) => {
  const handleSelect = (value: string) => {
    onSelect(value);
    
    toast({
      title: `${getCallTypeTitle(value)} selected`,
      description: `You've chosen to ${getCallTypeDescription(value)}`,
    });
  };
  
  const getCallTypeTitle = (type: string): string => {
    switch(type) {
      case "comprehensive":
        return "Comprehensive Screening";
      case "followup":
        return "Follow-up Call";
      case "talk":
        return "Just Talk";
      default:
        return "";
    }
  };
  
  const getCallTypeDescription = (type: string): string => {
    switch(type) {
      case "comprehensive":
        return "have a thorough mental health assessment";
      case "followup":
        return "discuss your progress and next steps";
      case "talk":
        return "have an open conversation about what's on your mind";
      default:
        return "";
    }
  };
  
  return (
    <Card className="mb-8 shadow-sm animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-hana-green" />
          <CardTitle className="text-hana-green">Get a Call</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Select what type of call you need:</p>
        
        <Tabs defaultValue={selectedType || undefined} onValueChange={handleSelect} className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="comprehensive" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Comprehensive</span>
            </TabsTrigger>
            <TabsTrigger value="followup" className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              <span>Follow-up</span>
            </TabsTrigger>
            <TabsTrigger value="talk" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>Just Talk</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {selectedType && (
          <div className="mt-4 p-4 bg-hana-lightGreen rounded-md text-gray-700">
            <h3 className="font-medium flex items-center gap-2">
              {selectedType === "comprehensive" && <Search className="h-4 w-4 text-hana-green" />}
              {selectedType === "followup" && <ArrowRight className="h-4 w-4 text-hana-green" />}
              {selectedType === "talk" && <MessageCircle className="h-4 w-4 text-hana-green" />}
              {getCallTypeTitle(selectedType)}
            </h3>
            <p className="text-sm mt-1">{getCallTypeDescription(selectedType)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
