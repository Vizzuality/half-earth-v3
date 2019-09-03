
import React, { useEffect } from 'react';
import { loadModules } from '@esri/react-arcgis';

const SpeciesWidgetComponent = ({ map, terrestrialCellData, setSpecies }) => {

 

  useEffect(() => {
    if (terrestrialCellData) {
      loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
        const speciesLayer = new FeatureLayer({
          // URL to the service
          url: "https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/TerrestrialVertebrateSpeciesSHP/FeatureServer",
          definitionExpression: `HBWID IN (${terrestrialCellData.map(i => i.CELL_ID).join(', ')})`,
        });
        const query = speciesLayer.createQuery();
        speciesLayer.queryFeatures(query).then(function(results){
          const { features } = results;
          setSpecies(features.map(c => c.attributes));
        });
      })
    }
  }, [terrestrialCellData])

  return (
    <div></div>
  );
}

export default SpeciesWidgetComponent;