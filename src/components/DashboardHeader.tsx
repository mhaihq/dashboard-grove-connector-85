
import React from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  userName: string;
  userEmail?: string;
  userImage?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  userEmail,
  userImage,
}) => {
  return (
    <header className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white animate-fade-in">
      <div className="text-xl font-semibold text-gray-900">
        Dashboard
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 cursor-pointer">
          <Globe className="w-4 h-4" />
          <span>English</span>
          <ChevronDown className="w-3 h-3" />
        </div>
        
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden",
            userImage ? "" : "bg-hana-green text-white"
          )}>
            {userImage ? (
              <img src={userImage} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <span className="font-semibold">{userName.charAt(0)}</span>
            )}
          </div>
          <div>
            <div className="text-sm font-medium">{userName}</div>
            {userEmail && <div className="text-xs text-gray-500">{userEmail}</div>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
