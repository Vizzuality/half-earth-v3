import React from 'react';
// Components
import Scene from 'components/scene';
import Widgets from 'containers/widgets';
import AoiSidebar from 'containers/sidebars/aoi-sidebar';
import LabelsLayer from 'containers/layers/labels-layer';
import MaskAndOutlineGraphicLayer from 'containers/layers/mask-and-outline-graphic-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import LocalSceneViewManager from 'containers/managers/local-scene-view-manager';
import TerrainExaggerationLayer from 'containers/layers/terrain-exaggeration-layer';

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

const AoiSceneComponent = ({
  geometry,
  onMapLoad,
  userConfig,
  speciesData,
  activeLayers,
  sceneSettings,
  contextualData,
}) => {
  return (
    <Scene
      sceneName={'aoi-scene'}
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      onMapLoad={onMapLoad}
    >
      <ArcgisLayerManager userConfig={userConfig} activeLayers={activeLayers} />
      <MaskAndOutlineGraphicLayer geometry={geometry} />
      <LocalSceneViewManager localGeometry={geometry} />
      <Widgets activeLayers={activeLayers} />
      <TerrainExaggerationLayer />
      <LabelsLayer activeLayers={activeLayers} />
      <AoiSidebar
        speciesData={speciesData}
        activeLayers={activeLayers}
        contextualData={contextualData}
        geometry={geometry}
      />
    </Scene>
  );
};

export default AoiSceneComponent;
