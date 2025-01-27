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
  Filler,
} from 'chart.js';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';
import { Loading } from 'he-components';

import Button from 'components/button';

import {
  LAYER_OPTIONS,
  NAVIGATION,
  DATA_POINT_TYPE,
  LAYER_TITLE_TYPES,
} from 'constants/dashboard-constants.js';

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
  const {
    speciesInfo,
    dataLayerData,
    selectedRegion,
    setSelectedIndex,
    setSpeciesInfo,
    setScientificName,
    setDataLayerData,
    setMapLegendLayers,
  } = props;

  const { lightMode } = useContext(LightModeContext);
  const [dataPoints, setDataPoints] = useState();
  const [valuesExists, setValuesExists] = useState(false);
  const [privateDataPoints, setPrivateDataPoints] = useState([
    {
      label: t('Point Observations'),
      items: [],
      total_no_rows: '',
      isActive: false,
      showChildren: false,
      type: DATA_POINT_TYPE.PRIVATE,
      id: LAYER_OPTIONS.POINT_OBSERVATIONS,
    },
  ]);
  const [regionsData, setRegionsData] = useState([
    {
      label: t('Protected Areas'),
      items: [],
      total_no_rows: '',
      isActive: false,
      showChildren: false,
      type: DATA_POINT_TYPE.REGIONS_DATA,
      id: LAYER_OPTIONS.PROTECTED_AREAS,
    },
    // 'Proposed Protection': {
    //   items: [],
    //   total_no_rows: '',
    //   isActive: false,
    //   showChildren: false,
    // },
    {
      label: t('Administrative Layers'),
      items: [],
      total_no_rows: '',
      isActive: false,
      showChildren: false,
      type: DATA_POINT_TYPE.REGIONS_DATA,
      id: LAYER_OPTIONS.ADMINISTRATIVE_LAYERS,
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState();
  const [showHabitatChart, setShowHabitatChart] = useState(false);
  const [isHabitatChartLoading, setIsHabitatChartLoading] = useState(false);

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

  const groupByTypeTitle = (objects) => {
    const grouped = {};

    objects.forEach((obj) => {
      const groupKey = obj.type_title;
      if (
        groupKey.toUpperCase() === 'EXPERT RANGE MAPS' ||
        groupKey.toUpperCase() === 'POINT OBSERVATIONS'
      ) {
        if (!grouped[groupKey]) {
          grouped[groupKey] = {
            label: obj.type_title,
            total_no_rows: 0,
            isActive: true,
            showChildren: false,
            items: [],
            type: DATA_POINT_TYPE.PUBLIC,
            id:
              groupKey.toUpperCase() === 'EXPERT RANGE MAPS'
                ? LAYER_OPTIONS.EXPERT_RANGE_MAPS
                : LAYER_OPTIONS.POINT_OBSERVATIONS,
          }; // Create a new object with the original object's properties and an empty 'item' array
        }
        obj.isActive = true;
        obj.parentId = grouped[groupKey].id;
        obj.id = obj.label;
        grouped[groupKey].items.push(obj); // Push the current object into the 'item' array of the matching group
        grouped[groupKey].total_no_rows += obj.no_rows || 0; // Summing the no_rows property
      }
    });

    return Object.values(grouped);
  };

  const handleBack = () => {
    setDataLayerData(null);
    setSpeciesInfo(null);
    setScientificName(null);
    setMapLegendLayers([]);

    if (selectedRegion) {
      setSelectedIndex(NAVIGATION.EXPLORE_SPECIES);
    } else {
      setSelectedIndex(NAVIGATION.HOME);
    }
  };

  const getHabitatMapData = async () => {
    const habitatMapUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/indicators/habitat-trends/map?scientificname=${speciesInfo.scientificname}`;
    const response = await fetch(habitatMapUrl);
    const d = await response.json();

    // remove Year row
    d.data.shift();

    if (d.data.length) {
      setValuesExists(true);

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
    }
  };

  useEffect(() => {
    if (!speciesInfo) return;
    getHabitatMapData();
  }, [speciesInfo]);

  useEffect(() => {
    if (!dataLayerData) return;
    const publicData = [
      ...groupByTypeTitle(dataLayerData),
      {
        label: t(LAYER_TITLE_TYPES.HABITAT),
        items: [],
        id: LAYER_OPTIONS.HABITAT,
        total_no_rows: '',
        isActive: false,
        showChildren: false,
        type: DATA_POINT_TYPE.PUBLIC,
      },
    ];
    setDataPoints(publicData);
  }, [dataLayerData]);

  useEffect(() => {
    if (!dataPoints) return;
    setIsLoading(false);
  }, [dataPoints]);

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
        <Button
          className={styles.back}
          handleClick={handleBack}
          label={t('Back')}
        />
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
            setIsHabitatChartLoading={setIsHabitatChartLoading}
            {...props}
          />
          {isHabitatChartLoading && <Loading height={200} />}
          {valuesExists && showHabitatChart && (
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
            isPrivate
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
