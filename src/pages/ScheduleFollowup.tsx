
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar as CalendarIcon, CheckCircle, Repeat, Check, X } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

const ScheduleFollowup = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [recurrenceType, setRecurrenceType] = useState<string>("one-time");
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<string>("weekly");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [timeInput, setTimeInput] = useState<string>("");
  
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
    setIsModalOpen(false);
  };

  const handleDateClick = (selectedDate: Date) => {
    setDate(selectedDate);
    setIsModalOpen(true);
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
                      onSelect={handleDateClick}
                      disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))}
                      className="rounded-md border pointer-events-auto"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Appointment Information</CardTitle>
                  <CardDescription>Your scheduled follow-up details</CardDescription>
                </CardHeader>
                <CardContent>
                  {date ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-gray-500" />
                        <span className="text-lg font-medium">{format(date, 'MMMM d, yyyy')}</span>
                      </div>
                      
                      {selectedTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-gray-500" />
                          <span className="text-lg font-medium">{selectedTime}</span>
                        </div>
                      )}
                      
                      {recurrenceType === "recurring" && (
                        <div className="flex items-center gap-2">
                          <Repeat className="h-5 w-5 text-gray-500" />
                          <span className="text-lg font-medium">Recurring {recurrenceFrequency}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CalendarIcon className="mx-auto h-12 w-12 opacity-30 mb-3" />
                      <p>Please select a date to schedule your follow-up</p>
                    </div>
                  )}
                </CardContent>
                {date && (
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => {
                      setDate(undefined);
                      setSelectedTime(null);
                    }}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => setIsModalOpen(true)}
                      className="bg-hana-green hover:bg-hana-green/90 text-white"
                    >
                      {selectedTime ? 'Edit Appointment' : 'Schedule Appointment'}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="absolute right-4 top-4">
            <Button 
              variant="ghost" 
              className="h-6 w-6 p-0" 
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <DialogHeader>
            <DialogTitle className="text-xl">New Event</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-gray-500" />
                <label className="text-sm font-medium">Date</label>
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 p-2"
                  value={date ? format(date, 'dd/MM/yyyy') : ''}
                  readOnly
                />
                <Button className="ml-1 p-2" variant="outline" onClick={() => setIsModalOpen(false)}>
                  <CalendarIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-gray-500" />
                <label className="text-sm font-medium">Start Time</label>
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="--:--"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="ml-1 p-2" variant="outline">
                      <Clock className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {availableTimes.map((time) => (
                      <DropdownMenuItem 
                        key={time}
                        onClick={() => {
                          setSelectedTime(time);
                          setTimeInput(time);
                        }}
                      >
                        {time}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="pl-7 text-sm text-gray-500">(15 min duration)</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Repeat className="mr-2 h-5 w-5 text-gray-500" />
                <label className="text-sm font-medium">Repeat</label>
              </div>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <button
                  className={cn(
                    "w-full px-4 py-2 text-left flex items-center justify-between",
                    recurrenceType === "one-time" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                  )}
                  onClick={() => setRecurrenceType("one-time")}
                >
                  <span>One-time</span>
                  {recurrenceType === "one-time" && <Check className="h-4 w-4" />}
                </button>
                <button
                  className={cn(
                    "w-full px-4 py-2 text-left flex items-center justify-between border-t border-gray-200",
                    recurrenceType === "recurring" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                  )}
                  onClick={() => setRecurrenceType("recurring")}
                >
                  <span>Recurring</span>
                  {recurrenceType === "recurring" && <Check className="h-4 w-4" />}
                </button>
              </div>
              
              {recurrenceType === "recurring" && (
                <div className="pl-7 pt-2">
                  <Select value={recurrenceFrequency} onValueChange={setRecurrenceFrequency}>
                    <SelectTrigger className="w-full">
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
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              className="bg-green-700 hover:bg-green-800 text-white"
              onClick={handleSchedule}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleFollowup;
