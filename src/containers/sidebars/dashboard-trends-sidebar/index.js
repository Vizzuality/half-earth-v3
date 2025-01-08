import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  PROVINCE_FEATURE_GLOBAL_SPI_LAYER_ID,
  SHI_LAYER_ID,
} from 'utils/dashboard-utils.js';

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
    tabOption,
  } = props;

  const [geo, setGeo] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [activeTrend, setActiveTrend] = useState(PROVINCE_TREND);
  const [shiActiveTrend, setShiActiveTrend] = useState(NATIONAL_TREND);
  const [spiScoresData, setSpiScoresData] = useState([]);
  const [shiScoresData, setShiScoresData] = useState([]);
  const [selectSpiSpeciesData, setSpiSelectSpeciesData] = useState([]);
  const [selectShiSpeciesData, setShiSelectSpeciesData] = useState([]);
  const [shiProvinceTrendData, setShiProvinceTrendData] = useState([]);

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
      setShiValue(parseFloat(shiValues.SHI_AvgHabitatScore * 100).toFixed(1));
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

  const getShiProvinceData = (provinceURL) => {
    EsriFeatureService.getFeatures(provinceURL).then((features) => {
      const data = features.map((f) => f.attributes);
      setShiProvinceTrendData(data);
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
    if (countryISO === 'COD') {
      setShiActiveTrend(PROVINCE_TREND);
    }

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

    // if (tabOption === 2) {
    const layer = EsriFeatureService.getFeatureLayer(
      PROVINCE_FEATURE_GLOBAL_SPI_LAYER_ID,
      countryISO
    );
    map.add(layer);

    // eslint-disable-next-line no-shadow
    setRegionLayers((regionLayers) => ({
      ...regionLayers,
      [LAYER_OPTIONS.PROVINCES]: layer,
    }));
    // }

    if (tabOption === 2) {
      layer.visible = true;
    } else {
      layer.visible = false;
    }

    // if (tabOption === 1) {
    const outlineFeatureLayer = EsriFeatureService.getFeatureLayer(
      SHI_LAYER_ID,
      countryISO,
      `${countryISO}-outline`
    );
    map.add(outlineFeatureLayer);

    // eslint-disable-next-line no-shadow
    setRegionLayers((regionLayers) => ({
      ...regionLayers,
      [`${countryISO}-outline`]: outlineFeatureLayer,
    }));

    if (tabOption === 1) {
      outlineFeatureLayer.visible = true;
    } else {
      outlineFeatureLayer.visible = false;
    }
    // }

    if (tabOption === 3) {
      layer.visible = false;
      outlineFeatureLayer.visible = false;
    }

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

    const countryURL = {
      url: DASHBOARD_URLS.COUNTRY_URL,
      whereClause: `ISO3 = '${countryISO}'`,
      orderByFields: ['year'],
    };
    getCountryData(countryURL);

    // GET SPI Province Trend Data
    const provinceURL = {
      url: DASHBOARD_URLS.SPI_PROVINCE_TREND_URL,
      whereClause: `iso3 = '${countryISO}' and Year = ${SPI_LATEST_YEAR}`,
      orderByFields: ['region_name'],
    };
    getProvinceData(provinceURL);

    // GET SHI Province Trend Data
    const shiProvinceURL = {
      url: DASHBOARD_URLS.SHI_PROVINCE_TREND_URL,
      whereClause: `iso3 = '${countryISO}'`,
      orderByFields: ['region_name'],
    };
    getShiProvinceData(shiProvinceURL);
  }, []);

  useEffect(() => {
    if (!selectedProvince) return;

    let whereClause = `ISO3_regional = '${
      selectedProvince.iso3_regional ?? selectedProvince.GID_1
    }'`;
    let shiWhereClause = `iso3 = '${countryISO}' and iso3_regional = '${
      selectedProvince.iso3_regional ?? selectedProvince.GID_1
    }'`;
    if (activeTrend === NATIONAL_TREND || shiActiveTrend === NATIONAL_TREND) {
      whereClause = `ISO3 = '${countryISO}' and ISO3_regional = 'XXX'`;
      shiWhereClause = `iso3 = '${countryISO}'`;
    }

    // GET SPI
    const scoreDataURL = {
      url: DASHBOARD_URLS.SPI_HISTOGRAM_URL,
      whereClause: `${whereClause}`,
    };
    getSpiScoreData(scoreDataURL);

    const selectSpeciesURL = {
      url: DASHBOARD_URLS.SPI_REGION_SPECIES_URL,
      whereClause: `${whereClause} and species_protection_score_all >= 0 and species_protection_score_all <= 5 and species_url IS NOT NULL`,
    };
    getSpiSelectSpeciesData(selectSpeciesURL);

    if (shiActiveTrend === NATIONAL_TREND) {
      const shiScoresDataURL = {
        url: DASHBOARD_URLS.SHI_HISTOGRAM_URL,
        whereClause: `${shiWhereClause}`,
      };
      getScoresData(shiScoresDataURL);

      const shiSpeciesScoresURL = {
        url: DASHBOARD_URLS.SHI_SPECIES_URL,
        whereClause: `${shiWhereClause} and HabitatScore >= 1 and HabitatScore <= 5 and SpeciesImage IS NOT NULL`,
      };
      getShiSelectSpeciesData(shiSpeciesScoresURL);
    } else {
      const shiScoresDataURL = {
        url: DASHBOARD_URLS.SHI_PROVINCE_HISTOGRAM_URL,
        whereClause: `${shiWhereClause}`,
      };
      getScoresData(shiScoresDataURL);

      const shiSpeciesScoresURL = {
        url: DASHBOARD_URLS.SHI_PROVINCE_SPECIES_URL,
        whereClause: `${whereClause} and habitat_score >= 1 and habitat_score <= 5 and species_url IS NOT NULL`,
      };
      getShiSelectSpeciesData(shiSpeciesScoresURL);
    }
  }, [selectedProvince, activeTrend, shiActiveTrend]);

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
      shiProvinceTrendData={shiProvinceTrendData}
      {...props}
    />
  );
}

export default connect(mapStateToProps, null)(DashboardTrendsSidebarContainer);
