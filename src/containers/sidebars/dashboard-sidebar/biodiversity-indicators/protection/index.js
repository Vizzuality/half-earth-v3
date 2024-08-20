import React, { useEffect, useState } from 'react';
import { getCSSVariable } from 'utils/css-utils';
import ProtectionComponent from './protection-component';

function ProtectionContainer(props) {
  const {protectionTableData, countryName, dataByCountry, lightMode,} = props;
  const [selectedCountry, setSelectedCountry] = useState('Global');
  const [shiCountries, setShiCountries] = useState([]);
  const [globalScore, setGlobalScore] = useState(0);
  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (protectionTableData.length) {
      const countries = protectionTableData.map(item => item.country);

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

  }, [protectionTableData])


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
          text: 'Year',
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
          text: 'Species Habitat Score',
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
  }

  const getChartData = (countrySelected) => {
    const dates = [];
    const currentCountry = dataByCountry[countryName];
    const globalCountry = dataByCountry.Global;

    const defaultCountryScores = { values: [] };
    const selectedCountryScores = { values: [] };

    if (currentCountry) {
      currentCountry.shs?.forEach(row => {
        defaultCountryScores.values.push(row.propchange * 100);
      });

      dataByCountry[countrySelected]?.shs.forEach(row => {
        dates.push(row.year);
        selectedCountryScores.values.push(row.propchange * 100);
      });

      setGlobalScore(globalCountry.shs[globalCountry.shs.length - 1].val - 100);
    }

    setChartData({
      labels: dates,
      datasets: [
        {
          label: `${countryName}`,
          fill: false,
          backgroundColor: '#2F2CAE',
          borderColor: '#2F2CAE',
          pointBackgroundColor: '#2F2CAE',
          pointBorderColor: '#2F2CAE',
          pointStyle: false,
          data: defaultCountryScores.values,
        },
        {
          label: `${countrySelected}`,
          fill: false,
          backgroundColor: '#228D19',
          borderColor: '#228D19',
          pointBackgroundColor: '#228D19',
          pointBorderColor: '#228D19',
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
  }

  const updateCountry = (country) => {
    setSelectedCountry(country.value);
    getChartData(country.value);
  }

  return <ProtectionComponent
    selectedCountry={selectedCountry}
    shiCountries={shiCountries}
    globalScore={globalScore}
    chartData={chartData}
    chartOptions={chartOptions}
    onCountryChange={onCountryChange}
    updateCountry={updateCountry}
    {...props} />;
}

export default ProtectionContainer;
