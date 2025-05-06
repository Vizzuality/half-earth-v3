import React, { useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import { getCSSVariable } from 'utils/css-utils';

import ProtectionComponent from './protection-component';

function ProtectionContainer(props) {
  const t = useT();
  const {
    protectionTableData,
    countryName,
    lightMode,
    spiDataByCountry,
    countryISO,
  } = props;
  const [selectedCountry, setSelectedCountry] = useState('Global');
  const [shiCountries, setShiCountries] = useState([]);
  const [globalScore, setGlobalScore] = useState(0);
  const [chartData, setChartData] = useState();
  const [defaultCountryName, setDefaultCountryName] = useState('Global');

  const getChartData = (countrySelected) => {
    let currentCountry;
    const globalCountry = spiDataByCountry.Global;
    const dates = [];
    const defaultCountryScores = { values: [] };
    const selectedCountryScores = { values: [] };

    if (countryISO === 'EEWWF') {
      setDefaultCountryName('Global');
      currentCountry = spiDataByCountry[countrySelected];

      if (currentCountry) {
        currentCountry?.forEach((row) => {
          defaultCountryScores.values.push(row.sps);
        });

        globalCountry?.forEach((row) => {
          dates.push(row.year);
          selectedCountryScores.values.push(row.sps);
        });

        if (globalCountry?.length) {
          setGlobalScore(globalCountry[globalCountry.length - 1].val - 100);
        }
      }
    } else {
      setDefaultCountryName(countryName);
      currentCountry = spiDataByCountry[countryName];

      if (currentCountry) {
        currentCountry.shs?.forEach((row) => {
          defaultCountryScores.values.push(row.shs_score);
        });

        spiDataByCountry[countrySelected]?.shs.forEach((row) => {
          dates.push(row.year);
          selectedCountryScores.values.push(row.shs_score);
        });

        if (globalCountry?.shs.length) {
          setGlobalScore(
            globalCountry.shs[globalCountry.shs.length - 1].val - 100
          );
        }
      }
    }

    setChartData({
      labels: dates,
      datasets: [
        {
          label: `${countrySelected}`,
          fill: false,
          backgroundColor: getCSSVariable('habitat-country'),
          borderColor: getCSSVariable('habitat-country'),
          pointBackgroundColor: getCSSVariable('habitat-country'),
          pointBorderColor: getCSSVariable('habitat-country'),
          pointStyle: false,
          data: defaultCountryScores.values,
        },
        {
          label: `${defaultCountryName}`,
          fill: false,
          backgroundColor: getCSSVariable('habitat-country-compare'),
          borderColor: getCSSVariable('habitat-country-compare'),
          pointBackgroundColor: getCSSVariable('habitat-country-compare'),
          pointBorderColor: getCSSVariable('habitat-country-compare'),
          pointStyle: false,
          data: selectedCountryScores.values,
        },
      ],
    });

    // suitableCountryProtectedArea = this.translate.instant(
    //   'suitable_protected_area_km',
    //   {
    //     countryArea: this.protectionTargetArea.toLocaleString(
    //       [],
    //       { maximumFractionDigits: 0 },
    //     ),
    //   },
    // );
    // this.suitableGlobalProtectedArea = this.translate.instant(
    //   'suitable_protected_area_km',
    //   {
    //     countryArea: this.globalProtectionTargetArea.toLocaleString(
    //       [],
    //       { maximumFractionDigits: 0 },
    //     ),
    //   },
    // );
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
          text: t('Species Protection Score'),
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

  const onCountryChange = (event) => {
    setSelectedCountry(event.currentTarget.value);
    getChartData(event.currentTarget.value);
  };

  const updateCountry = (country) => {
    setSelectedCountry(country.value);
    getChartData(country.value);
  };

  useEffect(() => {
    if (protectionTableData.length) {
      const countries = protectionTableData.map((item) => item.country);

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
    }
  }, [protectionTableData]);

  return (
    <ProtectionComponent
      selectedCountry={selectedCountry}
      shiCountries={shiCountries}
      globalScore={globalScore}
      chartData={chartData}
      chartOptions={chartOptions}
      defaultCountryName={defaultCountryName}
      onCountryChange={onCountryChange}
      updateCountry={updateCountry}
      {...props}
    />
  );
}

export default ProtectionContainer;
