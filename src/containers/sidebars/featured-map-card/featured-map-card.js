import React, { useEffect } from 'react';
import { useLocale } from '@transifex/react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import featuredMapPlacesActions from 'redux_modules/featured-map-places';
import Component from './featured-map-card-component';
import mapStateToProps from './featured-map-card-selectors';

const actions = { ...urlActions, ...featuredMapPlacesActions };

const FeaturedMapCardContainer = props => {
  const { featuredMapsList, selectedFeaturedMap, setFeaturedMapPlaces } = props;
  const locale = useLocale();

  useEffect(() => {
    setFeaturedMapPlaces({ slug: selectedFeaturedMap, locale })
  }, [selectedFeaturedMap, locale])

  const featuredMap = featuredMapsList && featuredMapsList.find(map => map.slug === selectedFeaturedMap);
  return (
    <Component
      featuredMap={featuredMap}
      {...props }
    />
  )
}

export default connect(mapStateToProps, actions)(FeaturedMapCardContainer);
