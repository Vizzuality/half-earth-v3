import React, { useContext, useEffect, useState } from 'react';
import { useT } from '@transifex/react';
import cx from 'classnames';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Loading } from 'he-components';

import BioDiversityContainer from './biodiversity-indicators';
import styles from './dashboard-sidebar-styles.module.scss';
import DataLayerContainer from './data-layers';
import RegionsAnalysisComponent from './regions-analysis/regions-analysis-component';
import { LightModeContext } from '../../../context/light-mode';
import FilterContainer from '../../../components/filters';
import SpeciesListContainer from '../../../components/species-list';
import DashboardNav from '../../../components/dashboard-nav';
import DashboardHomeContainer from './dashboard-home';
import DashboardTrendsSidebarContainer from 'containers/sidebars/dashboard-trends-sidebar';
import { NAVIGATION } from '../../../utils/dashboard-utils';

function DashboardSidebar(props) {
  const t = useT();
  const { countryName, taxaList, selectedIndex, map, regionLayers, setRegionLayers } = props;

  const filterStart = [
    {
      name: 'dataset',
      title: 'Sources prévues',
      filters: [
        {
          name: 'Carte de répartition des experts',
          active: false,
          test: species => species.datasetList.map(d => d.product_type).indexOf('range') > -1,
          count: 0,
          type: 'and',
          result: false,
        },
      ],
    },
    {
      name: 'dataset',
      title: 'Sources enregistrées',
      filters: [
        {
          name: 'Occurrence',
          active: false,
          test: species => species.datasetList.map(d => d.product_type).indexOf('points') > -1,
          count: 0,
          result: false,
          type: 'and',
        },
        {
          name: 'Inventaire local',
          active: false,
          test: species => species.datasetList.map(d => d.product_type).indexOf('localinv') >
            -1,
          result: false,
          count: 0,
          type: 'and',
        },
      ],
    },
    {
      name: 'threat',
      title: 'IUCN Statut',
      filters: [
        {
          name: 'En danger critique d\'extinction',
          active: false,
          test: species => species.traits?.threat_status_code === 'CR',
          count: 0,
          result: false,
          type: 'or',
        },
        {
          name: 'En danger',
          result: false,
          active: false,
          test: species => species.traits?.threat_status_code === 'EN',
          count: 0,
          type: 'or',
        },
        {
          name: 'Vulnérable',
          active: false,
          test: species => species.traits?.threat_status_code === 'VU',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: 'Préoccupation mineure',
          active: false,
          test: species => species.traits?.threat_status_code === 'LC',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: 'Inconnu',
          active: false,
          result: false,
          test: species => species.traits?.threat_status_code === undefined,
          count: 0,
          type: 'or',
        },
      ],
    },
  ];

  const [filters, setFilters] = useState(filterStart);
  const [isLoading, setIsLoading] = useState(true);
  const { lightMode, toggleLightMode } = useContext(LightModeContext);

  useEffect(() => {
    if (!taxaList.length) return;
    setIsLoading(false);
  }, [taxaList]);

  // useEffect(() => {
  //   if (regionLayers.hasOwnProperty('SPI REGIONS') && selectedIndex !== NAVIGATION.TRENDS) {
  //     const layer = regionLayers['SPI REGIONS'];
  //     const { ['SPI REGIONS']: name, ...rest } = regionLayers;
  //     setRegionLayers(rest);
  //     map.remove(layer);
  //   }

  // }, [selectedIndex])


  return (
    <div className={cx(lightMode ? styles.light : '', selectedIndex === NAVIGATION.TRENDS ? styles.trends : '', styles.container)}>
      <button type="button" className={styles.darkMode} title={lightMode ? t('Switch to Dark mode') : t('Switch to Light mode')} onClick={() => toggleLightMode()}>
        {!lightMode && <LightModeIcon className={styles.icon} />}
        {lightMode && <DarkModeIcon className={styles.icon} />}
      </button>
      {/* <h1>{countryName}</h1> */}
      <h1>République démocratique du Congo</h1>

      <div className={styles.regionFilter}>
        <DashboardNav {...props} />
        {selectedIndex === NAVIGATION.HOME && <DashboardHomeContainer {...props} />}
        {selectedIndex === NAVIGATION.REGION && <RegionsAnalysisComponent {...props} />}
        {/* <div className={styles.filters}>
            {isLoading && <Loading height={200} />}
            {!isLoading && <>
              <FilterContainer
                filters={filters}
                setFilters={setFilters}
                {...props} />
              <SpeciesListContainer {...props} />
            </>
            }
          </div> */}

        {selectedIndex === NAVIGATION.SPECIES || selectedIndex === NAVIGATION.DATA_LAYER && <DataLayerContainer {...props} />}
        {selectedIndex === NAVIGATION.BIO_IND && <BioDiversityContainer {...props} />}
        {selectedIndex === NAVIGATION.TRENDS && <DashboardTrendsSidebarContainer {...props} />}
      </div>
    </div>
  );
}

export default DashboardSidebar;
