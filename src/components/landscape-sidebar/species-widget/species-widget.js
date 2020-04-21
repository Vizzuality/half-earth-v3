
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import setSpeciesActions from 'redux_modules/species';
import SpeciesWidgetComponent from './species-widget-component';
import mapStateToProps from './species-widget-selectors';
import { loadModules } from 'esri-loader';
import * as urlActions from 'actions/url-actions';
import { GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER } from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';

const actions = { ...setSpeciesActions, ...urlActions };

const SpeciesWidget = ({ setSpeciesData, terrestrialCellData, data, changeGlobe, selectedSpeciesData, loading }) => {
  const [speciesLayer, setLayer] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateSelectedSpecies = (index) => {
    const { scientificName } = data[index];
    changeGlobe({ selectedSpecies: scientificName });
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
    const newIndex = data.findIndex(({ scientificName }) => scientificName === species.scientificName)
    updateSelectedSpecies(newIndex);
  }

  const querySpeciesData = (terrestrialCells) => {
    setSpeciesData({ data: null, loading: true });
    const query = speciesLayer.createQuery();
    query.outFields = [ "HBWID", "species_name", "taxa", "status", "RANGE_AREA_KM2", "PROP_RANGE_PROT", "url_sp", "common_name", "iucn_cat", "raw_name"];
    query.where = `HBWID IN (${terrestrialCells.map(i => i.ID).join(', ')})`;
    speciesLayer.queryFeatures(query).then(function(results){
      const { features } = results;
      setSpeciesData({ data: features.map(c => c.attributes), loading: false });
    }).catch(err => console.error(err.message));
  };

  const fetchSpeciesLayer = () => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const _speciesLayer = new FeatureLayer({
        // URL to the service
        url: LAYERS_URLS[GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER],
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
        querySpeciesData(terrestrialCellData);
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
