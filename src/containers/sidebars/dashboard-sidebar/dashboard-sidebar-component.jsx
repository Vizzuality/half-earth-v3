import React, { useContext, useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';
import codLogo from 'logos/iccn_logo_clean.png';
import codWhiteLogo from 'logos/iccn_logo_clean_whiteText.png';
import sleLogo from 'logos/sierra-leone.png';

import DashboardTrendsSidebarContainer from 'containers/sidebars/dashboard-trends-sidebar';

import DashboardNav from 'components/dashboard-nav';

import { NAVIGATION } from 'constants/dashboard-constants.js';

import BioDiversityContainer from './biodiversity-indicators';
import DashboardHomeContainer from './dashboard-home';
import styles from './dashboard-sidebar-styles.module.scss';
import DataLayerContainer from './data-layers';
import RegionsAnalysisContainer from './regions-analysis';
import SpeciesFilterContainer from './species-filter';
import SpeciesHomeContainer from './species-home';
import TutorialsContainer from './tutorials';

function DashboardSidebar(props) {
  const t = useT();
  const {
    countryName,
    countryISO,
    selectedIndex,
    map,
    regionLayers,
    setRegionLayers,
  } = props;

  const { lightMode, toggleLightMode } = useContext(LightModeContext);
  const [logo, setLogo] = useState();

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

  useEffect(() => {
    if (countryISO.toUpperCase() === 'SLE') {
      setLogo(<img className={styles.logo} src={sleLogo} alt="Logo" />);
    } else {
      setLogo(<img className={styles.logo} src={codLogo} alt="Logo" />);
    }
  }, []);

  useEffect(() => {
    if (countryISO.toUpperCase() !== 'SLE') {
      if (lightMode) {
        setLogo(<img className={styles.logo} src={codLogo} alt="Logo" />);
      } else {
        setLogo(<img className={styles.logo} src={codWhiteLogo} alt="Logo" />);
      }
    }
  }, [lightMode]);

  return (
    <div
      id="dashboard-sidebar"
      className={cx(
        lightMode ? styles.light : '',
        selectedIndex === NAVIGATION.TRENDS ? styles.trends : '',
        selectedIndex === NAVIGATION.INFO ? styles.tutorial : '',
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
      {logo}

      <h1>{t(countryName)}</h1>
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
        {selectedIndex === NAVIGATION.SPECIES && (
          <SpeciesHomeContainer {...props} />
        )}
        {selectedIndex === NAVIGATION.DATA_LAYER && (
          <DataLayerContainer {...props} />
        )}
        {selectedIndex === NAVIGATION.BIO_IND && (
          <BioDiversityContainer {...props} />
        )}
        {selectedIndex === NAVIGATION.TRENDS && (
          <DashboardTrendsSidebarContainer {...props} />
        )}
        {selectedIndex === NAVIGATION.INFO && <TutorialsContainer {...props} />}
      </div>
    </div>
  );
}

export default DashboardSidebar;
