import { useRef, useEffect, useMemo } from 'react';

import { NATIONAL_REPORT_CARD, NATIONAL_REPORT_CARD_LANDING } from 'router';

import { LAYER_VARIANTS } from 'constants/biodiversity-layers-constants';
import { NRC_STEPS, PRIORITY_STEPS } from 'constants/onboarding-constants';
import { getCountryNames } from 'constants/translation-constants';
import { LOCAL_SCENE_TABS_SLUGS } from 'constants/ui-params';

import uiStyles from 'styles/ui.module.scss';

const { REACT_APP_FEATURE_NEW_NRC_PAGE } = process.env;

export const useOnboardingTooltipRefs = ({
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
      onboardingType === 'national-report-cards' &&
      onboardingStep === REACT_APP_FEATURE_NEW_NRC_PAGE
        ? 5
        : 3,
    ranking:
      onboardingType === 'national-report-cards' &&
      onboardingStep === REACT_APP_FEATURE_NEW_NRC_PAGE
        ? 3
        : 4,
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
  localSceneActiveTab,
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

      const nrcActiveTab = {
        [NRC_STEPS.overview]: LOCAL_SCENE_TABS_SLUGS.OVERVIEW,
        [NRC_STEPS.challenges]: LOCAL_SCENE_TABS_SLUGS.CHALLENGES,
        [NRC_STEPS.ranking]: LOCAL_SCENE_TABS_SLUGS.RANKING,
      }[onboardingStep];

      // Go to NRC page and open tab
      if (
        !REACT_APP_FEATURE_NEW_NRC_PAGE &&
        [NRC_STEPS.overview, NRC_STEPS.challenges, NRC_STEPS.ranking].includes(
          onboardingStep
        ) &&
        localSceneActiveTab !== nrcActiveTab
      ) {
        browsePage({
          type: NATIONAL_REPORT_CARD,
          payload: { iso: countryISO || DEFAULT_ISO, view: nrcActiveTab },
        });
        changeUI({
          onboardingType,
          onboardingStep,
          waitingInteraction,
        });
      }

      // Set NRC page sidebar view position
      if (
        REACT_APP_FEATURE_NEW_NRC_PAGE &&
        [NRC_STEPS.challenges, NRC_STEPS.ranking].includes(onboardingStep)
      ) {
        browsePage({
          type: NATIONAL_REPORT_CARD,
          payload: { iso: countryISO || DEFAULT_ISO },
        });
        changeUI({
          onboardingType,
          onboardingStep,
          waitingInteraction,
          fullRanking: NRC_STEPS.ranking === onboardingStep,
        });

        // Scroll to show section
        if (NRC_STEPS.challenges === onboardingStep) {
          const challengesElement = document.getElementById(
            'nrc-challenges-header'
          );

          if (challengesElement) {
            challengesElement.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
            });
          }
        }
      }
    }
  }, [onboardingStep, setOpen, waitingInteraction, onboardingType]);
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
