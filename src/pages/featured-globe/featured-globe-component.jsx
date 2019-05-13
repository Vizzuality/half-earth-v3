import React from 'react';
import Globe from 'components/globe';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LandscapeViewManager from 'components/landscape-view-manager';
import sceneSettings from './featured-globe-settings.js';

import Legend from 'components/legend';
import Sidebar from 'components/sidebar';

// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import NavigationToggleWidget from 'components/widgets/navigation-toggle-widget';
import ZoomWidget from 'components/widgets/zoom-widget';

const { REACT_APP_FEATURED_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const FeaturedGlobeComponent = ({ sceneLayers, activeLayers, isLandscapeMode, isPaddingActive, handleLayerToggle, handleZoomChange }) => (
  <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} >
    <ArcgisLayerManager activeLayers={activeLayers}/>
    <LandscapeViewManager zoomLevelTrigger={8} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode}/>
    <LocationWidget />
    <ZoomWidget />
    <NavigationToggleWidget />
    <Sidebar isPaddingActive={isPaddingActive}>
      {
        sceneLayers &&
        sceneLayers.map(l => (
            <button key={l.id} data-layer-id={l.id} onClick={handleLayerToggle}>{l.title}</button>
        ))
      }
    </Sidebar>
    <Legend />
  </Globe>
);

export default FeaturedGlobeComponent;