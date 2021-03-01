import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import Tabs from 'components/tabs';
import CategoryBox from 'components/category-box';
import usePrevious from 'hooks/use-previous';
import BiodiversityLayers from 'components/biodiversity-layers';
import { biodiversityCategories } from 'constants/mol-layers-configs';
import { LAYER_VARIANTS } from 'constants/landscape-view-constants';
import styles from './biodiversity-sidebar-card-styles.module.scss'

import capitalize from 'lodash/capitalize';

const biodiversity = LAYERS_CATEGORIES.BIODIVERSITY;
const BiodiversitySidebarCardComponent = ({
  activeLayers,
  countedActiveLayers,
  map,
  view,
  changeUI,
  handleClearAndAddLayers,
  biodiversityLayerVariant
}) => {
  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);

  const previousBiodiversityLayerVariant = usePrevious(
    biodiversityLayerVariant
  );

  // Select matching or default layers on layer type switch
  useEffect(() => {
    const bioLayers = activeLayers.filter((l) => l.category === LAYERS_CATEGORIES.BIODIVERSITY).map(l => l.title);
    let updatedTabSelectedLayers = [];

    if (bioLayers.length && biodiversityCategories) {
      const getTaxaMatches = ({ taxa, categoryName, subcategoryName }) => {
        const matches = [];
        bioLayers.forEach((bioLayer) => {
          const taxaToMatch = taxa.find(t => t.layer === bioLayer);
          if (taxaToMatch) {
            let matchingCategory = biodiversityCategories[biodiversityLayerVariant].find(c => c.name === categoryName);
            if (matchingCategory && subcategoryName) {
              matchingCategory = matchingCategory.subcategories.find(
                (s) => s.name === subcategoryName
              );
            }
            const matchingLayer = matchingCategory && matchingCategory.taxa.find(
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
                  getTaxaMatches({ taxa: subcategory.taxa, categoryName: category.name, subcategoryName: subcategory.name })
                );
              });
            } else {
              updatedTabSelectedLayers = updatedTabSelectedLayers.concat(
                getTaxaMatches({ taxa: category.taxa, categoryName: category.name })
              );
            }
          }
        );
    }
    if (!updatedTabSelectedLayers.length) {
      const defaultTabSelection =
        biodiversityLayerVariant && biodiversityCategories[
          biodiversityLayerVariant
        ][0].taxa[0].layer;
      if (defaultTabSelection) {
        updatedTabSelectedLayers.push(defaultTabSelection);
      }
    }

    handleClearAndAddLayers(bioLayers, updatedTabSelectedLayers);
  }, [biodiversityLayerVariant]);

  return (
    <div className={styles.sidebarCardContainer}>
      <CategoryBox
        title="mapping"
        category={biodiversity}
        counter={countedActiveLayers[biodiversity]}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div
        className={cx(styles.layersTogglesContainer, { [styles.open]: isOpen })}
      >
        <Tabs
          tabs={Object.values(LAYER_VARIANTS).map((variant) => ({
            title: capitalize(variant),
            slug: variant
          }))}
          onClick={(slug) => {
            changeUI({ biodiversityLayerVariant: slug });
          }}
          defaultTabSlug={biodiversityLayerVariant}
        />
        {biodiversityLayerVariant && biodiversityCategories[
          biodiversityLayerVariant
        ].map((cat) => (
          <BiodiversityLayers
            key={cat.name}
            title={cat.name}
            description={cat.description}
            subcategories={cat.subcategories}
            options={cat.taxa}
            activeLayers={activeLayers}
            map={map}
            view={view}
            layerType={biodiversityLayerVariant}
          />
        ))}
      </div>
    </div>
  );
};

export default BiodiversitySidebarCardComponent;