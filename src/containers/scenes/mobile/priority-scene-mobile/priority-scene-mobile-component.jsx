import React from 'react';

import loadable from '@loadable/component';

import { useT } from '@transifex/react';

import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import RegionsLabelsLayer from 'containers/layers/regions-labels-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';

import CountryEntryTooltip from 'components/country-entry-tooltip';
import Cards from 'components/mobile-cards';
import MobileSearchLocation from 'components/mobile-search-location';
import Scene from 'components/scene';

import { ReactComponent as BackArrowIcon } from 'icons/back_arrow.svg';

import styles from './priority-scene-mobile-styles.module.scss';

const Spinner = loadable(() => import('components/spinner'));
const LabelsLayer = loadable(() => import('containers/layers/labels-layer'));

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

function PriorityMobileComponent({
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

  return (
    <Scene
      sceneName="priority-scene-mobile"
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

        <p>{t('Priority places')}</p>
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
      <RegionsLabelsLayer sceneMode={sceneMode} activeLayers={selectedLayers} />
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

export default PriorityMobileComponent;
