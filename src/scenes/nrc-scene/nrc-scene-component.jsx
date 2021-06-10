import React from 'react';
// Components
import Scene from 'components/scene';
import Widgets from 'components/widgets';
import LabelsLayer from 'components/labels-layer';
import CountryMaskLayer from 'components/country-mask-layer';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LocalSceneViewManager from 'components/local-scene-view-manager';
import TerrainExaggerationLayer from 'components/terrain-exaggeration-layer';
import PdfNationalReport from 'components/pdf-reports/national-report-pdf';
// Constants
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

import styles from './nrc-scene-styles.module.scss';

const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

const CountrySceneComponent = ({
  shortLink,
  onMapLoad,
  countryISO,
  userConfig,
  openedModal,
  countryName,
  activeLayers,
  countryBorder,
  sceneSettings,
  isFullscreenActive,
}) => {

  return (
    <Scene
      className={styles.sceneWrapper}
      sceneName={'nrc-scene'}
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      onMapLoad={onMapLoad}
    >
      <LocalSceneViewManager localGeometry={countryBorder} />
      <ArcgisLayerManager
        activeLayers={activeLayers}
        userConfig={userConfig}
      />
      <CountryMaskLayer
        countryISO={countryISO}
        spatialReference={LOCAL_SPATIAL_REFERENCE}
      />
      <TerrainExaggerationLayer exaggeration={20} />
      <LabelsLayer activeLayers={activeLayers} countryISO={countryISO} />
      <Widgets
        activeLayers={activeLayers}
        openedModal={openedModal}
        isFullscreenActive={isFullscreenActive}
      />
      {/* <PdfNationalReport
        countryISO={countryISO}
        countryName={countryName}
        onMapLoad={onMapLoad}
        shortLink={shortLink}
      /> */}
    </Scene>
  );
};

export default CountrySceneComponent;
