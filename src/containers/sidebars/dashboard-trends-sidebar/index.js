import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import last from 'lodash/last';

import EsriFeatureService from 'services/esri-feature-service';

import { COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';

import {
  LAYER_OPTIONS,
  PROVINCE_FEATURE_GLOBAL_SPI_LAYER_ID,
  REGION_OPTIONS,
} from '../../../utils/dashboard-utils.js';

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
  } = props;

  const [geo, setGeo] = useState(null);
  const [countryData, setCountryData] = useState(null);

  const [shiValue, setShiValue] = useState(0);
  const [spiValue, setSpiValue] = useState(0);
  const [siiValue, setSiiValue] = useState(0);

  const [shiData, setShiData] = useState({ trendData: [], scoresData: [] });
  const [spiData, setSpiData] = useState({ trendData: [], scoresData: [] });
  const [siiData, setSiiData] = useState({ trendData: [], scoresData: [] });

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
    if (!map && !view) return;

    const layer = EsriFeatureService.getFeatureLayer(
      PROVINCE_FEATURE_GLOBAL_SPI_LAYER_ID,
      countryISO
    );

    setRegionLayers((regionLayers) => ({
      ...regionLayers,
      [LAYER_OPTIONS.PROVINCES]: layer,
    }));

    map.add(layer);

    // rezoom to country
    view.goTo({
      target: geometry,
      center: [geometry.longitude - 20, geometry.latitude],
      zoom: 5.5,
      extent: geometry.clone(),
    });
  }, [map, view]);

  const removeRegionLayers = () => {
    const layers = regionLayers;
    Object.keys(layers).map((region) => {
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

    const shiTrendsUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/shs/trend?iso=${countryISO}`;
    const spiTrendsUrl = `https://next-api.mol.org/2.x/indicators/regional_spi_scores?iso3=${countryISO}`;
    const siiTrendsUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/completeness?region_id=${regionId}&indicator=richness&version=2020&weight=national`;

    const trendApiCalls = [shiTrendsUrl, spiTrendsUrl, siiTrendsUrl];

    const trendApiResponses = await Promise.all(
      trendApiCalls.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      })
    );

    const [shiTrendData, spiTrendData, siiTrendData] = trendApiResponses;

    const shiYear = last(shiTrendData).year;
    const spiYear = last(spiTrendData[0].country_scores).year;
    const siiYear = last(siiTrendData[0].groups[0].values)[0];
    const shiScoresUrl = `https://next-api.mol.org/2.x/indicators/shs/values_all_taxa?iso=${countryISO}&year=${shiYear}`;
    const spiScoresUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/sps/values?iso=${countryISO}&year=${spiYear}&taxa=${taxa}`;
    const siiScoresUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/sps/values?iso=${countryISO}&year=${siiYear}&taxa=${taxa}`;

    const spendApiCalls = [shiScoresUrl, spiScoresUrl, siiScoresUrl];

    const scoreApiResponses = await Promise.all(
      spendApiCalls.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      })
    );

    const [shiScoresData, spiScoresData, siiScoresData] = scoreApiResponses;

    const shiTD = shiTrendData;
    const lastValues = shiTD[shiTD.length - 1];
    const shi = ((lastValues.avg_area + lastValues.avg_conn) / 2).toFixed(2);
    setShiValue(shi);

    const spiTD = spiTrendData;
    const { regions } = spiTrendData[0];
    setCountryRegions(regions);
    const spiTrendsValues = spiTD[0].country_scores;
    const spi = spiTrendsValues[spiTrendsValues.length - 1].spi_all.toFixed(2);
    setSpiValue(spi);

    if (siiTrendData.length) {
      const siiTD = siiTrendData;
      setSiiValue((siiTD[0].all_taxa_avg * 100).toFixed(2));
    }

    setShiData({ trendData: shiTrendData, scoresData: shiScoresData });
    setSpiData({ trendData: spiTrendData, scoresData: spiScoresData });
    setSiiData({ trendData: siiTrendData, scoresData: siiScoresData });
  };

  const getProvinces = () => {
    const prov = countryRegions.map((region) => {
      return { value: region.region_name, label: region.region_name };
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
  };

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
  };

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
  };

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
  };

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
