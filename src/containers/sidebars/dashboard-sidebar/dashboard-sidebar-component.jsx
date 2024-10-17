import React, { useContext, useEffect } from 'react';
import { useT } from '@transifex/react';
import cx from 'classnames';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import BioDiversityContainer from './biodiversity-indicators';
import styles from './dashboard-sidebar-styles.module.scss';
import DataLayerContainer from './data-layers';
import { LightModeContext } from '../../../context/light-mode';
import DashboardNav from '../../../components/dashboard-nav';
import DashboardHomeContainer from './dashboard-home';
import DashboardTrendsSidebarContainer from 'containers/sidebars/dashboard-trends-sidebar';
import { LAYER_OPTIONS, LAYER_TITLE_TYPES, NAVIGATION } from '../../../utils/dashboard-utils';
import SpeciesFilterContainer from './species-filter';
import RegionsAnalysisContainer from './regions-analysis';
import EsriFeatureService from 'services/esri-feature-service';

function DashboardSidebar(props) {
  const t = useT();
  const { countryName, selectedIndex, map, regionLayers, setRegionLayers, speciesInfo } = props;

  const { lightMode, toggleLightMode } = useContext(LightModeContext);

  useEffect(() => {
    if (selectedIndex !== NAVIGATION.TRENDS) {
      removeRegionLayers();
      setRegionLayers({});
    }

    if (selectedIndex === NAVIGATION.BIO_IND) {
      const protectedLayers = EsriFeatureService.addProtectedAreaLayer();
      const layerName = LAYER_OPTIONS.HABITAT;
      const webTileLayer = EsriFeatureService.getXYZLayer(speciesInfo.scientificname.replace(' ', '_'), layerName, LAYER_TITLE_TYPES.TREND);
      webTileLayer.then(layer => {
        setRegionLayers({
          ...regionLayers,
          [layerName]: layer,
          [LAYER_OPTIONS.PROTECTED_AREAS]: protectedLayers.featureLayer,
        });
        map.add(layer);
        map.add(protectedLayers.featureLayer);
      });
    }
  }, [selectedIndex]);

  const removeRegionLayers = () => {
    let layers = regionLayers;
    Object.keys(layers).map(region => {
      // const { [region]: name, ...rest } = layers;
      // layers = rest;
      const foundLayer = map.layers.items.find(item => item.id === region);
      if (foundLayer) {
        map.remove(foundLayer);
      }
    });
  }

  return (
    <div className={cx(lightMode ? styles.light : '', selectedIndex === NAVIGATION.TRENDS ? styles.trends : '', styles.container)}>
      <button type="button" className={styles.darkMode} title={lightMode ? t('Switch to Dark mode') : t('Switch to Light mode')} onClick={() => toggleLightMode()}>
        {!lightMode && <LightModeIcon className={styles.icon} />}
        {lightMode && <DarkModeIcon className={styles.icon} />}
      </button>
      {/* <h1>{countryName}</h1> */}
      <h1>{t('Democratic Republic of the Congo')}</h1>

      <div className={styles.regionFilter}>
        <DashboardNav {...props} />
        {selectedIndex === NAVIGATION.HOME && <DashboardHomeContainer {...props} />}
        {selectedIndex === NAVIGATION.EXPLORE_SPECIES && <SpeciesFilterContainer {...props} />}
        {selectedIndex === NAVIGATION.REGION && <RegionsAnalysisContainer {...props} />}
        {selectedIndex === NAVIGATION.SPECIES || selectedIndex === NAVIGATION.DATA_LAYER && <DataLayerContainer {...props} />}
        {selectedIndex === NAVIGATION.BIO_IND && <BioDiversityContainer {...props} />}
        {selectedIndex === NAVIGATION.TRENDS && <DashboardTrendsSidebarContainer {...props} />}
      </div>
    </div>
  );
}

export default DashboardSidebar;
