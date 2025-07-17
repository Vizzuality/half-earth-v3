import React, { useEffect, useState } from 'react';

import loadable from '@loadable/component';

import { LightModeProvider } from 'context/light-mode';
import { Loading } from 'he-components';

import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import RegionsLabelsLayer from 'containers/layers/regions-labels-layer';
import SideMenu from 'containers/menus/sidemenu';
import DashboardSidebarContainer from 'containers/sidebars/dashboard-sidebar';

import AreaHighlightManagerComponent from 'components/AreaHighlightManager/area-highlight-manager-component';
import popUpStyles from 'components/image-popup/image-popup-component-styles.module.scss';
import LayerInfoModalContainer from 'components/layer-info-modal';
import MapLegendContainer from 'components/map-legend';
import MapView from 'components/map-view';

// import TopMenuContainer from 'components/top-menu';

import MinimizeIcon from 'icons/closes.svg?react';

import LayerLegendContainer from '../../../components/layer-legend';
import {
  MEX,
  NATIONAL_TREND,
  PROVINCE_TREND,
} from '../../sidebars/dashboard-trends-sidebar/dashboard-trends-sidebar-component';

const { VITE_APP_ARGISJS_API_VERSION: API_VERSION } = import.meta.env;
const LabelsLayer = loadable(() => import('containers/layers/labels-layer'));

let highlight;

function DashboardViewComponent(props) {
  const {
    activeLayers,
    onMapLoad,
    sceneMode,
    viewSettings,
    countryISO,
    countryName,
    isFullscreenActive,
    openedModal,
    geometry,
    setSelectedIndex,
    setSelectedRegion,
    selectedRegion,
    browsePage,
    regionLayers,
    setRegionLayers,
    tabOption,
    setSelectedProvince,
    mapLegendLayers,
    regionName,
    setRegionName,
  } = props;

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  const [mapViewSettings, setMapViewSettings] = useState(viewSettings);
  const [clickedRegion, setClickedRegion] = useState();
  const [layerView, setLayerView] = useState();
  const [imagePopup, setImagePopup] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [layerInfo, setLayerInfo] = useState();
  const [showLegend, setShowLegend] = useState(false);
  const [activeTrend, setActiveTrend] = useState(PROVINCE_TREND);
  const [shiActiveTrend, setShiActiveTrend] = useState(PROVINCE_TREND);
  const [siiActiveTrend, setSiiActiveTrend] = useState(NATIONAL_TREND);
  // const [showTopNav, setShowTopNav] = useState(true);

  const handleRegionSelected = (foundRegion) => {
    highlight?.remove();
    highlight = layerView?.highlight(foundRegion.graphic);
  };

  const closeModal = () => {
    setImagePopup(null);
  };

  useEffect(() => {
    if (Object.values(mapLegendLayers).length > 0) {
      setShowLegend(true);
    } else {
      setShowLegend(false);
    }
  }, [mapLegendLayers]);

  useEffect(() => {
    if (countryISO.toLowerCase() === 'ee') {
      setActiveTrend(MEX);
      setShiActiveTrend(MEX);
    }
  }, []);

  return (
    <MapView
      onMapLoad={onMapLoad}
      mapName="dashboard"
      viewSettings={mapViewSettings}
      map={map}
      setMap={setMap}
      view={view}
      setView={setView}
      geometry={geometry}
      countryISO={countryISO}
      loaderOptions={{
        url: `https://js.arcgis.com/${API_VERSION}`,
      }}
    >
      {layerInfo && (
        <LayerInfoModalContainer
          layerInfo={layerInfo}
          setLayerInfo={setLayerInfo}
        />
      )}

      {isLoading && (
        <div
          style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 4 }}
        >
          <Loading height={200} />
        </div>
      )}

      {imagePopup && (
        <>
          <div
            className={popUpStyles.overlay}
            role="button"
            aria-label="overlay"
            onClick={closeModal}
            onKeyDown={closeModal}
            tabIndex={0}
          />
          <div className={popUpStyles.popUp}>
            <button
              type="button"
              onClick={() => closeModal()}
              aria-label="Close popup"
            >
              <MinimizeIcon />
            </button>
            {imagePopup}
          </div>
        </>
      )}
      <AreaHighlightManagerComponent
        layerView={layerView}
        setLayerView={setLayerView}
        regionLayers={regionLayers}
        setRegionLayers={setRegionLayers}
        view={view}
        setRegionName={setRegionName}
        setSelectedIndex={setSelectedIndex}
        setSelectedRegion={setSelectedRegion}
        browsePage={browsePage}
        setClickedRegion={setClickedRegion}
        tabOption={tabOption}
        setSelectedProvince={setSelectedProvince}
        activeTrend={activeTrend}
        shiActiveTrend={shiActiveTrend}
        handleRegionSelected={handleRegionSelected}
        {...props}
      />
      <LightModeProvider>
        {/* <TopMenuContainer {...props} /> */}
        {showLegend && <MapLegendContainer map={map} {...props} />}
        <LayerLegendContainer map={map} {...props} />
        <DashboardSidebarContainer
          map={map}
          view={view}
          setMapViewSettings={setMapViewSettings}
          regionLayers={regionLayers}
          setRegionLayers={setRegionLayers}
          clickedRegion={clickedRegion}
          setClickedRegion={setClickedRegion}
          handleRegionSelected={handleRegionSelected}
          layerView={layerView}
          selectedRegion={selectedRegion}
          setLayerInfo={setLayerInfo}
          regionName={regionName}
          setRegionName={setRegionName}
          setImagePopup={setImagePopup}
          setIsLoading={setIsLoading}
          activeTrend={activeTrend}
          setActiveTrend={setActiveTrend}
          shiActiveTrend={shiActiveTrend}
          setShiActiveTrend={setShiActiveTrend}
          siiActiveTrend={siiActiveTrend}
          setSiiActiveTrend={setSiiActiveTrend}
          {...props}
        />
      </LightModeProvider>
      <CountryLabelsLayer
        sceneMode={sceneMode}
        countryISO={countryISO}
        countryName={countryName}
        activeLayers={activeLayers}
      />

      <RegionsLabelsLayer sceneMode={sceneMode} activeLayers={activeLayers} />

      <SideMenu
        openedModal={openedModal}
        activeLayers={activeLayers}
        isFullscreenActive={isFullscreenActive}
      />

      <LabelsLayer activeLayers={activeLayers} />
    </MapView>
  );
}

export default DashboardViewComponent;
