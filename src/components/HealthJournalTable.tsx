
import React, { useState } from 'react';
import { JournalEntryType } from '@/types/journal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Heart, Moon, Award, Target, Filter, Search, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HealthJournalTableProps {
  journalEntries: JournalEntryType[];
  onViewEntry: (entry: JournalEntryType) => void;
}

export const HealthJournalTable: React.FC<HealthJournalTableProps> = ({ 
  journalEntries,
  onViewEntry
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'daily':
        return <Heart className="w-4 h-4 text-pink-500" />;
      case 'mood':
        return <Award className="w-4 h-4 text-amber-500" />;
      case 'sleep':
        return <Moon className="w-4 h-4 text-indigo-500" />;
      case 'achievement':
        return <Award className="w-4 h-4 text-green-500" />;
      case 'goals':
        return <Target className="w-4 h-4 text-blue-500" />;
      default:
        return <Heart className="w-4 h-4 text-pink-500" />;
    }
  };
  
  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'daily':
        return 'Daily Reflection';
      case 'mood':
        return 'Mood & Energy';
      case 'sleep':
        return 'Sleep';
      case 'achievement':
        return 'Achievements';
      case 'goals':
        return 'Goals';
      default:
        return 'Daily Reflection';
    }
  };
  
  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || entry.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 flex items-center gap-2 w-full md:w-auto">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search journal entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="daily">Daily Reflection</SelectItem>
                <SelectItem value="mood">Mood & Energy</SelectItem>
                <SelectItem value="sleep">Sleep</SelectItem>
                <SelectItem value="achievement">Achievements</SelectItem>
                <SelectItem value="goals">Goals</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-[40%]">Title</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <TableRow key={entry.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{entry.date}</span>
                      <span className="text-xs text-gray-500">{entry.timestamp}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(entry.category)}
                      <span>{getCategoryLabel(entry.category)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-left">
                    <div className="line-clamp-1 font-medium">{entry.title}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewEntry(entry)}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No journal entries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HealthJournalTable;
