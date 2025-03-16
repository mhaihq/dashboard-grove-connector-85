
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Home, Calendar, BarChart3, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Intake Report', path: '/intake-report' },
    { icon: Calendar, label: 'Schedule Followup', path: '/schedule-followup' },
    { icon: FileText, label: 'Health Journal', path: '/followup-report' },
  ];

  // Expand sidebar when hovering
  const handleMouseEnter = () => {
    if (isCollapsed) {
      setIsHovering(true);
    }
  };

  // Collapse sidebar when not hovering
  const handleMouseLeave = () => {
    if (isCollapsed) {
      setIsHovering(false);
    }
  };

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    // Reset hover state when explicitly toggling
    setIsHovering(false);
  };

  // Determine if sidebar should be expanded
  const showExpanded = !isCollapsed || isHovering;
  
  // Calculate width for main content adjustment
  const sidebarWidth = showExpanded ? "240px" : "70px";

  return (
    <div 
      className={cn(
        "h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-10 transition-all duration-300",
        showExpanded ? "w-[240px]" : "w-[70px]"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: sidebarWidth }}
    >
      <div className={cn(
        "p-4 border-b border-gray-100 flex items-center justify-center"
      )}>
        <img 
          src="https://cdn.prod.website-files.com/66d8df543029dd65661ce227/67ac8c50f043cf48b1a2116d_logoHana-p-500.png" 
          alt="Hana Logo" 
          className={cn(
            "object-contain transition-all duration-300",
            showExpanded ? "h-10" : "h-8"
          )}
        />
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-hidden">
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
              {showExpanded && (
                <span className="transition-opacity duration-300">{item.label}</span>
              )}
              {showExpanded && item.label === 'Health Journal' && (
                <div className="ml-auto">
                  <div className="w-1.5 h-1.5 bg-hana-green rounded-full"></div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-100 flex justify-between items-center">
        <div className={cn(
          "text-xs text-gray-500 transition-opacity",
          showExpanded ? "opacity-100" : "opacity-0"
        )}>v1.0.0</div>
        <button 
          onClick={toggleSidebar} 
          className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? 
            <ChevronRight className="w-4 h-4" /> : 
            <ChevronLeft className="w-4 h-4" />
          }
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
