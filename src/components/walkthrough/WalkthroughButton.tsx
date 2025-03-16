
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWalkthrough } from '@/context/WalkthroughContext';

export const WalkthroughButton: React.FC = () => {
  const { startWalkthrough, isActive } = useWalkthrough();
  
  return (
    <Button
      variant="ghost"
      size="sm"
      className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      onClick={startWalkthrough}
      disabled={isActive}
      title="Start Walkthrough"
    >
      <HelpCircle className="w-5 h-5" />
    </Button>
  );
};

export default WalkthroughButton;
