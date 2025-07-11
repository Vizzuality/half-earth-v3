import { useEffect, useState } from 'react';

import { T } from '@transifex/react';

import cx from 'classnames';

import ShareModalButton from 'components/share-button';
import ShareModal from 'components/share-modal';

import animationStyles from 'styles/common-animations.module.scss';
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter.js';
import { findLayerInMap, createLayer, addLayerToMap } from 'utils/layer-manager-utils';
import { LAYERS_URLS } from 'constants/layers-urls';
import { FEATURED_PLACES_LAYER, DISCOVERY_GLOBE_LAYER } from 'constants/layers-slugs';

import styles from './featured-map-card-styles.module.scss';

const FEATURE_TYPES = {
  FEATURED_PLACES: 'bestPlaces',
  DISCOVERY_GLOBE: 'discoveryGlobe',
}

function FeaturedMapCardComponent({
  view,
  className,
  selectedSidebar,
  isFullscreenActive,
  featuredMap,
  selectedFeaturedPlace,
  selectedFeaturedMap,
  spinGlobe,
  handle,
}) {
  const isOpen = selectedSidebar === 'featuredMapCard';

  const isOnScreen = isOpen && !isFullscreenActive && !selectedFeaturedPlace;

  const getSlugLayer = (slug) => {
    switch (slug) {
      case FEATURE_TYPES.FEATURED_PLACES:
        return FEATURED_PLACES_LAYER;
      case FEATURE_TYPES.DISCOVERY_GLOBE:
        return DISCOVERY_GLOBE_LAYER;
      default:
        return null;
    }
  };

  const addLayer = (layerSlug, featurePlacesLayer, discoveryGlobeLayer, map) => {
    const slug = getSlugLayer(layerSlug);
    if((layerSlug === FEATURE_TYPES.FEATURED_PLACES && !featurePlacesLayer) ||
      (layerSlug === FEATURE_TYPES.DISCOVERY_GLOBE && !discoveryGlobeLayer)) {
      const layer = createLayer({url: LAYERS_URLS[slug], slug: slug, type: 'FeatureLayer'});
      addLayerToMap(layer, map);

      // If the layer is FEATURED_PLACES_LAYER, we need to filter it by the selected featured map
      if (layerSlug === FEATURE_TYPES.FEATURED_PLACES && selectedFeaturedMap) {
        view.whenLayerView(layer).then((layerView) => {
          const whereClause = `ftr_slg = '${selectedFeaturedMap}'`;

          layerView.filter = new FeatureFilter({
            where: whereClause,
          });
        });
      }
    }
  };

  const toggleLayers = (map, layerSlug) => {
    // check if layers are already in the map
    const featurePlacesLayer = findLayerInMap(FEATURED_PLACES_LAYER, map);
    const discoveryGlobeLayer = findLayerInMap(DISCOVERY_GLOBE_LAYER, map);

    // If the layer is already in the map, we remove it
    if (layerSlug === FEATURE_TYPES.FEATURED_PLACES && discoveryGlobeLayer) {
      map.remove(discoveryGlobeLayer);
    }

    if (layerSlug === FEATURE_TYPES.DISCOVERY_GLOBE && featurePlacesLayer) {
      map.remove(featurePlacesLayer);
    }

    // add the layer to the map
    addLayer(layerSlug, featurePlacesLayer, discoveryGlobeLayer, map);
  };

  useEffect(() => {
    if(!view) return;
    view.when(() => {
      if (!handle && !isOpen) {
        spinGlobe(view);
      }
    });
  }, []);

  const isFeatureMapCardVisible = isOnScreen;

  const [isShareModalOpen, setShareModalOpen] = useState(false);

  return (
    (featuredMap && (
      <div
        className={cx(className, styles.cardContainer, {
          [animationStyles.leftHidden]: !isFeatureMapCardVisible,
          [styles.delayOnOut]: isFeatureMapCardVisible,
        })}
        style={{cursor: 'pointer'}}
        onClick={() => toggleLayers(view.map, featuredMap.slug)}
      >
        {featuredMap && (
          <>
            <section
              className={styles.titleSection}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(${featuredMap.image})`,
              }}
            >
              <ShareModalButton
                theme={{ shareButton: styles.shareButton }}
                setShareModalOpen={setShareModalOpen}
              />
              <ShareModal
                isOpen={isShareModalOpen}
                setShareModalOpen={setShareModalOpen}
              />
              <h2 className={styles.title}>{featuredMap.title}</h2>
            </section>
            <section className={styles.descriptionSection}>
              <p className={styles.description}>
                <T _str={featuredMap.description} />
              </p>
            </section>
            {/* <section className={styles.buttonSection}>
              <button
              style={{color: 'white'}}
                className={cx(styles.button, styles.exploreButton)}
                onClick={() => toggleLayers(view.map, featuredMap.slug)}
              >
                <T _str="Explore" />
              </button>
            </section> */}
          </>
        )}
      </div>
    )) ||
    null
  );
}

export default FeaturedMapCardComponent;
