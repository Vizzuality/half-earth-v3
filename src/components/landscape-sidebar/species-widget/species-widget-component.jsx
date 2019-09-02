
import React, { useEffect } from 'react';

const SpeciesWidgetComponent = ({ map, terrestrialCellData, setSpecies }) => {
  const speciesLayer = map.layers.items.find(l => l.title === 'TerrestrialVertebrateSpeciesSHP');
  const queryParams = speciesLayer.createQuery();

  useEffect(() => {
      if (terrestrialCellData) {
      queryParams.where = `HBWID IN (${terrestrialCellData.map(i => i.CELL_ID).join(', ')})`;
      speciesLayer.queryFeatures(queryParams).then(function(results){
        const { features } = results;
        setSpecies(features.map(c => c.attributes));
      });
    }
  }, [terrestrialCellData])

  return (
    <div></div>
  );
}

export default SpeciesWidgetComponent;