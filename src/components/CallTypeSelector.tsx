
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ArrowRight, MessageCircle, PhoneCall, Flag, FlagOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [callMethod, setCallMethod] = useState<"voice" | "video">("voice");
  
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
      description: `${callMethod === "video" ? "Video" : "Voice"} calling ${phoneNumber} for a ${getCallTypeTitle(selectedType).toLowerCase()} call.${isFlagged ? " This call is flagged for follow-up." : ""}`,
    });
    
    // In a real application, this would initiate the call
    console.log(`${callMethod} calling ${phoneNumber} for a ${selectedType} call. Flagged: ${isFlagged}`);
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
        
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="callMethod">Call Method</Label>
              <Select value={callMethod} onValueChange={(value: "voice" | "video") => setCallMethod(value)}>
                <SelectTrigger id="callMethod">
                  <SelectValue placeholder="Select call method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="voice">Voice Call</SelectItem>
                  <SelectItem value="video">Video Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input 
                id="phoneNumber"
                type="tel" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleCallNow} 
              className="flex-1 bg-hana-green hover:bg-hana-green/90 text-white"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Call Now
            </Button>
            
            <Button
              variant="outline"
              onClick={toggleFlag}
              className={`${isFlagged ? 'bg-amber-50 border-amber-400' : ''}`}
            >
              {isFlagged ? (
                <Flag className="h-4 w-4 text-amber-500" />
              ) : (
                <FlagOff className="h-4 w-4" />
              )}
              {isFlagged ? 'Flagged' : 'Flag Call'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
