
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ArrowRight, MessageCircle, PhoneCall, Flag, FlagOff, Clipboard, Shield } from 'lucide-react';
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
        return "Coaching Follow-up";
      case "talk":
        return "Check-in Conversation";
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
    <Card className="mb-8 shadow-sm animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-hana-green" />
          <CardTitle className="text-hana-green">Health Coaching Call</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Select the purpose of your coaching call:</p>
        
        <Tabs defaultValue={selectedType || undefined} onValueChange={handleSelect} className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="comprehensive" className="flex items-center gap-2">
              <Clipboard className="h-4 w-4" />
              <span>Assessment</span>
            </TabsTrigger>
            <TabsTrigger value="followup" className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              <span>Follow-up</span>
            </TabsTrigger>
            <TabsTrigger value="talk" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>Quick Check-in</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {selectedType && (
          <div className="mt-4 p-4 bg-hana-lightGreen rounded-md text-gray-700">
            <h3 className="font-medium flex items-center gap-2">
              {selectedType === "comprehensive" && <Clipboard className="h-4 w-4 text-hana-green" />}
              {selectedType === "followup" && <ArrowRight className="h-4 w-4 text-hana-green" />}
              {selectedType === "talk" && <MessageCircle className="h-4 w-4 text-hana-green" />}
              {getCallTypeTitle(selectedType)}
            </h3>
            <p className="text-sm mt-1">{getCallTypeDescription(selectedType)}</p>
            
            <div className="mt-3 pt-3 border-t border-green-100">
              <h4 className="text-xs font-medium text-gray-600 mb-2">This call will cover:</h4>
              <ul className="text-xs space-y-1">
                {getCallTypeDetails(selectedType).map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-hana-green mt-1.5"></div>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Patient Phone Number</Label>
            <Input 
              id="phoneNumber"
              type="tel" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleCallNow} 
              className="flex-1 bg-hana-green hover:bg-hana-green/90 text-white"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Start Coaching Call
            </Button>
            
            <Button
              variant="outline"
              onClick={toggleFlag}
              className={`${isFlagged ? 'bg-amber-50 border-amber-400' : ''}`}
              title={isFlagged ? "Unmark this call for special follow-up" : "Mark this call for special follow-up"}
            >
              {isFlagged ? (
                <Flag className="h-4 w-4 text-amber-500" />
              ) : (
                <FlagOff className="h-4 w-4" />
              )}
              <span className="sr-only">{isFlagged ? 'Flagged' : 'Flag Call'}</span>
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-2">
            <Shield className="h-3 w-3" />
            <span>All calls are secure, confidential, and comply with healthcare regulations</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
