import React from 'react';
import { connect } from 'react-redux';
import Component from './featured-map-card-component';
import mapStateToProps from './featured-map-card-selectors';

const FeaturedMapCardContainer = props => {
  const { featuredMaps, selectedFeaturedMap } = props;
  const featuredMap = featuredMaps && featuredMaps.find(map => map.slug === selectedFeaturedMap)
  return (
    <Component
      featuredMap={featuredMap}
      {...props }
    />
  )
}

export default connect(mapStateToProps, null)(FeaturedMapCardContainer);