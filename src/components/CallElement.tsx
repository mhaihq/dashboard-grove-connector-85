
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneCall, Calendar, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CallElementProps {
  userName?: string;
}

export const CallElement: React.FC<CallElementProps> = ({ userName }) => {
  const [phoneNumber, setPhoneNumber] = useState("+353877433002");
  const [selectedCallType, setSelectedCallType] = useState<string | null>("assessment");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showCallbackSection, setShowCallbackSection] = useState(true);
  
  const availableTimes = [
    '9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'
  ];
  
  const handleCallNow = () => {
    if (!selectedCallType) {
      toast({
        title: "Please select a call type",
        description: "Choose the type of call you need before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Initiating call",
      description: `Voice calling ${phoneNumber} for a ${getCallTypeTitle(selectedCallType).toLowerCase()} call.`,
    });
  };
  
  const getCallTypeTitle = (type: string): string => {
    switch(type) {
      case "assessment":
        return "Assessment";
      case "followup":
        return "Follow-up";
      case "checkin":
        return "Quick Check-in";
      default:
        return "";
    }
  };
  
  const handleScheduleCallback = () => {
    if (!phoneNumber || !selectedTime) {
      toast({
        title: "Missing information",
        description: "Please enter your phone number and select a time",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Callback scheduled",
      description: `We'll call you at ${phoneNumber} at ${selectedTime} tomorrow`,
    });
    
    setSelectedTime(null);
  };
  
  return (
    <div className="space-y-6">
      {/* Health Coaching Call Section */}
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-hana-green mb-4">
            <PhoneCall className="w-5 h-5 mr-2" />
            <h2 className="text-xl font-medium">Health Coaching Call</h2>
          </div>
          
          <p className="text-gray-600 mb-5 text-center">
            Select the purpose of your coaching call:
          </p>
          
          <Tabs 
            value={selectedCallType || undefined} 
            onValueChange={setSelectedCallType}
            className="w-full mb-6"
          >
            <TabsList className="grid grid-cols-3 w-full bg-gray-100 p-1 rounded-full">
              <TabsTrigger 
                value="assessment" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-full py-3"
              >
                <div className="flex items-center gap-2 justify-center">
                  <span>Assessment</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="followup" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-full py-3"
              >
                <div className="flex items-center gap-2 justify-center">
                  <span>Follow-up</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="checkin" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-full py-3"
              >
                <div className="flex items-center gap-2 justify-center">
                  <span>Quick Check-in</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="block text-center font-medium text-gray-700">
                Patient Phone Number
              </label>
              <Input 
                id="phoneNumber"
                type="tel" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-center py-3 border-gray-200"
              />
            </div>
            
            <Button 
              onClick={handleCallNow} 
              className="w-full bg-hana-green hover:bg-hana-green/90 text-white py-6 rounded-lg"
            >
              <PhoneCall className="mr-2 h-5 w-5" />
              Start Coaching Call
            </Button>
            
            <div className="flex items-center justify-center text-gray-500 text-sm">
              <Shield className="h-4 w-4 mr-2" />
              <span>All calls are secure, confidential, and comply with healthcare regulations</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Schedule a Callback Section */}
      {showCallbackSection && (
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
                        <span className="mr-2">🇺🇸</span>
                        <span>+1</span>
                      </span>
                    </button>
                  </div>
                  <Input
                    placeholder="Enter your phone number"
                    className="rounded-l-none w-full border-gray-200"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-center font-medium text-gray-700">
                  Select a Time for Tomorrow
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`${
                        selectedTime === time 
                          ? "bg-hana-green hover:bg-hana-green/90" 
                          : "border-hana-green text-hana-green bg-white hover:bg-hana-lightGreen"
                      } whitespace-nowrap`}
                      onClick={() => setSelectedTime(time)}
                    >
                      <Calendar className="mr-2 h-4 w-4 sm:hidden md:block" />
                      {time}
                    </Button>
                  ))}
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
      )}
    </div>
  );
};
