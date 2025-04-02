
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Clock, Calendar as CalendarIcon, CheckCircle, Repeat, Check, X, 
  PhoneCall, PhoneMissed, Bell, ChevronDown, ChevronUp 
} from 'lucide-react';
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CalendarAppointment } from '@/components/CalendarAppointment';
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [viewFilter, setViewFilter] = useState("all");
  
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
  
  const quickTimes = [
    { label: 'Morning', time: '09:00 AM' },
    { label: 'Noon', time: '12:00 PM' },
    { label: 'Afternoon', time: '03:00 PM' },
    { label: 'Evening', time: '05:00 PM' }
  ];
  
  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', 
    '03:00 PM', '04:00 PM', '05:00 PM'
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
    
    const newAppointment: Appointment = {
      date: date,
      time: selectedTime,
      status: 'booked',
      recurrenceType: recurrenceType,
      recurrenceFrequency: recurrenceType === 'recurring' ? recurrenceFrequency : undefined
    };
    
    setAppointments([...appointments, newAppointment]);
    setShowConfirmation(false);
    
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
    
    // Reset form
    setDate(undefined);
    setSelectedTime(null);
    setRecurrenceType("one-time");
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate && !selectedTime) {
      // Auto-select a default time
      setSelectedTime('03:00 PM');
    }
  };
  
  const handleQuickTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (!date) {
      // Set tomorrow as the default date if none selected
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow);
    }
    setShowConfirmation(true);
  };
  
  const handleRescheduleMissed = (missedAppointment: Appointment) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow);
    setSelectedTime(missedAppointment.time);
    setShowConfirmation(true);
  };

  const renderCalendarContent = (day: Date) => {
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
  
  // Filter appointments based on the view filter
  const filteredAppointments = appointments.filter(appointment => {
    const isPast = appointment.date < new Date();
    if (viewFilter === "missed") return appointment.status === "missed";
    if (viewFilter === "upcoming") return !isPast && appointment.status === "booked";
    return true; // "all" filter
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 ml-[70px] transition-all duration-300">
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
                  <CardTitle>Quick Schedule</CardTitle>
                  <CardDescription>Choose a time slot for tomorrow or select a specific date</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {quickTimes.map((quickTime) => (
                      <Button 
                        key={quickTime.time}
                        variant="outline" 
                        className="justify-start hover:bg-blue-50 hover:border-blue-200 transition-colors"
                        onClick={() => handleQuickTimeSelect(quickTime.time)}
                      >
                        <Clock className="mr-2 h-4 w-4 text-blue-500" />
                        <span>{quickTime.label} ({quickTime.time})</span>
                      </Button>
                    ))}
                  </div>
                  
                  <div className="flex items-center mt-4 mb-2">
                    <h3 className="text-md font-medium">Or select a specific date & time</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-auto h-8 px-2" 
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      {isExpanded ? "Less options" : "More options"}
                    </Button>
                  </div>
                  
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
                  
                  {isExpanded && (
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Select Time</label>
                        <Select 
                          value={selectedTime || undefined} 
                          onValueChange={setSelectedTime}
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
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">
                            Make this a recurring appointment
                          </label>
                          <Switch 
                            checked={recurrenceType === "recurring"}
                            onCheckedChange={(checked) => {
                              setRecurrenceType(checked ? "recurring" : "one-time");
                            }}
                          />
                        </div>
                        
                        {recurrenceType === "recurring" && (
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
                        )}
                      </div>
                      
                      <Button 
                        onClick={() => setShowConfirmation(true)} 
                        className="w-full" 
                        disabled={!date || !selectedTime}
                      >
                        Schedule Appointment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Appointment Information</CardTitle>
                  <CardDescription>Your selected follow-up details</CardDescription>
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
                      
                      <div className="mt-6">
                        <Button 
                          onClick={() => setShowConfirmation(true)} 
                          className="w-full bg-green-700 hover:bg-green-800 text-white"
                          disabled={!date || !selectedTime}
                        >
                          Confirm Follow-up
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CalendarIcon className="mx-auto h-12 w-12 opacity-30 mb-3" />
                      <p>Please select a date and time for your follow-up</p>
                      <p className="text-sm mt-2">Or use the Quick Schedule options for faster booking</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-sm lg:col-span-2">
                <CardHeader className="flex flex-row items-center">
                  <div>
                    <CardTitle>Your Appointments</CardTitle>
                    <CardDescription>All scheduled and past follow-ups</CardDescription>
                  </div>
                  <div className="ml-auto">
                    <ToggleGroup 
                      type="single" 
                      value={viewFilter} 
                      onValueChange={(value) => value && setViewFilter(value)}
                      className="border rounded-md"
                    >
                      <ToggleGroupItem value="all" className="text-xs px-3">
                        All
                      </ToggleGroupItem>
                      <ToggleGroupItem value="upcoming" className="text-xs px-3">
                        Upcoming
                      </ToggleGroupItem>
                      <ToggleGroupItem value="missed" className="text-xs px-3">
                        Missed
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredAppointments.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <PhoneCall className="mx-auto h-12 w-12 opacity-30 mb-3" />
                        <p>No appointments in this category</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredAppointments.map((appointment, index) => (
                          <div key={index} className="relative">
                            <CalendarAppointment
                              date={appointment.date}
                              time={appointment.time}
                              status={appointment.status}
                              recurrenceType={appointment.recurrenceType}
                              recurrenceFrequency={appointment.recurrenceFrequency}
                            />
                            {appointment.status === 'missed' && (
                              <div className="absolute top-0 right-0 mt-2 mr-2">
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700 text-white h-8"
                                  onClick={() => handleRescheduleMissed(appointment)}
                                >
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  Reschedule
                                </Button>
                              </div>
                            )}
                          </div>
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

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm your appointment</AlertDialogTitle>
            <AlertDialogDescription>
              {date && selectedTime && (
                <div className="space-y-2 mt-2">
                  <p>You're scheduling a follow-up for:</p>
                  <div className="bg-blue-50 p-4 rounded-md space-y-2">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="font-medium">{format(date, 'MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    {recurrenceType === "recurring" && (
                      <div className="flex items-center">
                        <Repeat className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-medium">Recurring {recurrenceFrequency}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <p className="mt-4">Would you like to confirm this appointment?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleSchedule}
              className="bg-green-700 hover:bg-green-800 text-white"
            >
              Confirm Appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ScheduleFollowup;
