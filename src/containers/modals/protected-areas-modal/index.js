import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import useDebounce from 'hooks/use-debounce';

import EsriFeatureService from 'services/esri-feature-service';

import {
  PRECALCULATED_LAYERS_PROTECTED_AREAS_DATA_URL,
  PRECALCULATED_LAYERS_SLUG,
} from 'constants/analyze-areas-constants';

import Component from './component';
import mapStateToProps from './selectors';

function Container(props) {
  const { aoiId, contextualData, precalculatedLayerSlug } = props;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const [sorting, setSorting] = useState({ value: 'NAME', ascending: 'true' });
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 400);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSortChange = (value) => {
    setSorting(value);
  };

  const sortFunction = (a, b) => {
    if (a[sorting.value] > b[sorting.value]) return sorting.ascending ? 1 : -1;
    if (a[sorting.value] < b[sorting.value]) return sorting.ascending ? -1 : 1;
    return 0;
  };

  useEffect(() => {
    if (search && search !== '') {
      setFilteredData([
        ...data.filter((row) => {
          const searchLowerCase = search.toLowerCase();
          return (
            row.NAME.toLowerCase().includes(searchLowerCase) ||
            row.GOV_TYP.toLowerCase().includes(searchLowerCase) ||
            row.IUCN_CA.toLowerCase().includes(searchLowerCase) ||
            row.DESIG.toLowerCase().includes(searchLowerCase)
          );
        }),
      ]);
    } else {
      setFilteredData([...data]);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    const sortedData = [...filteredData];
    sortedData.sort(sortFunction);
    setFilteredData(sortedData);
  }, [sorting]);

  useEffect(() => {
    const url =
      PRECALCULATED_LAYERS_PROTECTED_AREAS_DATA_URL[precalculatedLayerSlug];

    // ---------------- CUSTOM AOIS SPECIAL CASE -----------------
    if (!precalculatedLayerSlug) {
      const protectedAreas = contextualData.protectedAreasList;
      if (protectedAreas) {
        setData(protectedAreas);
        setFilteredData([...protectedAreas]);
        setLoading(false);
      }
      // --------------- FUTURE PLACES SPECIAL CASE --------------
    } else if (
      precalculatedLayerSlug === PRECALCULATED_LAYERS_SLUG.futurePlaces
    ) {
      EsriFeatureService.getFeatures({
        url,
        whereClause: `places = '${contextualData.cluster}'`,
        returnGeometry: false,
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
    } else if (
      precalculatedLayerSlug === PRECALCULATED_LAYERS_SLUG.specificRegions
    ) {
      // --------------- SPECIFIC REGIONS SPECIAL CASE --------------
      const region =
        contextualData.aoiId && contextualData.aoiId.replace('region-', '');
      EsriFeatureService.getFeatures({
        url,
        whereClause: `region = '${region}'`,
        returnGeometry: false,
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
    } else if (
      precalculatedLayerSlug === PRECALCULATED_LAYERS_SLUG.protectedAreas
    ) {
      // --------------- PROTECTED AREA SPECIAL CASE --------------
      const areaValue = {
        DESIG: contextualData.DESIG_E,
        DESIG_T: contextualData.DESIG_T,
        AREA_KM: contextualData.AREA_KM2 || contextualData.AREA_KM,
        IUCN_CA: contextualData.IUCN_CA,
        NAME: contextualData.NAME,
        NAME_0: contextualData.ISO3,
        GOV_TYP: contextualData.GOV_TYP,
      };
      setData([areaValue]);
      setFilteredData([areaValue]);
      setLoading(false);
    } else if (aoiId) {
      // ---------------- REST OF CASES ------------------
      EsriFeatureService.getFeatures({
        url,
        whereClause: `MOL_IDg = '${aoiId}'`,
        returnGeometry: false,
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
  }, [aoiId, contextualData, precalculatedLayerSlug]);

  return (
    <Component
      data={filteredData}
      handleSearchInputChange={handleSearch}
      handleSortChange={handleSortChange}
      loading={loading}
      {...props}
    />
  );
}

export default connect(mapStateToProps, null)(Container);
