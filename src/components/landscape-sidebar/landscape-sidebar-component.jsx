import React from 'react';
import cx from 'classnames';
import { useMobile } from 'constants/responsive';

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
  setLayerVisibility,
  handleGlobeUpdating,
  isLandscapeSidebarCollapsed,
  selectedSpecies,
  handleLayerToggle,
  activeOption
}) => {
  
  const isOnMobile = useMobile();
  const isLandscapeSidebarVisible = isLandscapeMode && !isFullscreenActive;
  const isLandscapeSidebarVisibleMobile = isLandscapeMode && !activeOption;
  const landscapeSidebarCollapsed = isLandscapeMode && isLandscapeSidebarCollapsed && isOnMobile && !activeOption;

  return (
    <div className={cx(styles.sidebar, { [animationStyles.leftHidden]: !isLandscapeSidebarVisible && !isOnMobile, [animationStyles.bottomHidden]: !isLandscapeSidebarVisibleMobile && isOnMobile, [uiStyles.uiTopLeft]: !isOnMobile, [animationStyles.collapsed]: landscapeSidebarCollapsed, [styles.scrollDisabled]: landscapeSidebarCollapsed })}>
      <div className={styles.wrapper}>
        <GeoDescriptionWidget view={view} isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed} activeOption={activeOption} />
        <SpeciesWidget selectedSpecies={selectedSpecies}/>
        <ConservationEffortsWidget
          activeLayers={activeLayers}
          handleGlobeUpdating={handleGlobeUpdating}
          handleLayerToggle={handleLayerToggle}
        />
        <HumanPressureWidget
          activeLayers={activeLayers}
          setLayerVisibility={setLayerVisibility}
          handleGlobeUpdating={handleGlobeUpdating}
        />
        <MOLUploader />
      </div>
    </div>
  )
}


export default LandscapeSidebarComponent;
