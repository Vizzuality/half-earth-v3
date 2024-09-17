import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './dashboard-selectors';
import * as urlActions from 'actions/url-actions';
import countryDataActions from 'redux_modules/country-data';
import EsriFeatureService from 'services/esri-feature-service';
import DashboardComponent from './dashboard-component';
import {
  COUNTRIES_DATA_SERVICE_URL
} from 'constants/layers-urls';

const actions = { ...countryDataActions, ...urlActions };

function DashboardContainer(props) {
  const {
    countryISO,
    setCountryDataLoading,
    setCountryDataReady,
    setCountryDataError,
    scientificName
  } = props;

  const [data, setData] = useState(null);
  const [dataLayerData, setDataLayerData] = useState(null);
  const [taxaList, setTaxaList] = useState([])
  const [dataByCountry, setDataByCountry] = useState(null);
  const [selectedTaxa, setSelectedTaxa] = useState('');
  const [filteredTaxaList, setFilteredTaxaList] = useState();

  const speciesListUrl = 'https://dev-api.mol.org/2.x/spatial/species/list';

  // Get Country information, allows to get country name
  useEffect(() => {
    setCountryDataLoading();
    EsriFeatureService.getFeatures({
      url: COUNTRIES_DATA_SERVICE_URL,
      whereClause: `GID_0 = '${countryISO}'`,
      returnGeometry: false,
    })
      .then((features) => {
        setCountryDataReady(features);
      })
      .catch((error) => {
        setCountryDataError(error);
      });

    getSpeciesList();
  }, [])

  useEffect(() => {
    if(!scientificName) return;
    getDataLayersData();
    getData();
  }, [scientificName]);

  const getDataLayersData = async () => {
    const dataLayerParams = {
      scientificname: scientificName,
      group: 'movement'
    };
    const dparams = new URLSearchParams(dataLayerParams);
    const dataLayersURL = `https://dev-api.mol.org/2.x/species/datasets?${dparams}`;

    const apiCalls = [
      dataLayersURL
    ];

    const apiResponses = await Promise.all(apiCalls.map(async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }));

    const [dataLayersData] = apiResponses;

    setDataLayerData(dataLayersData);
  }

  const getData = async () => {
    const speciesPreferences = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/habitat?scientificname=${scientificName}`;
    const res = await fetch(speciesPreferences);
    const ps = await res.json();
    // TODO: figure out what to do is ps.prefs are null
    const preferences = getPreferenceQuery(ps.prefs);
    const params = new URLSearchParams(preferences);

    // TODO: Some responses have no frag results
    const habitatTrendUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/indicators/habitat-trends/bycountry?scientificname=${scientificName}`;
    const reserveCoverageMetricsUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/indicators/reserve-coverage/metrics?scientificname=${scientificName}&${params}`;
    const habitatMetricesUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/indicators/habitat-distribution/metrics?scientificname=${scientificName}&${params}`;

    // const dataLayerParams = {
    //   scientificname: scientificName,
    //   group: 'movement'
    // };
    // const dparams = new URLSearchParams(dataLayerParams);
    // const dataLayersURL = `https://dev-api.mol.org/2.x/species/datasets?${dparams}`;

    const apiCalls = [
      habitatTrendUrl,
      reserveCoverageMetricsUrl,
      habitatMetricesUrl,
    ];

    const apiResponses = await Promise.all(apiCalls.map(async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }));

    const [habitatTrendData, reserveCoverageData, habitatMetricesData] = apiResponses;
    getDataByCountry(habitatTrendData);

    setData({habitatTrendData, reserveCoverageData, habitatMetricesData});
  }

  const getSpeciesList = async () => {
    // TODO: Use mol-country-attribute.json file to find MOL Region ID for ISO value
    const params = makeSpeciesListParams({
      region_id: '44b3bc0a-e617-4785-9123-7e6e5349b07d',
    });
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

    data.taxas.forEach(taxa => {
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
    params.lang = 'en';
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
    if (summary) {
      params.summary = 'true';
    }
    return params;
  }

  const getPreferenceQuery = (preferences) => {
    return {
      class: preferences.class,
      habitat: preferences.habitat,
      treecover_max: preferences.tree_cover_max.toString(),
      treecover_min: preferences.tree_cover_min.toString(),
      elev_max: preferences.elev_max.toString(),
      elev_min: preferences.elev_min.toString(),
      use_e: preferences.use_e.toString(),
      use_h: preferences.use_h.toString(),
      use_f: preferences.use_f.toString(),
    }
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
    return taxa.sort((a, b) => {
      if (a.sortby < b.sortby) {
        return -1;
      }
      if (a.sortby > b.sortby) {
        return 1;
      }
      return 0;
    });
  }

  return <DashboardComponent
            data={data}
            dataLayerData={dataLayerData}
            dataByCountry={dataByCountry}
            taxaList={taxaList}
            selectedTaxa={selectedTaxa}
            setSelectedTaxa={setSelectedTaxa}
            filteredTaxaList={filteredTaxaList}
            setFilteredTaxaList={setFilteredTaxaList}
            {...props} />;
}

export default connect(mapStateToProps, actions)(DashboardContainer);
