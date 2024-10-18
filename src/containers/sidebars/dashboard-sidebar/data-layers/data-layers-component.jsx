import React, { useContext, useEffect, useState } from 'react';
import { useT } from '@transifex/react';
import cx from 'classnames';
import { Loading } from 'he-components';
import Button from 'components/button';
import SpeciesInfoContainer from '../species-info';
import EsriFeatureService from 'services/esri-feature-service';
import hrTheme from 'styles/themes/hr-theme.module.scss';
import styles from './data-layers-styles.module.scss';
import { LightModeContext } from '../../../../context/light-mode';
import DataLayersGroupedList from './grouped-list';
import { NAVIGATION } from '../../../../utils/dashboard-utils';

function DataLayerComponent(props) {
  const t = useT();
  const { map, speciesInfo, dataLayerData, selectedRegion, setSelectedIndex } = props;

  const { lightMode } = useContext(LightModeContext);
  const [dataLayers, setDataLayers] = useState({});
  const [dataPoints, setDataPoints] = useState();
  const [privateDataPoints, setPrivateDataPoints] = useState({
    'Point Observations': {
      items: [],
      total_no_rows: '',
      isActive: false,
      showChildren: false,
    }
  });
  const [regionsData, setRegionsData] = useState({
    'Protected Areas': {
      items: [],
      total_no_rows: '',
      isActive: false,
      showChildren: false,
    },
    // 'Proposed Protection': {
    //   items: [],
    //   total_no_rows: '',
    //   isActive: false,
    //   showChildren: false,
    // },
    'Administrative Layers': {
      items: [],
      total_no_rows: '',
      isActive: false,
      showChildren: false,
    },
  })
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!dataLayerData) return;
    const publicData = {
      ...groupByTypeTitle(dataLayerData),
      'Habitat Loss/Gain': {
        items: [],
        total_no_rows: '',
        isActive: false,
        showChildren: false,
      }
    };
    setDataPoints(publicData);

  }, [dataLayerData]);

  useEffect(() => {
    if (!dataPoints) return;
    setIsLoading(false);
  }, [dataPoints]);

  const groupByTypeTitle = (arr) => {
    return arr.reduce((acc, obj) => {
      const key = obj.type_title;
      if (key.toUpperCase() === 'EXPERT RANGE MAPS' || key.toUpperCase() === 'POINT OBSERVATIONS') {
        if (!acc[key]) {
          acc[key] = {
            items: [],
            total_no_rows: 0,
            isActive: false,
            showChildren: false,
          };
        }
        obj.isActive = false;
        /// TODO: Remove Expert Range Maps restriction
        // if (key.toUpperCase() === 'EXPERT RANGE MAPS') {
        //   if (acc[key].items < 2) {
        //     acc[key].items.push(obj);
        //     acc[key].total_no_rows += obj.no_rows || 0; // Summing the no_rows property
        //   }
        // } else {
        acc[key].items.push(obj);
        acc[key].total_no_rows += obj.no_rows || 0; // Summing the no_rows property
        // }
      }
      return acc;
    }, {});
  }

  const handleBack = () => {
    setSelectedIndex(NAVIGATION.EXPLORE_SPECIES);
  }

  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className={styles.sectionTitle}>{t('Data Layers')}</span>
        {selectedRegion && <Button
          className={styles.back}
          handleClick={handleBack}
          label={t('Back')}
        />}
      </div>
      <hr className={hrTheme.dark} />

      <SpeciesInfoContainer speciesInfo={speciesInfo} />
      <hr className={hrTheme.dark} />
      {isLoading && <Loading height={200} />}
      {!isLoading && dataPoints && <>
        <button
          className={styles.distributionTitle}
          type="button"
          onClick={() => { }}
        >
          <span>{t('Species Data: Public')}</span>
        </button>
        <DataLayersGroupedList
          dataPoints={dataPoints}
          setDataPoints={setDataPoints}
          {...props} />
        <hr className={hrTheme.dark} />
        <button
          className={styles.distributionTitle}
          type="button"
          onClick={() => { }}
        >
          <span>{t('Species Data: Private')}</span>
        </button>
        <DataLayersGroupedList
          dataPoints={privateDataPoints}
          setDataPoints={setPrivateDataPoints}
          {...props}
        />
        <hr className={hrTheme.dark} />
        <button
          className={styles.distributionTitle}
          type="button"
          onClick={() => { }}
        >
          <span>{t('Regions Data')}</span>
        </button>
        <DataLayersGroupedList
          dataPoints={regionsData}
          setDataPoints={setRegionsData}
          {...props} />
      </>}
    </section>
  );
}

export default DataLayerComponent;
