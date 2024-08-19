import React, { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import hrTheme from 'styles/themes/hr-theme.module.scss';

import styles from './biodiversity-indicators-styles.module.scss';
import { LightModeContext } from '../../../../context/light-mode';
import country_attrs from '../mol-country-attributes.json';
import HabitatContainer from './habitat';

function BioDiversityComponent(props) {
  const { data, countryName, dataByCountry } = props
  const { lightMode } = useContext(LightModeContext);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [habitatScore, setHabitatScore] = useState('0.00');
  const [habitatTableData, setHabitatTableData] = useState([]);
  const [globalHabitatScore, setGlobalHabitatScore] = useState(0);
  const [protectionScore, setProtectionScore] = useState('0.00');

  useEffect(() => {
    console.log(data);
    console.log(dataByCountry);
    console.log(countryName);
  }, [data]);

  useEffect(() => {
    if (dataByCountry && data) {
      const { habitatScore, globalHabitatScore } = getHabitatScore();
      setHabitatScore(habitatScore);
      setGlobalHabitatScore(globalHabitatScore);

      getHabitatTableData();

      const { protectionScore, globalProtectionScore } = getProtectionScore(data.reserveCoverageData, data.habitatMetricesData);
      console.log('global protection score', globalProtectionScore)
      setProtectionScore(protectionScore);
    }
  }, [dataByCountry, data])

  const getHabitatScore = () => {
    const country = dataByCountry[countryName];

    // const countrySHS = country?.shs;
    const startYearValue = country?.frag[0].gisfrag;
    // eslint-disable-next-line no-unsafe-optional-chaining
    const lastCountryYearValue = country?.shs.length - 1;
    let globalAreaScore = 0;
    let globalConnectivityScore = 0;

    const { countryAreaScore, countryConnectivityScore } = getCountryScores(country, lastCountryYearValue, startYearValue);

    if (dataByCountry.Global?.shs[lastCountryYearValue]) {
      globalAreaScore = dataByCountry.Global?.shs[lastCountryYearValue].propchange;
      globalConnectivityScore = (
        // eslint-disable-next-line no-unsafe-optional-chaining
        dataByCountry.Global?.frag[lastCountryYearValue].gisfrag / startYearValue
      );
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
      const startYearValue = habitatCountry?.frag[0].gisfrag;
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

  const getCountryScores = (country, lastCountryYearValue, startYearValue) => {
    if (country?.shs[lastCountryYearValue]) {
      const countryAreaScore = country?.shs[lastCountryYearValue].propchange;
      const countryConnectivityScore = (
        // eslint-disable-next-line no-unsafe-optional-chaining
        country?.frag[lastCountryYearValue]?.gisfrag / startYearValue
      );

      return { countryAreaScore, countryConnectivityScore };
    }
    return { countryAreaScore: 0, countryConnectivityScore: 0 };
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

    const area = (protectionArea / protectionTargetArea);
    const globalArea = (globalProtectionArea / globalProtectionTargetArea);

    const scores = {
      protectionScore: (Math.min(area * 100, 100)).toFixed(2),
      globalProtectionScore: (Math.min(globalArea * 100, 100)).toFixed(2)
    }

    return scores;
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


  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <span className={styles.sectionTitle}>Biodiversity Indicators</span>
      <hr className={hrTheme.dark} />
      <div className={styles.tabs}>
        <button
          type="button"
          aria-label="Species Habitat Index"
          className={cx({
            [styles.selected]: selectedIndex === 1,
          })}
          onClick={() => setSelectedIndex(1)}
        >
          <span>{habitatScore}%</span>
          <span>Habitat Score</span>
        </button>
        <button
          type="button"
          aria-label="Species Protection Index"
          className={cx({
            [styles.selected]: selectedIndex === 2,
          })}
          onClick={() => setSelectedIndex(2)}
        >
          <span>{protectionScore}%</span>
          <span>Protection Score</span>
        </button>
        <button
          type="button"
          aria-label="Species Information Index"
          className={cx({
            [styles.selected]: selectedIndex === 3,
          })}
          onClick={() => setSelectedIndex(3)}
        >
          <span>Information Score</span>
        </button>
      </div>
      {selectedIndex === 1 &&
        <HabitatContainer
          habitatScore={habitatScore}
          globalHabitatScore={globalHabitatScore}
          habitatTableData={habitatTableData}
          {...props} />
      }
    </section>
  );
}

export default BioDiversityComponent;
