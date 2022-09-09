import React, { useState, useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import {
  useTooltipRefs,
  getOnboardingProps,
  useOpenSection,
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
}) {
  const t = useT();
  const locale = useLocale();

  const WDPALayers = useMemo(() => getWDPALayers(), [locale]);
  const conserveNextLayers = useMemo(() => getConserveNextLayers(), [locale]);

  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);

  const tooltipRefs = useTooltipRefs({
    changeUI,
    onboardingType,
    onboardingStep,
  });
  useOpenSection({
    section: 'protection',
    setOpen,
    onboardingStep,
    onboardingType,
    waitingInteraction,
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

  const texts = {
    categoryTitle: t('Protection'),
    layersTitle: t('Conservation areas'),
    description: t(
      'Global protections classified according to their management objectives.',
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
          [styles.onboardingMode]: onboardingStep === 3,
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
