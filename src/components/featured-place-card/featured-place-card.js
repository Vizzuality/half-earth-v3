import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import CONTENTFUL from 'services/contentful';
import Component from './featured-place-card-component';
import mapStateToProps from './featured-place-card-selectors';
import * as actions from 'actions/url-actions';


const FeaturedPlaceCardContainer = props => {
  const { featuredMapsList, selectedFeaturedMap, selectedFeaturedPlace } = props;

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

  const featuredMap = featuredMapsList && featuredMapsList.find(map => map.slug === selectedFeaturedMap);
  // const handleAllMapsClick = () => props.changeUI({ selectedSidebar: 'featuredMapsList' });
  return (
    <Component
      featuredMap={featuredMap}
      featuredPlace={featuredPlace}
      // handleAllMapsClick={handleAllMapsClick}
      {...props }
    />
  )
}

export default connect(mapStateToProps, actions)(FeaturedPlaceCardContainer);