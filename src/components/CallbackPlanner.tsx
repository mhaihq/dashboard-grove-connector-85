
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneCall, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CallbackPlannerProps {
  userName: string;
}

export const CallbackPlanner: React.FC<CallbackPlannerProps> = ({ userName }) => {
  const [phone, setPhone] = useState('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const availableTimes = [
    '9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || !selectedTime) {
      toast({
        title: "Missing information",
        description: "Please enter your phone number and select a time",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would handle the actual submission
    toast({
      title: "Callback scheduled",
      description: `We'll call you at ${phone} at ${selectedTime} tomorrow`,
    });
    
    // Reset form
    setPhone('');
    setSelectedTime(null);
  };
  
  return (
    <Card className="shadow-sm animate-slide-up mt-8">
      <CardHeader className="bg-hana-lightGreen rounded-t-lg">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-hana-green" />
          <CardTitle className="text-hana-green">Schedule a Callback</CardTitle>
        </div>
        <CardDescription>Let us reach out to check on your progress</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a Time for Tomorrow
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    className={selectedTime === time ? "bg-hana-green hover:bg-hana-green/90" : ""}
                    onClick={() => setSelectedTime(time)}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button 
              type="submit" 
              className="w-full bg-hana-green hover:bg-hana-green/90 text-white"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Schedule Callback
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
