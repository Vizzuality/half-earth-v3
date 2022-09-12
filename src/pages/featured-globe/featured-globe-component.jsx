import React, { useState } from 'react';

import loadable from '@loadable/component';

import cx from 'classnames';

import FeaturedPlacesLayer from 'containers/layers/featured-places-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import FeaturedPlaceViewManager from 'containers/managers/featured-place-view-manager';
import GlobeEventsManager from 'containers/managers/globe-events-manager';
import GlobePageIndicator from 'containers/menus/globe-page-indicator';
import GlobesMenu from 'containers/menus/globes-menu';
import SideMenu from 'containers/menus/sidemenu';
import SelectedFeaturedMapCard from 'containers/sidebars/featured-map-card';
import Widgets from 'containers/widgets';

import FeaturedTaxaSelector from 'components/featured-taxa-selector';
import HalfEarthLogo from 'components/half-earth-logo';
import MainMenu from 'components/main-menu';
import MenuFooter from 'components/mobile-only/menu-footer';
import MenuSettings from 'components/mobile-only/menu-settings';
import Scene from 'components/scene';
import Spinner from 'components/spinner';

import { MobileOnly, useMobile } from 'constants/responsive';

import uiStyles from 'styles/ui.module';

const InfoModal = loadable(() => import('components/modal-metadata'));
const FeaturedPlaceCard = loadable(() => import('containers/sidebars/featured-place-card'));

const {
  REACT_APP_ARGISJS_API_VERSION: API_VERSION,
  REACT_APP_FEATURE_NEW_MENUS: FEATURE_NEW_MENUS,
} = process.env;

function FeaturedGlobe({
  sceneSettings,
  isFullscreenActive,
  selectedFeaturedMap,
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
  activeOption,
  openedModal,
  browsePage,
}) {
  const isMobile = useMobile();

  const [activeGlobesMenu, setActiveGlobesMenu] = useState(false);

  const isFeaturedPlaceCard = selectedFeaturedPlace;
  const esriWidgetsHidden = isMapsList || isFeaturedPlaceCard || isMobile;

  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />
      {!FEATURE_NEW_MENUS && <MainMenu />}

      <Scene
        sceneName="featured-scene"
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={onMapLoad}
        interactionsDisabled={(isMapsList || isFeaturedPlaceCard) && !isMobile}
        urlParamsUpdateDisabled
        initialRotation
        blur={activeGlobesMenu}
        className={cx({
          [uiStyles.blurScene]:
            activeGlobesMenu && !selectedFeaturedPlace && FEATURE_NEW_MENUS,
        })}
      >
        {isGlobeUpdating && <Spinner floating />}

        <MobileOnly>
          <MenuFooter
            featured
            selectedSidebar={selectedSidebar}
            selectedFeaturedMap={selectedFeaturedMap}
            activeOption={activeOption}
          />
          <MenuSettings activeOption={activeOption} openedModal={openedModal} />
        </MobileOnly>

        <ArcgisLayerManager
          activeLayers={activeLayers}
          customFunctions={customFunctions}
        />

        <GlobeEventsManager
          clickCallbacksArray={clickCallbacksArray}
          mouseMoveCallbacksArray={mouseMoveCallbacksArray}
        />
        <FeaturedPlaceViewManager
          selectedFeaturedPlace={selectedFeaturedPlace}
        />

        {FEATURE_NEW_MENUS && !isMobile && !selectedFeaturedPlace && (
          <SideMenu
            activeLayers={activeLayers}
            isFullscreenActive={isFullscreenActive}
            hidden={esriWidgetsHidden}
            openedModal={openedModal}
            disableSettings
            blur={!selectedFeaturedPlace && selectedFeaturedPlace !== null}
          />
        )}

        {FEATURE_NEW_MENUS && !selectedFeaturedPlace && !isMobile && (
          <GlobePageIndicator onMouseEnter={() => setActiveGlobesMenu(true)} />
        )}

        {!FEATURE_NEW_MENUS && (
          <Widgets
            activeLayers={activeLayers}
            isFullscreenActive={isFullscreenActive}
            hidden={esriWidgetsHidden}
            openedModal={openedModal}
            disableSettings
          />
        )}

        {selectedFeaturedMap && (
          <SelectedFeaturedMapCard
            className={cx(uiStyles.uiTopLeft, {
              [uiStyles.blur]:
                activeGlobesMenu && !selectedFeaturedPlace && FEATURE_NEW_MENUS,
            })}
            activeOption={activeOption}
            selectedFeaturedMap={selectedFeaturedMap}
            selectedSidebar={selectedSidebar}
            isFullscreenActive={isFullscreenActive}
            selectedFeaturedPlace={selectedFeaturedPlace}
            spinGlobe={spinGlobe}
            handle={spinGlobeHandle}
          />
        )}
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
          activeOption={activeOption}
        />
        <FeaturedPlaceCard
          isFullscreenActive={isFullscreenActive}
          selectedFeaturedPlace={selectedFeaturedPlace}
          selectedFeaturedMap={selectedFeaturedMap}
          selectedTaxa={selectedTaxa}
          activeOption={activeOption}
        />

        {FEATURE_NEW_MENUS
          && activeGlobesMenu
          && !selectedFeaturedPlace
          && !isMobile && (
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
