/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import countryDataActions from 'redux_modules/country-data';

import { DASHBOARD } from 'router';

import { useLocale, useT } from '@transifex/react';

import * as urlActions from 'actions/url-actions';

import { activateLayersOnLoad } from 'utils/layer-manager-utils';
import { setBasemap } from 'utils/layer-manager-utils.js';

import EsriFeatureService from 'services/esri-feature-service';

import { NAVIGATION } from 'constants/dashboard-constants';
import {
  COUNTRIES_DATA_SERVICE_URL,
  DASHBOARD_URLS,
} from 'constants/layers-urls';
import { layersConfig } from 'constants/mol-layers-configs';

import DashboardComponent from './dashboard-component.jsx';
import mapStateToProps from './dashboard-selectors.js';

const actions = { ...countryDataActions, ...urlActions };

function DashboardContainer(props) {
  const locale = useLocale();
  const t = useT();
  const {
    viewSettings,
    countryISO,
    queryParams,
    setCountryDataLoading,
    setCountryDataReady,
    setCountryDataError,
    browsePage,
  } = props;

  const [geometry, setGeometry] = useState(null);
  const [speciesInfo, setSpeciesInfo] = useState(null);
  const [data, setData] = useState(null);
  const [dataLayerData, setDataLayerData] = useState(null);
  const [taxaList, setTaxaList] = useState([]);
  const [dataByCountry, setDataByCountry] = useState(null);
  const [spiDataByCountry, setSpiDataByCountry] = useState(null);
  const [selectedTaxa, setSelectedTaxa] = useState('');
  const [filteredTaxaList, setFilteredTaxaList] = useState([]);
  const [scientificName, setScientificName] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(NAVIGATION.HOME);
  const [loggedIn, setLoggedIn] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState();
  const [regionLayers, setRegionLayers] = useState({});
  const [selectedRegionOption, setSelectedRegionOption] = useState('');
  const [selectedProvince, setSelectedProvince] = useState();
  const [tabOption, setTabOption] = useState(2);
  const [provinceName, setProvinceName] = useState();
  const [speciesListLoading, setSpeciesListLoading] = useState(true);
  const [user, setUser] = useState();
  const getQueryParams = () => {
    if (queryParams) {
      const {
        species,
        tab,
        trend,
        region,
        province,
        regionLayers,
        selectedRegionOption,
      } = queryParams;

      if (species) {
        setScientificName(species);
      }

      if (tab) {
        setSelectedIndex(tab);
      }

      if (trend) {
        setTabOption(trend);
      }

      if (region) {
        setSelectedRegion(region);
      }

      if (province) {
        setProvinceName(province);
      }

      if (regionLayers) {
        setRegionLayers(regionLayers);
      }

      if (selectedRegionOption) {
        setSelectedRegionOption(selectedRegionOption);
      }
    }
  };

  const getSpeciesData = async () => {
    const url = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/info?lang=en&scientificname=${scientificName}`;
    const response = await fetch(url);
    const d = await response.json();
    setSpeciesInfo(d[0]);
  };

  const getDataLayersData = async () => {
    const dataLayerParams = {
      scientificname: scientificName,
      group: 'movement',
      lang: locale,
    };
    const dparams = new URLSearchParams(dataLayerParams);
    const dataLayersURL = `https://dev-api.mol.org/2.x/species/datasets?${dparams}`;
    const countryCode = { COG: 'CG', GAB: 'GA', COD: 'CD', LBR: 'LR' };
    const speciesObservationCount = `https://storage.googleapis.com/cdn.mol.org/eow_demo/occ/${
      countryCode[countryISO]
    }_counts_${scientificName.replace(' ', '_')}.geojson`;

    const apiCalls = [dataLayersURL, speciesObservationCount];

    const apiResponses = await Promise.all(
      apiCalls.map(async (url) => {
        const response = await fetch(url);
        try {
          const d = await response.json();
          return d;
        } catch (error) {
          return [];
        }
      })
    );

    const [dataLayersData, speciesObservationData] = apiResponses;

    const ebirdCount = speciesObservationData.find(
      (sod) => sod.which === 'ebird'
    );
    const gbifCount = speciesObservationData.find(
      (sod) => sod.which === 'gbif'
    );

    dataLayersData.map((dld) => {
      if (dld.dataset_title.toUpperCase().match(/EBIRD/)) {
        if (ebirdCount) {
          dld.no_rows = ebirdCount.n;
        } else {
          dld.no_rows = 0;
        }
      }

      if (dld.dataset_title.toUpperCase().match(/GBIF/)) {
        if (gbifCount) {
          dld.no_rows = gbifCount.n;
        } else {
          dld.no_rows = 0;
        }
      }
    });

    setDataLayerData(dataLayersData);
  };

  const makeSpeciesListParams = (args, summary = false) => {
    const params = {};
    params.lang = locale || 'en';
    if (args.lat) {
      params.lat = args.lat.toString();
    }
    if (args.lng) {
      params.lng = args.lng.toString();
    }
    if (args.radius) {
      params.radius = args.radius.toString();
    }
    if (args.wkt) {
      params.wkt = args.wkt;
    }

    if (args.geojson) {
      params.geojson = args.geojson;
    }
    if (args.region_id) {
      params.region_id = args.region_id;
    }
    if (args.WDPA_PID) {
      params.region_attribute = 'WDPA_PID';
      params.region_dataset_id = 'wdpa';
      params.region_attribute_value = args.WDPA_PID;
    }
    if (args.GID_1) {
      params.region_attribute = 'GID_1';
      params.region_attribute_value = args.GID_1;
      params.region_dataset_id = 'gadm_states';
    }
    // if(args.region_dataset_id){
    //   params.region_dataset_id = args.region_dataset_id;
    // }

    if (summary) {
      params.summary = 'true';
    }
    return params;
  };

  const getTaxaSpecies = async (taxa, slices) => {
    const json = JSON.parse(slices);
    let url;

    switch (taxa) {
      case 'amphibians':
        url = DASHBOARD_URLS.AMPHIBIAN_LOOKUP;
        break;
      case 'birds':
        url = DASHBOARD_URLS.BIRDS_LOOKUP;
        break;
      case 'mammals':
        url = DASHBOARD_URLS.MAMMALS_LOOKUP;
        break;
      case 'reptiles':
        url = DASHBOARD_URLS.REPTILES_LOOKUP;
        break;
      default:
        break;
    }

    const response = await EsriFeatureService.getFeatures({
      url,
      whereClause: `SliceNumber IN (${json
        .map((s) => s.SliceNumber)
        .join(',')})`,
      returnGeometry: false,
    });

    return {
      taxa,
      title: t(taxa),
      count: json.length,
      species: response.map((r) => r.attributes),
    };
  };

  const getSpeciesDetails = (speciesData, taxa) => {
    const species = speciesData.species.map(
      ({ scientific_name, common_name, attributes }) => {
        const { source, species_url, threat_status } = JSON.parse(
          attributes.replace(/NaN/g, 'null')
        )[0];

        return {
          common_name,
          scientific_name,
          threat_status,
          source,
          species_url,
          taxa,
        };
      }
    );

    return {
      count: speciesData.species.length,
      species,
      taxa,
      title: taxa,
    };
  };

  const getOccurenceSpecies = async (speciesData) => {
    const url = DASHBOARD_URLS.SPECIES_OCCURENCE_URL;
    let whereClause = `ISO3 = '${countryISO}'`;

    if (selectedRegion) {
      const { GID_1, WDPA_PID } = selectedRegion;
      if (GID_1) {
        whereClause = `GID_1 = '${GID_1}'`;
      }

      if (WDPA_PID) {
        whereClause = `WDPA_PID = '${WDPA_PID}'`;
      }
    }

    const occurenceFeatures = await EsriFeatureService.getFeatures({
      url,
      whereClause,
      returnGeometry: false,
    });

    const list = [...speciesData];

    occurenceFeatures.forEach((feature) => {
      const { taxa, species, attributes } = feature.attributes;

      const { source, species_url, threat_status } = JSON.parse(
        attributes.replace(/NaN/g, 'null')
      )[0];

      const speciesToAdd = {
        common_name: species,
        scientific_name: species,
        threat_status,
        source,
        species_url,
        taxa,
      };

      list.find((t) => t.taxa === taxa)?.species.push(speciesToAdd);
    });

    list.forEach((t) => {
      t.count = t.species.length;
    });

    setTaxaList(list);
    setSpeciesListLoading(false);
  };

  const getSpeciesList = async () => {
    setSpeciesListLoading(true);
    let url = DASHBOARD_URLS.PRECALC_AOI;
    let whereClause = `GID_0 = '${countryISO}'`;

    if (selectedRegion) {
      const { GID_1, WDPA_PID } = selectedRegion;
      if (GID_1) {
        whereClause = `GID_1 = '${GID_1}'`;
      }

      if (WDPA_PID) {
        whereClause = `WDPA_PID = '${WDPA_PID}'`;
        url = DASHBOARD_URLS.WDPA_PRECALC;
      }
    }

    const features = await EsriFeatureService.getFeatures({
      url,
      whereClause,
      returnGeometry: false,
    });

    if (features && features[0]) {
      const { attributes } = features[0];

      const { amphibians, birds, reptiles, mammals } = attributes;

      const [amphibianData, birdsData, reptilesData, mammalsData] =
        await Promise.all([
          getTaxaSpecies('amphibians', amphibians),
          getTaxaSpecies('birds', birds),
          getTaxaSpecies('reptiles', reptiles),
          getTaxaSpecies('mammals', mammals),
        ]);

      const ampSpecies = getSpeciesDetails(amphibianData, 'amphibians');
      const birdSpecies = getSpeciesDetails(birdsData, 'birds');
      const repSpecies = getSpeciesDetails(reptilesData, 'reptiles');
      const mamSpecies = getSpeciesDetails(mammalsData, 'mammals');

      const speciesData = [ampSpecies, birdSpecies, repSpecies, mamSpecies];

      getOccurenceSpecies(speciesData);
    }
  };

  const getSpiDataByCountry = (d) => {
    const spiCountryData = d.reduce((acc, obj) => {
      const key = obj.country_name;
      if (!acc[key]) {
        acc[key] = { shs: [] };
      }
      acc[key].shs.push(obj);
      return acc;
    }, {});

    setSpiDataByCountry(spiCountryData);
  };

  const getDataByCountry = (d) => {
    let countryData;

    // TODO: figure out what to do when no shs is returned
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
      }, countryData || {});
    }

    setDataByCountry(countryData);
  };

  const handleMapLoad = (map, activeLayers) => {
    setBasemap({
      map,
      layersArray: viewSettings.basemap.layersArray,
    });
    activateLayersOnLoad(map, activeLayers, layersConfig);
  };

  const getData = async () => {
    const habitatTrendUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/indicators/habitat-trends/bycountry?scientificname=${scientificName}`;
    const spiScoreURL = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/sps/species_bycountry?scientificname=${scientificName}`;

    const apiCalls = [habitatTrendUrl, spiScoreURL];

    const apiResponses = await Promise.all(
      apiCalls.map(async (url) => {
        const response = await fetch(url);
        const d = await response.json();
        return d;
      })
    );

    const [habitatTrendData, spiScoreData] = apiResponses;
    getDataByCountry(habitatTrendData);
    getSpiDataByCountry(spiScoreData);

    setData({ habitatTrendData, spiScoreData });
  };

  // Get Country information, allows to get country name
  useEffect(() => {
    getQueryParams();

    // Function to handle back navigation
    const handleBackButton = () => {
      // Implement custom behavior here
      setSelectedIndex(window.history.state?.selectedIndex ?? 1);
    };

    // Add event listener for popstate event
    window.addEventListener('popstate', handleBackButton);

    setCountryDataLoading();
    EsriFeatureService.getFeatures({
      url: COUNTRIES_DATA_SERVICE_URL,
      whereClause: `GID_0 = '${countryISO}'`,
      returnGeometry: true,
    })
      .then((features) => {
        const { geometry } = features[0];

        setCountryDataReady(features);
        if (geometry) {
          setGeometry(geometry);
        }
      })
      .catch((error) => {
        setCountryDataError(error);
      });

    getSpeciesList();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  useEffect(() => {
    if (!selectedRegion) return;
    getSpeciesList();
  }, [selectedRegion]);

  useEffect(() => {
    if (!scientificName) return;
    getSpeciesData();
  }, [scientificName]);

  useEffect(() => {
    if (!speciesInfo) return;
    getDataLayersData();
  }, [speciesInfo]);

  useEffect(() => {
    if (!dataLayerData) return;
    getData();
  }, [dataLayerData]);

  useEffect(() => {
    browsePage({
      type: DASHBOARD,
      payload: { iso: countryISO.toLowerCase() },
      query: {
        species: scientificName ?? undefined,
        tab: selectedIndex,
        trend: tabOption ?? undefined,
        region: selectedRegion ?? undefined,
        // province: provinceName ?? undefined,
        lang: user?.culture?.split('-')[0] ?? undefined,
      },
    });
  }, [
    scientificName,
    selectedIndex,
    tabOption,
    selectedRegion,
    provinceName,
    user,
  ]);

  return (
    <DashboardComponent
      handleMapLoad={handleMapLoad}
      geometry={geometry}
      speciesInfo={speciesInfo}
      data={data}
      dataLayerData={dataLayerData}
      dataByCountry={dataByCountry}
      spiDataByCountry={spiDataByCountry}
      taxaList={taxaList}
      setTaxaList={setTaxaList}
      selectedTaxa={selectedTaxa}
      setSelectedTaxa={setSelectedTaxa}
      filteredTaxaList={filteredTaxaList}
      setFilteredTaxaList={setFilteredTaxaList}
      scientificName={scientificName}
      setScientificName={setScientificName}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
      loggedIn={loggedIn}
      setLoggedIn={setLoggedIn}
      setSelectedRegion={setSelectedRegion}
      selectedRegion={selectedRegion}
      regionLayers={regionLayers}
      setRegionLayers={setRegionLayers}
      selectedRegionOption={selectedRegionOption}
      setSelectedRegionOption={setSelectedRegionOption}
      selectedProvince={selectedProvince}
      setSelectedProvince={setSelectedProvince}
      tabOption={tabOption}
      setTabOption={setTabOption}
      provinceName={provinceName}
      setProvinceName={setProvinceName}
      user={user}
      setUser={setUser}
      speciesListLoading={speciesListLoading}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(DashboardContainer);
