import { useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import { LAYERS_CATEGORIES } from 'constants/layers-config';
import usePrevious from 'hooks/use-previous';

// Select matching or default layers on layer variant switch
export const useSelectLayersOnTabChange = ({
  biodiversityLayerVariant,
  activeLayers,
  biodiversityCategories,
  handleClearAndAddLayers
}) => {
  const previousBiodiversityLayerVariant = usePrevious(
    biodiversityLayerVariant
  );

  useEffect(() => {
    const bioLayerIds = activeLayers
      .filter((l) => l.category === LAYERS_CATEGORIES.BIODIVERSITY)
      .map((l) => l.title);
    let updatedTabSelectedLayers = [];

    if (bioLayerIds.length && biodiversityCategories) {
      const getTaxaMatches = ({ taxa, categoryName, subcategoryName }) => {
        const matches = [];
        bioLayerIds.forEach((bioLayer) => {
          const taxaToMatch = taxa.find((t) => t.layer === bioLayer);
          if (taxaToMatch) {
            let matchingCategory = biodiversityCategories[
              biodiversityLayerVariant
            ].find((c) => c.name === categoryName);
            if (matchingCategory && subcategoryName) {
              matchingCategory = matchingCategory.subcategories.find(
                (s) => s.name === subcategoryName
              );
            }
            const matchingLayer =
              matchingCategory &&
              matchingCategory.taxa.find(
                (layer) => layer.value === taxaToMatch.value
              );
            if (matchingLayer) {
              matches.push(matchingLayer.layer);
            }
          }
        });
        return matches;
      };

      previousBiodiversityLayerVariant &&
        biodiversityCategories[previousBiodiversityLayerVariant].forEach(
          (category) => {
            if (category.subcategories) {
              category.subcategories.forEach((subcategory) => {
                updatedTabSelectedLayers = updatedTabSelectedLayers.concat(
                  getTaxaMatches({
                    taxa: subcategory.taxa,
                    categoryName: category.name,
                    subcategoryName: subcategory.name
                  })
                );
              });
            } else {
              updatedTabSelectedLayers = updatedTabSelectedLayers.concat(
                getTaxaMatches({
                  taxa: category.taxa,
                  categoryName: category.name
                })
              );
            }
          }
        );
    }
    if (!updatedTabSelectedLayers.length) {
      const defaultTabSelection =
        biodiversityLayerVariant &&
        biodiversityCategories[biodiversityLayerVariant][0].taxa[0].layer;
      if (defaultTabSelection) {
        updatedTabSelectedLayers.push(defaultTabSelection);
      }
    }
    if (!isEqual(bioLayerIds, updatedTabSelectedLayers)) {
      handleClearAndAddLayers(bioLayerIds, updatedTabSelectedLayers);
    }
  }, [biodiversityLayerVariant]);
};