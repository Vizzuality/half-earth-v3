import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import EsriFeatureService from 'services/esri-feature-service';
import GroupLayer from '@arcgis/core/layers/GroupLayer.js';

import Component, { PROVINCE_TREND } from './dashboard-trends-sidebar-component.jsx';
import mapStateToProps from './selectors';
import { COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';
import { LAYER_OPTIONS } from '../../../utils/dashboard-utils.js';

function DashboardTrendsSidebarContainer(props) {
  const { countryISO, view, map, regionLayers, setRegionLayers, geometry } = props;

  const [geo, setGeo] = useState(null);
  const [countryData, setCountryData] = useState(null);

  const [shiValue, setShiValue] = useState(0);
  const [spiValue, setSpiValue] = useState(0);
  const [siiValue, setSiiValue] = useState(0);

  const [shiData, setShiData] = useState({trendData: [], scoresData: []});
  const [spiData, setSpiData] = useState({trendData: [], scoresData: []});
  const [siiData, setSiiData] = useState({trendData: [], scoresData: []});

  const [provinces, setProvinces] = useState([]);
  const [sortedBySpi, setSortedBySpi] = useState();
  const [sortedByArea, setSortedByArea] = useState();
  const [sortedBySpecies, setSortedBySpecies] = useState([]);
  const [allSorted, setAllSorted] = useState(false);
  const [countryRegions, setCountryRegions] = useState([]);
  const [activeTrend, setActiveTrend] = useState(PROVINCE_TREND);

  useEffect(() => {
    removeRegionLayers();
    getData();
  }, []);

  useEffect(() => {
    if (!countryRegions?.length) return;
    getProvinces();
  }, [countryRegions]);

  // find and zoom to region
  useEffect(() => {
    EsriFeatureService.getFeatures({
      url: COUNTRIES_DATA_SERVICE_URL,
      whereClause: `GID_0 = '${countryISO}'`,
      returnGeometry: true,
    }).then((features) => {
      const { geometry, attributes } = features[0];

      if (geometry && view) {
        setGeo(geometry);
        setCountryData(attributes);
      }
    });
  }, [view, countryISO]);

  useEffect(() => {
    if(!map && !view) return;

    const layers = EsriFeatureService.addProvinceLayer(null, countryISO);
    layers.featureLayer.opacity = 0;
    layers.vectorTileLayer.opacity = 0.7;

    setRegionLayers((regionLayers) => ({ ...regionLayers,
      [LAYER_OPTIONS.PROVINCES]: layers.featureLayer,
      [LAYER_OPTIONS.PROVINCES_VECTOR]: layers.vectorTileLayer,
      [LAYER_OPTIONS.PROVINCES_REGION_VECTOR]: layers.outlineVectorTileLayer }));

    map.add(layers.featureLayer);
    map.add(layers.vectorTileLayer);
    map.add(layers.outlineVectorTileLayer);

    // rezoom to country
    view.goTo({
      target: geometry,
      center: [geometry.longitude - 7, geometry.latitude],
      zoom: 7.2,
      extent: geometry.clone(),
    });

    // could be used to zoom to country better
    // view.whenLayerView(layers.vectorTileLayer).then(() => {
    //   view.goTo({
    //     target: layers.vectorTileLayer.fullExtent.expand(1.2),
    //   });
    // })
  }, [map, view]);

  const removeRegionLayers = () => {
    let layers = regionLayers;
    Object.keys(layers).map(region => {
      const foundLayer = map.layers.items.find(item => item.id === region);
      if (foundLayer) {
        map.remove(foundLayer);
      }
    });
  }

  const getData = async () => {
    let year = '2024';
    // DRC country id
    let regionId = '90b03e87-3880-4164-a310-339994e3f919';

    // Liberia
    if(countryISO.toUpperCase() === 'LBR'){
      regionId = '50e1557e-fc47-481a-b090-66d5cba5be70';
    }

    // Guinea
    if(countryISO.toUpperCase() === 'GIN'){
      regionId = '22200606-e907-497f-96db-e7cfd95d61b5';
    }

    // Gabon
    if(countryISO.toUpperCase() === 'GAB'){
      regionId = '30810b40-0044-46dd-a1cd-5a3217749738';
    }

    // Republic of Congo
    if(countryISO.toUpperCase() === 'COG'){
      regionId = '0c98b276-f38a-4a2e-abab-0acfad46ac69'
    }

    const taxa = 'all_terr_verts';

    // SHI calls
    const shiTrendsUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/shs/trend?iso=${countryISO}`;
    const shiScoresUrl = `https://next-api.mol.org/2.x/indicators/shs/values_all_taxa?iso=${countryISO}&year=${year}`;
    // const shiScoresUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/shs/values?iso=${countryISO}&year=${year}`;

    // SPI calls
    const spiTrendsUrl = `https://next-api.mol.org/2.x/indicators/regional_spi_scores?iso3=${countryISO}`;
    // const spiTrendsUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/nrc?region_id=${regionId}&taxa=${taxa}`;
    const spiScoresUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/sps/values?iso=${countryISO}&year=${year}&taxa=${taxa}`;

    // SII calls
    const siiTrendsUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/completeness?region_id=${regionId}&indicator=richness&version=2020&weight=national`;
    const siiScoresUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/sps/values?iso=${countryISO}&year=${year}&taxa=${taxa}`;

    const apiCalls = [shiTrendsUrl, shiScoresUrl, spiTrendsUrl, spiScoresUrl, siiTrendsUrl, siiScoresUrl];

    const apiResponses = await Promise.all(apiCalls.map(async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }));

    const [shiTrendData, shiScoresData, spiTrendData, spiScoresData, siiTrendData, siiScoresData] = apiResponses;

    const shiTD = shiTrendData;
    const lastValues = shiTD[shiTD.length - 1];
    const shi = ((lastValues.avg_area + lastValues.avg_conn) / 2).toFixed(2);
    setShiValue(shi);

    const spiTD = spiTrendData;
    const { regions } = spiTrendData[0];
    setCountryRegions(regions);
    const spiTrendsValues = spiTD[0].country_scores;
    const spi = (spiTrendsValues[spiTrendsValues.length - 1].spi_all).toFixed(2);
    setSpiValue(spi);

    if(siiTrendData.length){
      const siiTD = siiTrendData;
      setSiiValue((siiTD[0].all_taxa_avg * 100).toFixed(2));
    }

    setShiData({trendData: shiTrendData, scoresData: shiScoresData});
    setSpiData({trendData: spiTrendData, scoresData: spiScoresData});
    setSiiData({trendData: siiTrendData, scoresData: siiScoresData});
  }

  const getProvinces = () => {
    const prov = countryRegions.map(region => {
      return { value: region.region_name, label: region.region_name }
    });

    const sortProvinces = prov.sort((a, b) => {
      const nameA = a.label.toUpperCase();
      const nameB = b.label.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    setProvinces(sortProvinces);

    const spiSorted = sortProvincesBySPI();
    setSortedBySpi(spiSorted);
    const areaSorted = sortProvincesByArea();
    setSortedByArea(areaSorted);
    const speciesSorted = sortProvincesBySpecies();
    setSortedBySpecies(speciesSorted);

    setAllSorted(true);
  }

  const sortProvincesBySPI = () => {
    const sorted = [...countryRegions].sort((a, b) => {
      const spi_A = a.regional_scores[a.regional_scores.length - 1].spi_all;
      const spi_B = b.regional_scores[b.regional_scores.length - 1].spi_all;
      if (spi_A > spi_B) {
        return -1;
      }
      if (spi_A < spi_B) {
        return 1;
      }
      return 0;
    });

    return sorted;
  }

  const sortProvincesByArea = () => {
    const sorted = [...countryRegions].sort((a, b) => {
      const spi_A = a.regional_scores[a.regional_scores.length - 1].region_area;
      const spi_B = b.regional_scores[b.regional_scores.length - 1].region_area;
      if (spi_A > spi_B) {
        return -1;
      }
      if (spi_A < spi_B) {
        return 1;
      }
      return 0;
    });

    return sorted;
  }

  const sortProvincesBySpecies = () => {
    const sorted = [...countryRegions].sort((a, b) => {
      const spi_A = a.regional_scores[a.regional_scores.length - 1].nspecies;
      const spi_B = b.regional_scores[b.regional_scores.length - 1].nspecies;
      if (spi_A > spi_B) {
        return -1;
      }
      if (spi_A < spi_B) {
        return 1;
      }
      return 0;
    });

    return sorted;
  }

  return (
    <Component
      countryISO={countryISO}
      shiValue={shiValue}
      spiValue={spiValue}
      siiValue={siiValue}
      shiData={shiData}
      spiData={spiData}
      siiData={siiData}
      countryData={countryData}
      geo={geo}
      provinces={provinces}
      sortedByArea={sortedByArea}
      sortedBySpecies={sortedBySpecies}
      sortedBySpi={sortedBySpi}
      countryRegions={countryRegions}
      allSorted={allSorted}
      activeTrend={activeTrend}
      setActiveTrend={setActiveTrend}
      {...props}
    />
  );
}

export default connect(mapStateToProps, null)(DashboardTrendsSidebarContainer);
