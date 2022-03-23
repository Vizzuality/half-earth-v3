// Dependencies
import React, { useState } from 'react';
import cx from 'classnames';
import { motion } from 'framer-motion';
// Components
import CategoryBox from 'components/category-box';
import LayerToggle from 'components/layer-toggle';
import SourceAnnotation from 'components/source-annotation';
import SidebarLegend from 'containers/sidebars/sidebar-legend';
// Constants
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import {
  LAND_HUMAN_PRESSURES_SLUG,
  MARINE_HUMAN_PRESSURES_SLUG,
} from 'constants/analyze-areas-constants';
import {
  LAND_HUMAN_PRESSURES,
  MARINE_HUMAN_PRESSURES,
} from 'constants/layers-slugs';
import {
  humanPressuresLandUse,
  humanPressuresMarine,
  TEXTS,
} from 'constants/human-pressures';
// Styles
import styles from './human-impact-sidebar-card-styles.module.scss';
import checkboxTheme from 'styles/themes/checkboxes-theme.module.scss';
import hrTheme from 'styles/themes/hr-theme.module.scss';
// Assets
import HumanPressuresThumbnail from 'images/human-pressures.png';

const humanImpact = LAYERS_CATEGORIES.LAND_PRESSURES;

const HumanImpactSidebarCardComponent = ({
  map,
  source,
  activeLayers,
  className,
  handleLayerToggle,
  countedActiveLayers,
  onBoardingStep,
}) => {
  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);
  const activeLayersTitles = activeLayers.map((l) => l.title);
  const areAllSelected = (layers) =>
    layers.every((l) => activeLayersTitles.includes(l.value));
  const allHumanPressuresSelected = areAllSelected(humanPressuresLandUse);
  const allMarinePressuresSelected = areAllSelected(humanPressuresMarine);

  const currentStep = onBoardingStep === 5;
  return (
    <motion.div
      className={cx(styles.sidebarCardContainer, className, {
        [styles.open]: isOpen,
        [styles.onBoardingOverlay]: !currentStep && typeof onBoardingStep === 'number',
      })}
      animate={{
        outline: currentStep ? '5px solid #00BDB5' : 'none',
      }}
      transition={{
        duration: 1.75,
        repeat: Infinity,
      }}
    >
      <CategoryBox
        title={TEXTS.categoryTitle}
        image={HumanPressuresThumbnail}
        counter={countedActiveLayers[humanImpact]}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div
        className={cx(styles.layersTogglesContainer, { [styles.open]: isOpen })}
      >
        <span className={styles.description}>{TEXTS.description}</span>
        <hr className={hrTheme.dark} />
        <span className={styles.layersTitle}>
          {TEXTS.terrestrialLayersTitle}
        </span>
        <SidebarLegend
          legendItem={LAND_HUMAN_PRESSURES_SLUG}
          className={styles.legendContainer}
        />
        <div className={styles.togglesContainer}>
          {humanPressuresLandUse.map((layer) => (
            <LayerToggle
              map={map}
              option={layer}
              variant="light"
              type="checkbox"
              key={layer.value}
              activeLayers={activeLayers}
              themeCategorySlug={LAND_HUMAN_PRESSURES_SLUG}
              theme={checkboxTheme.landPressures}
              onChange={(option) =>
                handleLayerToggle(option, LAND_HUMAN_PRESSURES)
              }
            />
          ))}
          <button
            className={styles.allButton}
            onClick={() =>
              handleLayerToggle(
                {
                  layer: allHumanPressuresSelected ? 'none' : 'all',
                },
                LAND_HUMAN_PRESSURES
              )
            }
          >
            {allHumanPressuresSelected ? 'Unselect all' : 'Select all'}
          </button>
        </div>
        <hr className={hrTheme.dark} />
        <span className={styles.layersTitle}>{TEXTS.marineLayersTitle}</span>
        <SidebarLegend
          legendItem={MARINE_HUMAN_PRESSURES_SLUG}
          className={styles.legendContainer}
        />
        <div className={styles.togglesContainer}>
          {humanPressuresMarine.map((layer) => (
            <LayerToggle
              key={layer.value}
              map={map}
              option={layer}
              variant="light"
              type="checkbox"
              activeLayers={activeLayers}
              themeCategorySlug={MARINE_HUMAN_PRESSURES_SLUG}
              theme={checkboxTheme.marinePressures}
              onChange={(option) =>
                handleLayerToggle(option, MARINE_HUMAN_PRESSURES)
              }
            />
          ))}
          <button
            className={styles.allButton}
            onClick={() =>
              handleLayerToggle(
                {
                  layer: allMarinePressuresSelected ? 'none' : 'all',
                },
                MARINE_HUMAN_PRESSURES
              )
            }
          >
            {allMarinePressuresSelected ? 'Unselect all' : 'Select all'}
          </button>
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

export default HumanImpactSidebarCardComponent;
