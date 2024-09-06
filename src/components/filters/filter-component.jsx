import React, { useContext, useEffect, useState } from 'react'
import Button from 'components/button';
import styles from './filter-component-styles.module.scss'
import { Chip } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import cx from 'classnames';
import { LightModeContext } from '../../context/light-mode';

function FilterComponent() {
  const filterStart = [
    {
      name: 'dataset',
      title: 'Expected Sources',
      filters: [
        {
          name: 'Expert Range Map',
          active: false,
          test: species => species.datasetList.map(d => d.product_type).indexOf('range') > -1,
          count: 0,
          type: 'and',
          result: false,
        },
      ],
    },
    {
      name: 'dataset',
      title: 'Recorded Sources',
      filters: [
        {
          name: 'Occurrence',
          active: false,
          test: species => species.datasetList.map(d => d.product_type).indexOf('points') > -1,
          count: 0,
          result: false,
          type: 'and',
        },
        {
          name: 'Local Inventory',
          active: false,
          test: species => species.datasetList.map(d => d.product_type).indexOf('localinv') >
            -1,
          result: false,
          count: 0,
          type: 'and',
        },
      ],
    },
    {
      name: 'threat',
      title: 'IUCN Status',
      filters: [
        {
          name: 'Critically Endangered',
          active: false,
          test: species => species.traits?.threat_status_code === 'CR',
          count: 0,
          result: false,
          type: 'or',
        },
        {
          name: 'Endangered',
          result: false,
          active: false,
          test: species => species.traits?.threat_status_code === 'EN',
          count: 0,
          type: 'or',
        },
        {
          name: 'Vulnerable',
          active: false,
          test: species => species.traits?.threat_status_code === 'VU',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: 'Least Concern',
          active: false,
          test: species => species.traits?.threat_status_code === 'LC',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: 'Unknown',
          active: false,
          result: false,
          test: species => species.traits?.threat_status_code === undefined,
          count: 0,
          type: 'or',
        },
      ],
    },
  ];

  const speciesListUrl = 'https://dev-api.mol.org/2.x/spatial/species/list';
  const [filters, setFilters] = useState(filterStart);
  const [taxaList, setTaxaList] = useState([]);
  const [selectedTaxa, setSelectedTaxa] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [anyActive, setAnyActive] = useState(false);
  const { lightMode } = useContext(LightModeContext);

  useEffect(() => {
    getSpeciesList();
  }, []);

  useEffect(() => {
    if (!taxaList.length) return;
    refreshCounts();
  }, [taxaList]);


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

  const clearCounts = () => {
    setFilteredList([]);
    filters.forEach(f => {
      const filters = f;
      filters.filters.forEach(ff => {
        const filter = ff;
        filter.count = 0;
      });
    });
  }

  const refreshCounts = (emit = true) => {
    clearCounts();

    let allTaxa = taxaList;
    if (selectedTaxa !== '') {
      allTaxa = allTaxa.filter(taxa => taxa.taxa === selectedTaxa);
    }

    setFilteredList([]);
    const filtered = [];
    allTaxa.species = [];
    setAnyActive(false);

    filters.forEach(f => f.filters.forEach(ff => {
      if (ff.active) setAnyActive(true);
    }));

    allTaxa.forEach(taxa => {
      const candidateTaxa = { ...taxa };
      const candidateSpecies = [];
      taxa.species.forEach(species => {
        const speciesFilters = [];
        const speciesOrFilters = [];
        filters.forEach(filterGroup => {
          filterGroup.filters.forEach(filter => {
            const result = filter.test(species);
            filter.result = result;
            if (anyActive && filter.active) {
              if (filter.type === 'and') {
                speciesFilters.push(result);
              } else if (filter.type === 'or') {
                speciesOrFilters.push(result);
              }
            }
          });
        });
        const allAnd = speciesFilters.every(x => x) && speciesFilters.length > 0;
        const anyOr = speciesOrFilters.indexOf(true) !== -1;
        let inCandidate = false;
        if (!anyActive) {
          inCandidate = true;
          candidateSpecies.push(species);
          // only ands
        } else if (allAnd && speciesOrFilters.length === 0) {
          inCandidate = true;
          candidateSpecies.push(species);
          // only or's
        } else if (speciesFilters.length === 0 && anyOr) {
          inCandidate = true;
          candidateSpecies.push(species);
        } else if (allAnd && anyOr) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          inCandidate = true;
          candidateSpecies.push(species);
        }

        const onAnd = allAnd || speciesFilters.length === 0;

        filters.forEach(filterGroup => {
          filterGroup.filters.forEach(filter => {
            if (onAnd && filter.result) {
              filter.count += 1;
            }
          });
        });
      });

      candidateTaxa.species = candidateSpecies;
      candidateTaxa.count = candidateSpecies.length;
      filtered.push(candidateTaxa);
    });

    setFilteredList(filtered);

    // if (emit) this.filtersUpdated.emit(this.filteredList);
  }

  const activateFilter = (filter) => {
    filter.active = !filter.active;
    refreshCounts();
  }

  const clearFilters = () => {
    filters.forEach(f => f.filters.forEach(ff => {
      ff.active = false;
    }));
    refreshCounts();
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

  return (
    <div className={cx(lightMode ? styles.light : '', styles.filters)}>
      <div className={styles.titleRow}>
        <div className={styles.title}>Filters</div>
        {anyActive && <Button
          className={styles.close}
          handleClick={clearFilters}
          label="Clear Filters"
        />}
      </div>

      {filters.map((filterGroup, index) => {
        return (<div className={styles.filterList} key={index}>
          <div className={styles.filterGroupTitle}>{filterGroup.title}</div>
          <div className={styles.filterbox}>
            {filterGroup.filters.map((filter, idx) => {
              return (
                <Chip key={idx}
                  icon={filter.active ? <DoneIcon /> : ''}
                  color={filter.active ? "success" : "primary"}
                  label={`${filter.name}: ${filter.count}`}
                  onClick={() => activateFilter(filter)}></Chip>
              )
            })}
          </div>
        </div>)
      })}
    </div>
  )
}

export default FilterComponent
