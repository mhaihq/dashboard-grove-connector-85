
import React, { useEffect, useState } from 'react';
import { X, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useWalkthrough } from '@/context/WalkthroughContext';

export const WalkthroughTooltip = () => {
  const { 
    isActive, 
    currentStep, 
    currentPage, 
    nextStep, 
    previousStep, 
    endWalkthrough,
    progress 
  } = useWalkthrough();
  
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'right' | 'bottom' | 'left'>('bottom');

  useEffect(() => {
    if (!isActive || !currentStep) return;

    // Position the tooltip relative to the target element if specified
    if (currentStep.elementId) {
      const targetElement = document.getElementById(currentStep.elementId);
      
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const pos = currentStep.position || 'bottom';
        setTooltipPosition(pos);
        
        // Calculate position based on the specified direction
        switch (pos) {
          case 'top':
            setPosition({
              top: rect.top - 10,
              left: rect.left + rect.width / 2 - 150
            });
            break;
          case 'right':
            setPosition({
              top: rect.top + rect.height / 2 - 100,
              left: rect.right + 10
            });
            break;
          case 'bottom':
            setPosition({
              top: rect.bottom + 10,
              left: rect.left + rect.width / 2 - 150
            });
            break;
          case 'left':
            setPosition({
              top: rect.top + rect.height / 2 - 100,
              left: rect.left - 310
            });
            break;
        }
        
        // Add a highlight to the target element
        targetElement.classList.add('walkthrough-highlight');
        
        return () => {
          targetElement.classList.remove('walkthrough-highlight');
        };
      }
    } else {
      // Center the tooltip if no element is specified
      setPosition({
        top: window.innerHeight / 2 - 100,
        left: window.innerWidth / 2 - 150
      });
      setTooltipPosition('bottom');
    }
  }, [isActive, currentStep]);

  if (!isActive || !currentStep || !currentPage) {
    return null;
  }

  // Calculate the arrow position based on the tooltip position
  const getArrowStyle = () => {
    switch (tooltipPosition) {
      case 'top':
        return { bottom: -8, left: '50%', transform: 'translateX(-50%) rotate(45deg)' };
      case 'right':
        return { left: -8, top: '50%', transform: 'translateY(-50%) rotate(135deg)' };
      case 'bottom':
        return { top: -8, left: '50%', transform: 'translateX(-50%) rotate(225deg)' };
      case 'left':
        return { right: -8, top: '50%', transform: 'translateY(-50%) rotate(315deg)' };
    }
  };

  return (
    <div 
      className="fixed z-50 transition-all duration-300 shadow-lg"
      style={{ 
        top: position.top, 
        left: position.left 
      }}
    >
      <Card className="w-[300px] overflow-visible">
        {/* Tooltip arrow */}
        <div 
          className="absolute w-4 h-4 bg-white border-t border-l border-gray-200"
          style={getArrowStyle()}
        />
        
        <CardHeader className="pb-2 pt-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-semibold">{currentStep.title}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={endWalkthrough}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={progress} className="h-1 mt-2" />
        </CardHeader>
        
        <CardContent className="text-sm text-gray-600 pb-3">
          {currentStep.description}
        </CardContent>
        
        <CardFooter className="pt-0 pb-4 flex justify-between">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={previousStep}
              disabled={currentPage.steps[0].id === currentStep.id && currentPage.path === '/'}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            
            <Button 
              variant="default" 
              size="sm" 
              onClick={nextStep}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={endWalkthrough}
            title="End walkthrough"
          >
            <Home className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WalkthroughTooltip;
