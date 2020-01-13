
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import setSpeciesActions from 'redux_modules/species';
import SpeciesWidgetComponent from './species-widget-component';
import mapStateToProps from './species-widget-selectors';
import { loadModules } from 'esri-loader';
import * as urlActions from 'actions/url-actions';
import { layersConfig } from 'constants/mol-layers-configs';
import { GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER } from 'constants/layers-slugs';

const actions = { ...setSpeciesActions, ...urlActions };

const SpeciesWidget = ({ setSpeciesData, terrestrialCellData, data, changeGlobe, selectedSpeciesData, loading }) => {
  const [speciesLayer, setLayer] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0)

  const updateSelectedSpecies = (index) => {
    const { name } = data[index];
    changeGlobe({ selectedSpecies: name });
    setSelectedIndex(index);
  }

  const handleSelectNextSpecies = () => {
    let newIndex;
    if(selectedIndex === data.length - 1) {
      newIndex = 0;
    } else {
      newIndex = selectedIndex + 1;
    }
    updateSelectedSpecies(newIndex);
  }

  const handleSelectPrevSpecies = () => {
    let newIndex;
    if(selectedIndex === 0) {
      newIndex = data.length - 1;
    } else {
      newIndex = selectedIndex - 1;
    }
    updateSelectedSpecies(newIndex);
  }

  const handleSelectSpecies = (species) => {
    const newIndex = data.findIndex(({ name }) => name === species.name)
    updateSelectedSpecies(newIndex);
  }

  const querySpeciesData = () => {
    setSpeciesData({ data: null, loading: true });
    const query = speciesLayer.createQuery();
    query.where = `HBWID IN (${terrestrialCellData.map(i => i.CELL_ID).join(', ')})`;
    query.outFields = [ "HBWID", "scntfcn", "taxa", "RANGE_A", "PROP_RA", "url_sp", "cmmn_nm", "iucn_ct"];
    speciesLayer.queryFeatures(query).then(function(results){
      const { features } = results;
      setSpeciesData({ data: features.map(c => c.attributes), loading: false });
    });
  };

  const fetchSpeciesLayer = () => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const _speciesLayer = new FeatureLayer({
        // URL to the service
        url: layersConfig[GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER].url,
      });
      setLayer(_speciesLayer)
    })
  };

  useEffect(() => {
    fetchSpeciesLayer()
  }, []);
 
  useEffect(() => {
    if (speciesLayer && terrestrialCellData) {
      if(terrestrialCellData.length) {
        querySpeciesData();
      } else {
        setSpeciesData({ data: null })
      }
    }
  }, [speciesLayer, terrestrialCellData])

  useEffect(() => {
    if(data) {
      changeGlobe({ selectedSpecies: data[0] });
      setSelectedIndex(0);
    }
  }, [data]);

  return (
    <SpeciesWidgetComponent
      data={data}
      selectedSpecies={selectedSpeciesData}
      handleSelectSpecies={handleSelectSpecies}
      handleSelectNextSpecies={handleSelectNextSpecies}
      handleSelectPrevSpecies={handleSelectPrevSpecies}
      loading={loading}
    />
  );
}

export default connect(mapStateToProps, actions)(SpeciesWidget); 
