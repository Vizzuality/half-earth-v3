import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { activateLayersOnLoad } from 'utils/layer-manager-utils';
import EsriFeatureService from 'services/esri-feature-service';
import { layersConfig } from 'constants/mol-layers-configs';

import { setBasemap } from '../../utils/layer-manager-utils.js';
import * as urlActions from 'actions/url-actions';
import countryDataActions from 'redux_modules/country-data';
import DashboardComponent from './dashboard-component.jsx';
import mapStateToProps from './dashboard-selectors.js';
import { DASHBOARD } from 'router';
import {
  COUNTRIES_DATA_SERVICE_URL
} from 'constants/layers-urls';
import { NAVIGATION } from '../../utils/dashboard-utils';
import { useLocale } from '@transifex/react';

const actions = { ...countryDataActions, ...urlActions };

function DashboardContainer(props) {
  const locale = useLocale();
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
  const [taxaList, setTaxaList] = useState([])
  const [dataByCountry, setDataByCountry] = useState(null);
  const [spiDataByCountry, setSpiDataByCountry] = useState(null);
  const [selectedTaxa, setSelectedTaxa] = useState('');
  const [filteredTaxaList, setFilteredTaxaList] = useState();
  const [scientificName, setScientificName] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(NAVIGATION.HOME);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState();
  const [regionLayers, setRegionLayers] = useState({});
  const [selectedRegionOption, setSelectedRegionOption] = useState('');
  const [selectedProvince, setSelectedProvince] = useState();
  const [tabOption, setTabOption] = useState(2);
  const [provinceName, setProvinceName] = useState();
  const [user, setUser] = useState()

  // Get Country information, allows to get country name
  useEffect(() => {
    getQueryParams();

    // Function to handle back navigation
    const handleBackButton = (event) => {
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
    }).then((features) => {
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
    if(!selectedRegion) return;
    getSpeciesList();

  }, [selectedRegion]);

  useEffect(() => {
    if(!scientificName) return;
    getSpeciesData();
  }, [scientificName]);

  useEffect(() => {
    if(!speciesInfo) return;
    getDataLayersData();
  }, [speciesInfo]);

  useEffect(() => {
    if(!dataLayerData || !taxaList?.length) return;
    getData();

  }, [dataLayerData, taxaList]);

  useEffect(() => {
    const activeLayers = Object.keys(regionLayers).length ? Object.keys(regionLayers) : undefined;
    browsePage({
      type: DASHBOARD,
      payload: { iso: countryISO.toLowerCase() },
      query: {
        species: scientificName ?? undefined,
        tab: selectedIndex,
        trend: tabOption ?? undefined,
        region: selectedRegion ?? undefined,
        province: provinceName ?? undefined
      },
    });

  }, [scientificName, selectedIndex, tabOption, selectedRegion, provinceName]);

  const getQueryParams = () => {
    if(queryParams){
      const {
        species,
        tab,
        trend,
        region,
        province,
        regionLayers,
        selectedRegionOption} = queryParams

      if(species){
        setScientificName(species);
      }

      if(tab){
        setSelectedIndex(tab);
      }

      if(trend){
        setTabOption(trend);
      }

      if(region){
        setSelectedRegion(region);
      }

      if(province){
        setProvinceName(province)
      }

      if(regionLayers){
        setRegionLayers(regionLayers);
      }

      if(selectedRegionOption){
        setSelectedRegionOption(selectedRegionOption);
      }
    }
  }

  const getSpeciesData = async () => {
    const url = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/info?lang=en&scientificname=${scientificName}`;
    const response = await fetch(url);
    const data = await response.json();
    setSpeciesInfo(data[0]);
  }

  const getDataLayersData = async () => {
    const dataLayerParams = {
      scientificname: scientificName,
      group: 'movement',
      lang: locale,
    };
    const dparams = new URLSearchParams(dataLayerParams);
    const dataLayersURL = `https://dev-api.mol.org/2.x/species/datasets?${dparams}`;
    const countryCode = {COG: 'CG', GAB: 'GA', COD: 'CD', LBR: 'LR'};
    const speciesObservationCount = `https://storage.googleapis.com/cdn.mol.org/eow_demo/occ/${countryCode[countryISO]}_counts_${scientificName.replace(' ', '_')}.geojson`;

    const apiCalls = [
      dataLayersURL,
      speciesObservationCount
    ];

    const apiResponses = await Promise.all(apiCalls.map(async (url) => {
      const response = await fetch(url);
      try{
        const data = await response.json();
        return data;
      } catch(error){
        return [];
      }
    }));

    const [dataLayersData, speciesObservationData] = apiResponses;

    const ebirdCount = speciesObservationData.find(sod => sod.which === 'ebird');
    const gbifCount = speciesObservationData.find(sod => sod.which === 'gbif');

    dataLayersData.map(dld => {
      if(dld.dataset_title.toUpperCase().match(/EBIRD/)){
        if(ebirdCount){
          dld.no_rows = ebirdCount.n;
        } else {
          dld.no_rows = 0;
        }
      }

      if(dld.dataset_title.toUpperCase().match(/GBIF/)){
        if(gbifCount){
          dld.no_rows = gbifCount.n;
        } else {
          dld.no_rows = 0;
        }
      }
    })

    setDataLayerData(dataLayersData);
  }

  const getData = async () => {
    const habitatTrendUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/indicators/habitat-trends/bycountry?scientificname=${scientificName}`;
    const spiScoreURL = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/sps/species_bycountry?scientificname=${scientificName}`

    const apiCalls = [
      habitatTrendUrl,
      spiScoreURL
    ];

    const apiResponses = await Promise.all(apiCalls.map(async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }));

    const [habitatTrendData, spiScoreData] = apiResponses;
    getDataByCountry(habitatTrendData);
    getSpiDataByCountry(spiScoreData);

    setData({habitatTrendData, spiScoreData});
  }

  const getSpeciesList = async () => {
    const speciesListUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/spatial/species/list`;

    // TODO: Use mol-country-attribute.json file to find MOL Region ID for ISO value
    const params = makeSpeciesListParams({
      region_id: '44b3bc0a-e617-4785-9123-7e6e5349b07d',
      ...selectedRegion,
    });

    // province
    // region_attribute:'GID_1',
      // region_attribute_value:'COD.10_1'
    const response = await fetch(speciesListUrl, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*'
      }
    });
    const data = await response.json();

    const seasons = [
      '',
      'Resident',
      'Breeding',
      'Non-breeding',
      'Passage',
      '',
    ];

    data.taxas?.forEach(taxa => {
      const taxaDatasetSet = new Set();
      taxa.species.forEach(species => {
        const speciesDatasets = Object.keys(species.dataset);
        speciesDatasets.forEach(d => {
          taxaDatasetSet.add(d);
        });
        const speciesDataset2 = {};
        speciesDatasets.forEach(k => {
          speciesDataset2[data.datasets[k].dataset_id] =
            species.dataset[k];
        });
        species.datasetList = speciesDatasets.map(dsid => ({
          dataset_id: data.datasets[dsid].dataset_id,
          product_type: data.datasets[dsid].product_type,
          title: data.datasets[dsid].title,
          seasonality: species.dataset[dsid],
          seasonalityString: species.dataset[dsid]
            .map(s => (s === null ? 'Resident' : seasons[s]))
            .filter(s => s.length > 0)
            .join(', '),
        }));
        species.dataset = speciesDataset2;
      });
      taxa.datasets = {};
      Array.from(taxaDatasetSet).forEach((d) => {
        const ds = data.datasets[d];
        taxa.datasets[ds.dataset_id] = ds;
      });
    });

    const taxa = sortTaxaList(data.taxas);
    setTaxaList(taxa);
  }

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
    if(args.WDPA_PID){
      params.region_attribute = 'WDPA_PID';
      params.region_dataset_id = 'wdpa';
      params.region_attribute_value = args.WDPA_PID;
    }
    if(args.GID_1){
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
  }

  const getSpiDataByCountry = d => {
    let spiCountryData = d.reduce((acc, obj) => {
        const key = obj.country_name;
        if (!acc[key]) {
          acc[key] = { shs: [] };
        }
        acc[key].shs.push(obj);
        return acc;
      }, {});

      setSpiDataByCountry(spiCountryData);
  }

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
  }

  const sortTaxaList = (taxa) => {
    return taxa?.sort((a, b) => {
      if (a.sortby < b.sortby) {
        return -1;
      }
      if (a.sortby > b.sortby) {
        return 1;
      }
      return 0;
    });
  }

  const handleMapLoad = (map, activeLayers) => {
    setBasemap({
      map,
      layersArray: viewSettings.basemap.layersArray,
    });
    activateLayersOnLoad(map, activeLayers, layersConfig);
  };

  return <DashboardComponent
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
    {...props} />;
}

export default connect(mapStateToProps, actions)(DashboardContainer);
