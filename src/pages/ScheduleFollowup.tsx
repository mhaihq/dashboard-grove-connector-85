
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar as CalendarIcon, CheckCircle, Repeat, Check, X, PhoneCall, PhoneMissed, Bell, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addWeeks, subWeeks } from 'date-fns';
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

type AppointmentType = 'Vacation' | 'Education' | 'Sick Leave' | 'Public Holiday';

interface Appointment {
  date: Date;
  time: string;
  status: 'booked' | 'missed';
  recurrenceType?: string;
  recurrenceFrequency?: string;
  type?: AppointmentType;
}

const ScheduleFollowup = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [recurrenceType, setRecurrenceType] = useState<string>("one-time");
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<string>("weekly");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [timeInput, setTimeInput] = useState<string>("");
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [appointmentType, setAppointmentType] = useState<AppointmentType>("Vacation");
  const [activeFilters, setActiveFilters] = useState<AppointmentType[]>(["Vacation", "Education", "Sick Leave", "Public Holiday"]);
  const [viewMode, setViewMode] = useState<'Week' | '2 Weeks'>('Week');
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      date: addDays(currentWeekStart, 1),
      time: '10:00 AM',
      status: 'booked',
      type: 'Vacation'
    },
    {
      date: addDays(currentWeekStart, 2),
      time: '11:00 AM',
      status: 'booked',
      type: 'Education'
    },
    {
      date: addDays(currentWeekStart, 3),
      time: '09:00 AM',
      status: 'booked',
      type: 'Sick Leave'
    },
    {
      date: addDays(currentWeekStart, 4),
      time: '02:00 PM',
      status: 'booked',
      type: 'Public Holiday'
    },
    {
      date: addDays(currentWeekStart, 5),
      time: '03:00 PM',
      status: 'booked',
      type: 'Vacation'
    },
    {
      date: addDays(currentWeekStart, 8),
      time: '10:00 AM',
      status: 'booked',
      type: 'Education'
    },
    {
      date: addDays(currentWeekStart, 9),
      time: '01:00 PM',
      status: 'booked',
      type: 'Public Holiday'
    },
    {
      date: addDays(currentWeekStart, 10),
      time: '11:00 AM',
      status: 'booked',
      type: 'Vacation'
    },
    {
      date: addDays(currentWeekStart, 12),
      time: '10:00 AM',
      status: 'booked',
      type: 'Public Holiday'
    },
    {
      date: addDays(currentWeekStart, 13),
      time: '03:00 PM',
      status: 'booked',
      type: 'Vacation'
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
    
    const newAppointment: Appointment = {
      date: date,
      time: selectedTime,
      status: 'booked',
      recurrenceType: recurrenceType,
      recurrenceFrequency: recurrenceType === 'recurring' ? recurrenceFrequency : undefined,
      type: appointmentType
    };
    
    setAppointments([...appointments, newAppointment]);
    
    const recurrenceMessage = recurrenceType === "recurring" 
      ? ` (${recurrenceFrequency} recurring appointment)`
      : "";
    
    toast({
      title: "Appointment scheduled",
      description: `Your ${appointmentType} has been scheduled for ${format(date, 'MMMM d, yyyy')} at ${selectedTime}${recurrenceMessage}`,
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

  const nextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const prevWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const toggleFilter = (filter: AppointmentType) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const resetAllFilters = () => {
    setActiveFilters(["Vacation", "Education", "Sick Leave", "Public Holiday"]);
  };

  const daysToShow = viewMode === 'Week' ? 7 : 14;
  const currentWeekDays = eachDayOfInterval({
    start: currentWeekStart,
    end: addDays(currentWeekStart, daysToShow - 1)
  });

  const filteredAppointments = appointments.filter(appointment => 
    appointment.type && activeFilters.includes(appointment.type)
  );

  const filterColors = {
    'Vacation': 'bg-green-100 text-green-800 border-green-200',
    'Education': 'bg-pink-100 text-pink-800 border-pink-200',
    'Sick Leave': 'bg-amber-100 text-amber-800 border-amber-200',
    'Public Holiday': 'bg-purple-100 text-purple-800 border-purple-200'
  };

  const getAppointmentTypeColor = (type: AppointmentType) => {
    switch(type) {
      case 'Vacation': return 'bg-green-100 border-green-200';
      case 'Education': return 'bg-pink-100 border-pink-200';
      case 'Sick Leave': return 'bg-amber-100 border-amber-200';
      case 'Public Holiday': return 'bg-purple-100 border-purple-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 ml-[70px] transition-all duration-300">
        <DashboardHeader 
          userName={userName} 
          userEmail={userEmail}
        />
        
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Schedule Follow-up</h1>
              <div className="flex items-center gap-3">
                <ToggleGroup 
                  type="single" 
                  value={viewMode} 
                  onValueChange={(value) => {
                    if (value) setViewMode(value as 'Week' | '2 Weeks');
                  }}
                  className="border rounded-md"
                >
                  <ToggleGroupItem value="Week" className="px-4">Week</ToggleGroupItem>
                  <ToggleGroupItem value="2 Weeks" className="px-4">2 Weeks</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            
            <Card className="shadow-sm mb-6">
              <CardHeader className="pb-0">
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={prevWeek}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={nextWeek}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="text-lg font-medium">
                      {format(currentWeekStart, 'MMMM d')} — {format(addDays(currentWeekStart, daysToShow - 1), 'MMMM d, yyyy')}
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2 md:mt-0">
                    <div className="flex flex-wrap gap-2 mr-3">
                      {(["Vacation", "Education", "Sick Leave", "Public Holiday"] as AppointmentType[]).map((filter) => (
                        <Button
                          key={filter}
                          variant="outline"
                          size="sm"
                          onClick={() => toggleFilter(filter)}
                          className={cn(
                            "border rounded-full px-3 py-1 text-xs font-medium",
                            activeFilters.includes(filter) ? filterColors[filter] : "bg-white text-gray-500"
                          )}
                        >
                          {activeFilters.includes(filter) && <span className="mr-1">•</span>}
                          {filter}
                          {activeFilters.includes(filter) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Button>
                      ))}
                      {activeFilters.length > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearAllFilters}
                          className="border rounded-full px-3 py-1 text-xs font-medium bg-white text-gray-500"
                        >
                          Clear all
                        </Button>
                      )}
                      {activeFilters.length === 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetAllFilters}
                          className="border rounded-full px-3 py-1 text-xs font-medium bg-white text-gray-500"
                        >
                          Show all
                        </Button>
                      )}
                    </div>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Filter className="h-4 w-4" />
                          Add filter
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 p-2">
                        <div className="space-y-2">
                          {(["Vacation", "Education", "Sick Leave", "Public Holiday"] as AppointmentType[]).map((filter) => (
                            <div key={filter} className="flex items-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleFilter(filter)}
                                className="w-full justify-start text-sm"
                              >
                                <input
                                  type="checkbox"
                                  checked={activeFilters.includes(filter)}
                                  onChange={() => {}}
                                  className="mr-2"
                                />
                                {filter}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-4">
                <div className="rounded-lg border overflow-hidden">
                  {/* Day headers */}
                  <div className="grid grid-cols-7 border-b bg-gray-50 text-sm font-medium text-gray-500">
                    {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day, i) => (
                      <div key={day} className={cn(
                        "py-2 text-center", 
                        i < 5 ? "border-r" : ""
                      )}>
                        {i+1} {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar grid */}
                  <div className={cn(
                    "grid",
                    viewMode === 'Week' ? "grid-cols-7" : "grid-cols-7"
                  )}>
                    {currentWeekDays.slice(0, 7).map((day, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "min-h-[150px] p-1 border-b border-r relative",
                          isSameDay(day, new Date()) && "bg-blue-50"
                        )}
                        onClick={() => handleDateSelect(day)}
                      >
                        <div className="sticky top-0 bg-white/90 backdrop-blur-sm z-10 mb-1">
                          <span className="text-xs text-gray-500">
                            {format(day, 'd')}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {filteredAppointments
                            .filter(a => isSameDay(a.date, day))
                            .map((appointment, idx) => (
                              <div 
                                key={idx}
                                className={cn(
                                  "text-xs p-1 rounded-md border cursor-pointer",
                                  appointment.type && getAppointmentTypeColor(appointment.type)
                                )}
                              >
                                <div className="font-medium">
                                  {appointment.type}
                                </div>
                                <div className="text-gray-600">{appointment.time}</div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {viewMode === '2 Weeks' && (
                    <div className="grid grid-cols-7">
                      {currentWeekDays.slice(7, 14).map((day, i) => (
                        <div 
                          key={i+7}
                          className={cn(
                            "min-h-[150px] p-1 border-b border-r relative",
                            isSameDay(day, new Date()) && "bg-blue-50"
                          )}
                          onClick={() => handleDateSelect(day)}
                        >
                          <div className="sticky top-0 bg-white/90 backdrop-blur-sm z-10 mb-1">
                            <span className="text-xs text-gray-500">
                              {format(day, 'd')}
                            </span>
                          </div>
                          <div className="space-y-1">
                            {filteredAppointments
                              .filter(a => isSameDay(a.date, day))
                              .map((appointment, idx) => (
                                <div 
                                  key={idx}
                                  className={cn(
                                    "text-xs p-1 rounded-md border cursor-pointer",
                                    appointment.type && getAppointmentTypeColor(appointment.type)
                                  )}
                                >
                                  <div className="font-medium">
                                    {appointment.type}
                                  </div>
                                  <div className="text-gray-600">{appointment.time}</div>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-center pt-0">
                <Button
                  onClick={() => {
                    setDate(new Date());
                    setIsModalOpen(true);
                  }}
                  className="bg-hana-green hover:bg-hana-green/90 text-white"
                >
                  Schedule New Appointment
                </Button>
              </CardFooter>
            </Card>
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
            <DialogTitle className="text-xl">New Appointment</DialogTitle>
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
                <label className="text-sm font-medium">Appointment Type</label>
              </div>
              <div className="flex">
                <Select 
                  value={appointmentType} 
                  onValueChange={(value: AppointmentType) => setAppointmentType(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vacation">Vacation</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                    <SelectItem value="Public Holiday">Public Holiday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
