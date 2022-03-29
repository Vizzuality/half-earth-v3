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
  HALF_EARTH_FUTURE_WDPA_LAYER,
} from 'constants/layers-slugs';
import {
  AREA_TYPES
} from 'constants/aois';

// actions
import aoisActions from 'redux_modules/aois';

// local
import mapStateToProps from './selectors';
import Component from './component';

const actions = { ...aoisActions };

const Container = (props) => {
  const { aoiId, areaTypeSelected, contextualData } = props;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const [sorting, setSorting] = useState({ value: 'NAME', ascending: 'true' });
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
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
      case [AREA_TYPES.national]:
        urlValue = LAYERS_URLS[GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER];
        break;
      case [AREA_TYPES.subnational]:
        urlValue = LAYERS_URLS[GADM_1_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER];
        break;
      case [AREA_TYPES.futurePlaces]:
        urlValue = LAYERS_URLS[HALF_EARTH_FUTURE_WDPA_LAYER];
        break;
      default:
        urlValue = LAYERS_URLS[GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER];
    }
    // ---------------- CUSTOM AOIS SPECIAL CASE -----------------
    if (areaTypeSelected === AREA_TYPES.custom) {
      const protectedAreas = contextualData.protectedAreasList;
      if (protectedAreas) {
        setData(protectedAreas);
        setFilteredData([...protectedAreas]);
        setLoading(false);
      }
    }
    else if (areaTypeSelected === AREA_TYPES.futurePlaces) {
      // --------------- FUTURE PLACES SPECIAL CASE --------------
      EsriFeatureService.getFeatures({
        url: LAYERS_URLS[HALF_EARTH_FUTURE_WDPA_LAYER],
        whereClause: `places = '${contextualData.cluster}'`,
        returnGeometry: false
      }).then((results) => {
        if (results) {
          const tempData = results.map((f) => f.attributes);
          tempData.sort(sortFunction);
          setData(tempData);
          setFilteredData([...tempData]);
        } else {
          setData([]);
          setFilteredData([]);
        }
        setLoading(false);
      });
    }
    else if (areaTypeSelected === AREA_TYPES.protected) {
      // --------------- PROTECTED AREA SPECIAL CASE --------------
      const areaValue = {
        DESIG: contextualData.DESIG_E,
        DESIG_T: contextualData.DESIG_T,
        AREA_KM: contextualData.AREA_KM,
        IUCN_CA: contextualData.IUCN_CA,
        NAME: contextualData.NAME,
        NAME_0: contextualData.ISO3,
       GOV_TYP: contextualData.GOV_TYP,
     }
     setData([areaValue]);
     setFilteredData([areaValue]);
     setLoading(false);
    } else if (aoiId) {
    // ---------------- REST OF CASES ------------------
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
        setLoading(false);
      });
    }

  }, [aoiId, contextualData]);

  return (
    <Component
      data={filteredData}
      handleSearchInputChange={handleSearch}
      handleSortChange={handleSortChange}
      loading={loading}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(Container);
