import React, { useState, useMemo } from 'react';

import { useLocale, useT } from '@transifex/react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import {
  useTooltipRefs,
  getOnboardingProps,
  useOpenSection,
} from 'containers/onboarding/onboarding-hooks';
import SidebarCardContent from 'containers/sidebars/sidebar-card-content';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import SidebarLegend from 'containers/sidebars/sidebar-legend';

import CategoryBox from 'components/category-box';
import SourceAnnotation from 'components/source-annotation';
import Tabs from 'components/tabs';

import { BIODIVERSITY_SLUG } from 'constants/analyze-areas-constants';
import { TERRESTRIAL, MARINE } from 'constants/biodiversity-layers-constants';
import { getBiodiversityTabs } from 'constants/ui-params';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import BiodiversityThumbnail from 'images/biodiversity.png';

import BiodiversityLayerToggle from './biodiversity-layer-toggle';
import styles from './biodiversity-sidebar-card-styles.module.scss';

function BiodiversitySidebarCardComponent({
  activeLayers,
  countedActiveLayers,
  className,
  handleLayerToggle,
  handleCloseCard,
  map,
  layerOptions,
  layersResolutionsOptions,
  handleTabSelection,
  selectedResolutionOptions,
  handleResolutionSelection,
  biodiversityLayerVariant,
  cardMetadata,
  showCard,
  onboardingStep,
  onboardingType,
  changeUI,
  waitingInteraction,
}) {
  const t = useT();
  const locale = useLocale();
  const biodiversityTabs = useMemo(() => getBiodiversityTabs(), [locale]);

  const firstStep = onboardingStep === 0;
  const { title, description, source } = cardMetadata || {};
  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);

  useOpenSection({
    section: 'priority',
    setOpen,
    onboardingStep,
    onboardingType,
    waitingInteraction,
  });

  const tooltipRefs = useTooltipRefs({
    changeUI,
    onboardingType,
    onboardingStep,
  });

  const {
    overlay: onboardingOverlay,
    onClick: onboardingOnClick,
    className: onboardingClassName,
  } = getOnboardingProps({
    section: 'biodiversity',
    styles,
    changeUI,
    onboardingStep,
    waitingInteraction,
  });

  const renderBiodiversityLayerToggle = (category) => {
    const categoryResolutionOptions = layersResolutionsOptions[category];
    const [selectedLayer, setSelectedLayer] = useState(
      layerOptions[category][0]
    );
    return (
      <BiodiversityLayerToggle
        category={category}
        map={map}
        activeLayers={activeLayers}
        layerOptions={layerOptions[category]}
        setSelectedLayer={setSelectedLayer}
        selectedLayer={selectedLayer}
        onLayerChange={(layer) => handleLayerToggle(layer, category)}
        resolutionOptions={categoryResolutionOptions}
        disabledResolutionDropdown={categoryResolutionOptions.length < 2}
        selectedResolutionOption={selectedResolutionOptions[category]}
        handleResolutionSelection={(slug) =>
          handleResolutionSelection(slug, category)
        }
      />
    );
  };

  return (
    <motion.div
      // eslint-disable-next-line no-return-assign
      ref={(ref) => (tooltipRefs.current.biodiversity = ref)}
      className={cx(styles.sidebarCardContainer, className, {
        [styles.open]: isOpen,
        ...onboardingClassName,
      })}
      {...onboardingOverlay}
      {...onboardingOnClick}
    >
      <CategoryBox
        title={t('Biodiversity')}
        image={BiodiversityThumbnail}
        counter={countedActiveLayers}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div
        className={cx(
          styles.layersTogglesContainer,
          styles[`${biodiversityLayerVariant}Tab`],
          {
            [styles.open]: isOpen,
            [styles.onboardingMode]: firstStep,
          }
        )}
      >
        <SidebarLegend
          legendItem={BIODIVERSITY_SLUG}
          className={styles.legendContainer}
        />
        <Tabs
          tabs={biodiversityTabs}
          onClick={handleTabSelection}
          className={styles.tabsContainer}
          defaultTabSlug={biodiversityLayerVariant}
          onboardingStep={onboardingStep}
          onboardingType={onboardingType}
          waitingInteraction={waitingInteraction}
          tabButtonsRef={tooltipRefs}
        />
        {showCard && (
          <div className={styles.cardContainer}>
            <SidebarCardWrapper collapsable dark onClose={handleCloseCard}>
              <SidebarCardContent title={title} description={description} />
            </SidebarCardWrapper>
          </div>
        )}
        <div className={styles.dropdownContainer}>
          <span className={styles.dropdownLabel}>
            {t('Terrestrial species')}
          </span>
        </div>
        <div className={styles.togglesContainer}>
          {renderBiodiversityLayerToggle(TERRESTRIAL)}
        </div>
        {layerOptions[MARINE].length && (
          <>
            <hr className={hrTheme.dark} />
            <div className={styles.dropdownContainer}>
              <span className={styles.dropdownLabel}>
                {t('Marine species')}
              </span>
            </div>

            <div className={styles.togglesContainer}>
              {renderBiodiversityLayerToggle(MARINE)}
            </div>
          </>
        )}
        <SourceAnnotation
          theme="light"
          className={styles.sourceContainer}
          metaDataSources={source}
        />
      </div>
    </motion.div>
  );
}

export default BiodiversitySidebarCardComponent;
