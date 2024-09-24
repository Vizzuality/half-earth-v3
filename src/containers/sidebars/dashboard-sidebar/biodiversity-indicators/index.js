import React, { useContext, useEffect, useState } from 'react';

import BioDiversityComponent from './biodiversity-indicators-component';
import country_attrs from '../mol-country-attributes.json';
import { LightModeContext } from '../../../../context/light-mode';

function BioDiversityContainer(props) {
  const { data, countryName, dataByCountry } = props;

  const { lightMode } = useContext(LightModeContext);
  const [selectedTab, setSelectedTab] = useState(2);
  const [habitatScore, setHabitatScore] = useState('0.00');
  const [habitatTableData, setHabitatTableData] = useState([]);
  const [globalHabitatScore, setGlobalHabitatScore] = useState(0);
  const [protectionScore, setProtectionScore] = useState();
  const [globalProtectionScore, setGlobalProtectionScore] = useState('0.00');
  const [protectionTableData, setProtectionTableData] = useState([]);
  const [protectionArea, setProtectionArea] = useState('0');
  const [globalProtectionArea, setGlobalProtectionArea] = useState('0');


  // get habitat score information
  useEffect(() => {
    if (dataByCountry && data) {
      const { habitatScore, globalHabitatScore } = getHabitatScore();
      setHabitatScore(habitatScore);
      setGlobalHabitatScore(globalHabitatScore);

      getHabitatTableData();
    }
  }, [dataByCountry, data]);

  // get protection score information
  useEffect(() => {
    if (data && habitatTableData && dataByCountry) {
      const { protectionScore, globalProtectionScore } = getProtectionScore(data.reserveCoverageData, data.habitatMetricesData);
      setProtectionScore(protectionScore);
      setGlobalProtectionScore(globalProtectionScore);
      getProtectionTableData(data.reserveCoverageData, data.habitatMetricesData);
    }
  }, [habitatTableData])

  const getHabitatScore = () => {
    const country = dataByCountry[countryName];

    // TODO: handle no frag values
    const startYearValue = country?.frag[0]?.gisfrag ?? 0;
    // eslint-disable-next-line no-unsafe-optional-chaining
    const lastCountryYearValue = country?.shs.length - 1;
    let globalAreaScore = 0;
    let globalConnectivityScore = 0;

    const { countryAreaScore, countryConnectivityScore } = getCountryScores(country, lastCountryYearValue, startYearValue);

    if (dataByCountry.Global?.shs[lastCountryYearValue]) {
      globalAreaScore = dataByCountry.Global?.shs[lastCountryYearValue].propchange;

      if(dataByCountry.Global?.frag[lastCountryYearValue]?.gisfrag){
        globalConnectivityScore = (
          // eslint-disable-next-line no-unsafe-optional-chaining
          dataByCountry.Global?.frag[lastCountryYearValue].gisfrag / startYearValue
        );
      }
    }

    const scores = {
      habitatScore: (((countryAreaScore + countryConnectivityScore) / 2) * 100).toFixed(2),
      globalHabitatScore: ((globalAreaScore + globalConnectivityScore) / 2) * 100
    };

    return scores;
  }

  const getHabitatTableData = () => {
    const tableData = [];

    Object.keys(dataByCountry).forEach(country => {
      const habitatCountry = dataByCountry[countryName];

      // const countrySHS = country?.shs;
      const startYearValue = habitatCountry?.frag[0]?.gisfrag ?? 0;
      // eslint-disable-next-line no-unsafe-optional-chaining
      const lastCountryYearValue = habitatCountry?.shs.length - 1;
      const countryData = dataByCountry[country];
      const global2001 = dataByCountry.Global?.shs[0]?.val || 0;
      const country2001 = roundUpNumber(countryData.shs[0]?.val || 0);
      const stewardship = (country2001 / global2001) * 100;

      const { countryAreaScore, countryConnectivityScore } = getCountryScores(countryData, lastCountryYearValue, startYearValue);
      const shs = ((countryAreaScore + countryConnectivityScore) / 2) * 100;

      if (!Number.isNaN(shs)) {
        tableData.push({
          country, stewardship, countryAreaScore, countryConnectivityScore, shs,
        });
      }
    });

    setHabitatTableData(tableData);
  }

  const getProtectionScore = (protection, hdm) => {
    const cattr = country_attrs.filter(
      r => r.NAME === countryName,
    )[0];

    const refinedRangeSize = hdm.refined_grouped_stats.filter(
      r => r.ZONEID === cattr.GEO_ID,
    )[0].sum;

    const protectionTargetArea = targetProtectedArea(refinedRangeSize);

    const globalProtectionTargetArea = targetProtectedArea(hdm.refined_range_size);

    const reserveList = protection.filter(r2 => r2.ISO3 === cattr.ISO3);
    // const globalReserveList = protection;

    const protectionArea = reserveList.map(r => r.sum).reduce((a, b) => a + b, 0);

    // could replace hdm.refined_grouped_stats with globalReserveList
    const globalProtectionArea = protection
      .map(r => r.sum)
      .reduce((a, b) => a + b, 0);

    setProtectionArea(protectionArea);
    setGlobalProtectionArea(globalProtectionArea);

    const area = (protectionArea / protectionTargetArea);
    const globalArea = (globalProtectionArea / globalProtectionTargetArea);

    const scores = {
      protectionScore: (Math.min(area * 100, 100)).toFixed(2),
      globalProtectionScore: (Math.min(globalArea * 100, 100)).toFixed(2)
    }

    return scores;
  }

  const getProtectionTableData = (protection, hdm) => {
    const tableData = [];

    Object.keys(dataByCountry).forEach(country => {
      let { refined_range_size } = hdm;
      let reserves = protection;

      if (country.toLowerCase() !== 'global') {
        const cattr = country_attrs.filter(
          r => r.NAME === country,
        )[0];

        reserves = protection.filter(item => item.ISO3 === cattr.ISO3);

        refined_range_size = hdm.refined_grouped_stats.filter(
          r => r.ZONEID === cattr.GEO_ID,
        )[0].sum;
      }

      const targetArea = targetProtectedArea(refined_range_size);
      const allArea = reserves.map(r => r.sum).reduce((a, b) => a + b, 0);
      const sps = Math.min((allArea / targetArea) * 100, 100);

      const habitatStewardShip = habitatTableData.filter(
        item => item.country === country,
      )?.[0];
      const stewardship = habitatStewardShip ? habitatStewardShip.stewardship : 0;

      if (!Number.isNaN(sps)) {
        // grab stewardship value from habitat table data
        tableData.push({
          country,
          stewardship,
          rangeProtected: allArea > 1000 ? parseInt(allArea, 10) : allArea,
          targetProtected: targetArea > 1000 ? parseInt(targetArea, 10) : targetArea,
          sps,
        });
      }
    });

    setProtectionTableData(tableData);
  }

  const getCountryScores = (country, lastCountryYearValue, startYearValue) => {
    let countryAreaScore = 0;
    let countryConnectivityScore = 0;

    if (country?.shs[lastCountryYearValue]) {
      countryAreaScore = country?.shs[lastCountryYearValue].propchange;
      if(country?.frag[lastCountryYearValue]?.gisfrag){
        countryConnectivityScore = (
          // eslint-disable-next-line no-unsafe-optional-chaining
          country?.frag[lastCountryYearValue]?.gisfrag / startYearValue
        );
      }

      return { countryAreaScore, countryConnectivityScore };
    }
    return { countryAreaScore: 0, countryConnectivityScore: 0 };
  }

  const targetProtectedArea = (rs) => {
    if (rs <= 10000) {
      return rs;
    }
    if (rs >= 250000) {
      return 0.15 * rs;
    }
    return (
      // eslint-disable-next-line operator-linebreak
      rs *
      // eslint-disable-next-line operator-linebreak
      (((1 - 0.15) / (Math.log10(10000) - Math.log10(250000))) *
        // eslint-disable-next-line operator-linebreak
        (Math.log10(rs) - Math.log10(10000)) +
        1)
    );
  }

  const roundUpNumber = (val) => {
    if (val > 10000) {
      return Math.round(val / 1000) * 1000;
    }
    if (val > 1000) {
      return Math.round(val / 100) * 100;
    }
    return val;
  }

  return <BioDiversityComponent
            lightMode={lightMode}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            habitatScore={habitatScore}
            habitatTableData={habitatTableData}
            globalHabitatScore={globalHabitatScore}
            protectionScore={protectionScore}
            globalProtectionScore={globalProtectionScore}
            protectionTableData={protectionTableData}
            protectionArea={protectionArea}
            globalProtectionArea={globalProtectionArea}
            {...props} />;
}

export default BioDiversityContainer;

