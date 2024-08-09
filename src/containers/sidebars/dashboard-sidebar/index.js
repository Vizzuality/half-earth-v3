import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Component from './dashboard-sidebar-component.jsx';
import mapStateToProps from './selectors';

function DashboardSidebarContainer(props) {
  const {scientificName, countryName} = props;

  const [data, setData] = useState({});
  const [dataByCountry, setDataByCountry] = useState({frag: [], shs: []});

  useEffect(() => {
    getData();
  }, [scientificName]);

  useEffect(() => {
    const habitatScore = getHabitatScore();

    console.log(habitatScore);
  }, [dataByCountry])

  const getData = async () => {
    const speciesPreferences = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/habitat?scientificname=${scientificName}`;
    const res = await fetch(speciesPreferences);
    const ps = await res.json();
    const preferences = getPreferenceQuery(ps.prefs);
    const params = new URLSearchParams(preferences);

    const habitatTrendUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/indicators/habitat-trends/bycountry?scientificname=${scientificName}`;
    const reserveCoverageMetricsUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/indicators/reserve-coverage/metrics?scientificname=${scientificName}&${params}`;
    const habitatMetricesUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/indicators/habitat-distribution/metrics?scientificname=${scientificName}&${params}`;

    const apiCalls = [habitatTrendUrl, reserveCoverageMetricsUrl, habitatMetricesUrl];

    const apiResponses = await Promise.all(apiCalls.map(async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }));

    const [habitatTrendData, reserveCoverageData, habitatMetricesData] = apiResponses;
    getDataByCountry(habitatTrendData);

    setData({habitatTrendData, reserveCoverageData, habitatMetricesData});
  }

  const getPreferenceQuery = (preferences) => {
    return {
      class: preferences.class,
      habitat: preferences.habitat,
      treecover_max: preferences.tree_cover_max.toString(),
      treecover_min: preferences.tree_cover_min.toString(),
      elev_max: preferences.elev_max.toString(),
      elev_min: preferences.elev_min.toString(),
      use_e: preferences.use_e.toString(),
      use_h: preferences.use_h.toString(),
      use_f: preferences.use_f.toString(),
    }
  }

  const getDataByCountry = (d) => {
    let countryData;
    if (d.shs) {
      countryData = d.shs.reduce((acc, obj) => {
        const key = obj.country;
        if (!acc[key]) {
          acc[key] = { shs: [], frag: [] };
        }
        acc[key].shs.push(obj);
        return acc;
      }, {});
    }

    if (d.frag) {
      countryData = d.frag.reduce((acc, obj) => {
        const key = obj.country;
        if (!acc[key]) {
          acc[key] = { shs: [], frag: [] };
        }

        acc[key].frag.push(obj);
        return acc;
      }, countryData);
    }

    setDataByCountry(countryData);
  }

  const getHabitatScore = () => {
    const country = dataByCountry[countryName];

    // const countrySHS = country?.shs;
    const startYearValue = country?.frag[0].gisfrag;
    // eslint-disable-next-line no-unsafe-optional-chaining
    const lastCountryYearValue = country?.shs.length - 1;

    const { countryAreaScore, countryConnectivityScore } = getCountryScores(country, lastCountryYearValue, startYearValue);

    // if (dataByCountry.Global?.shs[lastCountryYearValue]) {
    //   this.globalAreaScore = this.dataByCountry.Global?.shs[this.lastCountryYearValue].propchange;
    //   this.globalConnectivityScore = (
    //   // eslint-disable-next-line no-unsafe-optional-chaining
    //     this.dataByCountry.Global?.frag[this.lastCountryYearValue].gisfrag / this.startYearValue
    //   );
    // }

    return ((countryAreaScore + countryConnectivityScore) / 2) * 100;
    // this.globalHabitatScore = ((this.globalAreaScore + this.globalConnectivityScore) / 2) * 100;
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

  return <Component data={data} {...props}/>;
}

export default connect(mapStateToProps, null)(DashboardSidebarContainer);
