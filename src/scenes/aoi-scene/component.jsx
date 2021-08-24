import React from 'react';
// Components
import Scene from 'components/scene';
import Widgets from 'components/widgets';
import MaskGraphicLayer from 'components/mask-graphic-layer';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LocalSceneViewManager from 'components/local-scene-view-manager';

const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

const AoiSceneComponent = ({
  geometry,
  onMapLoad,
  userConfig,
  activeLayers,
  sceneSettings,
}) => (
  <Scene
    sceneName={'nrc-scene'}
    sceneSettings={sceneSettings}
    loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
    onMapLoad={onMapLoad}
  >
    <ArcgisLayerManager
      userConfig={userConfig}
      activeLayers={activeLayers}
    />
    <MaskGraphicLayer
      geometry={geometry}
    />
    <LocalSceneViewManager
      localGeometry={geometry}
    />
    <Widgets
      activeLayers={activeLayers}
    />
  </Scene>
);

export default AoiSceneComponent;
