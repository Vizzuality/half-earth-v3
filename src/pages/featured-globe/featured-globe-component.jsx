import React from 'react';
import loadable from '@loadable/component'
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';
import { DATA_GLOBE_URLS } from 'constants/preload-urls';
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
import FeaturedMapCard from 'components/featured-map-card';
import {Helmet} from "react-helmet";

const InfoModal = loadable(() => import('components/modal-metadata'));

const { REACT_APP_FEATURED_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const FeaturedGlobeComponent = ({ hasMetadata, sceneSettings, handleSwitch, onLoad, isFullscreenActive, handleZoomChange, isLandscapeMode }) => {
  console.log('render featured')
  return (
    <>
      <Helmet>
        { DATA_GLOBE_URLS.map(url => <link rel="preload" crossorigin href={url} as="script" />)}
      </Helmet>
      <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad}>
        <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode} />
        <LocationWidget />
        <ToggleUiWidget isFullscreenActive={isFullscreenActive} />
        <ZoomWidget />
        <MinimapWidget />
        <SearchWidget />
        <Switcher />
        <FeaturedMapCard />
      </Globe>
      {hasMetadata && <InfoModal />}
      <About />
    </>
  )
};

export default FeaturedGlobeComponent;