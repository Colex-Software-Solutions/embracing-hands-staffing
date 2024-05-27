import React, { useState, useEffect } from "react";

const useWindowSize = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      setIsMobile(window.innerWidth < 600);
      setWindowHeight(window.innerHeight);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return {
    isMobile,
    windowHeight,
  };
};
export default useWindowSize;
