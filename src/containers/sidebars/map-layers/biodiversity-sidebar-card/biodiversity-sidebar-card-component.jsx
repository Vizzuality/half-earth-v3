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
import {
  getLayersToggleConfig,
  getLayersResolution,
  TERRESTRIAL,
  MARINE,
  getResolutions,
} from 'constants/biodiversity-layers-constants';
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
  handleTabSelection,
  selectedResolutions,
  setSelectedResolutions,
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
  const resolutions = useMemo(() => getResolutions(), [locale]);
  const layersResolution = useMemo(() => getLayersResolution(), [locale]);
  const layersToggleConfig = useMemo(() => getLayersToggleConfig(), [locale]);

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

  const layerTogglesToDisplay = (category) => {
    const resolutionsForSelectedCategory =
      layersToggleConfig[biodiversityLayerVariant][category];
    const layersForSelectedResolution =
      resolutionsForSelectedCategory &&
      resolutionsForSelectedCategory[selectedResolutions[category]];

    if (resolutionsForSelectedCategory && layersForSelectedResolution) {
      const layerAll = layersForSelectedResolution.filter(
        (l) => l.name === 'All'
      );
      const layersStartingWithAll = layersForSelectedResolution
        .filter((l) => l.name.startsWith('All '))
        .sort((a, b) => a.name.localeCompare(b.name));
      const otherLayers = layersForSelectedResolution
        .filter((l) => l.name !== 'All')
        .filter((l) => !l.name.startsWith('All '))
        .sort((a, b) => a.name.localeCompare(b.name));
      const allLayersAlphabetically = layerAll.concat(
        layersStartingWithAll,
        otherLayers
      );

      return allLayersAlphabetically;
    }
    return [];
  };

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
          <BiodiversityLayerToggle
            activeLayers={activeLayers}
            disabled={
              layersResolution[biodiversityLayerVariant][TERRESTRIAL].length < 2
            }
            layers={layerTogglesToDisplay(TERRESTRIAL)}
            map={map}
            onLayerChange={(layer) => handleLayerToggle(layer, TERRESTRIAL)}
            resolutionOptions={
              layersResolution[biodiversityLayerVariant][TERRESTRIAL]
            }
            selectedOption={resolutions[selectedResolutions[TERRESTRIAL]]}
            selectedResolutions={selectedResolutions}
            setSelectedResolutions={setSelectedResolutions}
            speciesType={TERRESTRIAL}
            themeCategorySlug={BIODIVERSITY_SLUG}
            type="radio"
            variant="light"
          />
        </div>
        {layerTogglesToDisplay(MARINE).length && (
          <>
            <hr className={hrTheme.dark} />
            <div className={styles.dropdownContainer}>
              <span className={styles.dropdownLabel}>
                {t('Marine species')}
              </span>
            </div>

            <div className={styles.togglesContainer}>
              <BiodiversityLayerToggle
                activeLayers={activeLayers}
                disabled={
                  layersResolution[biodiversityLayerVariant][MARINE].length < 2
                }
                layers={layerTogglesToDisplay(MARINE)}
                map={map}
                onLayerChange={(layer) => handleLayerToggle(layer, MARINE)}
                resolutionOptions={
                  layersResolution[biodiversityLayerVariant][MARINE]
                }
                selectedOption={
                  layersResolution[biodiversityLayerVariant][MARINE][0]
                }
                selectedResolutions={selectedResolutions}
                setSelectedResolutions={setSelectedResolutions}
                speciesType={MARINE}
                themeCategorySlug={BIODIVERSITY_SLUG}
                type="radio"
                variant="light"
              />
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
