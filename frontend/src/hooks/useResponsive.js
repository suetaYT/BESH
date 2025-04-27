import { useState, useEffect } from 'react';

/**
 * Custom hook to detect viewport size and provide responsive breakpoints
 * @returns {Object} Object containing isMobile, isTablet, isDesktop boolean flags
 */
const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect is only run on mount and unmount
  
  // Define breakpoints
  const isMobile = windowWidth < 576;
  const isTablet = windowWidth >= 576 && windowWidth < 992;
  const isDesktop = windowWidth >= 992;
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    windowWidth
  };
};

export default useResponsive; 