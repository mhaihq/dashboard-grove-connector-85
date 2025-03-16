
import React from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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
          <Avatar className="w-8 h-8">
            <AvatarImage 
              src="https://media.licdn.com/dms/image/v2/D4E03AQEF64y0nluvpw/profile-displayphoto-shrink_800_800/B4EZSgI1mgHcAc-/0/1737853459711?e=1747872000&v=beta&t=3713WkmjpsNYWB0H9Qxg7HrdB3RTyK5bZuLfj-EccRo" 
              alt={userName} 
            />
            <AvatarFallback className="bg-hana-green text-white">
              {userName.charAt(0)}
            </AvatarFallback>
          </Avatar>
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
