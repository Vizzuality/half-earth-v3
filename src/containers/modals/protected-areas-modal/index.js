import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import aoisActions from 'redux_modules/aois';

import useDebounce from 'hooks/use-debounce';

import EsriFeatureService from 'services/esri-feature-service';

import {
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
  HALF_EARTH_FUTURE_WDPA_LAYER,
  SPECIFIC_REGIONS_TILE_LAYER,
  SPECIFIC_REGIONS_WDPA_LAYER,
  WDPA_OECM_FEATURE_LAYER,
  WDPA_OECM_FEATURE_DATA_LAYER,
} from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';

import Component from './component';
import mapStateToProps from './selectors';

const actions = { ...aoisActions };

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
      setFilteredData([...data.filter((row) => {
        const searchLowerCase = search.toLowerCase();
        return row.NAME.toLowerCase().includes(searchLowerCase)
          || row.GOV_TYP.toLowerCase().includes(searchLowerCase)
          || row.IUCN_CA.toLowerCase().includes(searchLowerCase)
          || row.DESIG.toLowerCase().includes(searchLowerCase);
      })]);
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
    // Precalculated tile layers to layers with WDPA data
    const url = {
      [GADM_0_ADMIN_AREAS_FEATURE_LAYER]: LAYERS_URLS[GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER],
      [GADM_1_ADMIN_AREAS_FEATURE_LAYER]: LAYERS_URLS[GADM_1_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER],
      [WDPA_OECM_FEATURE_LAYER]: LAYERS_URLS[WDPA_OECM_FEATURE_DATA_LAYER],
      [HALF_EARTH_FUTURE_TILE_LAYER]: LAYERS_URLS[HALF_EARTH_FUTURE_WDPA_LAYER],
      [SPECIFIC_REGIONS_TILE_LAYER]: LAYERS_URLS[SPECIFIC_REGIONS_WDPA_LAYER],
    }[precalculatedLayerSlug] || LAYERS_URLS[precalculatedLayerSlug];

    // ---------------- CUSTOM AOIS SPECIAL CASE -----------------
    if (!precalculatedLayerSlug) {
      const protectedAreas = contextualData.protectedAreasList;
      if (protectedAreas) {
        setData(protectedAreas);
        setFilteredData([...protectedAreas]);
        setLoading(false);
      }
    // --------------- FUTURE PLACES SPECIAL CASE --------------
    } else if (precalculatedLayerSlug === HALF_EARTH_FUTURE_TILE_LAYER) {
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
    } else if (precalculatedLayerSlug === SPECIFIC_REGIONS_TILE_LAYER) {
      // --------------- SPECIFIC REGIONS SPECIAL CASE --------------
      const region = contextualData.aoiId && contextualData.aoiId.replace('region-', '');
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
    } else if (precalculatedLayerSlug === WDPA_OECM_FEATURE_LAYER) {
      // --------------- PROTECTED AREA SPECIAL CASE --------------
      const areaValue = {
        DESIG: contextualData.DESIG_E,
        DESIG_T: contextualData.DESIG_T,
        AREA_KM: contextualData.AREA_KM,
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

export default connect(mapStateToProps, actions)(Container);
