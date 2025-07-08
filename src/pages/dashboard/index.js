/* eslint-disable camelcase */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import countryDataActions from 'redux_modules/country-data';

import { DASHBOARD } from 'router';

import { tx } from '@transifex/native';
import { useLocale, useT } from '@transifex/react';

import * as urlActions from 'actions/url-actions';

import {
  getCustomAOISpeciesData,
  getAoiFromDataBase,
} from 'utils/geo-processing-services';
import { activateLayersOnLoad } from 'utils/layer-manager-utils';
import { setBasemap } from 'utils/layer-manager-utils.js';

import EsriFeatureService from 'services/esri-feature-service';

import { NAVIGATION, REGION_OPTIONS } from 'constants/dashboard-constants.js';
import {
  BIRDS,
  MAMMALS,
  REPTILES,
  AMPHIBIANS,
} from 'constants/geo-processing-services';
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
    lang,
  } = props;

  const speciesToAvoid = [
    'CEPHALOPHUS FOSTERI',
    'CEPHALOPHUS ARRHENII',
    'CEPHALOPHUS CASTANEUS',
    'CEPHALOPHUS CURTICEPS',
    'CEPHALOPHUS JOHNSTONI',
    'CEPHALOPHUS NATALENSIS',
    'KOBUS DEFASSA',
    'OUREBIA HASTATA',
    'REDUNCA BOHOR',
    'ACINONYX JUBATUS',
    'PILIOCOLOBUS PENNANTII',
    'DICEROS BICORNIS',
    'MECISTOPS CATAPHRACTUS',
  ];

  const [geometry, setGeometry] = useState(null);
  const [speciesInfo, setSpeciesInfo] = useState(null);
  const [data, setData] = useState(null);
  const [dataLayerData, setDataLayerData] = useState(null);
  const [privateOccurrenceData, setPrivateOccurrenceData] = useState([]);
  const [taxaList, setTaxaList] = useState([]);
  const [allTaxa, setAllTaxa] = useState([]);
  const [dataByCountry, setDataByCountry] = useState(null);
  const [spiDataByCountry, setSpiDataByCountry] = useState(null);
  const [selectedTaxa, setSelectedTaxa] = useState('');
  const [filteredTaxaList, setFilteredTaxaList] = useState([]);
  const [scientificName, setScientificName] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(NAVIGATION.HOME);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedGeometryRings, setSelectedGeometryRings] = useState();
  const [fromTrends, setFromTrends] = useState(false);
  const [regionLayers, setRegionLayers] = useState({});
  const [selectedRegionOption, setSelectedRegionOption] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState();
  const [exploreAllSpecies, setExploreAllSpecies] = useState(true);
  const [tabOption, setTabOption] = useState(2);
  const [provinceName, setProvinceName] = useState();
  const [regionName, setRegionName] = useState();
  const [speciesListLoading, setSpeciesListLoading] = useState(true);
  const [prioritySpeciesList, setPrioritySpeciesList] = useState([]);
  const [mapLegendLayers, setMapLegendLayers] = useState([]);
  const [user, setUser] = useState();
  const [hash, setHash] = useState();

  const getQueryParams = () => {
    if (queryParams) {
      const {
        species,
        tab,
        trend,
        region,
        province,
        regionName,
        regionLayers,
        selectedRegionOption,
        exploreAll,
        lang,
        hash,
      } = queryParams;

      if (species) {
        setScientificName(species);
      }

      if (regionName) {
        setRegionName(regionName);
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

      if (exploreAll) {
        setExploreAllSpecies(true);
      } else {
        setExploreAllSpecies(null);
      }

      if (regionLayers) {
        setRegionLayers(regionLayers);
      }

      if (selectedRegionOption) {
        setSelectedRegionOption(selectedRegionOption);
      }

      if (lang) {
        tx.setCurrentLocale(lang);
      }

      if (hash) {
        setHash(hash);
      }
    }
  };

  const getSpeciesData = async () => {
    const url = `https://dev-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/info?lang=${lang}&scientificname=${scientificName}`;
    const response = await fetch(url);
    const d = await response.json();
    setSpeciesInfo(d[0]);
  };

  const getDataLayersData = async () => {
    if (countryISO === 'COD' || countryISO === 'GIN') {
      const url =
        countryISO === 'COD'
          ? DASHBOARD_URLS.PRIVATE_COD_OCCURENCE_LAYER
          : DASHBOARD_URLS.PRIVATE_GIN_OCCURENCE_LAYER;
      const privateOccurrenceDataResponse =
        await EsriFeatureService.getFeatures({
          url,
          whereClause: `scientificname = '${scientificName}'`,
          returnGeometry: false,
        });
      if (privateOccurrenceDataResponse?.length > 0) {
        const privateOccurrenceItems = privateOccurrenceDataResponse.map(
          (item) => item.attributes
        );

        setPrivateOccurrenceData(privateOccurrenceItems);
      }
    }

    let gbifResponse;

    if (countryISO === 'EE') {
      gbifResponse = await EsriFeatureService.getFeatures({
        url: DASHBOARD_URLS.ZONE_OCCURRENCE,
        whereClause: `species = '${scientificName}' and source = 'GBIF' and  ISO3 IN ('BRA', 'MEX', 'PER',  'VNM', 'MDG')`,
        returnGeometry: false,
      });
    } else {
      gbifResponse = await EsriFeatureService.getFeatures({
        url: DASHBOARD_URLS.GUY_SPECIES_OCCURENCE_URL,
        whereClause: `species = '${scientificName}' and source = 'GBIF' and iso3 = '${countryISO}'`,
        returnGeometry: false,
      });
    }

    const gbifResponseItems = gbifResponse?.map((item) => item.attributes);
    const gbifSet = new Set(); // Use a Set for efficient tracking
    const uniqueGbifObjects = [];

    gbifResponseItems?.forEach((obj) => {
      if (obj) {
        const { molid } = obj;

        const keyValue = `${molid}`;

        if (!gbifSet.has(keyValue)) {
          gbifSet.add(keyValue);
          uniqueGbifObjects.push(obj);
        }
      }
    });

    let eBirdResponse;
    if (countryISO === 'EE') {
      eBirdResponse = await EsriFeatureService.getFeatures({
        url: DASHBOARD_URLS.ZONE_OCCURRENCE,
        whereClause: `species = '${scientificName}' and source = 'eBird' and ISO3 IN ('BRA', 'MEX', 'PER',  'VNM', 'MDG')`,
        returnGeometry: false,
      });
    } else {
      eBirdResponse = await EsriFeatureService.getFeatures({
        url: DASHBOARD_URLS.GUY_SPECIES_OCCURENCE_URL,
        whereClause: `species = '${scientificName}' and source = 'eBird' and iso3 = '${countryISO}'`,
        returnGeometry: false,
      });
    }

    const eBirdResponseItems = eBirdResponse?.map((item) => item.attributes);
    const ebirdSet = new Set(); // Use a Set for efficient tracking
    const uniqueEBirdObjects = [];

    eBirdResponseItems?.forEach((obj) => {
      if (obj) {
        const { molid } = obj;

        const keyValue = `${molid}`;

        if (!ebirdSet.has(keyValue)) {
          ebirdSet.add(keyValue);
          uniqueEBirdObjects.push(obj);
        }
      }
    });

    const dataLayerParams = {
      scientificname: scientificName,
      group: 'movement',
      lang: locale,
    };
    const dparams = new URLSearchParams(dataLayerParams);
    const dataLayersURL = `https://dev-api.mol.org/2.x/species/datasets?${dparams}`;

    const apiCalls = [dataLayersURL];

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

    const [dataLayersData] = apiResponses;

    const filteredData = dataLayersData.map((dld) => {
      if (dld.dataset_title.toUpperCase().match(/EBIRD/)) {
        if (uniqueEBirdObjects.length > 0) {
          dld.no_rows = uniqueEBirdObjects.length;
        } else {
          dld.no_rows = 0;
        }
      }

      if (dld.dataset_title.toUpperCase().match(/GBIF/)) {
        if (uniqueGbifObjects.length > 0) {
          dld.no_rows = uniqueGbifObjects.length;
        } else {
          dld.no_rows = 0;
        }
      }

      dld.parent = dld.type_title;
      dld.label = dld.dataset_title;

      return dld;
    });

    setDataLayerData(filteredData);
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

  const bucketByTaxa = (arrayOfObjects) => {
    const buckets = {};

    if (arrayOfObjects?.length) {
      arrayOfObjects.forEach((obj) => {
        const { taxa } = obj.attributes;

        if (taxa) {
          // Check if taxa property exists and has a value
          if (!buckets[taxa]) {
            buckets[taxa] = []; // Create a new bucket if it doesn't exist
          }
          buckets[taxa].push(obj); // Add the object to the corresponding bucket
        } else {
          // Handle cases where the taxa property is missing or undefined.
          // You might want to create a special bucket for these, or log a warning, or skip them.
          if (!buckets.undefined) {
            buckets.undefined = [];
          }
          buckets.undefined.push(obj);

          console.warn("Object missing 'taxa' property:", obj); // Or simply skip the object
        }
      });
    }

    return buckets;
  };

  function removeDuplicatesByScientificName(arr) {
    const seenScientificNames = new Set(); // Use a Set for efficient tracking
    const uniqueObjects = [];

    arr.forEach((obj) => {
      if (obj) {
        const { scientific_name } = obj;

        if (!seenScientificNames.has(scientific_name)) {
          seenScientificNames.add(scientific_name);
          uniqueObjects.push(obj);
        }
      }
    });

    return uniqueObjects;
  }

  const getProtectAreasSpeciesDetails = (speciesData, taxa) => {
    const results = speciesData.species.map(
      ({ scientific_name, common_name, attributes }) => {
        const { source, species_url, threat_status } = JSON.parse(
          attributes.replace(/NaN/g, 'null')
        )[0];

        const isFound = speciesToAvoid.includes(scientific_name.toUpperCase());

        if (!isFound) {
          return {
            common_name,
            scientific_name,
            threat_status,
            source,
            species_url,
            taxa,
          };
        }
      }
    );

    const species = removeDuplicatesByScientificName(results);

    return {
      count: speciesData.species.length,
      species,
      taxa,
      title: taxa,
    };
  };

  const getCustomAreasSpeciesDetails = (speciesData, taxa) => {
    const results = speciesData.map(({ name, commonName }) => {
      const isFound = speciesToAvoid.includes(name.toUpperCase());
      let common_name = commonName || name;
      if (Array.isArray(commonName)) {
        [common_name] = commonName;
      }
      if (!isFound) {
        return {
          common_name,
          scientific_name: name,
          threat_status: '',
          source: 'range',
          species_url: 'NA',
          taxa,
        };
      }
    });

    const species = removeDuplicatesByScientificName(results);

    return {
      count: speciesData.length,
      species,
      taxa,
      title: taxa,
    };
  };

  const getSpeciesDetails = (speciesData, taxa) => {
    const results = speciesData.map(({ attributes }) => {
      const { source, species_url, threat_status, commonnames } =
        countryISO === 'EE' || countryISO === 'GUY'
          ? attributes
          : JSON.parse(attributes.attributes.replace(/NaN/g, 'null'))[0];

      return {
        common_name: commonnames,
        scientific_name: attributes.species,
        threat_status,
        source,
        species_url,
        taxa,
      };
    });

    const species = removeDuplicatesByScientificName(results);

    return {
      count: speciesData.length,
      species,
      taxa,
      title: taxa,
    };
  };

  const getOccurenceSpecies = async (speciesData) => {
    let url = DASHBOARD_URLS.SPECIES_OCCURENCE_URL;

    if (exploreAllSpecies) {
      url = DASHBOARD_URLS.SPECIES_OCCURENCE_COUNTRY_URL;
    }

    let whereClause = `ISO3 = '${countryISO}'`;
    if (countryISO === 'GUY') {
      url = DASHBOARD_URLS.GUY_SPECIES_OCCURENCE_URL;
    } else if (selectedRegion) {
      const { GID_1, WDPA_PID, Int_ID, region_key } = selectedRegion;
      if (GID_1) {
        whereClause = `GID_1 = '${GID_1}'`;
      }

      if (WDPA_PID) {
        url = DASHBOARD_URLS.WDPA;
        whereClause = `wdpaid = '${WDPA_PID}'`;
      }

      if (Int_ID) {
        url = DASHBOARD_URLS.NBIS_URL;
        whereClause = `Int_ID = '${Int_ID}'`;
      }

      if (region_key) {
        if (countryISO === 'GUY-FM') {
          url = DASHBOARD_URLS.ZONE_OCCURRENCE;
        }
        whereClause = `region_key = '${region_key}'`;
      }
    }

    if (!selectedRegion?.mgc) {
      let geoRings = null;
      if (selectedGeometryRings) {
        geoRings = {
          rings: selectedGeometryRings,
        };
      }

      const occurenceFeatures = await EsriFeatureService.getFeatures({
        url,
        whereClause,
        returnDistinctValues: true,
        geometry: geoRings,
        returnGeometry: false,
        outFields: ['species', 'taxa', 'source'],
      });

      const list = [...speciesData];

      // if (countryISO.toUpperCase() !== 'EE') {
      const buckets = bucketByTaxa(occurenceFeatures);

      // loop through buckets to get species info
      const occurenceData = Object.keys(buckets).map((key) => {
        return getSpeciesDetails(buckets[key], key);
      });

      occurenceData?.forEach((occurrence) => {
        const foundTaxa = list.find((sp) => sp.taxa === occurrence.taxa);

        if (foundTaxa) {
          occurrence.species.forEach((species) => {
            const isFound = speciesToAvoid.includes(
              species.scientific_name.toUpperCase()
            );

            if (!isFound) {
              const foundSpecies = foundTaxa?.species.find(
                (speciesToFind) =>
                  speciesToFind.scientific_name === species.scientific_name
              );

              if (!foundSpecies) {
                foundTaxa?.species.push(species);
              } else {
                foundSpecies.source += `,${species.source}`;
              }
            }
          });
        } else {
          // list.push(occurrence);
        }
      });

      list.forEach((l) => {
        l.count = l.species.length;
      });
      // }

      if (exploreAllSpecies) {
        setAllTaxa(list);
      }
      setTaxaList(list);
    } else {
      setTaxaList(speciesData);
    }
    setSpeciesListLoading(false);
  };

  const getSpeciesList = async () => {
    setSpeciesListLoading(true);

    if (hash && selectedRegionOption === REGION_OPTIONS.DRAW) {
      const aoi = await getAoiFromDataBase(hash);
      if (aoi) {
        const { geometry } = aoi[0];
        const [amphibianData, birdsData, reptilesData, mammalsData] =
          await Promise.all([
            getCustomAOISpeciesData(AMPHIBIANS, geometry),
            getCustomAOISpeciesData(BIRDS, geometry),
            getCustomAOISpeciesData(REPTILES, geometry),
            getCustomAOISpeciesData(MAMMALS, geometry),
          ]);

        const ampSpecies = getCustomAreasSpeciesDetails(
          amphibianData,
          'amphibians'
        );
        const birdSpecies = getCustomAreasSpeciesDetails(birdsData, 'birds');
        const repSpecies = getCustomAreasSpeciesDetails(
          reptilesData,
          'reptiles'
        );
        const mamSpecies = getCustomAreasSpeciesDetails(mammalsData, 'mammals');

        const speciesData = [ampSpecies, birdSpecies, repSpecies, mamSpecies];

        setTaxaList(speciesData);
        setSpeciesListLoading(false);
      }
    } else {
      let url = DASHBOARD_URLS.PRECALC_AOI;
      let whereClause = `GID_0 = '${countryISO}'`;

      if (countryISO === 'EE') {
        whereClause = `project = 'EEWWF'`; // '${countryISO.toLowerCase()}'`;
        url = DASHBOARD_URLS.REGION_SPECIES_SEARCH_URL;

        if (selectedRegion) {
          const { region_key } = selectedRegion;

          if (region_key) {
            whereClause = `region_key = '${region_key}'`;
            url = DASHBOARD_URLS.ZONE_SPECIES;
          }
        }
      } else {
        if (exploreAllSpecies) {
          url = DASHBOARD_URLS.PRECALC_AOI_COUNTRY;
        }

        if (selectedRegion) {
          const { GID_1, WDPA_PID, mgc, Int_ID, region_key } = selectedRegion;
          if (GID_1) {
            whereClause = `GID_1 = '${GID_1}'`;
          }

          if (WDPA_PID) {
            whereClause = `WDPA_PID = '${WDPA_PID}'`;
            url = DASHBOARD_URLS.WDPA_PRECALC;
          }

          if (mgc) {
            whereClause = `mgc_id = '${mgc}'`;
            url = DASHBOARD_URLS.FOREST;
          }

          if (Int_ID) {
            whereClause = `Int_ID = '${Int_ID}'`;
            url = DASHBOARD_URLS.NBIS_URL;
          }

          if (region_key) {
            whereClause = `region_key = '${region_key}'`;
            url = DASHBOARD_URLS.ZONE_SPECIES;
          }
        }
      }

      const features = await EsriFeatureService.getFeatures({
        url,
        whereClause,
        returnGeometry: false,
      });

      if (features && features[0]) {
        if (selectedRegion?.mgc) {
          const speciesData = {
            species: features.map((s) => {
              const { scientificname, taxa, attributes } = s.attributes;

              const json = JSON.parse(attributes.replace(/NaN/g, 'null'));

              const isFound = speciesToAvoid.includes(
                scientificname.toUpperCase()
              );

              if (!isFound) {
                return {
                  common_name: scientificname,
                  scientific_name: scientificname,
                  threat_status: json[0].threat_status,
                  source: json[0].source ?? '',
                  taxa,
                };
              }
            }),
          };

          const amphibians = speciesData.species.filter((item) => {
            if (item) {
              return item.taxa === 'amphibians';
            }
            return false;
          });
          const birds = speciesData.species.filter((item) => {
            if (item) {
              return item.taxa === 'birds';
            }
            return false;
          });
          const reptiles = speciesData.species.filter((item) => {
            if (item) {
              return item.taxa === 'reptiles';
            }
            return false;
          });
          const mammals = speciesData.species.filter((item) => {
            if (item) {
              return item.taxa === 'mammals';
            }
            return false;
          });

          const ampSpecies = {
            count: amphibians.length,
            species: amphibians,
            taxa: 'amphibians',
            title: t('amphibians'),
          };
          const birdSpecies = {
            count: birds.length,
            species: birds,
            taxa: 'birds',
            title: t('birds'),
          };
          const repSpecies = {
            count: reptiles.length,
            species: reptiles,
            taxa: 'reptiles',
            title: t('reptiles'),
          };
          const mamSpecies = {
            count: mammals.length,
            species: mammals,
            taxa: 'mammals',
            title: t('mammals'),
          };
          const groupData = [ampSpecies, birdSpecies, repSpecies, mamSpecies];

          getOccurenceSpecies(groupData);
        } else if (selectedRegion?.region_key || countryISO === 'EE') {
          const speciesData = {
            species: features.map((s) => {
              const {
                species,
                taxa,
                attributes,
                scientificname,
                commonname_english,
                commonname_french,
              } = s.attributes;

              const json = JSON.parse(attributes.replace(/NaN/g, 'null'));

              let isFound = false;
              if (species) {
                isFound = speciesToAvoid.includes(species.toUpperCase());
              } else if (scientificname) {
                isFound = speciesToAvoid.includes(scientificname.toUpperCase());
              }

              //             commonname_english: "Mussurana"
              // commonname_french: null
              // iso3: null
              // project: "eewwf"
              // scientificname: "Boiruna maculata"
              // taxa: "reptiles"

              if (!isFound) {
                return {
                  common_name: species ?? commonname_english,
                  scientific_name: species ?? scientificname,
                  threat_status: json[0].threat_status,
                  source: json[0].source ?? '',
                  species_url: json[0].species_url ?? '',
                  taxa,
                };
              }
            }),
          };

          const amphibians = speciesData.species.filter((item) => {
            if (item) {
              return item.taxa === 'amphibians';
            }
            return false;
          });
          const birds = speciesData.species.filter((item) => {
            if (item) {
              return item.taxa === 'birds';
            }
            return false;
          });
          const reptiles = speciesData.species.filter((item) => {
            if (item) {
              return item.taxa === 'reptiles';
            }
            return false;
          });
          const mammals = speciesData.species.filter((item) => {
            if (item) {
              return item.taxa === 'mammals';
            }
            return false;
          });
          const plants = speciesData.species.filter((item) => {
            if (item) {
              return item.taxa === 'plants';
            }
            return false;
          });
          const fishes = speciesData.species.filter((item) => {
            if (item) {
              return item.taxa === 'fishes';
            }
            return false;
          });

          const ampSpecies = {
            count: amphibians.length,
            species: amphibians,
            taxa: 'amphibians',
            title: t('amphibians'),
          };
          const birdSpecies = {
            count: birds.length,
            species: birds,
            taxa: 'birds',
            title: t('birds'),
          };
          const repSpecies = {
            count: reptiles.length,
            species: reptiles,
            taxa: 'reptiles',
            title: t('reptiles'),
          };
          const mamSpecies = {
            count: mammals.length,
            species: mammals,
            taxa: 'mammals',
            title: t('mammals'),
          };

          const plantSpecies = {
            count: plants.length,
            species: plants,
            taxa: 'plants',
            title: t('plants'),
          };

          const fishSpecies = {
            count: fishes.length,
            species: fishes,
            taxa: 'fishes',
            title: t('fishes'),
          };

          const groupData = [
            ampSpecies,
            birdSpecies,
            repSpecies,
            mamSpecies,
            plantSpecies,
            fishSpecies,
          ];

          getOccurenceSpecies(groupData);

          setSpeciesListLoading(false);
        } else {
          const { attributes } = features[0];

          const { amphibians, birds, reptiles, mammals } = attributes;

          if (amphibians) {
            const [amphibianData, birdsData, reptilesData, mammalsData] =
              await Promise.all([
                getTaxaSpecies('amphibians', amphibians),
                getTaxaSpecies('birds', birds),
                getTaxaSpecies('reptiles', reptiles),
                getTaxaSpecies('mammals', mammals),
              ]);

            const ampSpecies = getProtectAreasSpeciesDetails(
              amphibianData,
              'amphibians'
            );
            const birdSpecies = getProtectAreasSpeciesDetails(
              birdsData,
              'birds'
            );
            const repSpecies = getProtectAreasSpeciesDetails(
              reptilesData,
              'reptiles'
            );
            const mamSpecies = getProtectAreasSpeciesDetails(
              mammalsData,
              'mammals'
            );

            const speciesData = [
              ampSpecies,
              birdSpecies,
              repSpecies,
              mamSpecies,
            ];

            getOccurenceSpecies(speciesData);
          } else {
            const {
              amph_nspecies,
              bird_nspecies,
              mamm_nspecies,
              rept_nspecies,
            } = attributes;
            const species = [
              {
                count: amph_nspecies,
                species: new Array(amph_nspecies),
                taxa: 'amphibians',
                title: 'Amphibians',
              },
              {
                count: bird_nspecies,
                species: new Array(bird_nspecies),
                taxa: 'birds',
                title: 'Birds',
              },
              {
                count: mamm_nspecies,
                species: new Array(mamm_nspecies),
                taxa: 'mammals',
                title: 'Mammals',
              },
              {
                count: rept_nspecies,
                species: new Array(rept_nspecies),
                taxa: 'reptiles',
                title: 'Reptiles',
              },
            ];
            getOccurenceSpecies(species);
          }
        }
      }
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

  const getPrioritySpeciesList = async () => {
    const url = DASHBOARD_URLS.PRIORITY_SPECIES;
    const whereClause = `country_code = '${countryISO}'`;

    const features = await EsriFeatureService.getFeatures({
      url,
      whereClause,
      returnGeometry: false,
    });

    if (features) {
      const species = features.map(({ attributes }) => attributes);

      setPrioritySpeciesList(species);
    }
  };

  const handleMapLoad = (map, activeLayers) => {
    setBasemap({
      map,
      layersArray: viewSettings.basemap.layersArray,
    });
    activateLayersOnLoad(map, activeLayers, layersConfig);
  };

  const getData = async () => {
    if (countryISO.toLowerCase() === 'ee') {
      const shsCall = EsriFeatureService.getFeatures({
        url: DASHBOARD_URLS.REGION_BIODIVERSITY_SHS_URL,
        whereClause: `species = '${scientificName}'`,
        returnGeometry: false,
      });

      const spsCall = EsriFeatureService.getFeatures({
        url: DASHBOARD_URLS.REGION_BIODIVERSITY_URL,
        whereClause: `species = '${scientificName}'`,
        returnGeometry: false,
      });

      const apiCalls = [shsCall, spsCall];

      const apiResponses = await Promise.all(
        apiCalls.map(async (url) => {
          const response = await url;
          // const d = await response.json();
          return response;
        })
      );

      const [habitatTrendData, spiScoreData] = apiResponses;

      const shiScoreData = habitatTrendData.map((f) => {
        return f.attributes;
      });

      let countryData;

      // TODO: figure out what to do when no shs is returned
      if (shiScoreData) {
        countryData = shiScoreData.reduce((acc, obj) => {
          const key = obj.name;
          if (!acc[key]) {
            acc[key] = { shs: [], frag: [] };
          }
          acc[key].shs.push(obj);
          return acc;
        }, {});
      }

      if (shiScoreData.frag) {
        countryData = features.reduce((acc, obj) => {
          const key = obj.country;
          if (!acc[key]) {
            acc[key] = { shs: [], frag: [] };
          }

          acc[key].frag.push(obj);
          return acc;
        }, countryData || {});
      }

      Object.keys(countryData).forEach((key) => {
        const cData = countryData[key];
        const sortedData = cData.shs.sort((a, b) => {
          const yearA = a.year;
          const yearB = b.year;
          if (yearA < yearB) {
            return -1;
          }
          if (yearA > yearB) {
            return 1;
          }
          return 0;
        });

        countryData[key].shs = sortedData;
      });

      let spiCountryData = {};
      if (spiScoreData) {
        const spiData = spiScoreData.map((f) => {
          return f.attributes;
        });

        spiCountryData = spiData.reduce((acc, obj) => {
          const key = obj.name;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
        }, {});

        Object.keys(spiCountryData).forEach((key) => {
          const cd = spiCountryData[key];
          const sortedData = cd.sort((a, b) => {
            const yearA = a.year;
            const yearB = b.year;
            if (yearA < yearB) {
              return -1;
            }
            if (yearA > yearB) {
              return 1;
            }
            return 0;
          });

          spiCountryData[key] = sortedData;
        });
      }
      setSpiDataByCountry(spiCountryData);
      setDataByCountry(countryData);

      setData({ habitatTrendData: countryData, spiScoreData: spiCountryData });
    } else {
      const habitatTrendUrl = `https://dev-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/indicators/habitat-trends/bycountry?scientificname=${scientificName}`;
      const spiScoreURL = `https://dev-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/sps/species_bycountry?scientificname=${scientificName}`;

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
    }
  };

  const handleBrowsePage = () => {
    browsePage({
      type: DASHBOARD,
      payload: { iso: countryISO.toLowerCase() },
      query: {
        species: scientificName ?? undefined,
        tab: selectedIndex,
        trend: tabOption ?? undefined,
        region: selectedRegion ?? undefined,
        regionName: regionName ?? undefined,
        selectedRegionOption: selectedRegionOption ?? undefined,
        exploreAll: exploreAllSpecies ?? undefined,
        // province: provinceName ?? undefined,
        lang: tx.currentLocale ?? undefined,
        hash: hash ?? undefined,
      },
    });
  };

  // Get Country information, allows to get country name
  useEffect(async () => {
    getQueryParams();

    // Function to handle back navigation
    const handleBackButton = () => {
      // Implement custom behavior here
      setSelectedIndex(window.history.state?.selectedIndex ?? 1);
    };

    // Add event listener for popstate event
    window.addEventListener('popstate', handleBackButton);

    if (countryISO !== 'EE') {
      setCountryDataLoading();
      let country = countryISO.toUpperCase();
      if (country === 'GUY-FM') {
        // Special case for French Guiana
        country = 'GUY';
      }
      EsriFeatureService.getFeatures({
        url: COUNTRIES_DATA_SERVICE_URL,
        whereClause: `GID_0 = '${country}'`,
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

      getPrioritySpeciesList();
    }

    if (countryISO === 'COD' || countryISO === 'GIN') {
      await tx.setCurrentLocale('fr');
    } else {
      await tx.setCurrentLocale('en');
    }

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  useEffect(() => {
    if (!selectedRegion && !exploreAllSpecies) return;
    getSpeciesList();
  }, [selectedRegion, exploreAllSpecies]);

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
    handleBrowsePage();
  }, [
    scientificName,
    selectedIndex,
    tabOption,
    selectedRegion,
    regionName,
    selectedRegionOption,
    provinceName,
    user,
    hash,
  ]);

  return (
    <DashboardComponent
      handleMapLoad={handleMapLoad}
      geometry={geometry}
      speciesInfo={speciesInfo}
      setSpeciesInfo={setSpeciesInfo}
      data={data}
      dataLayerData={dataLayerData}
      setDataLayerData={setDataLayerData}
      privateOccurrenceData={privateOccurrenceData}
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
      setHash={setHash}
      hash={hash}
      selectedProvince={selectedProvince}
      setSelectedProvince={setSelectedProvince}
      tabOption={tabOption}
      setTabOption={setTabOption}
      provinceName={provinceName}
      setProvinceName={setProvinceName}
      fromTrends={fromTrends}
      setFromTrends={setFromTrends}
      user={user}
      setUser={setUser}
      speciesListLoading={speciesListLoading}
      prioritySpeciesList={prioritySpeciesList}
      mapLegendLayers={mapLegendLayers}
      setMapLegendLayers={setMapLegendLayers}
      setExploreAllSpecies={setExploreAllSpecies}
      exploreAllSpecies={exploreAllSpecies}
      regionName={regionName}
      setRegionName={setRegionName}
      allTaxa={allTaxa}
      setSelectedGeometryRings={setSelectedGeometryRings}
      selectedGeometryRings={selectedGeometryRings}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(DashboardContainer);
