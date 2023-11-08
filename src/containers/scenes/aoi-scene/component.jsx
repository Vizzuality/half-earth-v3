import React from 'react';

import FeatureHighlightLayer from 'containers/layers/feature-highlight-layer';
import LabelsLayer from 'containers/layers/labels-layer';
import MaskAndOutlineGraphicLayer from 'containers/layers/mask-and-outline-graphic-layer';
import TerrainExaggerationLayer from 'containers/layers/terrain-exaggeration-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import ZoomIntoGeometryManager from 'containers/managers/zoom-into-geometry-manager';
import BasemapSelector from 'containers/menus/basemap-selector';
import SideMenu from 'containers/menus/sidemenu';
import AoiSidebar from 'containers/sidebars/aoi-sidebar';

import FuturePlaceTooltip from 'components/future-place-tooltip';
import Scene from 'components/scene';

import { HALF_EARTH_FUTURE_TILE_LAYER } from 'constants/layers-slugs';

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

function AoiSceneComponent({
  activeCategory,
  aoiId,
  geometry,
  onMapLoad,
  speciesData,
  sceneSettings,
  contextualData,
  dataLoaded,
  tooltipInfo,
  setTooltipInfo,
  handleFuturePlaceClick,
  handleGlobeUpdating,
  onboardingType,
  onboardingStep,
  waitingInteraction,
  activeLayers,
}) {
  return (
    <Scene
      sceneName="aoi-scene"
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      onMapLoad={onMapLoad}
    >
      <ArcgisLayerManager activeLayers={activeLayers} />

      <MaskAndOutlineGraphicLayer geometry={geometry} />

      <FeatureHighlightLayer
        featureLayerSlugs={[HALF_EARTH_FUTURE_TILE_LAYER]}
        onFeatureClick={handleFuturePlaceClick}
      />

      <ZoomIntoGeometryManager localGeometry={geometry} />
      <SideMenu activeLayers={activeLayers} />
      {!onboardingType && <BasemapSelector />}

      <TerrainExaggerationLayer />

      <LabelsLayer activeLayers={activeLayers} />

      <AoiSidebar
        activeCategory={activeCategory}
        aoiId={aoiId}
        speciesData={speciesData}
        activeLayers={activeLayers}
        contextualData={contextualData}
        geometry={geometry}
        dataLoaded={dataLoaded}
        handleGlobeUpdating={handleGlobeUpdating}
        onboardingType={onboardingType}
        onboardingStep={onboardingStep}
        waitingInteraction={waitingInteraction}
      />

      <FuturePlaceTooltip
        tooltipInfo={tooltipInfo}
        setTooltipInfo={setTooltipInfo}
      />
    </Scene>
  );
}

export default AoiSceneComponent;
