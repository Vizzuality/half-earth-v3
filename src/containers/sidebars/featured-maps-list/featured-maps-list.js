import React from 'react';
import { connect } from 'react-redux';
import Component from './featured-maps-list-component';
import mapStateToProps from './featured-maps-list-selectors';
import * as actions from 'actions/url-actions';

const FeaturedMapsListContainer = props => {
  const handleFeaturedMapClick = slug => {
    const { changeUI } = props;
    changeUI({ selectedFeaturedMap: slug, selectedSidebar: 'featuredMapCard' })
  };

  const handleFeatureMapHover = slug => {
    const { changeUI } = props;
    changeUI({ selectedFeaturedMap: slug })
  }

  return (
    <Component
      handleFeaturedMapClick={handleFeaturedMapClick}
      handleFeatureMapHover={handleFeatureMapHover}
      {...props }
    />
  )
}

export default connect(mapStateToProps, actions)(FeaturedMapsListContainer);