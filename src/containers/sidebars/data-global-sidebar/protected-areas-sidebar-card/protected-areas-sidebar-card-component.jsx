import React, { useState } from 'react';
import cx from 'classnames';
import { WDPALayers, TEXTS } from 'constants/protected-areas';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import CategoryBox from 'components/category-box';
import LayerToggle from 'components/layer-toggle';
import SourceAnnotation from 'components/source-annotation';
import styles from './protected-areas-sidebar-card-styles.module.scss';
import hrTheme from 'styles/themes/hr-theme.module.scss';
import ExistingProtectionThumbnail from 'images/existing-protection.png';
import { PROTECTION_SLUG } from 'constants/analyze-areas-constants';
const protectedAreas = LAYERS_CATEGORIES.PROTECTION;

const ProtectedAreasSidebarCardComponent = ({
  map,
  source,
  activeLayers,
  handleLayerToggle,
  countedActiveLayers,
}) => {
  const [isOpen, setOpen] = useState(false)
  const handleBoxClick = () => setOpen(!isOpen);
  return (
    <div className={cx(styles.sidebarCardContainer, { [styles.open]: isOpen })}>
      <CategoryBox
        image={ExistingProtectionThumbnail}
        title={TEXTS.categoryTitle}
        counter={countedActiveLayers[protectedAreas]}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div
        className={cx(styles.layersTogglesContainer, { [styles.open]: isOpen })}
      >
        <span className={styles.description}>{TEXTS.description}</span>
        <hr className={hrTheme.dark}/>
        <span className={styles.layersTitle}>{TEXTS.layersTitle}</span>
        <div className={styles.togglesContainer}>
          {WDPALayers.map(layer => (
            <LayerToggle
              map={map}
              option={layer}
              type='checkbox'
              variant='light'
              key={layer.value}
              activeLayers={activeLayers}
              onChange={handleLayerToggle}
              toggleCategory={PROTECTION_SLUG}
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

export default ProtectedAreasSidebarCardComponent;
