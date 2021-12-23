import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// services
import EsriFeatureService from 'services/esri-feature-service';

// hooks
import useDebounce from 'hooks/use-debounce';

// constants
import { LAYERS_URLS } from 'constants/layers-urls';
import { GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER } from 'constants/layers-slugs';

// local
import mapStateToProps from './selectors';
import Component from './component';

const Container = (props) => {
  const { aoiId } = props;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const debouncedSearch = useDebounce(search, 400);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    if (search && search !== '') {
      setFilteredData([...data.filter((row) => {
        const searchLowerCase = search.toLowerCase();
        return row.NAME.toLowerCase().includes(searchLowerCase);
      })]);
    } else {
      setFilteredData([...data]);
    }
  }, [debouncedSearch])

  useEffect(() => {
    EsriFeatureService.getFeatures({
      url: LAYERS_URLS[GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER],
      whereClause: `MOL_IDg = '${aoiId}'`,
      returnGeometry: false
    }).then((features) => {
      const tempData = features.map((f) => f.attributes);

      tempData.sort((a, b) => {
        if (a.NAME > b.NAME)
          return 1;
        else if (a.NAME < b.NAME)
          return -1;
        else
          return 0;
      });
      setData(tempData);
      setFilteredData([...tempData]);
    })
  }, [aoiId]);

  return (
    <Component
      data={filteredData}
      handleSearchInputChange={handleSearch}
      {...props}
    />
  )
}

export default connect(mapStateToProps, null)(Container);
