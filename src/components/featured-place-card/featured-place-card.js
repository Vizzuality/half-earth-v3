import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import CONTENTFUL from 'services/contentful';
import Component from './featured-place-card-component';
import mapStateToProps from './featured-place-card-selectors';
import * as actions from 'actions/url-actions';


const FeaturedPlaceCardContainer = props => {
  const { featuredMapsList, selectedFeaturedMap, selectedFeaturedPlace, featuredPlacesLayer, changeUI } = props;
  const [featuredPlacesList, setFeaturedPlacesList] = useState(null);
  const [featuredMap, setFeaturedMap] = useState(null);
  const [featuredPlace, setFeaturedPlace] = useState({
    image: '',
    title: '',
    description: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await CONTENTFUL.getFeaturedPlaceData(selectedFeaturedPlace);
      const { title, image, description } = result;
      const parsedDescription = description.content[0].content[0].value;
      setFeaturedPlace({title, image, description: parsedDescription});
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
    const queryParams = featuredPlacesLayer.createQuery();
    queryParams.where = `ftr_slg = '${selectedFeaturedMap}'`;
    featuredPlacesLayer.queryFeatures(queryParams).then(function(results){
      const { features } = results;
      const list = orderBy(features, place => place.attributes.lon).map(place => place.attributes.nam_slg);
      setFeaturedPlacesList(list);
    });
  }, [featuredPlacesLayer, selectedFeaturedMap])

  // const featuredMap = featuredMapsList && featuredMapsList.find(map => map.slug === selectedFeaturedMap);

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
  return (
    <Component
      featuredMap={featuredMap}
      featuredPlace={featuredPlace}
      featuredPlacesList={featuredPlacesList}
      handleAllMapsClick={handleAllMapsClick}
      handleNextPlaceClick={handleNextPlaceClick}
      handlePrevPlaceClick={handlePrevPlaceClick}
      {...props }
    />
  )
}

export default connect(mapStateToProps, actions)(FeaturedPlaceCardContainer);