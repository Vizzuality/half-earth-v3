import React from 'react';
import { layerManagerToggle } from 'utils/layer-manager-utils';
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

const FeaturedGlobeComponent = ({ setFeaturedGlobeSettings, sceneLayers, activeLayers, isLandscapeMode }) => {
  const toggleLayer = e => layerManagerToggle(e, "data-layer-id", activeLayers, setFeaturedGlobeSettings);
  return (
    <>
      <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} >
        <ArcgisLayerManager activeLayers={activeLayers}/>
        <LandscapeViewManager zoomLevelTrigger={10} onZoomChange={setFeaturedGlobeSettings} isLandscapeMode={isLandscapeMode}/>
        <LocationWidget />
        <ZoomWidget />
        <NavigationToggleWidget />
      </Globe>
      <Sidebar>
        {
          sceneLayers &&
          sceneLayers.map(l => (
              <button key={l.id} data-layer-id={l.id} onClick={toggleLayer}>{l.title}</button>
          ))
        }
      </Sidebar>
      <Legend />
    </>
  );
}

export default FeaturedGlobeComponent;