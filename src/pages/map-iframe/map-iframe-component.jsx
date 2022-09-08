import React from 'react';

import ConstantContactLayers from 'containers/layers/constant-contact-layers';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import PostRobotManager from 'containers/managers/post-robot-manager';

import Scene from 'components/scene';

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

function DataGlobeComponent({
  activeLayers,
  sceneSettings,
  onLoad,
  listeners,
  handlePostRobotUpdates,
}) {
  return (
    <Scene
      onViewLoad={onLoad}
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
    >
      <ArcgisLayerManager activeLayers={activeLayers} />
      <PostRobotManager
        activeLayers={activeLayers}
        handlePostRobotUpdates={handlePostRobotUpdates}
        listeners={listeners}
      />
      <ConstantContactLayers activeLayers={activeLayers} />
    </Scene>
  );
}

export default DataGlobeComponent;
