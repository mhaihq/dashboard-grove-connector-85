
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, PhoneCall, Flag, FlagOff, Clipboard, Shield, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CallTypeSelectorProps {
  onSelect: (type: string) => void;
  selectedType: string | null;
}

export const CallTypeSelector: React.FC<CallTypeSelectorProps> = ({ 
  onSelect,
  selectedType
}) => {
  const [phoneNumber, setPhoneNumber] = useState("+353877433002");
  const [isFlagged, setIsFlagged] = useState(false);
  
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
        return "Initial Health Assessment";
      case "followup":
        return "Follow-up";
      case "talk":
        return "Quick Check-in";
      default:
        return "";
    }
  };
  
  const getCallTypeDescription = (type: string): string => {
    switch(type) {
      case "comprehensive":
        return "complete a thorough health and wellness assessment";
      case "followup":
        return "review progress and adjust health coaching plans";
      case "talk":
        return "have a brief wellness check-in";
      default:
        return "";
    }
  };
  
  const getCallTypeDetails = (type: string): string[] => {
    switch(type) {
      case "comprehensive":
        return [
          "Health history & chronic conditions",
          "Current medications & treatments",
          "Lifestyle & daily routines",
          "Mental wellness baseline",
          "Personal health goals"
        ];
      case "followup":
        return [
          "Progress on recommended actions",
          "Challenges and barriers",
          "Adjustments to health coaching plan",
          "New goals and milestones"
        ];
      case "talk":
        return [
          "Quick wellness check",
          "Address immediate concerns",
          "Provide encouragement",
          "Schedule more detailed follow-up if needed"
        ];
      default:
        return [];
    }
  };
  
  const handleCallNow = () => {
    if (!selectedType) {
      toast({
        title: "Please select a call type",
        description: "Choose the type of call you need before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Initiating call",
      description: `Voice calling ${phoneNumber} for a ${getCallTypeTitle(selectedType).toLowerCase()} call.${isFlagged ? " This call is flagged for follow-up." : ""}`,
    });
    
    console.log(`Voice calling ${phoneNumber} for a ${selectedType} call. Flagged: ${isFlagged}`);
  };
  
  const toggleFlag = () => {
    setIsFlagged(!isFlagged);
    toast({
      title: isFlagged ? "Call unflagged" : "Call flagged",
      description: isFlagged ? "This call will not be saved for follow-up" : "This call will be saved for follow-up",
    });
  };
  
  return (
    <Card className="mb-8 shadow-sm animate-fade-in border-0 rounded-lg">
      <CardHeader className="pb-3 flex items-center">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-hana-green" />
          <CardTitle className="text-hana-green text-2xl">Health Coaching Call</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6 text-center text-lg">Select the purpose of your coaching call:</p>
        
        <Tabs defaultValue={selectedType || undefined} onValueChange={handleSelect} className="w-full">
          <TabsList className="grid grid-cols-3 w-full bg-gray-100 p-1 rounded-full mb-6">
            <TabsTrigger 
              value="comprehensive" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-full py-3 px-4"
            >
              <div className="flex items-center gap-2 justify-center">
                <Clipboard className="h-5 w-5" />
                <span>Assessment</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="followup" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-full py-3 px-4"
            >
              <div className="flex items-center gap-2 justify-center">
                <ArrowRight className="h-5 w-5" />
                <span>Follow-up</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="talk" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-full py-3 px-4"
            >
              <div className="flex items-center gap-2 justify-center">
                <MessageCircle className="h-5 w-5" />
                <span>Quick Check-in</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {selectedType && (
          <div className="my-6 p-6 bg-hana-lightGreen rounded-lg">
            <div className="flex items-start gap-3 mb-2">
              <div className="mt-1">
                {selectedType === "comprehensive" && <Clipboard className="h-5 w-5 text-hana-green" />}
                {selectedType === "followup" && <ArrowRight className="h-5 w-5 text-hana-green" />}
                {selectedType === "talk" && <MessageCircle className="h-5 w-5 text-hana-green" />}
              </div>
              <div>
                <h3 className="font-medium text-xl text-gray-800">{getCallTypeTitle(selectedType)}</h3>
                <p className="text-gray-600 mt-1">{getCallTypeDescription(selectedType)}</p>
              </div>
            </div>
            
            <div className="mt-5 pt-4 border-t border-green-100">
              <h4 className="text-sm font-medium text-gray-700 mb-3 text-center">This call will cover:</h4>
              <ul className="space-y-2">
                {getCallTypeDetails(selectedType).map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-hana-green">•</span>
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        <div className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-center block text-lg font-medium text-gray-700">Patient Phone Number</Label>
            <Input 
              id="phoneNumber"
              type="tel" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              className="text-center py-6 text-lg border-gray-200"
            />
          </div>
          
          <div className="flex gap-4 mt-6">
            <Button 
              onClick={handleCallNow} 
              className="flex-1 bg-hana-green hover:bg-hana-green/90 text-white py-6 rounded-lg"
            >
              <PhoneCall className="mr-3 h-5 w-5" />
              Start Coaching Call
            </Button>
            
            <Button
              variant="outline"
              onClick={toggleFlag}
              className={`${isFlagged ? 'bg-amber-50 border-amber-400' : ''} rounded-lg p-3`}
              title={isFlagged ? "Unmark this call for special follow-up" : "Mark this call for special follow-up"}
            >
              {isFlagged ? (
                <Flag className="h-5 w-5 text-amber-500" />
              ) : (
                <FlagOff className="h-5 w-5" />
              )}
              <span className="sr-only">{isFlagged ? 'Flagged' : 'Flag Call'}</span>
            </Button>
          </div>
          
          <div className="flex items-center justify-center mt-4 text-gray-500 text-sm">
            <Shield className="h-4 w-4 mr-2" />
            <span>All calls are secure, confidential, and comply with healthcare regulations</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
