import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import CONTENTFUL from 'services/contentful';
import { findLayerInMap } from 'utils/layer-manager-utils';
import { FEATURED_PLACES_LAYER } from 'constants/layers-slugs';
import Component from './featured-place-card-component';
import mapStateToProps from './featured-place-card-selectors';
import * as actions from 'actions/url-actions';


const FeaturedPlaceCardContainer = props => {
  const { view, map, featuredMapsList, selectedFeaturedMap, selectedFeaturedPlace, selectedTaxa, changeUI } = props;
  const [featuredPlacesList, setFeaturedPlacesList] = useState(null);
  const [featuredMap, setFeaturedMap] = useState(null);
  const [featuredPlacesLayer, setFeaturedPlacesLayer] = useState(null);
  const [featuredPlace, setFeaturedPlace] = useState({
    image: '',
    title: '',
    description: ''
  });

  useEffect(() => {
    const layer = findLayerInMap(FEATURED_PLACES_LAYER, map);
    setFeaturedPlacesLayer(layer);
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const result = await CONTENTFUL.getFeaturedPlaceData(selectedFeaturedPlace);
      if (result) {
        setFeaturedPlace(result);
      }
    };

    selectedFeaturedPlace && fetchData();
  },[selectedFeaturedPlace])

  useEffect(() => {
    if (featuredMapsList) {
      const _featuredMap = featuredMapsList.find(map => map.slug === selectedFeaturedMap);
      setFeaturedMap(_featuredMap)
    }
  },[featuredMapsList, selectedFeaturedMap])

  // get all the slugs of the places belonging to the selected featured map
  useEffect(() => {
    if (featuredPlacesLayer) {
      const queryParams = featuredPlacesLayer.createQuery();
      queryParams.where = selectedFeaturedMap === 'priorPlaces' ? `taxa_slg = '${selectedTaxa}'` : `ftr_slg = '${selectedFeaturedMap}'`;
      featuredPlacesLayer.queryFeatures(queryParams).then(function(results){
        const { features } = results;
        const list = orderBy(features, place => place.geometry.longitude).map(place => place.attributes.nam_slg);
        setFeaturedPlacesList(list);
      });
    }
  }, [featuredPlacesLayer, selectedFeaturedMap, selectedTaxa])

  const handleAllMapsClick = () => changeUI({ selectedFeaturedPlace: null });
  const handleNextPlaceClick = place => {
    const index = featuredPlacesList.indexOf(place);
    const nextPlaceIndex = (index + 1) < featuredPlacesList.length ? index + 1 : 0;
    changeUI({ selectedFeaturedPlace: featuredPlacesList[nextPlaceIndex] })
  }
  const handlePrevPlaceClick = place => {
    const index = featuredPlacesList.indexOf(place);
    const prevPlaceIndex = (index - 1) < 0 ? featuredPlacesList.length - 1 : index - 1;
    changeUI({ selectedFeaturedPlace: featuredPlacesList[prevPlaceIndex] })
  }

  const handleLandscapeTrigger = () => view.goTo({ zoom: 8.1 })

  return (
    <Component
      featuredMap={featuredMap}
      featuredPlace={featuredPlace}
      featuredPlacesList={featuredPlacesList}
      handleAllMapsClick={handleAllMapsClick}
      handleNextPlaceClick={handleNextPlaceClick}
      handlePrevPlaceClick={handlePrevPlaceClick}
      handleLandscapeTrigger={handleLandscapeTrigger}
      {...props }
    />
  )
}

export default connect(mapStateToProps, actions)(FeaturedPlaceCardContainer);