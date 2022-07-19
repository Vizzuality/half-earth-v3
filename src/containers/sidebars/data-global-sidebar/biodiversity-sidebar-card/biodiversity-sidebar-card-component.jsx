// Dependencies
import React, { useState, useMemo } from 'react';
import { useLocale } from '@transifex/react';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useT } from '@transifex/react';

// Components
import Dropdown from 'components/dropdown';
import CategoryBox from 'components/category-box';
import LayerToggle from 'components/layer-toggle';
import SourceAnnotation from 'components/source-annotation';
import Tabs from 'components/tabs';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import SidebarCardContent from 'containers/sidebars/sidebar-card-content';
import SidebarLegend from 'containers/sidebars/sidebar-legend';
// Constants
import { getBiodiversityTabs } from 'constants/ui-params';
import { BIODIVERSITY_SLUG } from 'constants/analyze-areas-constants';

import {
  getLayersToggleConfig,
  getLayersResolution,
  TERRESTRIAL,
  MARINE,
  getResolutions,
} from 'constants/biodiversity-layers-constants';
// Hooks
import {
  useTooltipRefs,
  getOnboardingProps,
  useOpenSection,
} from 'containers/onboarding/onboarding-hooks';
// Styles
import styles from './biodiversity-sidebar-card-styles.module.scss';
import hrTheme from 'styles/themes/hr-theme.module.scss';
// Assets
import BiodiversityThumbnail from 'images/biodiversity.png';

const BiodiversitySidebarCardComponent = ({
  activeLayers,
  countedActiveLayers,
  className,
  handleLayerToggle,
  handleCloseCard,
  map,
  handleTabSelection,
  selectedResolution,
  setSelectedResolution,
  biodiversityLayerVariant,
  cardMetadata,
  showCard,
  onboardingStep,
  onboardingType,
  changeUI,
  waitingInteraction,
}) => {
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
    waitingInteraction,
  });
  const layerTogglesToDisplay = (category) => {
    const resolutionsForSelectedCategory =
      layersToggleConfig[biodiversityLayerVariant][category];
    const layersForSelectedResolution =
      resolutionsForSelectedCategory &&
      resolutionsForSelectedCategory[selectedResolution[category]];

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
    } else {
      return [];
    }
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
          <Dropdown
            theme={'dark'}
            parentWidth="170px"
            options={layersResolution[biodiversityLayerVariant][TERRESTRIAL]}
            selectedOption={resolutions[selectedResolution[TERRESTRIAL]]}
            handleOptionSelection={(op) =>
              setSelectedResolution({
                ...selectedResolution,
                [TERRESTRIAL]: op.slug,
              })
            }
            disabled={
              layersResolution[biodiversityLayerVariant][TERRESTRIAL].length < 2
            }
          />
        </div>
        <div className={styles.togglesContainer}>
          {layerTogglesToDisplay(TERRESTRIAL).map((layer) => (
            <LayerToggle
              map={map}
              type="radio"
              option={layer}
              variant="light"
              key={layer.value}
              activeLayers={activeLayers}
              onChange={handleLayerToggle}
              themeCategorySlug={BIODIVERSITY_SLUG}
            />
          ))}
        </div>
        {layerTogglesToDisplay(MARINE).length && (
          <>
            <hr className={hrTheme.dark} />
            <div className={styles.dropdownContainer}>
              <span className={styles.dropdownLabel}>
                {t('Marine species')}
              </span>
              <Dropdown
                theme={'dark'}
                options={layersResolution[biodiversityLayerVariant][MARINE]}
                selectedOption={
                  layersResolution[biodiversityLayerVariant][MARINE][0]
                }
                handleOptionSelection={(op) =>
                  setSelectedResolution({
                    ...selectedResolution,
                    [MARINE]: op.slug,
                  })
                }
                disabled={
                  layersResolution[biodiversityLayerVariant][MARINE].length < 2
                }
              />
            </div>
            <div className={styles.togglesContainer}>
              {layerTogglesToDisplay(MARINE).map((layer) => (
                <LayerToggle
                  map={map}
                  type="radio"
                  option={layer}
                  variant="light"
                  key={layer.value}
                  activeLayers={activeLayers}
                  onChange={handleLayerToggle}
                  themeCategorySlug={BIODIVERSITY_SLUG}
                />
              ))}
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
};

export default BiodiversitySidebarCardComponent;
