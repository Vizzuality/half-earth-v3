import { useEffect, useState } from 'react';

import loadable from '@loadable/component';

import cx from 'classnames';
import animationStyles from 'styles/common-animations.module.scss';
import FeaturedPlacesLayer from 'containers/layers/featured-places-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import FeaturedPlaceViewManager from 'containers/managers/featured-place-view-manager';
import GlobeEventsManager from 'containers/managers/globe-events-manager';
import GlobePageIndicator from 'containers/menus/globe-page-indicator';
import GlobesMenu from 'containers/menus/globes-menu';
import SideMenu from 'containers/menus/sidemenu';
import SelectedFeaturedMapCard from 'containers/sidebars/featured-map-card';

import FeaturedTaxaSelector from 'components/featured-taxa-selector';
import Logo from 'components/half-earth-logo';
import Scene from 'components/scene';
import Spinner from 'components/spinner';
import uiStyles from 'styles/ui.module';
import { useLocale } from '@transifex/react'

const InfoModal = loadable(() => import('components/modal-metadata'));
const FeaturedPlaceCard = loadable(() =>
  import('containers/sidebars/featured-place-card')
);

const { VITE_APP_ARGISJS_API_VERSION: API_VERSION } = import.meta.env;

function FeaturedGlobe({
  sceneSettings,
  isFullscreenActive,
  selectedFeaturedMap,
  selectedBestMap,
  selectedDiscoveryMap,
  selectedFeaturedPlace,
  selectedSidebar,
  isGlobeUpdating,
  isMapsList,
  hasMetadata,
  activeLayers,
  selectedTaxa,
  onMapLoad,
  handleLayerToggle,
  spinGlobeHandle,
  spinGlobe,
  customFunctions,
  clickCallbacksArray,
  mouseMoveCallbacksArray,
  openedModal,
  browsePage,
  setFeaturedMap,
}) {
  const [activeGlobesMenu, setActiveGlobesMenu] = useState(false);
  const isFeaturedPlaceCard = selectedFeaturedPlace;
  const esriWidgetsHidden = isMapsList || isFeaturedPlaceCard;

  return (
    <>
      <Logo className={uiStyles.halfEarthLogoTopLeft} />
      <Scene
        sceneName="featured-scene"
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={onMapLoad}
        interactionsDisabled={isMapsList || isFeaturedPlaceCard}
        urlParamsUpdateDisabled
        initialRotation
        blur={activeGlobesMenu}
        className={cx({
          [uiStyles.blurScene]: activeGlobesMenu && !selectedFeaturedPlace,
        })}
      >
        {isGlobeUpdating && <Spinner floating />}

        <ArcgisLayerManager
          activeLayers={activeLayers}
          customFunctions={customFunctions}
        />

        <GlobeEventsManager
          clickCallbacksArray={clickCallbacksArray}
          mouseMoveCallbacksArray={mouseMoveCallbacksArray}
        />
        <FeaturedPlaceViewManager
          selectedFeaturedMap={selectedFeaturedMap}
          selectedFeaturedPlace={selectedFeaturedPlace}
        />

        {!selectedFeaturedPlace && (
          <SideMenu
            activeLayers={activeLayers}
            isFullscreenActive={isFullscreenActive}
            hidden={esriWidgetsHidden}
            openedModal={openedModal}
            disableSettings
            blur={activeGlobesMenu}
          />
        )}

        {!selectedFeaturedPlace && (
          <GlobePageIndicator onMouseEnter={() => setActiveGlobesMenu(true)} />
        )}

        <div className={cx(uiStyles.uiTopLeft, uiStyles.featuresContainer, uiStyles.featuresMapContainer)}>
          <div className={cx(uiStyles.featuredMapCardContainer,
            { [animationStyles.leftHidden]: selectedFeaturedPlace })}>
            {selectedBestMap && (
                <SelectedFeaturedMapCard
                  className={cx({
                    [uiStyles.blur]: activeGlobesMenu && !selectedFeaturedPlace,
                  })}
                  selectedFeaturedMap={selectedBestMap}
                  selectedSidebar={selectedSidebar}
                  isFullscreenActive={isFullscreenActive}
                  selectedFeaturedPlace={selectedFeaturedPlace}
                  spinGlobe={spinGlobe}
                  handle={spinGlobeHandle}
                  selectedSlug={selectedFeaturedMap}
                  setFeaturedMap={setFeaturedMap}
                />
            )}

            {selectedDiscoveryMap && (
              <SelectedFeaturedMapCard
                className={cx( {
                  [uiStyles.blur]: activeGlobesMenu && !selectedFeaturedPlace,
                })}
                selectedFeaturedMap={selectedDiscoveryMap}
                selectedSidebar={selectedSidebar}
                isFullscreenActive={isFullscreenActive}
                selectedFeaturedPlace={selectedFeaturedPlace}
                spinGlobe={spinGlobe}
                handle={spinGlobeHandle}
                selectedSlug={selectedFeaturedMap}
                setFeaturedMap={setFeaturedMap}
              />
            )}
          </div>
        </div>

        <FeaturedPlacesLayer
          selectedFeaturedMap={selectedFeaturedMap}
          selectedTaxa={selectedTaxa}
          handleLayerToggle={handleLayerToggle}
        />
        <FeaturedTaxaSelector
          selectedTaxa={selectedTaxa}
          isMapsList={isMapsList}
          selectedFeaturedMap={selectedFeaturedMap}
          isFullscreenActive={isFullscreenActive}
          selectedFeaturedPlace={selectedFeaturedPlace}
        />
        <FeaturedPlaceCard
          isFullscreenActive={isFullscreenActive}
          selectedFeaturedPlace={selectedFeaturedPlace}
          selectedFeaturedMap={selectedFeaturedMap}
          selectedTaxa={selectedTaxa}
        />

        {activeGlobesMenu && !selectedFeaturedPlace && (
          <GlobesMenu
            browsePage={browsePage}
            onMouseLeave={() => setActiveGlobesMenu(false)}
          />
        )}
      </Scene>
      {hasMetadata && <InfoModal />}
    </>
  );
}

export default FeaturedGlobe;
