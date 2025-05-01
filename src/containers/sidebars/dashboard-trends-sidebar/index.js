import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { removeRegionLayers } from 'utils/dashboard-utils';
import {
  PROVINCE_FEATURE_GLOBAL_SPI_LAYER_ID,
  SHI_LAYER_ID,
  ZONE_3_SPI_FEATURE_ID,
  ZONE_3_SHI_FEATURE_ID,
  ZONE_5_SPI_FEATURE_ID,
  ZONE_5_SHI_FEATURE_ID,
  EEWWF_SPI_FEATURE_ID,
  EEWWF_SHI_FEATURE_ID,
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
  ZONE_3,
  ZONE_5,
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
    activeTrend,
    shiActiveTrend,
  } = props;

  const [geo, setGeo] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [zoneData, setZoneData] = useState([]);
  const [zoneHistrogramData, setZoneHistrogramData] = useState([]);
  const [shiCountryData, setShiCountryData] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const [spiScoresData, setSpiScoresData] = useState([]);
  const [shiScoresData, setShiScoresData] = useState([]);
  const [spiSelectSpeciesData, setSpiSelectSpeciesData] = useState([]);
  const [shiSelectSpeciesData, setShiSelectSpeciesData] = useState([]);
  const [shiProvinceTrendData, setShiProvinceTrendData] = useState([]);

  const [shiValue, setShiValue] = useState(0);
  const [spiValue, setSpiValue] = useState(0);
  const [siiValue, setSiiValue] = useState(0);

  const classes = ['INT', 'LND'];

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
    if (countryISO.toLowerCase() === 'eewwf') {
      setSpiSelectSpeciesData(zoneHistrogramData[0]);
    } else {
      EsriFeatureService.getFeatures(selectSpeciesURL).then((features) => {
        const data = features.map((f) => f.attributes);
        setSpiSelectSpeciesData(data);
      });
    }
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
      const data = features?.map((f) => f.attributes);
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
    const countryCode = countryISO;

    const shiScoresDataURL = {
      url: DASHBOARD_URLS.SHI_HISTOGRAM_URL,
      whereClause: `iso3 = '${countryCode}'`,
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

  const getZoneData = () => {
    const project = countryISO.toLowerCase() === 'guy' ? 'acc_guyana' : 'eewwf';
    let whereClause = `project = '${project}'`;

    const landscapeRegions = `(1, 7, 9, 10, 15)`;

    if (tabOption === TABS.SPI) {
      if (activeTrend === 'LND') {
        whereClause += ` and region_key in ${landscapeRegions}`;
      } else if (activeTrend === 'INT') {
        whereClause += ` and region_key not in ${landscapeRegions}`;
      }
    }

    if (tabOption === TABS.SHI) {
      if (shiActiveTrend === 'LND') {
        whereClause += ` and region_key in ${landscapeRegions}`;
      } else if (shiActiveTrend === 'INT') {
        whereClause += ` and region_key not in ${landscapeRegions}`;
      }
    }

    const zoneDataUrl = {
      url: DASHBOARD_URLS.REGION_SHI_SPI_URL,
      whereClause: `${whereClause}`,
    };

    EsriFeatureService.getFeatures(zoneDataUrl).then((features) => {
      const data = features?.map((f) => f.attributes).reverse();
      const filteredData = data.filter((item) => item.habitat_index !== null);
      setZoneData(filteredData);
    });
  };

  const getZoneHistogramData = () => {
    const project = countryISO.toLowerCase() === 'guy' ? 'acc_guyana' : 'eewwf';
    let whereClause = `project = '${project}'`;

    if (selectedProvince) {
      whereClause += ` and region_key = ${selectedProvince.region_key}`;
    }

    const zoneHistogramURL = {
      url: DASHBOARD_URLS.REGION_HISTOGRAM_URL,
      whereClause: `${whereClause}`,
    };
    EsriFeatureService.getFeatures(zoneHistogramURL).then((features) => {
      const data = features?.map((f) => f.attributes);
      setZoneHistrogramData(data);
    });
  };

  const loadZone = async (zone, type) => {
    if (countryISO.toLowerCase() === 'guy') {
      const foundProvinceLayer = map.layers.items.find(
        (item) => item.id === REGION_OPTIONS.PROVINCES
      );

      const zoneLayer = map.layers.items.find(
        (item) => item.id === `${countryISO}-${zone}-${type}`
      );

      if (foundProvinceLayer) {
        foundProvinceLayer.visible = false;
      }

      zoneLayer.visible = true;

      const item = {
        label: `${zone}-${type}`,
        parent: '',
        id: `${countryISO}-${zone}-${type}`,
      };
      setMapLegendLayers([item]);

      setRegionLayers(() => ({
        [`${countryISO}-${zone}-${type}`]: zoneLayer,
      }));
    }
  };

  // get SHI scores data
  useEffect(() => {
    if (!shiScoresData?.length) return;

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

    const countryCode = countryISO;

    let whereClause = `ISO3 = '${countryCode}'`;

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

    const countryCode = countryISO;

    if (
      countryISO.toLowerCase() !== 'guy' &&
      countryISO.toLowerCase() !== 'eewwf'
    ) {
      EsriFeatureService.getFeatures({
        url: COUNTRIES_DATA_SERVICE_URL,
        whereClause: `GID_0 = '${countryCode}'`,
        returnGeometry: true,
      }).then((features) => {
        // eslint-disable-next-line no-shadow
        const { geometry } = features[0];

        if (geometry && view) {
          setGeo(geometry);
        }
      });
    }
  }, [view, countryISO]);

  // set layers for Indicator map
  useEffect(async () => {
    if (!map && !view) return;

    if (countryISO.toLowerCase() === 'eewwf') {
      // SPI Layers
      const eewwfSpiLayer = await EsriFeatureService.getFeatureLayer(
        EEWWF_SPI_FEATURE_ID,
        countryISO,
        `${countryISO}-spi`
      );
      eewwfSpiLayer.visible = false;
      map.add(eewwfSpiLayer);
      setRegionLayers((regionLayers) => ({
        ...regionLayers,
        [`${countryISO}-spi`]: eewwfSpiLayer,
      }));

      const eewwfSpiLndLayer = await EsriFeatureService.getFeatureLayer(
        EEWWF_SPI_FEATURE_ID,
        countryISO,
        `${countryISO}-spi-lnd`,
        'LND'
      );
      eewwfSpiLndLayer.visible = false;
      map.add(eewwfSpiLndLayer);
      setRegionLayers((regionLayers) => ({
        ...regionLayers,
        [`${countryISO}-spi-lnd`]: eewwfSpiLndLayer,
      }));

      const eewwfSpiIntLayer = await EsriFeatureService.getFeatureLayer(
        EEWWF_SPI_FEATURE_ID,
        countryISO,
        `${countryISO}-spi-int`,
        'INT'
      );
      eewwfSpiLndLayer.visible = false;
      map.add(eewwfSpiIntLayer);
      setRegionLayers((regionLayers) => ({
        ...regionLayers,
        [`${countryISO}-spi-int`]: eewwfSpiIntLayer,
      }));

      // SHI layeres
      const eewwfShiLayer = await EsriFeatureService.getFeatureLayer(
        EEWWF_SHI_FEATURE_ID,
        countryISO,
        `${countryISO}-shi`
      );
      eewwfShiLayer.visible = false;
      map.add(eewwfShiLayer);
      setRegionLayers((regionLayers) => ({
        ...regionLayers,
        [`${countryISO}-shi`]: eewwfShiLayer,
      }));

      const eewwfShiLndLayer = await EsriFeatureService.getFeatureLayer(
        EEWWF_SHI_FEATURE_ID,
        countryISO,
        `${countryISO}-shi-lnd`,
        'LND'
      );
      eewwfShiLndLayer.visible = false;
      map.add(eewwfShiLndLayer);
      setRegionLayers((regionLayers) => ({
        ...regionLayers,
        [`${countryISO}-shi-lnd`]: eewwfShiLndLayer,
      }));

      const eewwfShiIntLayer = await EsriFeatureService.getFeatureLayer(
        EEWWF_SHI_FEATURE_ID,
        countryISO,
        `${countryISO}-shi-int`,
        'INT'
      );
      eewwfShiIntLayer.visible = false;
      map.add(eewwfShiIntLayer);
      setRegionLayers((regionLayers) => ({
        ...regionLayers,
        [`${countryISO}-shi-int`]: eewwfShiIntLayer,
      }));

      if (tabOption === TABS.SPI) {
        eewwfSpiLayer.visible = true;
        eewwfShiLayer.visible = false;
      } else if (tabOption === TABS.SHI) {
        eewwfSpiLayer.visible = false;
        eewwfShiLayer.visible = true;
      }

      view.goTo({
        zoom: 1,
      });
    } else {
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

      if (countryISO.toLowerCase() === 'guy') {
        const zone3Layer = await EsriFeatureService.getFeatureLayer(
          ZONE_3_SPI_FEATURE_ID,
          countryISO,
          `${countryISO}-zone3-spi`
        );
        map.add(zone3Layer);
        zone3Layer.visible = false;

        const zone5Layer = await EsriFeatureService.getFeatureLayer(
          ZONE_5_SPI_FEATURE_ID,
          countryISO,
          `${countryISO}-zone5-spi`
        );
        map.add(zone5Layer);
        zone5Layer.visible = false;

        const zone3ShiLayer = await EsriFeatureService.getFeatureLayer(
          ZONE_3_SHI_FEATURE_ID,
          countryISO,
          `${countryISO}-zone3-shi`
        );
        map.add(zone3ShiLayer);
        zone3ShiLayer.visible = false;

        const zone5ShiLayer = await EsriFeatureService.getFeatureLayer(
          ZONE_5_SHI_FEATURE_ID,
          countryISO,
          `${countryISO}-zone5-shi`
        );
        map.add(zone5ShiLayer);
        zone5ShiLayer.visible = false;
      }

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

      if (geometry) {
        view.goTo({
          target: geometry,
          center: [geometry.longitude - 20, geometry.latitude],
          zoom: 5.5,
          extent: geometry.clone(),
        });
      }
    }
  }, [map, view]);

  useEffect(() => {
    removeRegionLayers(map, regionLayers);
    setSelectedRegionOption(REGION_OPTIONS.PROVINCES);

    if (countryISO.toLowerCase() !== 'eewwf') {
      const countryCode = countryISO;

      const countryURL = {
        url: DASHBOARD_URLS.COUNTRY_URL,
        whereClause: `ISO3 = '${countryCode}'`,
        orderByFields: ['year'],
      };
      getCountryData(countryURL);

      const shiCountryURL = {
        url: DASHBOARD_URLS.SHI_COUNTRY_DATA_URL,
        whereClause: `ISO3 = '${countryCode}'`,
      };
      getShiCountryData(shiCountryURL);

      // GET SPI Province Trend Data
      const provinceURL = {
        url: DASHBOARD_URLS.SPI_PROVINCE_TREND_URL,
        whereClause: `iso3 = '${countryCode}' and Year = ${SPI_LATEST_YEAR}`,
        orderByFields: ['region_name'],
      };
      getSpiProvinceData(provinceURL);

      // GET SHI Province Trend Data
      const shiProvinceURL = {
        url: DASHBOARD_URLS.SHI_PROVINCE_TREND_URL,
        whereClause: `iso3 = '${countryCode}' and Year = ${SHI_LATEST_YEAR}`,
        orderByFields: ['region_name'],
      };
      getShiProvinceData(shiProvinceURL);

      const whereClause = `ISO3 = '${countryCode}' and ISO3_regional = 'XXX'`;
      getProvinceSpiData(whereClause);

      getShiNationalData();
    } else {
      getZoneData();
      getZoneHistogramData();
    }
  }, []);

  useEffect(() => {
    const countryCode = countryISO;

    if (countryISO.toLowerCase() !== 'eewwf') {
      const zone5Layer = map.layers.items.find(
        (item) => item.id === `${countryISO}-zone5-spi`
      );
      const zone5ShiLayer = map.layers.items.find(
        (item) => item.id === `${countryISO}-zone5-shi`
      );
      const zone3Layer = map.layers.items.find(
        (item) => item.id === `${countryISO}-zone3-spi`
      );
      const zone3ShiLayer = map.layers.items.find(
        (item) => item.id === `${countryISO}-zone3-shi`
      );

      if (
        shiActiveTrend === NATIONAL_TREND &&
        (tabOption === TABS.SHI || tabOption === TABS.SII)
      ) {
        if (zone5ShiLayer) {
          zone5ShiLayer.visible = false;
        }
        if (zone3ShiLayer) {
          zone3ShiLayer.visible = false;
        }
        const foundProvinceLayer = map.layers.items.find(
          (item) => item.id === `${countryISO}-outline`
        );
        if (foundProvinceLayer) {
          foundProvinceLayer.visible = true;
        }
        getShiNationalData();
      } else if (shiActiveTrend === ZONE_3 && tabOption === TABS.SHI) {
        if (zone5ShiLayer) {
          zone5ShiLayer.visible = false;
        }

        loadZone('zone3', 'shi');
      } else if (shiActiveTrend === ZONE_5 && tabOption === TABS.SHI) {
        if (zone3ShiLayer) {
          zone3ShiLayer.visible = false;
        }

        loadZone('zone5', 'shi');
      } else if (activeTrend === ZONE_3) {
        if (zone5Layer) {
          zone5Layer.visible = false;
        }

        loadZone('zone3', 'spi');
      } else if (activeTrend === ZONE_5) {
        if (zone3Layer) {
          zone3Layer.visible = false;
        }

        loadZone('zone5', 'spi');
      } else {
        if (zone3Layer) {
          zone3Layer.visible = false;
        }

        if (zone5Layer) {
          zone5Layer.visible = false;
        }

        const foundProvinceLayer = map.layers.items.find(
          (item) => item.id === REGION_OPTIONS.PROVINCES
        );

        if (foundProvinceLayer) {
          foundProvinceLayer.visible = true;
        }

        let whereClause = `ISO3 = '${countryCode}' and ISO3_regional = 'XXX'`;

        if (selectedProvince) {
          if (activeTrend === PROVINCE_TREND) {
            whereClause = `ISO3_regional = '${
              selectedProvince.iso3_regional ?? selectedProvince.GID_1
            }'`;
          }
          const shiWhereClause = `iso3 = '${countryCode}' and iso3_regional = '${
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
    } else {
      const spiEwwfLayer = map.layers.items.find(
        (item) => item.id === `${countryISO}-spi`
      );
      const eewwfSpiLnd = map.layers.items.find(
        (item) => item.id === `${countryISO}-spi-lnd`
      );
      const eewwfSpiInt = map.layers.items.find(
        (item) => item.id === `${countryISO}-spi-int`
      );

      const shiEwwfLayer = map.layers.items.find(
        (item) => item.id === `${countryISO}-shi`
      );
      const eewwfShiLnd = map.layers.items.find(
        (item) => item.id === `${countryISO}-shi-lnd`
      );
      const eewwfShiInt = map.layers.items.find(
        (item) => item.id === `${countryISO}-shi-int`
      );
      if (spiEwwfLayer) {
        spiEwwfLayer.visible = false;
      }
      if (eewwfSpiInt) {
        eewwfSpiInt.visible = false;
      }
      if (eewwfSpiLnd) {
        eewwfSpiLnd.visible = false;
      }
      if (shiEwwfLayer) {
        shiEwwfLayer.visible = false;
      }
      if (spiEwwfLayer) {
        spiEwwfLayer.visible = false;
      }
      if (eewwfShiLnd) {
        eewwfShiInt.visible = false;
      }
      if (eewwfShiLnd) {
        eewwfShiLnd.visible = false;
      }

      if (tabOption === TABS.SPI) {
        if (spiEwwfLayer) {
          if (activeTrend === 'LND' || activeTrend === 'INT') {
            if (activeTrend === 'LND') {
              eewwfSpiLnd.visible = true;
            } else if (activeTrend === 'INT') {
              eewwfSpiInt.visible = true;
            }
          } else {
            spiEwwfLayer.visible = true;
          }
        }
      } else if (tabOption === TABS.SHI) {
        if (shiEwwfLayer) {
          if (shiActiveTrend === 'LND' || shiActiveTrend === 'INT') {
            shiEwwfLayer.visible = false;

            if (shiActiveTrend === 'LND') {
              eewwfShiLnd.visible = true;
            } else if (shiActiveTrend === 'INT') {
              eewwfShiInt.visible = true;
            }
          } else {
            shiEwwfLayer.visible = true;
          }
        }
      }

      // do something when EEWWF is selected
      getZoneData();
      getZoneHistogramData();
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
      zoneData={zoneData}
      zoneHistrogramData={zoneHistrogramData}
      shiProvinceTrendData={shiProvinceTrendData}
      {...props}
    />
  );
}

export default connect(mapStateToProps, null)(DashboardTrendsSidebarContainer);
