import React, { useState } from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import CategoryBox from 'components/category-box';
import LayerToggle from 'components/layer-toggle';
import Legend from 'components/sidebar-legend';
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
  selectedLayers,
  handleLayerToggle,
  countedActiveLayers,
}) => {

  const [isOpen, setOpen] = useState(false)
  const handleBoxClick = () => setOpen(!isOpen);
  return (
    <div className={styles.sidebarCardContainer}>
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
      {humanPressuresLandUse.map(layer => (
        <LayerToggle
          map={map}
          type='checkbox'
          theme={checkboxTheme.landPressures}
          optionsSelected={selectedLayers}
          option={layer}
          title='my title'
          handleInfoClick={() => console.log('info clicked')}
          onClick={handleLayerToggle}
        />
      ))}
      <hr className={hrTheme.dark}/>
      <span className={styles.layersTitle}>{TEXTS.marineLayersTitle}</span>
      <Legend legendItem={MARINE_HUMAN_PRESSURES_SLUG} className={styles.legendContainer}/>
      {humanPressuresMarine.map(layer => (
        <LayerToggle
          map={map}
          type='checkbox'
          theme={checkboxTheme.marinePressures}
          optionsSelected={selectedLayers}
          option={layer}
          title='my title'
          handleInfoClick={() => console.log('info clicked')}
          onClick={handleLayerToggle}
        />
      ))}
      <SourceAnnotation
        theme='light'
        metaDataSources={source}
      />
      </div>
    </div>
  );
}

export default HumanImpactSidebarCardComponent;