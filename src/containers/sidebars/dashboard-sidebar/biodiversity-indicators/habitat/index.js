import React, { useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import { getCSSVariable } from 'utils/css-utils';

import ArrowDownward from 'icons/arrow-down-solid.svg?react';
import ArrowUpward from 'icons/arrow-up-solid.svg?react';
import Stable from 'icons/minus-solid.svg?react';

import HabitatComponent from './habitat-component';

function HabitatContainer(props) {
  const t = useT();
  const {
    lightMode,
    habitatTableData,
    dataByCountry,
    countryName,
    habitatScore,
    countryISO,
    globalHabitatScore,
  } = props;

  const [selectedCountry, setSelectedCountry] = useState('Global');
  const [shiCountries, setShiCountries] = useState([]);
  const [chartData, setChartData] = useState();
  const [globalTrend, setGlobalTrend] = useState('');
  const [countryTrend, setCountryTrend] = useState('');
  const [globalTrendIcon, setGlobalTrendIcon] = useState(<Stable />);
  const [countryTrendIcon, setCountryTrendIcon] = useState(<Stable />);
  const [defaultCountryName, setDefaultCountryName] = useState('Global');

  const TRENDS = {
    UPWARD: 'arrow_upward',
    DOWNWARD: 'arrow_downward',
    STABLE: '',
  };

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
          text: t('Species Habitat Score'),
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

  const getChartData = (countrySelected) => {
    const dates = [];
    let currentCountry;
    // const globalCountry = dataByCountry.Global;

    const defaultCountryScores = { area: [], connectivity: [], total: [] };
    const selectedCountryScores = { area: [], connectivity: [], total: [] };

    if (countryISO === 'EEWWF') {
      setDefaultCountryName('Global');
      currentCountry = dataByCountry.Global;

      if (currentCountry) {
        if (countrySelected !== 'Global') {
          currentCountry.shs?.forEach((row) => {
            defaultCountryScores.area.push(row.area_score * 100);
            defaultCountryScores.connectivity.push(
              row.connectivity_score * 100
            );
            defaultCountryScores.total.push(row.shs * 100);
          });
        }

        dataByCountry[countrySelected]?.shs.forEach((row) => {
          dates.push(row.year);
          selectedCountryScores.area.push(row.area_score * 100);
          selectedCountryScores.connectivity.push(row.connectivity_score * 100);
          selectedCountryScores.total.push(row.shs * 100);
        });
      }
    } else if (currentCountry) {
      setDefaultCountryName(countryName);
      currentCountry = dataByCountry[countryName];

      currentCountry.shs?.forEach((row) => {
        defaultCountryScores.area.push(row.propchange * 100);
      });

      dataByCountry[countrySelected]?.shs.forEach((row) => {
        dates.push(row.year);
        selectedCountryScores.area.push(row.propchange * 100);
      });

      if (currentCountry.frag.length > 0) {
        const fragYear = currentCountry.frag?.[0].gisfrag;
        currentCountry?.frag?.forEach((row) => {
          defaultCountryScores.connectivity.push(
            (row.gisfrag / fragYear) * 100
          );
        });

        const selectedFragYear =
          dataByCountry[countrySelected]?.frag?.[0].gisfrag;
        dataByCountry[countrySelected]?.frag?.forEach((row) => {
          selectedCountryScores.connectivity.push(
            (row.gisfrag / selectedFragYear) * 100
          );
        });
      }

      for (let index = 0; index < dates.length; index += 1) {
        const dcTotal =
          (defaultCountryScores.area[index] +
            defaultCountryScores.connectivity[index]) /
          2;
        defaultCountryScores.total.push(dcTotal);

        const scTotal =
          (selectedCountryScores.area[index] +
            selectedCountryScores.connectivity[index]) /
          2;
        selectedCountryScores.total.push(scTotal);
      }
    }

    setChartData({
      labels: dates,
      datasets: [
        {
          label: `${countrySelected} Area`,
          fill: false,
          backgroundColor: getCSSVariable('habitat-country'),
          borderColor: getCSSVariable('habitat-country'),
          borderDash: [5, 5],
          pointBackgroundColor: getCSSVariable('habitat-country'),
          pointBorderColor: getCSSVariable('habitat-country'),
          pointStyle: false,
          data: defaultCountryScores.area,
        },
        {
          label: `${countrySelected} Connectivity`,
          fill: false,
          borderDash: [3, 3],
          backgroundColor: getCSSVariable('habitat-country'),
          borderColor: getCSSVariable('habitat-country'),
          pointBackgroundColor: getCSSVariable('habitat-country'),
          pointBorderColor: getCSSVariable('habitat-country'),
          pointStyle: false,
          data: defaultCountryScores.connectivity,
        },
        {
          label: `${countrySelected} Total`,
          fill: false,
          backgroundColor: getCSSVariable('habitat-country'),
          borderColor: getCSSVariable('habitat-country'),
          pointBackgroundColor: getCSSVariable('habitat-country'),
          pointBorderColor: getCSSVariable('habitat-country'),
          pointStyle: false,
          data: defaultCountryScores.total,
        },
        {
          label: `${defaultCountryName} Area`,
          fill: false,
          backgroundColor: getCSSVariable('habitat-country-compare'),
          borderColor: getCSSVariable('habitat-country-compare'),
          pointBackgroundColor: getCSSVariable('habitat-country-compare'),
          pointBorderColor: getCSSVariable('habitat-country-compare'),
          borderDash: [5, 5],
          pointStyle: false,
          data: selectedCountryScores.area,
        },
        {
          label: `${defaultCountryName} Connectivity`,
          fill: false,
          backgroundColor: getCSSVariable('habitat-country-compare'),
          borderColor: getCSSVariable('habitat-country-compare'),
          pointBackgroundColor: getCSSVariable('habitat-country-compare'),
          pointBorderColor: getCSSVariable('habitat-country-compare'),
          borderDash: [3, 3],
          pointStyle: false,
          data: selectedCountryScores.connectivity,
        },
        {
          label: `${defaultCountryName} Total`,
          fill: false,
          backgroundColor: getCSSVariable('habitat-country-compare'),
          borderColor: getCSSVariable('habitat-country-compare'),
          pointBackgroundColor: getCSSVariable('habitat-country-compare'),
          pointBorderColor: getCSSVariable('habitat-country-compare'),
          pointStyle: false,
          data: selectedCountryScores.total,
        },
      ],
    });
  };

  const onCountryChange = (event) => {
    setSelectedCountry(event.currentTarget.value);
    getChartData(event.currentTarget.value);
  };

  const updateCountry = (country) => {
    setSelectedCountry(country.value);
    getChartData(country.value);
  };

  const setTrendArrows = () => {
    const hs = habitatScore;
    const gs = globalHabitatScore;

    if (hs < 100) {
      setCountryTrend(TRENDS.DOWNWARD);
      setCountryTrendIcon(<ArrowDownward />);
    } else if (hs > 100) {
      setCountryTrend(TRENDS.UPWARD);
      setCountryTrendIcon(<ArrowUpward />);
    } else {
      setCountryTrend(TRENDS.STABLE);
      setCountryTrendIcon(<Stable />);
    }

    if (gs < 100) {
      setGlobalTrend(TRENDS.DOWNWARD);
      setGlobalTrendIcon(<ArrowDownward />);
    } else if (gs > 100) {
      setGlobalTrend(TRENDS.DOWNWARD);
      setGlobalTrendIcon(<ArrowUpward />);
    } else {
      setGlobalTrend(TRENDS.DOWNWARD);
      setGlobalTrendIcon(<Stable />);
    }
  };

  useEffect(() => {
    if (habitatTableData.length) {
      const countries = habitatTableData.map((item) => item.country);

      const sortedCountries = countries.sort((a, b) => {
        const nameA = a.toUpperCase();
        const nameB = b.toUpperCase();
        if (nameA === 'GLOBAL' || nameB === 'GLOBAL') {
          return -2;
        }
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      setShiCountries(sortedCountries);

      getChartData('Global');

      setTrendArrows();
    }
  }, [habitatTableData]);

  return (
    <HabitatComponent
      selectedCountry={selectedCountry}
      shiCountries={shiCountries}
      chartData={chartData}
      globalTrend={globalTrend}
      countryTrend={countryTrend}
      globalTrendIcon={globalTrendIcon}
      countryTrendIcon={countryTrendIcon}
      chartOptions={chartOptions}
      defaultCountryName={defaultCountryName}
      updateCountry={updateCountry}
      onCountryChange={onCountryChange}
      {...props}
    />
  );
}

export default HabitatContainer;
