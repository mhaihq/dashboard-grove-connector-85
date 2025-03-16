
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneCall, ClipboardList, Phone, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CallElementProps {
  userName?: string;
}

export const CallElement: React.FC<CallElementProps> = ({ userName }) => {
  const [phoneNumber, setPhoneNumber] = useState("0877433002");
  const [callType, setCallType] = useState<string | null>(null);
  
  const handleScheduleCallback = () => {
    if (!phoneNumber || !callType) {
      toast({
        title: "Missing information",
        description: "Please enter your phone number and select a call type",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Callback scheduled",
      description: `We'll call you at ${phoneNumber} for a ${callType} session`,
    });
    
    setCallType(null);
  };
  
  return (
    <Card className="border-0 shadow-sm bg-mint-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-center text-hana-green mb-2">
          <PhoneCall className="w-5 h-5 mr-2" />
          <h2 className="text-xl font-medium">Schedule a Callback</h2>
        </div>
        
        <p className="text-gray-600 mb-5 text-center">
          Let us reach out to check on your progress
        </p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-center font-medium text-gray-700">
              Phone Number
            </label>
            <div className="flex">
              <div className="relative w-[100px]">
                <button className="flex items-center justify-between w-full border border-r-0 rounded-l-md px-3 py-2 bg-white">
                  <span className="flex items-center">
                    <span className="mr-2">🇮🇪</span>
                    <span>+353</span>
                  </span>
                </button>
              </div>
              <Input
                placeholder="Enter your phone number"
                className="rounded-l-none w-full border-gray-200"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-center font-medium text-gray-700">
              Select Call Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={callType === "Intake" ? "default" : "outline"}
                className={`${
                  callType === "Intake" 
                    ? "bg-hana-green hover:bg-hana-green/90" 
                    : "border-hana-green text-hana-green bg-white hover:bg-hana-lightGreen"
                }`}
                onClick={() => setCallType("Intake")}
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                Intake
              </Button>
              
              <Button
                type="button"
                variant={callType === "Follow Up" ? "default" : "outline"}
                className={`${
                  callType === "Follow Up" 
                    ? "bg-hana-green hover:bg-hana-green/90" 
                    : "border-hana-green text-hana-green bg-white hover:bg-hana-lightGreen"
                }`}
                onClick={() => setCallType("Follow Up")}
              >
                <Phone className="mr-2 h-4 w-4" />
                Follow Up
              </Button>
              
              <Button
                type="button"
                variant={callType === "Just Chat" ? "default" : "outline"}
                className={`${
                  callType === "Just Chat" 
                    ? "bg-hana-green hover:bg-hana-green/90" 
                    : "border-hana-green text-hana-green bg-white hover:bg-hana-lightGreen"
                }`}
                onClick={() => setCallType("Just Chat")}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Just Chat
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={handleScheduleCallback} 
            className="w-full bg-hana-green hover:bg-hana-green/90 text-white"
          >
            <PhoneCall className="mr-2 h-4 w-4" />
            Schedule Callback
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
