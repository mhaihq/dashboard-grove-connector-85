
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WalkthroughStep, WalkthroughPage } from '@/types/walkthrough';
import { walkthroughData } from '@/data/walkthroughData';
import { toast } from '@/hooks/use-toast';

interface WalkthroughContextType {
  isActive: boolean;
  currentPage: WalkthroughPage | null;
  currentStep: WalkthroughStep | null;
  startWalkthrough: () => void;
  endWalkthrough: () => void;
  nextStep: () => void;
  previousStep: () => void;
  progress: number; // Progress percentage (0-100)
}

const WalkthroughContext = createContext<WalkthroughContextType | undefined>(undefined);

export const WalkthroughProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Calculate the current page based on the route
  const getCurrentPageFromRoute = (): number => {
    const index = walkthroughData.findIndex(page => page.path === location.pathname);
    return index >= 0 ? index : 0;
  };

  // Update the current page when the route changes
  useEffect(() => {
    if (isActive) {
      const pageIndex = getCurrentPageFromRoute();
      setCurrentPageIndex(pageIndex);
      setCurrentStepIndex(0); // Reset to first step when changing pages
    }
  }, [location.pathname, isActive]);

  // Calculate total steps across all pages
  const totalSteps = walkthroughData.reduce((total, page) => total + page.steps.length, 0);
  
  // Calculate current step number overall
  const currentStepNumber = walkthroughData
    .slice(0, currentPageIndex)
    .reduce((total, page) => total + page.steps.length, 0) + currentStepIndex + 1;
  
  // Calculate progress percentage
  const progress = Math.round((currentStepNumber / totalSteps) * 100);

  const startWalkthrough = () => {
    const pageIndex = getCurrentPageFromRoute();
    setCurrentPageIndex(pageIndex);
    setCurrentStepIndex(0);
    setIsActive(true);
    
    toast({
      title: "Walkthrough Started",
      description: "Welcome to the guided tour of your dashboard!",
    });
  };

  const endWalkthrough = () => {
    setIsActive(false);
    toast({
      title: "Walkthrough Completed",
      description: "You can start it again anytime from the help menu.",
    });
  };

  const nextStep = () => {
    const currentPage = walkthroughData[currentPageIndex];
    
    // If there are more steps in the current page
    if (currentStepIndex < currentPage.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } 
    // If there are more pages
    else if (currentPageIndex < walkthroughData.length - 1) {
      const nextPage = walkthroughData[currentPageIndex + 1];
      navigate(nextPage.path);
      setCurrentPageIndex(currentPageIndex + 1);
      setCurrentStepIndex(0);
    } 
    // End of walkthrough
    else {
      endWalkthrough();
    }
  };

  const previousStep = () => {
    // If there are previous steps in the current page
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } 
    // If there are previous pages
    else if (currentPageIndex > 0) {
      const prevPage = walkthroughData[currentPageIndex - 1];
      const prevPageStepsCount = prevPage.steps.length;
      
      navigate(prevPage.path);
      setCurrentPageIndex(currentPageIndex - 1);
      setCurrentStepIndex(prevPageStepsCount - 1);
    }
  };

  const currentPage = isActive ? walkthroughData[currentPageIndex] || null : null;
  const currentStep = isActive && currentPage ? currentPage.steps[currentStepIndex] || null : null;

  return (
    <WalkthroughContext.Provider
      value={{
        isActive,
        currentPage,
        currentStep,
        startWalkthrough,
        endWalkthrough,
        nextStep,
        previousStep,
        progress
      }}
    >
      {children}
    </WalkthroughContext.Provider>
  );
};

export const useWalkthrough = () => {
  const context = useContext(WalkthroughContext);
  
  if (context === undefined) {
    throw new Error('useWalkthrough must be used within a WalkthroughProvider');
  }
  
  return context;
};
