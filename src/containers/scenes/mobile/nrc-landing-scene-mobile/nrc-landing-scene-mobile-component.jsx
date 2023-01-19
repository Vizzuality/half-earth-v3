import React, { useState } from 'react';

import loadable from '@loadable/component';

import { useT } from '@transifex/react';

import CountriesBordersLayer from 'containers/layers/countries-borders-layer';
import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
// import { useOnboardingTooltipRefs } from 'containers/onboarding/onboarding-hooks';

import CountryEntryTooltip from 'components/country-entry-tooltip';
import Cards from 'components/mobile-cards';
import MobileSearchLocation from 'components/mobile-search-location';
import Scene from 'components/scene';

// import SearchLocation from 'components/search-location';
// import { GLOBAL_SPI_FEATURE_LAYER } from 'constants/layers-slugs';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';
// import { SEARCH_TYPES } from 'constants/search-location-constants';

import { ReactComponent as BackArrowIcon } from 'icons/back_arrow.svg';

import styles from './nrc-landing-scene-mobile-styles.module.scss';

const Spinner = loadable(() => import('components/spinner'));
const LabelsLayer = loadable(() => import('containers/layers/labels-layer'));

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

function NrcLandingMobileComponent({
  activeLayers,
  cardsContent,
  // changeUI,
  countryISO,
  countryName,
  direction,
  handleStepBack,
  isGlobeUpdating,
  onMapLoad,
  page,
  sceneMode,
  sceneSettings,
  setPage,
  selectedLayers,
  // view,
}) {
  const t = useT();
  const [searchLocationIsOpen, setSearchLocationIsOpen] = useState(false);

  // const tooltipRefs = useOnboardingTooltipRefs({
  //   changeUI,
  // });

  return (
    <Scene
      sceneName="nrc-landing-scene"
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      onMapLoad={onMapLoad}
      initialRotation
    >
      <header className={styles.header}>
        <button
          className={styles.backBtn}
          type="button"
          onClick={() => handleStepBack()}
        >
          <BackArrowIcon className={styles.arrowIcon} />
        </button>

        <p>{t('National report cards')}</p>
      </header>

      {console.log({ searchLocationIsOpen })}
      <button
        type="button"
        className={styles.searchContainer}
        onClick={() => setSearchLocationIsOpen(true)}
      >
        aqui
      </button>
      <MobileSearchLocation
        isOpen={searchLocationIsOpen}
        setSearchLocationIsOpen={setSearchLocationIsOpen}
      />

      <ArcgisLayerManager activeLayers={selectedLayers} />

      {isGlobeUpdating && <Spinner floating />}

      <CountryLabelsLayer
        activeLayers={selectedLayers}
        countryISO={countryISO}
        countryName={countryName}
        sceneMode={sceneMode}
      />

      <CountriesBordersLayer
        countryISO={countryISO}
        spatialReference={LOCAL_SPATIAL_REFERENCE}
      />

      <CountryEntryTooltip countryISO={countryISO} countryName={countryName} />

      {!countryISO && (
        <Cards
          cardsContent={cardsContent}
          direction={direction}
          page={page}
          setPage={setPage}
          variants={variants}
        />
      )}

      <LabelsLayer activeLayers={activeLayers} />
    </Scene>
  );
}

export default NrcLandingMobileComponent;
