import React from 'react';
import Globe from 'components/globe';
import ArcgisLayerManager from 'components/shared/arcgis-layer-manager';
import LandscapeViewManager from 'components/shared/landscape-view-manager';
import sceneSettings from './featured-globe-settings.js';

import Legend from 'components/shared/legend';
import Sidebar from 'components/shared/sidebar';

// WIDGETS
import LocationWidget from 'components/shared/widgets/location-widget';
import NavigationToggleWidget from 'components/shared/widgets/navigation-toggle-widget';
import ZoomWidget from 'components/shared/widgets/zoom-widget';

const { REACT_APP_FEATURED_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const FeaturedGlobeComponent = ({ sceneLayers, activeLayers, isLandscapeMode, handleLayerToggle, handleZoomChange }) => (
  <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} >
    <ArcgisLayerManager activeLayers={activeLayers}/>
    <LandscapeViewManager zoomLevelTrigger={10} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode}/>
    <LocationWidget />
    <ZoomWidget />
    <NavigationToggleWidget />
    <Sidebar>
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