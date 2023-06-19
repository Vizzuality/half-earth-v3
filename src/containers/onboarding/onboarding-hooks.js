import { useRef, useEffect, useMemo } from 'react';

import { NATIONAL_REPORT_CARD, NATIONAL_REPORT_CARD_LANDING } from 'router';

import { LAYER_VARIANTS } from 'constants/biodiversity-layers-constants';
import { NRC_STEPS, PRIORITY_STEPS } from 'constants/onboarding-constants';
import { getCountryNames } from 'constants/translation-constants';

import uiStyles from 'styles/ui.module.scss';

// Add the onboarding tooltip refs for the tooltip position so the user can see where to click on the interaction steps
export const useOnboardingTooltipRefs = ({
  changeUI,
  onboardingType,
  onboardingStep,
}) => {
  const activeConditions = {
    biodiversity:
      onboardingType === 'priority-places' &&
      onboardingStep === PRIORITY_STEPS.intro, // priority tab
    richness:
      onboardingType === 'priority-places' &&
      onboardingStep === PRIORITY_STEPS.priority,
    rarity:
      onboardingType === 'priority-places' &&
      onboardingStep === PRIORITY_STEPS.richness,
    protection:
      onboardingType === 'priority-places' &&
      onboardingStep === PRIORITY_STEPS.rarity,
    humanPressures:
      onboardingType === 'priority-places' &&
      onboardingStep === PRIORITY_STEPS.protection,
    nrcLandingSidebar:
      onboardingType === 'national-report-cards' &&
      onboardingStep === NRC_STEPS.intro,
    nrcLandingSearch:
      onboardingType === 'national-report-cards' &&
      onboardingStep === PRIORITY_STEPS.spi,
    // This tooltip wil be positioned on the country-entry-tooltip-component
    nrcLandingButton: false,
    challenges:
      onboardingType === 'national-report-cards' &&
      onboardingStep === PRIORITY_STEPS.challenges,
    ranking:
      onboardingType === 'national-report-cards' &&
      onboardingStep === PRIORITY_STEPS.ranking,
    closure:
      onboardingType === 'national-report-cards' &&
      onboardingStep === PRIORITY_STEPS.fullRanking,
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

// Redirects, opens and closes sections and tabs
// when we change the onboarding step via the normal flow or clicking on the arc steps
export const useOnboardingOpenSection = ({
  section,
  setOpen,
  onboardingStep,
  onboardingType,
  waitingInteraction,
  changeUI,
  changeGlobe,
  browsePage,
  locationRoute,
  countryISO,
  countryName,
}) => {
  useEffect(() => {
    if (onboardingType === 'priority-places') {
      const stepsToOpen = {
        priority: [
          PRIORITY_STEPS.priority,
          PRIORITY_STEPS.richness,
          PRIORITY_STEPS.rarity,
        ],
        protection: [PRIORITY_STEPS.protection],
        humanPressures: [PRIORITY_STEPS.humanPressures],
      }[section];

      // When we arrive on the waiting for interaction close the prior section
      const waitingInteractionClose = {
        priority: [PRIORITY_STEPS.rarity],
        protection: [PRIORITY_STEPS.protection],
      }[section];

      if (
        (waitingInteraction &&
          waitingInteractionClose &&
          waitingInteractionClose.includes(onboardingStep)) ||
        !stepsToOpen.includes(onboardingStep)
      ) {
        setOpen(false);
      } else {
        setOpen(true);
      }
      // Biodiversity tabs change
      const stepsToBiodiversityLayerVariants = {
        [PRIORITY_STEPS.priority]: LAYER_VARIANTS.PRIORITY,
        [PRIORITY_STEPS.richness]: LAYER_VARIANTS.RICHNESS,
        [PRIORITY_STEPS.rarity]: LAYER_VARIANTS.RARITY,
      };

      // Change biodiversity tabs
      const biodiversityLayerVariantToOpen =
        stepsToBiodiversityLayerVariants[onboardingStep];
      if (biodiversityLayerVariantToOpen) {
        changeUI({
          biodiversityLayerVariant: biodiversityLayerVariantToOpen,
        });
      }
    }

    if (onboardingType === 'national-report-cards') {
      const DEFAULT_ISO = 'BRA';
      const DEFAULT_COUNTRY_NAME = 'Brazil';

      // Go to NRC landing page
      if (
        locationRoute !== NATIONAL_REPORT_CARD_LANDING &&
        [
          NRC_STEPS.intro,
          NRC_STEPS.spi,
          NRC_STEPS.nrc,
          NRC_STEPS.closure,
        ].includes(onboardingStep)
      ) {
        browsePage({
          type: NATIONAL_REPORT_CARD_LANDING,
        });
        changeUI({
          onboardingType,
          onboardingStep,
          waitingInteraction,
        });
      }

      // Open country tooltip
      if (onboardingStep === NRC_STEPS.nrc) {
        const countryNames = getCountryNames();
        changeGlobe({
          countryTooltipDisplayFor: countryISO || DEFAULT_ISO,
          countryName: countryISO
            ? countryNames[countryName]
            : countryNames[DEFAULT_COUNTRY_NAME],
        });
      }

      // Set NRC page sidebar view position
      if (
        [
          NRC_STEPS.overview,
          NRC_STEPS.challenges,
          NRC_STEPS.ranking,
          NRC_STEPS.fullRanking,
        ].includes(onboardingStep)
      ) {
        if (locationRoute !== NATIONAL_REPORT_CARD) {
          browsePage({
            type: NATIONAL_REPORT_CARD,
            payload: { iso: countryISO || DEFAULT_ISO },
          });

          changeUI({
            onboardingType,
            onboardingStep,
            waitingInteraction,
            ...(onboardingStep === NRC_STEPS.ranking
              ? { fullRanking: false }
              : {}),
            ...(onboardingStep === NRC_STEPS.fullRanking
              ? { fullRanking: true }
              : {}),
          });
        } else if (onboardingStep === NRC_STEPS.ranking) {
          changeUI({
            fullRanking: false,
          });
        } else if (onboardingStep === NRC_STEPS.fullRanking) {
          changeUI({
            fullRanking: true,
          });
        }

        // Scroll to show section: This is currently on NRC content component
      }
    }
  }, [onboardingStep, setOpen, waitingInteraction, onboardingType]);
};

// Adds styling and interaction to the different onboarding steps
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

  const richnessOnboardingStep =
    slug === 'richness' &&
    onboardingType === 'priority-places' &&
    onboardingStep === PRIORITY_STEPS.priority;
  const rarityOnBoardingTab =
    slug === 'rarity' &&
    onboardingType === 'priority-places' &&
    onboardingStep === PRIORITY_STEPS.richness;
  const challengesOnBoardingTab =
    slug === 'challenges' &&
    onboardingType === 'national-report-cards' &&
    onboardingStep === PRIORITY_STEPS.rarity;
  const rankingOnBoardingTab =
    slug === 'ranking' &&
    onboardingType === 'national-report-cards' &&
    onboardingStep === PRIORITY_STEPS.challenges;

  const isTabActiveStep =
    richnessOnboardingStep ||
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

  const goToNextStep = (currentStep) => {
    return (
      onboardingStep === currentStep && {
        onClick: () =>
          changeUI({
            onboardingStep: currentStep + 1,
            waitingInteraction: false,
          }),
      }
    );
  };
  return {
    biodiversity: {
      overlay: {
        animate: {
          outline: getOutline(PRIORITY_STEPS.intro),
        },
        transition,
      },
      className: {
        [styles.onboardingOverlay]: !(
          onboardingStep === PRIORITY_STEPS.intro ||
          onboardingStep === 1 ||
          onboardingStep === 2
        ),
        [uiStyles.allowClick]: onboardingStep === PRIORITY_STEPS.intro,
      },
      onClick: goToNextStep(PRIORITY_STEPS.intro),
    },
    humanPressures: {
      overlay: {
        animate: {
          outline: getOutline(PRIORITY_STEPS.protection),
        },
        transition,
      },
      className: {
        [styles.onboardingOverlay]:
          !onboardingStep === PRIORITY_STEPS.protection,
        [uiStyles.allowClick]: onboardingStep === PRIORITY_STEPS.protection,
      },
      onClick: goToNextStep(PRIORITY_STEPS.protection),
    },
    protection: {
      overlay: {
        animate: {
          outline: getOutline(PRIORITY_STEPS.rarity),
        },
        transition,
      },
      className: {
        [styles.onboardingOverlay]:
          !onboardingStep === PRIORITY_STEPS.protection,
        [styles.onboardingMode]: onboardingStep === PRIORITY_STEPS.protection,
        [uiStyles.allowClick]: onboardingStep === PRIORITY_STEPS.rarity,
      },
      onClick: goToNextStep(PRIORITY_STEPS.rarity),
    },
    nrcLandingSidebar: {
      overlay: {
        animate: {
          outline: getOutline(NRC_STEPS.intro),
        },
        transition,
      },
      onClick: goToNextStep(NRC_STEPS.intro),
    },
    searchNRC: {
      overlay: {
        animate: {
          outline: getOutline(NRC_STEPS.spi),
        },
        transition,
      },
    },
    exploreNRC: {
      overlay: {
        animate: {
          outline: getOutline(NRC_STEPS.nrc),
        },
        transition,
      },
    },
    ranking: {
      overlay: {
        animate: {
          outline: getOutline(NRC_STEPS.ranking),
        },
        transition,
      },
      className: {
        [uiStyles.allowClick]: onboardingStep === NRC_STEPS.ranking,
      },
      onClick: goToNextStep(NRC_STEPS.ranking),
    },
    closure: {
      overlay: {
        animate: {
          outline: getOutline(NRC_STEPS.fullRanking),
        },
        transition,
      },
      className: {
        [uiStyles.allowClick]: onboardingStep === NRC_STEPS.fullRanking,
      },
      onClick: goToNextStep(NRC_STEPS.fullRanking),
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
