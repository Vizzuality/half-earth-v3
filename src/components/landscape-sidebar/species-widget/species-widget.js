
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import setSpeciesActions from 'redux_modules/species';
import SpeciesWidgetComponent from './species-widget-component';
import mapStateToProps from './species-widget-selectors';
import { loadModules } from '@esri/react-arcgis';

const actions = { ...setSpeciesActions };

const SpeciesWidget = ({ setSpecies, terrestrialCellData }) => {
  const [speciesLayer, setLayer] = useState(null)

  const querySpeciesData = () => {
    const query = speciesLayer.createQuery();
    query.where = `HBWID IN (${terrestrialCellData.map(i => i.CELL_ID).join(', ')})`;
    speciesLayer.queryFeatures(query).then(function(results){
      const { features } = results;
      setSpecies(features.map(c => c.attributes));
    });
  };

  const fetchSpeciesLayer = () => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const _speciesLayer = new FeatureLayer({
        // URL to the service
        url: "https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/TerrestrialVertebrateSpeciesSHP/FeatureServer",
      });
      setLayer(_speciesLayer)
    })
  };

  useEffect(() => {
    fetchSpeciesLayer()
  }, []);
 
  useEffect(() => {
    if (speciesLayer && terrestrialCellData) {
      querySpeciesData();
    }
  }, [speciesLayer, terrestrialCellData])

  return <SpeciesWidgetComponent/> 
}

export default connect(mapStateToProps, actions)(SpeciesWidget); 
