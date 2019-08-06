import React from 'react';
import loadable from '@loadable/component'
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';
import Globe from 'components/globe';
import LandscapeViewManager from 'components/landscape-view-manager';
import Switcher from 'components/switcher';
import About from 'components/about';

// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';
import MinimapWidget from 'components/widgets/minimap-widget';

const InfoModal = loadable(() => import('components/modal-metadata'));

const { REACT_APP_FEATURED_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const FeaturedGlobeComponent = ({ hasMetadata, sceneSettings, handleSwitch, onLoad, isFullscreenActive, handleZoomChange, isLandscapeMode }) => {
  return (
    <>
      <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad}>
        <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode} />
        <LocationWidget />
        <ToggleUiWidget isFullscreenActive={isFullscreenActive} />
        <ZoomWidget />
        <MinimapWidget />
        <SearchWidget />
        <Switcher handleClick={handleSwitch} />
      </Globe>
      {hasMetadata && <InfoModal />}
      <About />
    </>
  )
};

export default FeaturedGlobeComponent;