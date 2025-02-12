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
  TABS,
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
    setMapLegendLayers,
  } = props;

  const [geo, setGeo] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [shiCountryData, setShiCountryData] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [activeTrend, setActiveTrend] = useState(NATIONAL_TREND);
  const [shiActiveTrend, setShiActiveTrend] = useState(NATIONAL_TREND);
  const [spiScoresData, setSpiScoresData] = useState([]);
  const [shiScoresData, setShiScoresData] = useState([]);
  const [spiSelectSpeciesData, setSpiSelectSpeciesData] = useState([]);
  const [shiSelectSpeciesData, setShiSelectSpeciesData] = useState([]);
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

  const getShiCountryData = (countryURL) => {
    EsriFeatureService.getFeatures(countryURL).then((features) => {
      const countries = features.map((f) => f.attributes);

      setShiCountryData(countries);
    });
  };

  const getSpiProvinceData = (provinceURL) => {
    EsriFeatureService.getFeatures(provinceURL).then((features) => {
      const regions = features.map((f) => f.attributes);
      setProvinces(regions);
    });
  };

  const getSpiScoreData = (scoresDataURL) => {
    EsriFeatureService.getFeatures(scoresDataURL).then((features) => {
      const data = features.map((f) => f.attributes);
      setSpiScoresData(data);
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
      if (features) {
        const data = features.map((f) => f.attributes);
        setShiProvinceTrendData(data);
      }
    });
  };

  const getShiScoresData = (scoresDataURL) => {
    EsriFeatureService.getFeatures(scoresDataURL).then((features) => {
      const data = features.map((f) => f.attributes);
      setShiScoresData(data);
    });
  };

  const getShiSelectSpeciesData = (scoresDataURL) => {
    EsriFeatureService.getFeatures(scoresDataURL).then((features) => {
      const data = features?.map((f) => f.attributes);
      setShiSelectSpeciesData(data);
    });
  };

  const getShiNationalData = () => {
    const shiScoresDataURL = {
      url: DASHBOARD_URLS.SHI_HISTOGRAM_URL,
      whereClause: `iso3 = '${countryISO}'`,
    };
    getShiScoresData(shiScoresDataURL);
  };

  const getProvinceSpiData = (whereClause) => {
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
  };

  // get SHI scores data
  useEffect(() => {
    if (!shiScoresData.length) return;

    // find first bin with a habitat score > 0
    const bin = shiScoresData.find((item) => {
      return (
        item.habitat_amphibians > 0 ||
        item.habitat_birds > 0 ||
        item.habitat_mammals > 0 ||
        item.habitat_reptiles > 0
      );
    });

    const scoreRange = bin.binned.split(',');

    let habitatScore = 'HabitatScore';
    let speciesURL = 'SpeciesImage';
    let url = DASHBOARD_URLS.SHI_SPECIES_URL;
    let whereClause = `ISO3 = '${countryISO}'`;

    if (shiActiveTrend === PROVINCE_TREND) {
      url = DASHBOARD_URLS.SHI_PROVINCE_SPECIES_URL;
      whereClause = `iso3_regional = '${
        selectedProvince?.iso3_regional ?? selectedProvince?.GID_1
      }'`;
      habitatScore = 'habitat_score';
      speciesURL = 'species_url';
    }

    const andClause = `and ${habitatScore} >= ${
      parseInt(scoreRange[0], 10) / 100
    } and ${habitatScore} <= ${
      parseInt(scoreRange[1], 10) / 100
    } and ${speciesURL} IS NOT NULL`;

    const shiSpeciesScoresURL = {
      url,
      whereClause: `${whereClause} ${andClause}`,
      orderByFields: [habitatScore],
    };
    if (shiActiveTrend === PROVINCE_TREND && selectedProvince) {
      getShiSelectSpeciesData(shiSpeciesScoresURL);
    } else if (shiActiveTrend === NATIONAL_TREND) {
      getShiSelectSpeciesData(shiSpeciesScoresURL);
    }
  }, [shiScoresData]);

  // find and zoom to region
  useEffect(() => {
    // if (countryISO === 'COD') {
    //   setShiActiveTrend(NATIONAL_TREND);
    // }

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

  // set layers for Indicator map
  useEffect(async () => {
    if (!map && !view) return;

    const layer = await EsriFeatureService.getFeatureLayer(
      PROVINCE_FEATURE_GLOBAL_SPI_LAYER_ID,
      countryISO
    );
    map.add(layer);

    // eslint-disable-next-line no-shadow
    setRegionLayers((regionLayers) => ({
      ...regionLayers,
      [LAYER_OPTIONS.PROVINCES]: layer,
    }));

    if (tabOption === TABS.SPI) {
      layer.visible = true;
      const item = { label: 'SPI', parent: '', id: REGION_OPTIONS.PROVINCES };
      setMapLegendLayers([item]);
    } else {
      layer.visible = false;
    }

    const outlineFeatureLayer = await EsriFeatureService.getFeatureLayer(
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

    if (tabOption === TABS.SHI) {
      outlineFeatureLayer.visible = true;
      const item = { label: 'SHI', parent: '', id: `${countryISO}-outline` };
      setMapLegendLayers([item]);
    } else {
      outlineFeatureLayer.visible = false;
    }

    if (tabOption === TABS.SII) {
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

    const shiCountryURL = {
      url: DASHBOARD_URLS.SHI_COUNTRY_DATA_URL,
      whereClause: `ISO3 = '${countryISO}'`,
    };
    getShiCountryData(shiCountryURL);

    // GET SPI Province Trend Data
    const provinceURL = {
      url: DASHBOARD_URLS.SPI_PROVINCE_TREND_URL,
      whereClause: `iso3 = '${countryISO}' and Year = ${SPI_LATEST_YEAR}`,
      orderByFields: ['region_name'],
    };
    getSpiProvinceData(provinceURL);

    // GET SHI Province Trend Data
    const shiProvinceURL = {
      url: DASHBOARD_URLS.SHI_PROVINCE_TREND_URL,
      whereClause: `iso3 = '${countryISO}' and Year = ${SHI_LATEST_YEAR}`,
      orderByFields: ['region_name'],
    };
    getShiProvinceData(shiProvinceURL);

    const whereClause = `ISO3 = '${countryISO}' and ISO3_regional = 'XXX'`;
    getProvinceSpiData(whereClause);

    getShiNationalData();
  }, []);

  useEffect(() => {
    if (
      shiActiveTrend === NATIONAL_TREND &&
      (tabOption === TABS.SHI || tabOption === TABS.SII)
    ) {
      getShiNationalData();
    } else {
      let whereClause = `ISO3 = '${countryISO}' and ISO3_regional = 'XXX'`;

      if (selectedProvince) {
        if (activeTrend === PROVINCE_TREND) {
          whereClause = `ISO3_regional = '${
            selectedProvince.iso3_regional ?? selectedProvince.GID_1
          }'`;
        }
        const shiWhereClause = `iso3 = '${countryISO}' and iso3_regional = '${
          selectedProvince.iso3_regional ?? selectedProvince.GID_1
        }'`;

        const shiScoresDataURL = {
          url: DASHBOARD_URLS.SHI_PROVINCE_HISTOGRAM_URL,
          whereClause: `${shiWhereClause}`,
          orderByFields: [
            'habitat_amphibians',
            'habitat_birds',
            'habitat_mammals',
            'habitat_reptiles',
          ],
        };
        getShiScoresData(shiScoresDataURL);
      }

      // GET SPI
      getProvinceSpiData(whereClause);
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
      shiCountryData={shiCountryData}
      spiScoresData={spiScoresData}
      shiScoresData={shiScoresData}
      spiSelectSpeciesData={spiSelectSpeciesData}
      shiSelectSpeciesData={shiSelectSpeciesData}
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
