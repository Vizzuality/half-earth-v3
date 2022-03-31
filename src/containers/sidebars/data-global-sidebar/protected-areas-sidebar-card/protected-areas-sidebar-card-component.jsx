// Dependencies
import React, { useEffect, useState } from 'react';
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
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import {
  PROTECTION_SLUG,
  FUTURE_PLACES_SLUG,
} from 'constants/analyze-areas-constants';
// Hooks
import { useTooltipRefs } from 'containers/onboarding/onboarding-hooks';
// Styles
import styles from './protected-areas-sidebar-card-styles.module.scss';
import hrTheme from 'styles/themes/hr-theme.module.scss';
// Assets
import ProtectionThumbnail from 'images/existing-protection.png';

const protectedAreas = LAYERS_CATEGORIES.PROTECTION;

const ProtectedAreasSidebarCardComponent = ({
  map,
  source,
  activeLayers,
  className,
  handleLayerToggle,
  countedActiveLayers,
  onboardingStep,
  onboardingType,
  changeUI,
}) => {
  const currentStep = onboardingStep === 3;
  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);

  useEffect(() => {
    currentStep ? setOpen(true) : setOpen(false);
  }, [onboardingStep]);

  const tooltipRefs = useTooltipRefs({
    changeUI,
    onboardingType,
    onboardingStep,
  });

  return (
    <motion.div
      ref={(ref) => {
        tooltipRefs.current.protection = ref;
      }}
      className={cx(styles.sidebarCardContainer, className, {
        [styles.open]: isOpen,
        [styles.onboardingOverlay]:
          !currentStep && typeof onboardingStep === 'number',
      })}
      animate={{
        outline: currentStep ? '5px solid #00BDB5' : 'none',
      }}
      transition={{
        duration: 1.75,
        repeat: Infinity,
      }}
      {...(currentStep && {
        onClick: () =>
          changeUI({ onboardingStep: 4, waitingInteraction: false }),
      })}
    >
      <CategoryBox
        image={ProtectionThumbnail}
        title={TEXTS.categoryTitle}
        counter={countedActiveLayers[protectedAreas]}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div
        className={cx(styles.layersTogglesContainer, {
          [styles.open]: isOpen,
          [styles.onboardingMode]: currentStep,
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
