import React, { useContext, useEffect } from 'react';

import { useT } from '@transifex/react';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';
import logo from 'logos/institut-congolais.png';

import DashboardTrendsSidebarContainer from 'containers/sidebars/dashboard-trends-sidebar';

import DashboardNav from 'components/dashboard-nav';

import { NAVIGATION } from 'constants/dashboard-constants.js';

import BioDiversityContainer from './biodiversity-indicators';
import DashboardHomeContainer from './dashboard-home';
import styles from './dashboard-sidebar-styles.module.scss';
import DataLayerContainer from './data-layers';
import RegionsAnalysisContainer from './regions-analysis';
import SpeciesFilterContainer from './species-filter';

function DashboardSidebar(props) {
  const t = useT();
  const {
    countryName,
    selectedIndex,
    map,
    regionLayers,
    setRegionLayers,
    scientificName,
  } = props;

  const { lightMode, toggleLightMode } = useContext(LightModeContext);

  const removeRegionLayers = () => {
    const layers = regionLayers;
    Object.keys(layers).forEach((region) => {
      const foundLayer = map.layers.items.find((item) => item.id === region);
      if (foundLayer) {
        map.remove(foundLayer);
      }
    });
  };

  useEffect(() => {
    if (
      selectedIndex !== NAVIGATION.TRENDS &&
      selectedIndex !== NAVIGATION.EXPLORE_SPECIES
    ) {
      removeRegionLayers();
      setRegionLayers({});
    }
  }, [selectedIndex]);

  return (
    <div
      className={cx(
        lightMode ? styles.light : '',
        selectedIndex === NAVIGATION.TRENDS ? styles.trends : '',
        styles.container
      )}
    >
      <button
        type="button"
        className={styles.darkMode}
        title={lightMode ? t('Switch to Dark mode') : t('Switch to Light mode')}
        onClick={() => toggleLightMode()}
      >
        {!lightMode && <LightModeIcon className={styles.icon} />}
        {lightMode && <DarkModeIcon className={styles.icon} />}
      </button>
      <img className={styles.logo} src={logo} alt="Logo" />
      <h1>{countryName}</h1>

      <div className={styles.regionFilter}>
        <DashboardNav {...props} />
        {selectedIndex === NAVIGATION.HOME && (
          <DashboardHomeContainer {...props} />
        )}
        {selectedIndex === NAVIGATION.EXPLORE_SPECIES && (
          <SpeciesFilterContainer {...props} />
        )}
        {selectedIndex === NAVIGATION.REGION && (
          <RegionsAnalysisContainer {...props} />
        )}
        {!scientificName && selectedIndex === NAVIGATION.DATA_LAYER && (
          <DashboardHomeContainer {...props} />
        )}
        {scientificName &&
          (selectedIndex === NAVIGATION.SPECIES ||
            selectedIndex === NAVIGATION.DATA_LAYER) && (
            <DataLayerContainer {...props} />
          )}
        {selectedIndex === NAVIGATION.BIO_IND && (
          <BioDiversityContainer {...props} />
        )}
        {selectedIndex === NAVIGATION.TRENDS && (
          <DashboardTrendsSidebarContainer {...props} />
        )}
      </div>
    </div>
  );
}

export default DashboardSidebar;
