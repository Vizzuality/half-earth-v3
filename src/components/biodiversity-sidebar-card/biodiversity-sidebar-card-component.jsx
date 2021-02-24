import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import Tabs from 'components/tabs';
import CategoryBox from 'components/category-box';
import BiodiversityLayers from 'components/biodiversity-layers';
import { biodiversityCategories } from 'constants/mol-layers-configs';
import styles from './biodiversity-sidebar-card-styles.module.scss'
import { LAYER_VARIANTS } from 'constants/landscape-view-constants';
import capitalize from 'lodash/capitalize';

const biodiversity = LAYERS_CATEGORIES.BIODIVERSITY;
const intersection = (...arrays) => arrays.reduce((a, b) => a.filter((c) => b.includes(c)));

const BiodiversitySidebarCardComponent = ({
  activeLayers,
  countedActiveLayers,
  map,
  view,
  changeUI,
  handleClearAndAddLayers,
  biodiversityLayerType
}) => {
  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);

  // Select matching or default layers on layer type switch
  useEffect(() => {
    const bioLayers = activeLayers.filter((l) => l.category === LAYERS_CATEGORIES.BIODIVERSITY).map(l => l.title);
    let updatedTabSelectedLayers = [];
    if (bioLayers.length && biodiversityCategories) {
      const getTaxaMatches = (taxa) => {
        const matches = [];
        taxa.forEach(t => {
          const hasMatch = intersection(Object.values(t.layers), bioLayers).length > 0;
          if (hasMatch && t.layers[biodiversityLayerType]) {
            matches.push(t.layers[biodiversityLayerType]);
          }
        });
        return matches;
      };

      biodiversityCategories.forEach((category) => {
        if(category.subcategories) {
          category.subcategories.forEach(subcategory =>  {
            updatedTabSelectedLayers = updatedTabSelectedLayers.concat(getTaxaMatches(subcategory.taxa));
          })
        } else {
          updatedTabSelectedLayers = updatedTabSelectedLayers.concat(getTaxaMatches(category.taxa));
        }
      });
    }
    if (!updatedTabSelectedLayers.length) {
      const defaultTabSelection = biodiversityCategories[0].taxa[0].layers[biodiversityLayerType];
      if (defaultTabSelection) {
        updatedTabSelectedLayers.push(defaultTabSelection);
      }
    }

    handleClearAndAddLayers(updatedTabSelectedLayers);
  }, [biodiversityLayerType]);

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
            changeUI({ biodiversityLayerType: slug });
          }}
          defaultTabSlug={biodiversityLayerType}
        />
        {biodiversityCategories.map((cat) => (
          <BiodiversityLayers
            key={cat.name}
            title={cat.name}
            description={cat.description}
            subcategories={cat.subcategories}
            options={cat.taxa}
            activeLayers={activeLayers}
            map={map}
            view={view}
            layerType={biodiversityLayerType}
          />
        ))}
      </div>
    </div>
  );
};

export default BiodiversitySidebarCardComponent;