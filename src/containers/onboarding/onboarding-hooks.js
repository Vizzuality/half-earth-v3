import { useRef, useEffect, useMemo } from 'react';

export const useTooltipRefs = ({ changeUI, onboardingType, onboardingStep }) => {
  const activeConditions = {
    biodiversity: onboardingType === 'priority-places' && onboardingStep === 0,
    priority: false,
    richness: onboardingType === 'priority-places' && onboardingStep === 1,
    rarity: onboardingType === 'priority-places' && onboardingStep === 2,
    protection: onboardingType === 'priority-places' && onboardingStep === 3,
    humanPressures:  onboardingType === 'priority-places' && onboardingStep === 4,
    nrcLandingSidebar:
      onboardingType === 'national-report-cards' && onboardingStep === 1,
    nrcLandingSearch:
      onboardingType === 'national-report-cards' && onboardingStep === 2,
    nrcLandingButton: false, // This tooltip wil be positioned on the country-entry-tooltip-component
    challenges:
      onboardingType === 'national-report-cards' && onboardingStep === 4,
    ranking: onboardingType === 'national-report-cards' && onboardingStep === 5,
  };

  const activeSlug = useMemo(() => {
    let activeKey = null;
    Object.entries(activeConditions).some(([key, value]) => {
      if (value) {
        activeKey = key;
        return true;
      }
      return false;
    });
    return activeKey;
  }, [onboardingType, onboardingStep]);

  const onboardingRefs = useRef({});

  useEffect(() => {
    if (activeSlug && onboardingRefs.current[activeSlug]) {
      const { top, width, left } =
        onboardingRefs.current[activeSlug].getBoundingClientRect();
      changeUI({
        onboardingTooltipTop: top,
        onboardingTooltipLeft: left + width,
      });
    }
  }, [onboardingRefs, activeSlug]);
  return onboardingRefs;
}
