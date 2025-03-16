
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar as CalendarIcon, CheckCircle, Repeat, Check } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ScheduleFollowup = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [recurrenceType, setRecurrenceType] = useState<string>("one-time");
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<string>("weekly");
  
  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];
  
  const handleSchedule = () => {
    if (!date || !selectedTime) {
      toast({
        title: "Missing information",
        description: "Please select both a date and time for your appointment",
        variant: "destructive",
      });
      return;
    }
    
    const recurrenceMessage = recurrenceType === "recurring" 
      ? ` (${recurrenceFrequency} recurring appointment)`
      : "";
    
    toast({
      title: "Appointment scheduled",
      description: `Your follow-up has been scheduled for ${format(date, 'MMMM d, yyyy')} at ${selectedTime}${recurrenceMessage}`,
      action: (
        <Button size="sm" variant="outline" className="gap-1">
          <CheckCircle className="h-4 w-4" />
          View
        </Button>
      ),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px]">
        <DashboardHeader 
          userName={userName} 
          userEmail={userEmail}
        />
        
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Schedule Follow-up</h1>
            
            <Card className="shadow-sm mb-6">
              <CardHeader>
                <CardTitle>Appointment Type</CardTitle>
                <CardDescription>Choose between one-time or recurring appointment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={recurrenceType === "one-time" ? "default" : "outline"}
                    onClick={() => setRecurrenceType("one-time")}
                    className={cn(
                      "flex gap-2 px-4",
                      recurrenceType === "one-time" && "bg-hana-green hover:bg-hana-green/90"
                    )}
                  >
                    <Calendar className="h-4 w-4" />
                    <span>One-time</span>
                    {recurrenceType === "one-time" && <Check className="h-4 w-4 ml-1" />}
                  </Button>
                  <Button
                    variant={recurrenceType === "recurring" ? "default" : "outline"}
                    onClick={() => setRecurrenceType("recurring")}
                    className={cn(
                      "flex gap-2 px-4",
                      recurrenceType === "recurring" && "bg-hana-green hover:bg-hana-green/90"
                    )}
                  >
                    <Repeat className="h-4 w-4" />
                    <span>Recurring</span>
                    {recurrenceType === "recurring" && <Check className="h-4 w-4 ml-1" />}
                  </Button>
                </div>
                
                {recurrenceType === "recurring" && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recurrence Frequency
                    </label>
                    <Select value={recurrenceFrequency} onValueChange={setRecurrenceFrequency}>
                      <SelectTrigger className="w-full sm:w-[250px]">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Select a Date</CardTitle>
                  <CardDescription>Choose your preferred follow-up date</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-3">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))}
                      className="rounded-md border pointer-events-auto"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Select a Time</CardTitle>
                  <CardDescription>Available time slots for {date ? format(date, 'MMMM d, yyyy') : 'your selected date'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {date ? (
                      availableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className={cn(
                            "h-12",
                            selectedTime === time && "border-hana-green bg-hana-lightGreen text-hana-green hover:bg-hana-lightGreen hover:text-hana-green"
                          )}
                          onClick={() => setSelectedTime(time)}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {time}
                        </Button>
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-8 text-gray-500">
                        <CalendarIcon className="mx-auto h-12 w-12 opacity-30 mb-3" />
                        <p>Please select a date first</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="ghost">Cancel</Button>
                  <Button 
                    onClick={handleSchedule}
                    disabled={!date || !selectedTime}
                    className="bg-hana-green hover:bg-hana-green/90 text-white"
                  >
                    Schedule Follow-up
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ScheduleFollowup;
