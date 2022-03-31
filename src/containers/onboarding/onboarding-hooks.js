import { useRef, useEffect } from 'react';

export const useTooltipRef = ({ changeUI, isActive }) => {
  const onboardingRef = useRef();

  useEffect(() => {
    if (onboardingRef.current && isActive) {
      const { top, width, left } =
        onboardingRef.current.getBoundingClientRect();
      changeUI({
        onboardingTooltipTop: top,
        onboardingTooltipLeft: left + width,
      });
    }
  }, [onboardingRef, isActive]);
  return onboardingRef
}