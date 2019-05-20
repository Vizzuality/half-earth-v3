import { loadModules } from '@esri/react-arcgis';
import { useEffect } from 'react';

const RICHNESS_RARITY_GRID = 'rarity-richness-GRID';
const TAXA_FIELD = 'TAXA';

const BiodiversityDataManager = ({ map, setSpecies, setSpeciesLoading, setSpeciesError }) => {
  // get biodiversity categories from richness-rarity-GRID layer
  useEffect(() => {
    loadModules(
      ["esri/renderers/smartMapping/statistics/uniqueValues"]).then(([uniqueValues]) => {
        setSpeciesLoading();
        const { layers } = map;
        const gridLayer = layers.items.find(l => l.title === RICHNESS_RARITY_GRID);
        uniqueValues({ layer: gridLayer, field: TAXA_FIELD}).then((result) => {
          setSpecies(result.uniqueValueInfos);
        }).catch((err) => {
          setSpeciesError(err);
        })
    }).catch((err) => { console.error(err); setSpeciesError(err) });
  }, [])

  return null
}

export default BiodiversityDataManager;