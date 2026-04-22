import { useEffect, useRef } from "react";

export const useInactivityReset = (callback: () => void, timeoutMs: number = 60000) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callback();
    }, timeoutMs);
  };

  useEffect(() => {
    const events = ["mousedown", "mousemove", "keydown", "touchstart", "click"];
    
    // Initial start
    resetTimer();

    const handleActivity = () => {
      resetTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [callback, timeoutMs]);
};
