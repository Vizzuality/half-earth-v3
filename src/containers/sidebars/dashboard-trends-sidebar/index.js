import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  DASHBOARD_BIN_SCORES_URL,
  DASHBOARD_COUNTRY_URL,
  DASHBOARD_PROVINCE_TREND_URL,
  DASHBOARD_REGION_SPECIES_SPI_SCORES_URL,
  LAYER_OPTIONS,
  PROVINCE_FEATURE_GLOBAL_SPI_LAYER_ID,
  REGION_OPTIONS,
  SHI_LATEST_YEAR,
  SPI_LATEST_YEAR,
} from 'utils/dashboard-utils.js';

import last from 'lodash/last';

import EsriFeatureService from 'services/esri-feature-service';

import { COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';

import Component, {
  PROVINCE_TREND,
} from './dashboard-trends-sidebar-component.jsx';
import mapStateToProps from './selectors';

function DashboardTrendsSidebarContainer(props) {
  const {
    countryISO,
    view,
    map,
    regionLayers,
    setRegionLayers,
    geometry,
    setSelectedRegionOption,
    selectedProvince,
  } = props;

  const [geo, setGeo] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [activeTrend, setActiveTrend] = useState(PROVINCE_TREND);
  const [scoresData, setScoresData] = useState([]);
  const [selectSpeciesData, setSelectSpeciesData] = useState([]);

  const [shiValue, setShiValue] = useState(0);
  const [spiValue, setSpiValue] = useState(0);
  const [siiValue, setSiiValue] = useState(0);

  const [shiData, setShiData] = useState({ trendData: [], scoresData: [] });
  const [siiData, setSiiData] = useState({ trendData: [], scoresData: [] });

  const removeRegionLayers = () => {
    const layers = regionLayers;
    Object.keys(layers).forEach((region) => {
      const foundLayer = map.layers.items.find((item) => item.id === region);
      if (foundLayer) {
        map.remove(foundLayer);
      }
    });
  };

  const getData = async () => {
    setSelectedRegionOption(REGION_OPTIONS.PROVINCES);

    // DRC country id
    let regionId = '90b03e87-3880-4164-a310-339994e3f919';

    // Liberia
    if (countryISO.toUpperCase() === 'LBR') {
      regionId = '50e1557e-fc47-481a-b090-66d5cba5be70';
    }

    // Guinea
    if (countryISO.toUpperCase() === 'GIN') {
      regionId = '22200606-e907-497f-96db-e7cfd95d61b5';
    }

    // Gabon
    if (countryISO.toUpperCase() === 'GAB') {
      regionId = '30810b40-0044-46dd-a1cd-5a3217749738';
    }

    // Republic of Congo
    if (countryISO.toUpperCase() === 'COG') {
      regionId = '0c98b276-f38a-4a2e-abab-0acfad46ac69';
    }

    // Sierra Leone
    if (countryISO.toUpperCase() === 'SLE') {
      regionId = '3f0ce739-6440-4474-b4bc-d78b7c9de63e';
    }

    // Guyana
    if (countryISO.toUpperCase() === 'GUY') {
      regionId = '1cebe33c-216c-4b9d-816b-fb20dcf910e8';
    }

    const taxa = 'all_terr_verts';

    const siiTrendsUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/completeness?region_id=${regionId}&indicator=richness&version=2020&weight=national`;

    const trendApiCalls = [siiTrendsUrl];

    const trendApiResponses = await Promise.all(
      trendApiCalls.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      })
    );

    const [siiTrendData] = trendApiResponses;

    const shiYear = SHI_LATEST_YEAR;

    const siiYear = SHI_LATEST_YEAR;
    const shiScoresUrl = `https://next-api.mol.org/2.x/indicators/shs/values_all_taxa?iso=${countryISO}&year=${shiYear}`;

    const siiScoresUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/sps/values?iso=${countryISO}&year=${siiYear}&taxa=${taxa}`;

    const spendApiCalls = [shiScoresUrl, siiScoresUrl];

    const scoreApiResponses = await Promise.all(
      spendApiCalls.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      })
    );

    const [shiScoresData, siiScoresData] = scoreApiResponses;
    // setShiValue(shi);

    if (siiTrendData.length) {
      const siiTD = siiTrendData;
      // setSiiValue((siiTD[0].all_taxa_avg * 100).toFixed(2));
    }

    setShiData({ trendData: {}, scoresData: shiScoresData });
    setSiiData({ trendData: siiTrendData, scoresData: siiScoresData });
  };

  const getProvinceData = (provinceURL) => {
    EsriFeatureService.getFeatures(provinceURL).then((features) => {
      const regions = features.map((f) => f.attributes);
      setProvinces(regions);
    });
  };

  const getCountryData = (countryURL) => {
    EsriFeatureService.getFeatures(countryURL).then((features) => {
      const countries = features.map((f) => f.attributes);

      setSpiValue(last(countries).SPI.toFixed(1));

      const tabValues = countries.find((item) => item.Year === SHI_LATEST_YEAR);
      setShiValue(parseFloat(tabValues.SHI).toFixed(1));
      setSiiValue(tabValues.SII.toFixed(1));
      setCountryData(countries);
    });
  };

  const getScoreData = (scoresDataURL) => {
    EsriFeatureService.getFeatures(scoresDataURL).then((features) => {
      const data = features.map((f) => f.attributes);
      setScoresData(data);
    });
  };

  const getSelectSpeciesData = (selectSpeciesURL) => {
    EsriFeatureService.getFeatures(selectSpeciesURL).then((features) => {
      const data = features.map((f) => f.attributes);
      setSelectSpeciesData(data);
    });
  };

  useEffect(() => {
    removeRegionLayers();
    getData();
  }, []);

  // find and zoom to region
  useEffect(() => {
    EsriFeatureService.getFeatures({
      url: COUNTRIES_DATA_SERVICE_URL,
      whereClause: `GID_0 = '${countryISO}'`,
      returnGeometry: true,
    }).then((features) => {
      // eslint-disable-next-line no-shadow
      const { geometry, attributes } = features[0];

      if (geometry && view) {
        setGeo(geometry);
        // setCountryData(attributes);
      }
    });
  }, [view, countryISO]);

  useEffect(() => {
    if (!map && !view) return;

    const layer = EsriFeatureService.getFeatureLayer(
      PROVINCE_FEATURE_GLOBAL_SPI_LAYER_ID,
      countryISO
    );

    // eslint-disable-next-line no-shadow
    setRegionLayers((regionLayers) => ({
      ...regionLayers,
      [LAYER_OPTIONS.PROVINCES]: layer,
    }));

    map.add(layer);

    // rezoom to country
    if (geometry) {
      view.goTo({
        target: geometry,
        center: [geometry.longitude - 20, geometry.latitude],
        zoom: 5.5,
        extent: geometry.clone(),
      });
    }
  }, [map, view]);

  useEffect(() => {
    const provinceURL = {
      url: DASHBOARD_PROVINCE_TREND_URL,
      whereClause: `ISO3 = '${countryISO}' and YEAR = ${SPI_LATEST_YEAR}`,
      orderByFields: ['region_name'],
    };

    const countryURL = {
      url: DASHBOARD_COUNTRY_URL,
      whereClause: `ISO3 = '${countryISO}'`,
      orderByFields: ['year'],
    };

    getProvinceData(provinceURL);

    getCountryData(countryURL);
  }, []);

  useEffect(() => {
    if (!selectedProvince) return;
    const scoreDataURL = {
      url: DASHBOARD_BIN_SCORES_URL,
      whereClause: `ISO3 = '${countryISO}' and YEAR = ${SPI_LATEST_YEAR}`,
    };

    const selectSpeciesURL = {
      url: DASHBOARD_REGION_SPECIES_SPI_SCORES_URL,
      whereClause: `ISO3_regional = '${selectedProvince.iso3_regional}' and YEAR = ${SPI_LATEST_YEAR}`,
    };

    getScoreData(scoreDataURL);
    getSelectSpeciesData(selectSpeciesURL);
  }, [selectedProvince]);

  return (
    <Component
      countryISO={countryISO}
      shiValue={shiValue}
      spiValue={spiValue}
      siiValue={siiValue}
      shiData={shiData}
      siiData={siiData}
      provinces={provinces}
      countryData={countryData}
      scoresData={scoresData}
      selectSpeciesData={selectSpeciesData}
      geo={geo}
      activeTrend={activeTrend}
      setActiveTrend={setActiveTrend}
      {...props}
    />
  );
}

export default connect(mapStateToProps, null)(DashboardTrendsSidebarContainer);
