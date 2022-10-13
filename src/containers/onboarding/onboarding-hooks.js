import { useRef, useEffect, useMemo } from 'react';

import uiStyles from 'styles/ui.module.scss';

export const useTooltipRefs = ({
  changeUI,
  onboardingType,
  onboardingStep,
}) => {
  const activeConditions = {
    biodiversity: onboardingType === 'priority-places' && onboardingStep === 0, // priority tab
    richness: onboardingType === 'priority-places' && onboardingStep === 1,
    rarity: onboardingType === 'priority-places' && onboardingStep === 2,
    protection: onboardingType === 'priority-places' && onboardingStep === 3,
    humanPressures:
      onboardingType === 'priority-places' && onboardingStep === 4,
    nrcLandingSidebar:
      onboardingType === 'national-report-cards' && onboardingStep === 0,
    nrcLandingSearch:
      onboardingType === 'national-report-cards' && onboardingStep === 1,
    // This tooltip wil be positioned on the country-entry-tooltip-component
    nrcLandingButton: false,
    challenges:
      onboardingType === 'national-report-cards' && onboardingStep === 3,
    ranking: onboardingType === 'national-report-cards' && onboardingStep === 4,
    closure: onboardingType === 'national-report-cards' && onboardingStep === 5,
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
      const { offsetLeft } = onboardingRefs.current[activeSlug];
      const { top, width } =
        onboardingRefs.current[activeSlug].getBoundingClientRect();
      changeUI({
        onboardingTooltipTop: top,
        onboardingTooltipLeft: offsetLeft + width,
      });
    }
  }, [onboardingRefs.current, activeSlug]);
  return onboardingRefs;
};

export const resetTooltip = (changeUI) => {
  changeUI({
    onboardingTooltipTop: undefined,
    onboardingTooltipLeft: undefined,
  });
};

export const useOpenSection = ({
  section,
  setOpen,
  onboardingStep,
  onboardingType,
  waitingInteraction,
}) => {
  const sections = {
    priority: [1, 2, 3],
    protection: [4],
    humanPressures: [5],
    nrc: [2, 4, 5],
  };
  const waitingInteractionsClose = {
    priority: [3],
    protection: [4],
  };
  const stepsToOpen = sections[section];
  const waitingInteractionClose = waitingInteractionsClose[section];

  useEffect(() => {
    if (
      waitingInteraction &&
      waitingInteractionClose &&
      waitingInteractionClose.includes(onboardingStep)
    ) {
      setOpen(false);
    } else if (stepsToOpen.includes(onboardingStep) && !!onboardingType) {
      setOpen(true);
    }
  }, [onboardingStep, setOpen, waitingInteraction]);
};

export const getOnboardingProps = ({
  section,
  slug,
  styles,
  changeUI,
  onboardingStep,
  onboardingType,
  waitingInteraction,
}) => {
  if (!section || typeof onboardingStep !== 'number' || !waitingInteraction) {
    return {};
  }

  const richnessonboardingStep =
    slug === 'richness' &&
    onboardingType === 'priority-places' &&
    onboardingStep === 1;
  const rarityOnBoardingTab =
    slug === 'rarity' &&
    onboardingType === 'priority-places' &&
    onboardingStep === 2;
  const challengesOnBoardingTab =
    slug === 'challenges' &&
    onboardingType === 'national-report-cards' &&
    onboardingStep === 3;
  const rankingOnBoardingTab =
    slug === 'ranking' &&
    onboardingType === 'national-report-cards' &&
    onboardingStep === 4;

  const isTabActiveStep =
    richnessonboardingStep ||
    rarityOnBoardingTab ||
    challengesOnBoardingTab ||
    rankingOnBoardingTab;
  const outline = '5px solid #00BDB5';
  const transition = {
    duration: 1.75,
    repeat: Infinity,
  };

  const getOutline = (animatedOnboardingStep) =>
    onboardingStep === animatedOnboardingStep && outline;

  return {
    biodiversity: {
      overlay: {
        animate: {
          outline: getOutline(0),
        },
        transition,
      },
      className: {
        [styles.onboardingOverlay]: !(
          onboardingStep === 0 ||
          onboardingStep === 1 ||
          onboardingStep === 2
        ),
        [uiStyles.allowClick]: onboardingStep === 0,
      },
      onClick: {
        onClick: () =>
          changeUI({ onboardingStep: 1, waitingInteraction: false }),
      },
    },

    humanPressures: {
      overlay: {
        animate: {
          outline: getOutline(4),
        },
        transition,
      },
      className: {
        [styles.onboardingOverlay]: !onboardingStep === 4,
        [uiStyles.allowClick]: onboardingStep === 4,
      },
      onClick: onboardingStep === 4 && {
        onClick: () =>
          changeUI({ onboardingStep: 5, waitingInteraction: false }),
      },
    },
    protection: {
      overlay: {
        animate: {
          outline: getOutline(3),
        },
        transition,
      },
      className: {
        [styles.onboardingOverlay]: !onboardingStep === 4,
        [styles.onboardingMode]: onboardingStep === 4,
        [uiStyles.allowClick]: onboardingStep === 3,
      },
      onClick: onboardingStep === 3 && {
        onClick: () =>
          changeUI({ onboardingStep: 4, waitingInteraction: false }),
      },
    },
    nrcLandingSidebar: {
      overlay: {
        animate: {
          outline: getOutline(0),
        },
        transition,
      },
      onClick: {
        onClick: () =>
          onboardingStep === 0 &&
          changeUI({ onboardingStep: 1, waitingInteraction: false }),
      },
    },
    searchNRC: {
      overlay: {
        animate: {
          outline: getOutline(1),
        },
        transition,
      },
    },
    exploreNRC: {
      overlay: {
        animate: {
          outline: getOutline(2),
        },
        transition,
      },
    },
    closure: {
      overlay: {
        animate: {
          outline: getOutline(5),
        },
        transition,
      },
      className: {
        [uiStyles.allowClick]: onboardingStep === 5,
      },
    },
    tabs: {
      overlay: {
        animate: {
          outline: isTabActiveStep ? outline : 'none',
        },
        transition,
      },
      className: {
        [uiStyles.allowClick]: isTabActiveStep,
      },
    },
  }[section];
};
