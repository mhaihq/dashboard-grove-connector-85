
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Home, Calendar, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Intake Report', path: '/intake-report' },
    { icon: Calendar, label: 'Schedule Followup', path: '/schedule-followup' },
    { icon: FileText, label: 'Followup Report', path: '/followup-report' },
  ];

  return (
    <div className="w-[240px] h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-10">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-center">
          <img 
            src="https://cdn.prod.website-files.com/66d8df543029dd65661ce227/67ac8c50f043cf48b1a2116d_logoHana-p-500.png" 
            alt="Hana Logo" 
            className="h-10 object-contain" 
          />
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 transition-all duration-300",
                isActive ? "bg-hana-lightGreen text-hana-green font-medium" : "hover:bg-gray-50"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-hana-green" : "text-gray-500")} />
              <span>{item.label}</span>
              {item.label === 'Followup Report' && (
                <div className="ml-auto">
                  <div className="w-1.5 h-1.5 bg-hana-green rounded-full"></div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-100">
        <div className="text-xs text-gray-500">v1.0.0</div>
      </div>
    </div>
  );
};

export default Sidebar;
