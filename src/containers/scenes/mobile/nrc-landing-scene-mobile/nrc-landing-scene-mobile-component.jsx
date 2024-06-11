import React, { useMemo } from 'react';

import loadable from '@loadable/component';

import { useT } from '@transifex/react';

import CountriesBordersLayer from 'containers/layers/countries-borders-layer';
import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import RegionsLabelsLayer from 'containers/layers/regions-labels-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';

import CountryEntryTooltip from 'components/country-entry-tooltip';
import Cards from 'components/mobile-cards';
import MobileSearchLocation from 'components/mobile-search-location';
import Scene from 'components/scene';

import { MARINE_SPI_FEATURE_LAYER } from 'constants/layers-slugs';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

import { ReactComponent as BackArrowIcon } from 'icons/back_arrow.svg';

import styles from './nrc-landing-scene-mobile-styles.module.scss';

const Spinner = loadable(() => import('components/spinner'));
const LabelsLayer = loadable(() => import('containers/layers/labels-layer'));

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

function NrcLandingMobileComponent({
  activeLayers,
  cardsContent,
  countryISO,
  countryName,
  currentCard,
  handleStepBack,
  isGlobeUpdating,
  onMapLoad,
  sceneMode,
  sceneSettings,
  selectedLayers,
  setCurrentCard,
  view,
}) {
  const t = useT();
  const displayMarineOutline = useMemo(
    () => selectedLayers.some((l) => l.title === MARINE_SPI_FEATURE_LAYER),
    [selectedLayers]
  );

  return (
    <Scene
      sceneName="nrc-landing-mobile-scene"
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      onMapLoad={onMapLoad}
      initialRotation
    >
      <header className={styles.header}>
        <button
          className={styles.backBtn}
          type="button"
          aria-label="Back"
          onClick={() => handleStepBack()}
        >
          <BackArrowIcon className={styles.arrowIcon} />
        </button>

        <p>{t('National report cards')}</p>
      </header>

      <MobileSearchLocation countryName={countryName} view={view} />

      <ArcgisLayerManager activeLayers={selectedLayers} />

      {isGlobeUpdating && <Spinner floating />}

      <CountryLabelsLayer
        activeLayers={selectedLayers}
        countryISO={countryISO}
        countryName={countryName}
        sceneMode={sceneMode}
      />
      <RegionsLabelsLayer activeLayers={selectedLayers} sceneMode={sceneMode} />

      <CountriesBordersLayer
        countryISO={countryISO}
        spatialReference={LOCAL_SPATIAL_REFERENCE}
        displayMarineOutline={displayMarineOutline}
      />

      <CountryEntryTooltip countryISO={countryISO} />

      {!countryISO && (
        <Cards
          cardsContent={cardsContent}
          setCurrent={setCurrentCard}
          current={currentCard}
        />
      )}

      <LabelsLayer activeLayers={activeLayers} />
    </Scene>
  );
}

export default NrcLandingMobileComponent;
