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

  const getCountryData = (countryURL) => {
    EsriFeatureService.getFeatures(countryURL).then((features) => {
      const response = features.map((f) => f.attributes);

      setProvinces(response);
      setShiProvinceTrendData(response);

      const countries = response.filter(
        (item) => item.region_key === countryISO
      );

      setSpiValue(last(countries).spi.toFixed(1));

      const shiValues =
        countries.find((item) => item.year === SHI_LATEST_YEAR).habitat_index ||
        0;
      const siiValues =
        countries.find((item) => item.year === SII_LATEST_YEAR).sii || 0;
      setShiValue(parseFloat(shiValues).toFixed(1));
      setSiiValue(parseFloat(siiValues).toFixed(1));
      setCountryData(countries);
      setShiCountryData(countries);
    });
  };

  const getHistogramData = (whereClause) => {
    const scoresDataURL = {
      url: DASHBOARD_URLS.SPI_HISTOGRAM_URL,
      whereClause: `${whereClause}`,
    };
    EsriFeatureService.getFeatures(scoresDataURL).then((features) => {
      const data = features?.map((f) => f.attributes);
      setSpiScoresData(data);
      setShiScoresData(data);
      if (countryISO.toLowerCase() === 'ee') {
        setSpiSelectSpeciesData(zoneHistrogramData[0]);
      } else {
        setSpiSelectSpeciesData(data);
        setShiSelectSpeciesData(data);
      }
    });
  };

  const getZoneData = () => {
    const project = countryISO.toLowerCase() === 'guy-fm' ? 'acc_guyana' : 'ee';
    let whereClause = `project in ('${project === 'ee' ? 'eewwf' : project}'`;

    const landscapeRegions = `(1, 7, 9, 10, 15)`;

    if (tabOption === TABS.SPI) {
      if (activeTrend === 'LND') {
        whereClause += `) and region_key in ${landscapeRegions}`;
      } else if (activeTrend === 'INT') {
        whereClause += `) and region_key not in ${landscapeRegions}`;
      } else {
        whereClause += `, 'country')`;
      }
    }

    if (tabOption === TABS.SHI) {
      if (shiActiveTrend === 'LND') {
        whereClause += `) and region_key in ${landscapeRegions}`;
      } else if (shiActiveTrend === 'INT') {
        whereClause += `) and region_key not in ${landscapeRegions}`;
      } else {
        whereClause += `, 'country') `;
      }
    }

    const zoneDataUrl = {
      url: DASHBOARD_URLS.REGION_SHI_SPI_URL,
      whereClause: `${whereClause}`,
    };

    EsriFeatureService.getFeatures(zoneDataUrl).then((features) => {
      const data = features?.map((f) => f.attributes);
      const filteredData =
        data?.filter((item) => item.habitat_index !== null) || [];
      setZoneData(filteredData);
    });
  };

  const getZoneHistogramData = () => {
    const project = countryISO.toLowerCase() === 'guy-fm' ? 'acc_guyana' : 'ee';
    let whereClause = `project = '${project === 'ee' ? 'eewwf' : project}'`;

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
    if (countryISO.toLowerCase() === 'guy-fm') {
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

  // find and zoom to region
  useEffect(() => {
    // if (countryISO === 'COD') {
    //   setShiActiveTrend(NATIONAL_TREND);
    // }
    if (
      countryISO.toLowerCase() !== 'guy-fm' &&
      countryISO.toLowerCase() !== 'ee'
    ) {
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
    }
  }, [view, countryISO]);

  // set layers for Indicator map
  useEffect(async () => {
    if (!map && !view) return;

    if (countryISO.toLowerCase() === 'ee') {
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

      if (countryISO.toLowerCase() === 'guy-fm') {
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

    if (countryISO.toLowerCase() !== 'ee') {
      const countryCode = countryISO;

      const countryURL = {
        url: DASHBOARD_URLS.SPI_PROVINCE_TREND_URL,
        whereClause: `iso3 = '${countryCode}'`,
        orderByFields: ['name', 'year'],
      };
      getCountryData(countryURL);

      const whereClause = `iso3 = '${countryCode}' and region_key = '${countryCode}'`;
      getHistogramData(whereClause);
    } else {
      getZoneData();
      getZoneHistogramData();
    }
  }, []);

  useEffect(() => {
    const countryCode = countryISO;

    if (countryISO.toLowerCase() !== 'ee') {
      let whereClause = `iso3 = '${countryCode}' and region_key = '${countryCode}'`;

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
        getHistogramData(whereClause);
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

        if (selectedProvince) {
          if (
            (tabOption === TABS.SPI && activeTrend === PROVINCE_TREND) ||
            (tabOption === TABS.SHI && shiActiveTrend === PROVINCE_TREND)
          ) {
            // TODO: iso3_regional does not exist in all provinces
            whereClause = `region_key = '${selectedProvince.region_key}'`;
          }

          getHistogramData(whereClause);
        }
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
