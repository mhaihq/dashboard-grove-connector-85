
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneCall, Calendar, Globe } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CallbackPlannerProps {
  userName: string;
}

// Country codes with flags for the selector
const countryCodes = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
];

export const CallbackPlanner: React.FC<CallbackPlannerProps> = ({ userName }) => {
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const availableTimes = [
    '9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !selectedTime) {
      toast({
        title: "Missing information",
        description: "Please enter your phone number and select a time",
        variant: "destructive",
      });
      return;
    }
    
    const fullPhoneNumber = `${countryCode} ${phoneNumber}`;
    
    // Here you would handle the actual submission
    toast({
      title: "Callback scheduled",
      description: `We'll call you at ${fullPhoneNumber} at ${selectedTime} tomorrow`,
    });
    
    // Reset form
    setPhoneNumber('');
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
              <div className="flex gap-2">
                <div className="w-[130px]">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="bg-white border-input focus-visible:ring-hana-green">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {countryCodes.map((country) => (
                        <SelectItem key={`${country.code}-${country.name}`} value={country.code} className="flex items-center">
                          <span className="mr-2">{country.flag}</span>
                          <span>{country.code}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full border-input focus-visible:ring-hana-green"
                  />
                </div>
              </div>
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
                    className={`${selectedTime === time ? "bg-hana-green hover:bg-hana-green/90" : "border-hana-green text-hana-green hover:bg-hana-lightGreen"} transition-all`}
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
