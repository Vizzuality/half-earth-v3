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
    globalHabitatScore,
  } = props;

  const [selectedCountry, setSelectedCountry] = useState('Global');
  const [shiCountries, setShiCountries] = useState([]);
  const [chartData, setChartData] = useState();
  const [globalTrend, setGlobalTrend] = useState('');
  const [countryTrend, setCountryTrend] = useState('');
  const [globalTrendIcon, setGlobalTrendIcon] = useState(<Stable />);
  const [countryTrendIcon, setCountryTrendIcon] = useState(<Stable />);

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
    const currentCountry = dataByCountry[countryName];
    // const globalCountry = dataByCountry.Global;

    const defaultCountryScores = { area: [], connectivity: [], total: [] };
    const selectedCountryScores = { area: [], connectivity: [], total: [] };

    if (currentCountry) {
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
          label: `${countryName} Area`,
          fill: false,
          backgroundColor: '#2F2CAE',
          borderColor: '#2F2CAE',
          borderDash: [5, 5],
          pointBackgroundColor: '#2F2CAE',
          pointBorderColor: '#2F2CAE',
          pointStyle: false,
          data: defaultCountryScores.area,
        },
        {
          label: `${countryName} Connectivity`,
          fill: false,
          borderDash: [3, 3],
          backgroundColor: '#2F2CAE',
          borderColor: '#2F2CAE',
          pointBackgroundColor: '#2F2CAE',
          pointBorderColor: '#2F2CAE',
          pointStyle: false,
          data: defaultCountryScores.connectivity,
        },
        {
          label: `${countryName} Total`,
          fill: false,
          backgroundColor: '#2F2CAE',
          borderColor: '#2F2CAE',
          pointBackgroundColor: '#2F2CAE',
          pointBorderColor: '#2F2CAE',
          pointStyle: false,
          data: defaultCountryScores.total,
        },
        {
          label: `${countrySelected} Area`,
          fill: false,
          backgroundColor: '#228D19',
          borderColor: '#228D19',
          pointBackgroundColor: '#228D19',
          pointBorderColor: '#228D19',
          borderDash: [5, 5],
          pointStyle: false,
          data: selectedCountryScores.area,
        },
        {
          label: `${countrySelected} Connectivity`,
          fill: false,
          backgroundColor: '#228D19',
          borderColor: '#228D19',
          pointBackgroundColor: '#228D19',
          pointBorderColor: '#228D19',
          borderDash: [3, 3],
          pointStyle: false,
          data: selectedCountryScores.connectivity,
        },
        {
          label: `${countrySelected} Total`,
          fill: false,
          backgroundColor: '#228D19',
          borderColor: '#228D19',
          pointBackgroundColor: '#228D19',
          pointBorderColor: '#228D19',
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

    // this.countryHabitatScoreTitle = this.translate.instant('habitat_change', { change: this.countryHabitatChange, country: this.country, year: 2001 });
    // this.globalHabitatScoreTitle = this.translate.instant('habitat_global_change', { change: this.globalHabitatChange, year: 2001 });
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
      updateCountry={updateCountry}
      onCountryChange={onCountryChange}
      {...props}
    />
  );
}

export default HabitatContainer;
