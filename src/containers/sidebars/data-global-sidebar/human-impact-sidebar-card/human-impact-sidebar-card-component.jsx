import React, { useState } from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import CategoryBox from 'components/category-box';
import LayerToggle from 'components/layer-toggle';
import Legend from 'containers/sidebars/sidebar-legend';
import SourceAnnotation from 'components/source-annotation';
import { LAND_HUMAN_PRESSURES_SLUG, MARINE_HUMAN_PRESSURES_SLUG } from 'constants/legend-configs';
import { humanPressuresLandUse, humanPressuresMarine, TEXTS } from 'constants/human-pressures';
import styles from './human-impact-sidebar-card-styles.module.scss'
import HumanPressuresThumbnail from "images/human-pressures.png";

import checkboxTheme from 'styles/themes/checkboxes-theme.module.scss';
import hrTheme from 'styles/themes/hr-theme.module.scss';
const humanImpact = LAYERS_CATEGORIES.LAND_PRESSURES;

const HumanImpactSidebarCardComponent = ({
  map,
  source,
  activeLayers,
  selectedLayers,
  handleLayerToggle,
  countedActiveLayers,
}) => {

  const [isOpen, setOpen] = useState(false)
  const handleBoxClick = () => setOpen(!isOpen);
  return (
    <div className={cx(styles.sidebarCardContainer, { [styles.open]: isOpen })}>
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
      <hr className={hrTheme.dark}/>
      <span className={styles.layersTitle}>{TEXTS.terrestrialLayersTitle}</span>
      <Legend legendItem={LAND_HUMAN_PRESSURES_SLUG} className={styles.legendContainer}/>
      <div className={styles.togglesContainer}>
        {humanPressuresLandUse.map(layer => (
          <LayerToggle
            key={layer.value}
            map={map}
            option={layer}
            type='checkbox'
            activeLayers={activeLayers}
            optionsSelected={selectedLayers}
            theme={checkboxTheme.landPressures}
            onChange={handleLayerToggle}
          />
        ))}
      </div>
      <hr className={hrTheme.dark}/>
      <span className={styles.layersTitle}>{TEXTS.marineLayersTitle}</span>
      <Legend legendItem={MARINE_HUMAN_PRESSURES_SLUG} className={styles.legendContainer}/>
      <div className={styles.togglesContainer}>
        {humanPressuresMarine.map(layer => (
          <LayerToggle
            key={layer.value}
            map={map}
            option={layer}
            type='checkbox'
            activeLayers={activeLayers}
            theme={checkboxTheme.marinePressures}
            optionsSelected={selectedLayers}
            onChange={handleLayerToggle}
          />
        ))}
      </div>
      <SourceAnnotation
        theme='light'
        metaDataSources={source}
        className={styles.sourceContainer}
      />
      </div>
    </div>
  );
}

export default HumanImpactSidebarCardComponent;