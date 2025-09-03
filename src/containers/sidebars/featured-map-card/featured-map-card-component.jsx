import { useEffect, useState } from 'react';
import { orderBy } from 'lodash';
import { T, useT } from '@transifex/react';

import cx from 'classnames';
import Button from 'components/button';
import ShareModalButton from 'components/share-button';
import ShareModal from 'components/share-modal';

import animationStyles from 'styles/common-animations.module.scss';
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter.js';
import { findLayerInMap, createLayer, addLayerToMap } from 'utils/layer-manager-utils';
import { LAYERS_URLS } from 'constants/layers-urls';
import { FEATURED_PLACES_LAYER } from 'constants/layers-slugs';

import styles from './featured-map-card-styles.module.scss';

const FEATURE_TYPES = {
  FEATURED_PLACES: 'bestPlaces',
  DISCOVER_PLACES: 'discoverPlaces',
}

function FeaturedMapCardComponent({
  view,
  className,
  selectedSidebar,
  isFullscreenActive,
  featuredMap,
  selectedFeaturedPlace,
  selectedFeaturedMap,
  setFeaturedMapPlaces,
  spinGlobe,
  handle,
  changeUI,
  selectedSlug,
  setFeaturedMap,
}) {
  const isOpen = selectedSidebar === 'featuredMapCard';
  const t = useT();

  const isOnScreen = isOpen && !isFullscreenActive && !selectedFeaturedPlace;

  const getSlugLayer = (slug) => {
    switch (slug) {
      case FEATURE_TYPES.FEATURED_PLACES:
        return FEATURED_PLACES_LAYER;
      case FEATURE_TYPES.DISCOVER_PLACES:
        return FEATURED_PLACES_LAYER;
      default:
        return null;
    }
  };

  const addLayer = (layerSlug, featurePlacesLayer, discoveryGlobeLayer, map) => {
    const slug = getSlugLayer(layerSlug);
    if((layerSlug === FEATURE_TYPES.FEATURED_PLACES && !featurePlacesLayer) ||
      (layerSlug === FEATURE_TYPES.DISCOVER_PLACES && !discoveryGlobeLayer)) {
      const layer = createLayer({url: LAYERS_URLS[slug], slug: slug, type: 'FeatureLayer', portalId: LAYERS_URLS[FEATURED_PLACES_PORTAL_ID]});
      addLayerToMap(layer, map);

      // If the layer is FEATURED_PLACES_LAYER, we need to filter it by the selected featured map
      if ((layerSlug === FEATURE_TYPES.FEATURED_PLACES ||
        layerSlug === FEATURE_TYPES.DISCOVER_PLACES) && selectedFeaturedMap) {
        view.whenLayerView(layer).then((layerView) => {
          const whereClause = `ftr_slg = '${selectedFeaturedMap}'`;

          layerView.filter = new FeatureFilter({
            where: whereClause,
          });

          navigateToFirstPoint(map, layerSlug);
        });
      }
    }

    setFeaturedMap({ slug: layerSlug });

  };

  const toggleLayers = (map, layerSlug) => {
    setFeaturedMapPlaces({ slug: layerSlug });
    navigateToFirstPoint(map, layerSlug);
  };

  const navigateToFirstPoint = (map, layerSlug) => {
    const featuredPlacesLayer = findLayerInMap(FEATURED_PLACES_LAYER, map);
    const queryParams = featuredPlacesLayer.createQuery();
      queryParams.where = `ftr_slg = '${selectedFeaturedMap}'`;

      featuredPlacesLayer.queryFeatures(queryParams).then((results) => {
        const { features } = results;
        let list;

        if(selectedFeaturedMap === 'discoverPlaces'){
          list = orderBy(features, (place) => place.attributes.story_date, ['desc']).map(
            (place) => place.attributes.nam_slg
          );
          changeUI({ selectedFeaturedMap: layerSlug, selectedFeaturedPlace: list[0] });
        }
        else {
          list = orderBy(features, (place) => place.geometry.longitude).map(
            (place) => place.attributes.nam_slg
          );
          changeUI({ selectedFeaturedMap: layerSlug, selectedFeaturedPlace: list[0] });
        }
      });
  }

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
          [styles.discoverPlaces]: selectedSlug === FEATURE_TYPES.DISCOVER_PLACES && selectedFeaturedMap === FEATURE_TYPES.DISCOVER_PLACES,
          [styles.bestPlaces]: selectedSlug === FEATURE_TYPES.FEATURED_PLACES && selectedFeaturedMap === FEATURE_TYPES.FEATURED_PLACES,
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
            <section className={styles.buttonSection}>
              <Button
                  type='rectangular'
                  className={cx(styles.button, {
                    [styles.discoverPlaces]:  selectedFeaturedMap === FEATURE_TYPES.DISCOVER_PLACES,
                    [styles.bestPlaces]: selectedFeaturedMap === FEATURE_TYPES.FEATURED_PLACES,
                  })}

                  handleClick={() => toggleLayers(view.map, featuredMap.slug)}
                  label={t('Explore')}
                />
            </section>
          </>
        )}
      </div>
    )) ||
    null
  );
}

export default FeaturedMapCardComponent;
