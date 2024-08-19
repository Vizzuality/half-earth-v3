import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Component from './dashboard-sidebar-component.jsx';
import mapStateToProps from './selectors';

function DashboardSidebarContainer(props) {
  const {scientificName, countryName} = props;

  const [data, setData] = useState(null);
  const [dataByCountry, setDataByCountry] = useState(null);

  useEffect(() => {
    getData();
  }, [scientificName]);



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

  return <Component data={data} dataByCountry={dataByCountry} {...props}/>;
}

export default connect(mapStateToProps, null)(DashboardSidebarContainer);
