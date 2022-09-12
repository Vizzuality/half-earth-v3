import { orderBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { FEATURED } from 'router';

import * as actions from 'actions/url-actions';

import { findLayerInMap } from 'utils/layer-manager-utils';

import { FEATURED_PLACES_LAYER } from 'constants/layers-slugs';

import Component from './featured-place-card-component';
import mapStateToProps from './featured-place-card-selectors';

function FeaturedPlaceCardContainer(props) {
  const {
    view, map, featuredMapsList, selectedFeaturedMap, selectedFeaturedPlace,
    selectedTaxa, changeUI, featuredMapPlaces, browsePage,
  } = props;
  const [featuredPlacesList, setFeaturedPlacesList] = useState(null);
  const [featuredMap, setFeaturedMap] = useState(null);
  const [featuredPlacesLayer, setFeaturedPlacesLayer] = useState(null);
  const [featuredPlace, setFeaturedPlace] = useState({
    imageUrl: '',
    title: '',
    description: '',
  });

  const handleClose = () => {
    browsePage({ type: FEATURED });
    window.location.reload();
  };
  useEffect(() => {
    const layer = findLayerInMap(FEATURED_PLACES_LAYER, map);
    setFeaturedPlacesLayer(layer);
  }, [handleClose]);

  useEffect(() => {
    if (featuredMapPlaces && selectedFeaturedMap && selectedFeaturedPlace) {
      setFeaturedPlace({ ...featuredMapPlaces[selectedFeaturedMap][selectedFeaturedPlace] });
    }
  }, [selectedFeaturedPlace, selectedFeaturedMap, featuredMapPlaces]);

  useEffect(() => {
    if (featuredMapsList) {
      const updatedFeaturedMap = featuredMapsList.find((m) => m.slug === selectedFeaturedMap);
      setFeaturedMap(updatedFeaturedMap);
    }
  }, [featuredMapsList, selectedFeaturedMap, selectedFeaturedPlace]);

  // get all the slugs of the places belonging to the selected featured map
  useEffect(() => {
    if (featuredPlacesLayer) {
      const queryParams = featuredPlacesLayer.createQuery();
      queryParams.where = selectedFeaturedMap === 'priorPlaces' ? `taxa_slg = '${selectedTaxa}'` : `ftr_slg = '${selectedFeaturedMap}'`;
      featuredPlacesLayer.queryFeatures(queryParams).then((results) => {
        const { features } = results;
        const list = orderBy(features, (place) => place.geometry.longitude)
          .map((place) => place.attributes.nam_slg);
        setFeaturedPlacesList(list);
      });
    }
  }, [featuredPlacesLayer, selectedFeaturedMap, selectedTaxa, featuredMapPlaces]);

  const handleNextPlaceClick = (place) => {
    const index = featuredPlacesList.indexOf(place);
    const nextPlaceIndex = (index + 1) < featuredPlacesList.length ? index + 1 : 0;
    changeUI({ selectedFeaturedPlace: featuredPlacesList[nextPlaceIndex] });
  };
  const handlePrevPlaceClick = (place) => {
    const index = featuredPlacesList.indexOf(place);
    const prevPlaceIndex = (index - 1) < 0 ? featuredPlacesList.length - 1 : index - 1;
    changeUI({ selectedFeaturedPlace: featuredPlacesList[prevPlaceIndex] });
  };

  const handleLandscapeTrigger = () => view.goTo({ zoom: 8.1 });
  let hotspotsNumbers = null;
  if (featuredPlacesList && selectedFeaturedPlace) {
    const position = featuredPlacesList.indexOf(selectedFeaturedPlace);
    if (position > -1) {
      hotspotsNumbers = {
        size: featuredPlacesList.length,
        position: position + 1,
      };
    }
  }

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Component
      featuredMap={featuredMap}
      featuredPlace={featuredPlace}
      featuredPlacesList={featuredPlacesList}
      handleNextPlaceClick={handleNextPlaceClick}
      handlePrevPlaceClick={handlePrevPlaceClick}
      handleLandscapeTrigger={handleLandscapeTrigger}
      handleClose={handleClose}
      hotspotsNumbers={hotspotsNumbers}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(FeaturedPlaceCardContainer);
