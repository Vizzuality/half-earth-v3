// Dependencies
import React, { useState } from 'react';
import cx from 'classnames';
import { motion } from 'framer-motion';
// Components
import CategoryBox from 'components/category-box';
import LayerToggle from 'components/layer-toggle';
import SourceAnnotation from 'components/source-annotation';
// Constants
import {
  WDPALayers,
  conserveNextLayers,
  TEXTS,
} from 'constants/protected-areas';
import {
  PROTECTION_SLUG,
  FUTURE_PLACES_SLUG,
} from 'constants/analyze-areas-constants';
// Hooks
import {
  useTooltipRefs,
  getOnboardingProps,
  useOpenSection,
} from 'containers/onboarding/onboarding-hooks';
// Styles
import styles from './protected-areas-sidebar-card-styles.module.scss';
import hrTheme from 'styles/themes/hr-theme.module.scss';
// Assets
import ProtectionThumbnail from 'images/existing-protection.png';

const ProtectedAreasSidebarCardComponent = ({
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
}) => {
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
        title={TEXTS.categoryTitle}
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
        <span className={styles.description}>{TEXTS.description}</span>
        <hr className={hrTheme.dark} />
        <span className={styles.layersTitle}>{TEXTS.layersTitle}</span>
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
        <span className={styles.layersTitle}>Where to conserve next</span>
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
};

export default ProtectedAreasSidebarCardComponent;
