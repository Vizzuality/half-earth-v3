import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// services
import EsriFeatureService from 'services/esri-feature-service';

// hooks
import useDebounce from 'hooks/use-debounce';

// constants
import { LAYERS_URLS } from 'constants/layers-urls';
import {
  GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER,
} from 'constants/layers-slugs';
import { NATIONAL_BOUNDARIES_TYPE, PROTECTED_AREAS_TYPE, SUBNATIONAL_BOUNDARIES_TYPE } from 'constants/aois';

// actions
import aoisActions from 'redux_modules/aois';

// local
import mapStateToProps from './selectors';
import Component from './component';

const actions = { ...aoisActions };

const Container = (props) => {
  const { aoiId, areaTypeSelected } = props;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const [sorting, setSorting] = useState({ value: 'NAME', ascending: 'true' });
  const [filteredData, setFilteredData] = useState([]);
  const debouncedSearch = useDebounce(search, 400);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const handleSortChange = (value) => {
    setSorting(value);
  }

  const sortFunction = (a, b) => {
    if (a[sorting.value] > b[sorting.value])
      return sorting.ascending ? 1 : -1;
    else if (a[sorting.value] < b[sorting.value])
      return sorting.ascending ? -1 : 1;
    else
      return 0;
  }

  useEffect(() => {
    if (search && search !== '') {
      setFilteredData([...data.filter((row) => {
        const searchLowerCase = search.toLowerCase();
        return row.NAME.toLowerCase().includes(searchLowerCase) ||
          row.GOV_TYP.toLowerCase().includes(searchLowerCase) ||
          row.IUCN_CA.toLowerCase().includes(searchLowerCase) ||
          row.DESIG.toLowerCase().includes(searchLowerCase);
      })]);
    } else {
      setFilteredData([...data]);
    }
  }, [debouncedSearch])

  useEffect(() => {
    const sortedData = [...filteredData];
    sortedData.sort(sortFunction);
    setFilteredData(sortedData);
  }, [sorting]);

  useEffect(() => {
    let urlValue;
    switch (areaTypeSelected) {
      case NATIONAL_BOUNDARIES_TYPE:
        urlValue = LAYERS_URLS[GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER];
        break;
      case SUBNATIONAL_BOUNDARIES_TYPE:
        urlValue = LAYERS_URLS[GADM_1_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER];
        break;
      case PROTECTED_AREAS_TYPE:
        urlValue = LAYERS_URLS[GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER]; // TO-DO: change this to the right URL
        break;
      default:
        urlValue = LAYERS_URLS[GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER];
    }
    EsriFeatureService.getFeatures({
      url: urlValue,
      whereClause: `MOL_IDg = '${aoiId}'`,
      returnGeometry: false
    }).then((features) => {
      if (features) {
        const tempData = features.map((f) => f.attributes);
        tempData.sort(sortFunction);
        setData(tempData);
        setFilteredData([...tempData]);
      } else {
        setData([]);
        setFilteredData([]);
      }

    })
  }, [aoiId]);

  return (
    <Component
      data={filteredData}
      handleSearchInputChange={handleSearch}
      handleSortChange={handleSortChange}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(Container);
