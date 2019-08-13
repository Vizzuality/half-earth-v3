import React from 'react';
import { connect } from 'react-redux';
import Component from './featured-place-card-component';
import mapStateToProps from './featured-place-card-selectors';
import * as actions from 'actions/url-actions';


const FeaturedPlaceCardContainer = props => {
  const { featuredMapsList, selectedFeaturedMap } = props;
  const featuredMap = featuredMapsList && featuredMapsList.find(map => map.slug === selectedFeaturedMap);
  // const handleAllMapsClick = () => props.changeUI({ selectedSidebar: 'featuredMapsList' });
  return (
    <Component
      featuredMap={featuredMap}
      // handleAllMapsClick={handleAllMapsClick}
      {...props }
    />
  )
}

export default connect(mapStateToProps, actions)(FeaturedPlaceCardContainer);