import React, { useState } from 'react';
import SourceAnnotation from 'components/source-annotation';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import Tabs from 'components/tabs';
import Dropdown from 'components/dropdown';
import CategoryBox from 'components/category-box';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import SidebarCardContent from 'containers/sidebars/sidebar-card-content';
import LayerToggle from 'components/layer-toggle';
import SidebarLegend from 'containers/sidebars/sidebar-legend';
import { BIODIVERSITY_TABS } from 'constants/ui-params';
import { BIODIVERSITY_SLUG } from 'constants/analyze-areas-constants';
import {
  LAYERS_TOGGLE_CONFIG,
  LAYERS_RESOLUTION,
  TERRESTRIAL,
  MARINE,
  RESOLUTIONS,
} from 'constants/biodiversity-layers-constants';
import styles from './biodiversity-sidebar-card-styles.module.scss';
import hrTheme from 'styles/themes/hr-theme.module.scss';

import BiodiversityThumbnail from 'images/biodiversity.png';

const BiodiversitySidebarCardComponent = ({
  activeLayers,
  countedActiveLayers,
  handleLayerToggle,
  handleCloseCard,
  map,
  handleTabSelection,
  selectedResolution,
  setSelectedResolution,
  biodiversityLayerVariant,
  cardMetadata,
  showCard,
}) => {
  const { title, description, source } = cardMetadata || {};
  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);

  const layerTogglesToDisplay = (category) => {
    const resolutionsForSelectedCategory =
      LAYERS_TOGGLE_CONFIG[biodiversityLayerVariant][category];
    const layersForSelectedResolution =
      resolutionsForSelectedCategory &&
      resolutionsForSelectedCategory[selectedResolution[category]];
    if (resolutionsForSelectedCategory && layersForSelectedResolution) {
      return layersForSelectedResolution;
    } else {
      return [];
    }
  };

  return (
    <div className={cx(styles.sidebarCardContainer, { [styles.open]: isOpen })}>
      <CategoryBox
        title={LAYERS_CATEGORIES.BIODIVERSITY}
        image={BiodiversityThumbnail}
        counter={countedActiveLayers[LAYERS_CATEGORIES.BIODIVERSITY]}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div
        className={cx(
          styles.layersTogglesContainer,
          styles[`${biodiversityLayerVariant}Tab`],
          { [styles.open]: isOpen }
        )}
      >
        <SidebarLegend
          legendItem={BIODIVERSITY_SLUG}
          className={styles.legendContainer}
        />
        <Tabs
          tabs={BIODIVERSITY_TABS}
          onClick={handleTabSelection}
          className={styles.tabsContainer}
          defaultTabSlug={biodiversityLayerVariant}
        />
        {showCard && (
          <div className={styles.cardContainer}>
            <SidebarCardWrapper collapsable dark onClose={handleCloseCard}>
              <SidebarCardContent title={title} description={description} />
            </SidebarCardWrapper>
          </div>
        )}
        <div className={styles.dropdownContainer}>
          <span className={styles.dropdownLabel}>Terrestrial species</span>
          <Dropdown
            theme={'dark'}
            parentWidth="170px"
            options={LAYERS_RESOLUTION[biodiversityLayerVariant][TERRESTRIAL]}
            selectedOption={RESOLUTIONS[selectedResolution[TERRESTRIAL]]}
            handleOptionSelection={(op) =>
              setSelectedResolution({
                ...selectedResolution,
                [TERRESTRIAL]: op.slug,
              })
            }
            disabled={
              LAYERS_RESOLUTION[biodiversityLayerVariant][TERRESTRIAL].length <
              2
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
              toggleCategory={BIODIVERSITY_SLUG}
            />
          ))}
        </div>
        {layerTogglesToDisplay(MARINE).length && (
          <>
            <hr className={hrTheme.dark} />
            <div className={styles.dropdownContainer}>
              <span className={styles.dropdownLabel}>Marine species</span>
              <Dropdown
                theme={'dark'}
                options={LAYERS_RESOLUTION[biodiversityLayerVariant][MARINE]}
                selectedOption={
                  LAYERS_RESOLUTION[biodiversityLayerVariant][MARINE][0]
                }
                handleOptionSelection={(op) =>
                  setSelectedResolution({
                    ...selectedResolution,
                    [MARINE]: op.slug,
                  })
                }
                disabled={
                  LAYERS_RESOLUTION[biodiversityLayerVariant][MARINE].length < 2
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
                  toggleCategory={BIODIVERSITY_SLUG}
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
    </div>
  );
};

export default BiodiversitySidebarCardComponent;
