import React from 'react';
import cx from 'classnames';
import {useSpring, animated} from 'react-spring'

import GeoDescriptionWidget from './geo-description-widget';
import HumanPressureWidget from './human-pressure-widget';
import SpeciesWidget from './species-widget';
import MOLUploader from './mol-uploader';
import uiStyles from 'styles/ui.module';
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
  handleGlobeUpdating
}) => {
  const animationProps = useSpring({
    from: { marginLeft: -400 },
    marginLeft: isLandscapeMode && !isFullscreenActive ? 0 : -400,
    delay: isLandscapeMode && !isFullscreenActive ? 400 : 0
  })
  return (
    <animated.aside
      className={cx(
        uiStyles.uiTopLeft,
        styles.sidebar
      )}
      style={animationProps}>
      <div className={styles.wrapper}>
        <GeoDescriptionWidget view={view} />
        <HumanPressureWidget
          map={map}
          view={view}
          activeLayers={activeLayers}
          rasters={rasters}
          setLayerVisibility={setLayerVisibility}
          setRasters={setRasters}
          handleGlobeUpdating={handleGlobeUpdating}
        />
        <SpeciesWidget />
        <MOLUploader />
      </div>
    </animated.aside>
  )
}


export default LandscapeSidebarComponent;
