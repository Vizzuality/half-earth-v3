import React, { useState, useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import {
  useOnboardingTooltipRefs,
  getOnboardingProps,
  useOnboardingOpenSection,
} from 'containers/onboarding/onboarding-hooks';

import CategoryBox from 'components/category-box';
import LayerToggle from 'components/layer-toggle';
import SourceAnnotation from 'components/source-annotation';

import {
  PROTECTION_SLUG,
  FUTURE_PLACES_SLUG,
} from 'constants/analyze-areas-constants';
import {
  getWDPALayers,
  getConserveNextLayers,
} from 'constants/protected-areas';

import hrTheme from 'styles/themes/hr-theme.module.scss';
import uiStyles from 'styles/ui.module.scss';

import ProtectionThumbnail from 'images/existing-protection.png';

import styles from './protected-areas-sidebar-card-styles.module.scss';

function ProtectedAreasSidebarCardComponent({
  map,
  source,
  activeLayers,
  className,
  handleLayerToggle,
  countedActiveLayers,
  onboardingStep,
  onboardingType,
  waitingInteraction,
  changeUI,
  showProgress,
}) {
  const t = useT();
  const locale = useLocale();

  const WDPALayers = useMemo(() => getWDPALayers(), [locale]);
  const conserveNextLayers = useMemo(() => getConserveNextLayers(), [locale]);

  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);

  // --- Onboarding

  const tooltipRefs = useOnboardingTooltipRefs({
    changeUI,
    onboardingType,
    onboardingStep,
  });

  useOnboardingOpenSection({
    section: 'protection',
    setOpen,
    onboardingStep,
    onboardingType,
    waitingInteraction,
    changeUI,
  });

  const {
    overlay: onboardingOverlay,
    onClick: onboardingOnClick,
    className: onboardingClassName,
  } = getOnboardingProps({
    section: 'protection',
    styles,
    changeUI,
    onboardingType,
    onboardingStep,
    waitingInteraction,
  });

  // ---

  const texts = {
    categoryTitle: t('Protection'),
    layersTitle: t('Conservation areas'),
    description: t(
      'Global protections classified according to their management objectives.'
    ),
  };

  return (
    <motion.div
      ref={(ref) => {
        tooltipRefs.current.protection = ref;
      }}
      className={cx(styles.sidebarCardContainer, className, {
        [styles.open]: isOpen,
        ...onboardingClassName,
      })}
      {...onboardingOverlay}
      {...onboardingOnClick}
    >
      <CategoryBox
        image={ProtectionThumbnail}
        title={texts.categoryTitle}
        counter={countedActiveLayers}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div
        className={cx(styles.layersTogglesContainer, {
          [styles.open]: isOpen,
          [uiStyles.onboardingDisableInteraction]: onboardingStep === 3,
        })}
      >
        <span className={styles.description}>{texts.description}</span>
        <hr className={hrTheme.dark} />
        <span className={styles.layersTitle}>{texts.layersTitle}</span>
        <div className={styles.togglesContainer}>
          {WDPALayers.map((layer) => (
            <LayerToggle
              map={map}
              option={layer}
              type="checkbox"
              variant="light"
              key={layer.value}
              activeLayers={activeLayers}
              onChange={handleLayerToggle}
              themeCategorySlug={PROTECTION_SLUG}
            />
          ))}
        </div>
        <hr className={hrTheme.dark} />
        <span className={styles.layersTitle}>
          {t('Where additional conservation is needed')}
        </span>
        <div className={styles.togglesContainer}>
          {conserveNextLayers.map((layer) => (
            <LayerToggle
              map={map}
              option={layer}
              type="checkbox"
              variant="light"
              key={layer.value}
              showProgress={showProgress}
              activeLayers={activeLayers}
              onChange={handleLayerToggle}
              themeCategorySlug={FUTURE_PLACES_SLUG}
            />
          ))}
        </div>
        <SourceAnnotation
          theme="light"
          metaDataSources={source}
          className={styles.sourceContainer}
        />
      </div>
    </motion.div>
  );
}

export default ProtectedAreasSidebarCardComponent;
