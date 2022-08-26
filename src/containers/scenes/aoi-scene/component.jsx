import React, { useMemo } from 'react';

// Components
import FeatureHighlightLayer from 'containers/layers/feature-highlight-layer';
import LabelsLayer from 'containers/layers/labels-layer';
import MaskAndOutlineGraphicLayer from 'containers/layers/mask-and-outline-graphic-layer';
import TerrainExaggerationLayer from 'containers/layers/terrain-exaggeration-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import LocalSceneViewManager from 'containers/managers/local-scene-view-manager';
import SideMenu from 'containers/menus/sidemenu';
import AoiSidebar from 'containers/sidebars/aoi-sidebar';

import AOIEntryTooltip from 'components/aoi-entry-tooltip';
import Scene from 'components/scene';

import { AREA_TYPES } from 'constants/aois';
import { HALF_EARTH_FUTURE_TILE_LAYER } from 'constants/layers-slugs';

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

function AoiSceneComponent({
  geometry,
  onMapLoad,
  speciesData,
  activeLayers,
  sceneSettings,
  contextualData,
  dataLoaded,
  handleFuturePlaceClick,
  tooltipInfo,
  setTooltipInfo,
  areaTypeSelected,
}) {
  const updatedActiveLayers = useMemo(
    () => (areaTypeSelected === AREA_TYPES.futurePlaces
      ? activeLayers
      : activeLayers.filter((l) => l.title !== HALF_EARTH_FUTURE_TILE_LAYER)),
    [activeLayers, areaTypeSelected],
  );
  return (
    <Scene
      sceneName="aoi-scene"
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      onMapLoad={onMapLoad}
    >
      <ArcgisLayerManager activeLayers={updatedActiveLayers} />
      <MaskAndOutlineGraphicLayer geometry={geometry} />
      <FeatureHighlightLayer
        featureLayerSlugs={[HALF_EARTH_FUTURE_TILE_LAYER]}
        onFeatureClick={handleFuturePlaceClick}
      />
      <LocalSceneViewManager localGeometry={geometry} />
      <SideMenu activeLayers={updatedActiveLayers} />
      <TerrainExaggerationLayer />
      <LabelsLayer activeLayers={updatedActiveLayers} />
      <AoiSidebar
        speciesData={speciesData}
        activeLayers={updatedActiveLayers}
        contextualData={contextualData}
        geometry={geometry}
        dataLoaded={dataLoaded}
      />
      <AOIEntryTooltip
        tooltipInfo={tooltipInfo}
        setTooltipInfo={setTooltipInfo}
      />
    </Scene>
  );
}

export default AoiSceneComponent;
