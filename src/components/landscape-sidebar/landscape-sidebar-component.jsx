import React from 'react';
import cx from 'classnames';
import { isMobile } from 'constants/responsive';

import GeoDescriptionWidget from './geo-description-widget';
import HumanPressureWidget from './human-pressure-widget';
import SpeciesWidget from './species-widget';
import ConservationEffortsWidget from './conservation-efforts-widget';
import MOLUploader from './mol-uploader';
import uiStyles from 'styles/ui.module';
import animationStyles from 'styles/common-animations.module.scss';
import styles from './landscape-sidebar-styles.module.scss';

const LandscapeSidebarComponent = ({ 
  map,
  view,
  isLandscapeMode,
  isFullscreenActive,
  activeLayers,
  rasters,
  setLayerVisibility,
  setRasters,
  handleGlobeUpdating,
  isLandscapeSidebarCollapsed,
  selectedSpecies,
  handleLayerToggle,
  activeOption
}) => {
  
  const isOnMobile = isMobile();
  const isLandscapeSidebarVisible = isLandscapeMode && !isFullscreenActive && !activeOption;
  const landscapeSidebarCollapsed = isLandscapeMode && isLandscapeSidebarCollapsed && isOnMobile && !activeOption;

  return (
    <div className={cx(styles.sidebar, { [animationStyles.leftHidden]: !isLandscapeSidebarVisible && !isOnMobile, [animationStyles.bottomHidden]: !isLandscapeSidebarVisible && isOnMobile, [uiStyles.uiTopLeft]: !isOnMobile, [animationStyles.collapsed]: landscapeSidebarCollapsed, [styles.scrollDisabled]: landscapeSidebarCollapsed })}>
      <div className={styles.wrapper}>
        <GeoDescriptionWidget 
          view={view}
          isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
          activeOption={activeOption}
        />
        <HumanPressureWidget
          map={map}
          view={view}
          activeLayers={activeLayers}
          rasters={rasters}
          setLayerVisibility={setLayerVisibility}
          setRasters={setRasters}
          handleGlobeUpdating={handleGlobeUpdating}
        />
        <ConservationEffortsWidget
          map={map}
          view={view}
          activeLayers={activeLayers}
          handleGlobeUpdating={handleGlobeUpdating}
          handleLayerToggle={handleLayerToggle}
        />
        <SpeciesWidget selectedSpecies={selectedSpecies}/>
        <MOLUploader />
      </div>
    </div>
  )
}


export default LandscapeSidebarComponent;
