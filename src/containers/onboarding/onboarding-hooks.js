import { useRef, useEffect, useMemo } from 'react';

export const useTooltipRefs = ({ changeUI, onboardingType, onboardingStep }) => {
  const activeConditions = {
    biodiversity: onboardingType === 'priority-places' && onboardingStep === 0, // priority tab
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

export const useOpenSection = ({ section, setOpen, onboardingStep, waitingInteraction }) => {
  const sections = {
    priority: [1,2,3],
    protection: [4],
    humanPressures: [5],
  };
  const waitingInteractionsClose = {
    priority: [3],
    protection: [4],
  };
  const stepsToOpen = sections[section];
  const waitingInteractionClose = waitingInteractionsClose[section];

  useEffect(() => {
    if (waitingInteraction && waitingInteractionClose && waitingInteractionClose.includes(onboardingStep)) {
      setOpen(false);
    } else if (stepsToOpen.includes(onboardingStep)) {
      setOpen(true);
    }
  }, [onboardingStep, setOpen, waitingInteraction]);
}

export const getOnboardingProps = ({ section, slug, styles, changeUI, onboardingStep, onboardingType, waitingInteraction }) => {
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
    onboardingStep === 4;
  const rankingOnBoardingTab =
    slug === 'ranking' &&
    onboardingType === 'national-report-cards' &&
    onboardingStep === 5;

    return {
      biodiversity: {
        overlay: {
          animate: {
            outline: onboardingStep === 0 && '5px solid #00BDB5',
          },
          transition: {
            duration: 1.75,
            repeat: Infinity,
          },
        },
        className: {
          [styles.onboardingOverlay]: !(
            onboardingStep === 0 ||
            onboardingStep === 1 ||
            onboardingStep === 2
          ),
        },
        onClick: {
          onClick: () =>
            changeUI({ onboardingStep: 1, waitingInteraction: false }),
        },
      },
      humanPressures: {
        overlay: {
          animate: {
            outline: onboardingStep === 4 ? '5px solid #00BDB5' : 'none',
          },
          transition: {
            duration: 1.75,
            repeat: Infinity,
          }
        },
        className: {
          [styles.onboardingOverlay]: !onboardingStep === 4,
        },
        onClick: onboardingStep === 4 && {
          onClick: () =>
            changeUI({ onboardingStep: 5, waitingInteraction: false }),
        },
      },
      protection: {
        overlay: {
          animate: {
            outline: onboardingStep === 3 && '5px solid #00BDB5',
          },
          transition: {
            duration: 1.75,
            repeat: Infinity,
          },
        },
        className: {
          [styles.onboardingOverlay]:
            !onboardingStep === 4,
          [styles.onboardingMode]: onboardingStep === 4,
        },
        onClick: onboardingStep === 3 && {
          onClick: () =>
            changeUI({ onboardingStep: 4, waitingInteraction: false }),
        },
      },
      tabs: {
        overlay: {
         animate: {
            outline:
              richnessonboardingStep ||
              rarityOnBoardingTab ||
              challengesOnBoardingTab ||
              rankingOnBoardingTab
                ? '5px solid #00BDB5'
                : 'none',
          },
          transition: {
            duration: 1.75,
            repeat: Infinity,
          }
        }
      }
    }[section];
  };
