import React, { useEffect, useState } from 'react';

import loadable from '@loadable/component';

import { useT } from '@transifex/react';

import CountriesBordersLayer from 'containers/layers/countries-borders-layer';
import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';

import CountryEntryTooltip from 'components/country-entry-tooltip';
import Cards from 'components/mobile-cards';
import MobileSearchLocation from 'components/mobile-search-location';
import Scene from 'components/scene';

import { useLandscape } from 'constants/responsive';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

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
  countryISO,
  countryName,
  direction,
  handleStepBack,
  isGlobeUpdating,
  onMapLoad,
  page,
  sceneMode,
  setPage,
  selectedLayers,
  sceneSettings,
  view,
}) {
  const t = useT();

  const isLandscape = useLandscape();

  const [updatedSceneSettings, setUpdatedSceneSettings] =
    useState(sceneSettings);

  useEffect(() => {
    if (isLandscape) {
      setUpdatedSceneSettings({
        ...sceneSettings,
        padding: {
          left: -450,
          top: 50,
        },
      });
    }
    if (!isLandscape) {
      setUpdatedSceneSettings({
        ...sceneSettings,
        padding: {
          left: 0,
          top: -220,
        },
      });
    }
  }, [isLandscape]);

  return (
    <Scene
      sceneName="nrc-landing-scene"
      sceneSettings={updatedSceneSettings}
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

      <MobileSearchLocation countryName={countryName} view={view} />

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
