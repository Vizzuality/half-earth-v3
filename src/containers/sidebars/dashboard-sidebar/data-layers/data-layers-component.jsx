import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { useT } from '@transifex/react';

import { getCSSVariable } from 'utils/css-utils';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  plugins,
  Filler,
} from 'chart.js';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';
import { Loading } from 'he-components';

import Button from 'components/button';

import EsriFeatureService from 'services/esri-feature-service';

import { NAVIGATION } from 'constants/dashboard-constants.js';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import SpeciesInfoContainer from '../species-info';

import styles from './data-layers-styles.module.scss';
import DataLayersGroupedList from './grouped-list';

ChartJS.register(
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Filler,
  Legend,
  CategoryScale
);

function DataLayerComponent(props) {
  const t = useT();
  const { map, speciesInfo, dataLayerData, selectedRegion, setSelectedIndex } =
    props;

  const { lightMode } = useContext(LightModeContext);
  const [dataLayers, setDataLayers] = useState({});
  const [dataPoints, setDataPoints] = useState();
  const [privateDataPoints, setPrivateDataPoints] = useState({
    'Point Observations': {
      items: [],
      total_no_rows: '',
      isActive: false,
      showChildren: false,
    },
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
  });
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState();
  const [showHabitatChart, setShowHabitatChart] = useState(false);

  const chartOptions = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: false,
        display: true,
        title: {
          display: true,
          text: t('Year'),
          color: lightMode ? getCSSVariable('black') : getCSSVariable('white'),
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
        },
      },
      y: {
        beginAtZero: false,
        display: true,
        title: {
          display: true,
          text: t('Habitat Suitable Range'),
          color: lightMode ? getCSSVariable('black') : getCSSVariable('white'),
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
        },
      },
    },
  };

  useEffect(() => {
    if (!speciesInfo) return;
    getHabitatMapData();
  }, [speciesInfo]);

  useEffect(() => {
    if (!dataLayerData) return;
    const publicData = {
      ...groupByTypeTitle(dataLayerData),
      'Habitat Loss/Gain': {
        items: [],
        total_no_rows: '',
        isActive: false,
        showChildren: false,
      },
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
      if (
        key.toUpperCase() === 'EXPERT RANGE MAPS' ||
        key.toUpperCase() === 'POINT OBSERVATIONS'
      ) {
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
  };

  const handleBack = () => {
    setSelectedIndex(NAVIGATION.EXPLORE_SPECIES);
  };

  const getHabitatMapData = async () => {
    const habitatMapUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/indicators/habitat-trends/map?scientificname=${speciesInfo.scientificname}`;
    const response = await fetch(habitatMapUrl);
    const d = await response.json();

    // remove Year row
    d.data.shift();

    setChartData({
      labels: d.data.map((item) => item[0]),
      datasets: [
        {
          fill: false,
          backgroundColor: 'rgba(24, 186, 180, 1)',
          borderColor: 'rgba(24, 186, 180, 1)',
          pointStyle: false,
          data: d.data.map((item) => item[2]),
        },
        {
          fill: '-1',
          backgroundColor: 'rgba(24, 186, 180, 0.7)',
          borderColor: 'rgba(24, 186, 180, 1)',
          pointStyle: false,
          data: d.data.map((item) => item[3]),
        },
      ],
    });
  };

  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span className={styles.sectionTitle}>{t('Data Layers')}</span>
        {selectedRegion && (
          <Button
            className={styles.back}
            handleClick={handleBack}
            label={t('Back')}
          />
        )}
      </div>
      <hr className={hrTheme.dark} />

      <SpeciesInfoContainer speciesInfo={speciesInfo} />
      <hr className={hrTheme.dark} />
      {isLoading && <Loading height={200} />}
      {!isLoading && dataPoints && (
        <>
          <button
            className={styles.distributionTitle}
            type="button"
            onClick={() => {}}
          >
            <span>{t('Species Data: Public')}</span>
          </button>
          <DataLayersGroupedList
            dataPoints={dataPoints}
            setDataPoints={setDataPoints}
            setShowHabitatChart={setShowHabitatChart}
            {...props}
          />
          {chartData && showHabitatChart && (
            <Line options={chartOptions} data={chartData} />
          )}
          <hr className={hrTheme.dark} />
          <button
            className={styles.distributionTitle}
            type="button"
            onClick={() => {}}
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
            onClick={() => {}}
          >
            <span>{t('Regions Data')}</span>
          </button>
          <DataLayersGroupedList
            dataPoints={regionsData}
            setDataPoints={setRegionsData}
            {...props}
          />
        </>
      )}
    </section>
  );
}

export default DataLayerComponent;
