import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { PROVINCE_FEATURE_GLOBAL_SPI_LAYER_ID } from 'utils/dashboard-utils.js';

import last from 'lodash/last';

import EsriFeatureService from 'services/esri-feature-service';

import {
  LAYER_OPTIONS,
  REGION_OPTIONS,
  SHI_LATEST_YEAR,
  SPI_LATEST_YEAR,
  SII_LATEST_YEAR,
} from 'constants/dashboard-constants.js';
import {
  COUNTRIES_DATA_SERVICE_URL,
  DASHBOARD_URLS,
} from 'constants/layers-urls';

import Component, {
  NATIONAL_TREND,
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
  const [shiActiveTrend, setShiActiveTrend] = useState(PROVINCE_TREND);
  const [spiScoresData, setSpiScoresData] = useState([]);
  const [shiScoresData, setShiScoresData] = useState([]);
  const [selectSpiSpeciesData, setSpiSelectSpeciesData] = useState([]);
  const [selectShiSpeciesData, setShiSelectSpeciesData] = useState([]);

  const [shiValue, setShiValue] = useState(0);
  const [spiValue, setSpiValue] = useState(0);
  const [siiValue, setSiiValue] = useState(0);

  const removeRegionLayers = () => {
    const layers = regionLayers;
    Object.keys(layers).forEach((region) => {
      const foundLayer = map.layers.items.find((item) => item.id === region);
      if (foundLayer) {
        map.remove(foundLayer);
      }
    });
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

      const shiValues = countries.find((item) => item.Year === SHI_LATEST_YEAR);
      const siiValues = countries.find((item) => item.Year === SII_LATEST_YEAR);
      setShiValue(parseFloat(shiValues.SHI).toFixed(1));
      setSiiValue((siiValues.SII * 100).toFixed(1));
      setCountryData(countries);
    });
  };

  const getSpiScoreData = (scoresDataURL) => {
    EsriFeatureService.getFeatures(scoresDataURL).then((features) => {
      const data = features.map((f) => f.attributes);
      setSpiScoresData(data);
    });
  };

  const getScoresData = (scoresDataURL) => {
    EsriFeatureService.getFeatures(scoresDataURL).then((features) => {
      const data = features.map((f) => f.attributes);
      setShiScoresData(data);
    });
  };

  const getSpiSelectSpeciesData = (selectSpeciesURL) => {
    EsriFeatureService.getFeatures(selectSpeciesURL).then((features) => {
      const data = features.map((f) => f.attributes);
      setSpiSelectSpeciesData(data);
    });
  };

  const getShiSelectSpeciesData = (scoresDataURL) => {
    EsriFeatureService.getFeatures(scoresDataURL).then((features) => {
      const data = features.map((f) => f.attributes);
      setShiSelectSpeciesData(data);
    });
  };

  // find and zoom to region
  useEffect(() => {
    EsriFeatureService.getFeatures({
      url: COUNTRIES_DATA_SERVICE_URL,
      whereClause: `GID_0 = '${countryISO}'`,
      returnGeometry: true,
    }).then((features) => {
      // eslint-disable-next-line no-shadow
      const { geometry } = features[0];

      if (geometry && view) {
        setGeo(geometry);
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
    removeRegionLayers();
    setSelectedRegionOption(REGION_OPTIONS.PROVINCES);

    const provinceURL = {
      url: DASHBOARD_URLS.SPI_PROVINCE_TREND_URL,
      whereClause: `iso3 = '${countryISO}' and Year = ${SPI_LATEST_YEAR}`,
      // orderByFields: ['region_name'],
    };
    getProvinceData(provinceURL);

    const countryURL = {
      url: DASHBOARD_URLS.COUNTRY_URL,
      whereClause: `ISO3 = '${countryISO}'`,
      orderByFields: ['year'],
    };
    getCountryData(countryURL);

    const shiSpeciesScoresURL = {
      url: DASHBOARD_URLS.SHI_SPECIES_URL,
      whereClause: `iso3 = '${countryISO}' and Year = ${SHI_LATEST_YEAR} and HabitatScore >= 1 and HabitatScore <= 5 and SpeciesImage IS NOT NULL`,
      // orderByFields: ['region_name'],
    };
    getShiSelectSpeciesData(shiSpeciesScoresURL);

    const shiScoresURL = {
      url: DASHBOARD_URLS.SHI_HISTOGRAM_URL,
      whereClause: `iso3 = '${countryISO}' and Year = ${SHI_LATEST_YEAR}`,
      // orderByFields: ['region_name'],
    };
    getScoresData(shiScoresURL);
  }, []);

  useEffect(() => {
    if (!selectedProvince) return;
    const scoreDataURL = {
      url: DASHBOARD_URLS.SPI_HISTOGRAM_URL,
      whereClause: `ISO3 = '${countryISO}' and YEAR = ${SPI_LATEST_YEAR}`,
    };
    getSpiScoreData(scoreDataURL);

    let whereClause = `ISO3_regional = '${selectedProvince.iso3_regional}' and species_protection_score_all >= 0 and species_protection_score_all <= 5 and species_url IS NOT NULL`;
    if (activeTrend === NATIONAL_TREND) {
      whereClause = `ISO3 = '${countryISO}' and ISO3_regional = 'XXX' and species_protection_score_all >= 0 and species_protection_score_all <= 5 and species_url IS NOT NULL`;
    }

    const selectSpeciesURL = {
      url: DASHBOARD_URLS.SPI_REGION_SPECIES_URL,
      whereClause,
    };

    getSpiSelectSpeciesData(selectSpeciesURL);
  }, [selectedProvince, activeTrend]);

  return (
    <Component
      countryISO={countryISO}
      shiValue={shiValue}
      spiValue={spiValue}
      siiValue={siiValue}
      provinces={provinces}
      countryData={countryData}
      spiScoresData={spiScoresData}
      shiScoresData={shiScoresData}
      selectSpiSpeciesData={selectSpiSpeciesData}
      selectShiSpeciesData={selectShiSpeciesData}
      geo={geo}
      activeTrend={activeTrend}
      setActiveTrend={setActiveTrend}
      shiActiveTrend={shiActiveTrend}
      setShiActiveTrend={setShiActiveTrend}
      {...props}
    />
  );
}

export default connect(mapStateToProps, null)(DashboardTrendsSidebarContainer);
