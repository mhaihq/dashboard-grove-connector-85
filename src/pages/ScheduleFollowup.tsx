
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar as CalendarIcon, CheckCircle, Repeat, Check, X, PhoneCall, PhoneMissed, Bell } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CalendarAppointment } from '@/components/CalendarAppointment';

// Define appointment types
interface Appointment {
  date: Date;
  time: string;
  status: 'booked' | 'missed';
  recurrenceType?: string;
  recurrenceFrequency?: string;
}

const ScheduleFollowup = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [recurrenceType, setRecurrenceType] = useState<string>("one-time");
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<string>("weekly");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [timeInput, setTimeInput] = useState<string>("");
  
  // Sample appointments data - in a real app, this would come from an API
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      date: new Date(new Date().setDate(new Date().getDate() - 3)),
      time: '10:00 AM',
      status: 'missed'
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      time: '02:00 PM',
      status: 'booked',
      recurrenceType: 'one-time'
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 14)),
      time: '11:00 AM',
      status: 'booked',
      recurrenceType: 'recurring',
      recurrenceFrequency: 'weekly'
    }
  ]);
  
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
    
    // Add the new appointment to our list
    const newAppointment: Appointment = {
      date: date,
      time: selectedTime,
      status: 'booked',
      recurrenceType: recurrenceType,
      recurrenceFrequency: recurrenceType === 'recurring' ? recurrenceFrequency : undefined
    };
    
    setAppointments([...appointments, newAppointment]);
    
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

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setIsModalOpen(true);
    }
  };

  // Function to render appointments on the calendar
  const renderCalendarContent = (day: Date) => {
    // Filter appointments for this day
    const dayAppointments = appointments.filter(
      app => app.date.getDate() === day.getDate() && 
             app.date.getMonth() === day.getMonth() && 
             app.date.getFullYear() === day.getFullYear()
    );
    
    if (dayAppointments.length === 0) return null;
    
    return (
      <div className="absolute bottom-0 left-0 w-full flex justify-center">
        {dayAppointments.map((appointment, idx) => (
          <div 
            key={idx} 
            className={cn(
              "h-1.5 w-1.5 rounded-full mx-0.5",
              appointment.status === 'booked' ? "bg-green-500" : "bg-red-500"
            )} 
            title={`${appointment.time} - ${appointment.status === 'booked' ? 'Scheduled' : 'Missed'}`}
          />
        ))}
      </div>
    );
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
                  <div className="p-3 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-green-500 mr-1.5"></div>
                          <span className="text-sm text-gray-600">Booked</span>
                        </div>
                        <div className="flex items-center ml-4">
                          <div className="h-3 w-3 rounded-full bg-red-500 mr-1.5"></div>
                          <span className="text-sm text-gray-600">Missed</span>
                        </div>
                      </div>
                    </div>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))}
                      className="rounded-md border pointer-events-auto"
                      components={{
                        DayContent: ({ date: day }) => (
                          <div className="relative w-full h-full flex items-center justify-center">
                            {day.getDate()}
                            {renderCalendarContent(day)}
                          </div>
                        ),
                      }}
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

              <Card className="shadow-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled and past follow-ups</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <PhoneCall className="mx-auto h-12 w-12 opacity-30 mb-3" />
                        <p>No appointments scheduled yet</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {appointments.map((appointment, index) => (
                          <CalendarAppointment
                            key={index}
                            date={appointment.date}
                            time={appointment.time}
                            status={appointment.status}
                            recurrenceType={appointment.recurrenceType}
                            recurrenceFrequency={appointment.recurrenceFrequency}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, 'MMMM d, yyyy') : <span>Select date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))}
                    initialFocus
                    className="rounded-md pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-gray-500" />
                <label className="text-sm font-medium">Start Time</label>
              </div>
              <div className="flex">
                <Select 
                  value={timeInput || undefined} 
                  onValueChange={(value) => {
                    setTimeInput(value);
                    setSelectedTime(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimes.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="pl-7 text-sm text-gray-500">(15 min duration)</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Repeat className="mr-2 h-5 w-5 text-gray-500" />
                <label className="text-sm font-medium">Repeat</label>
              </div>
              <ToggleGroup
                type="single"
                defaultValue="one-time"
                value={recurrenceType}
                onValueChange={(value) => {
                  if (value) setRecurrenceType(value);
                }}
                className="justify-start w-full border rounded-md overflow-hidden"
              >
                <ToggleGroupItem 
                  value="one-time" 
                  className="flex-1 data-[state=on]:bg-blue-500 data-[state=on]:text-white px-4 py-2 border-r"
                >
                  One-time
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="recurring" 
                  className="flex-1 data-[state=on]:bg-blue-500 data-[state=on]:text-white px-4 py-2"
                >
                  Recurring
                </ToggleGroupItem>
              </ToggleGroup>
              
              {recurrenceType === "recurring" && (
                <div className="pt-2">
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
