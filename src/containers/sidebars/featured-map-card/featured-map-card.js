import { connect } from 'react-redux';
import featuredMapPlacesActions from 'redux_modules/featured-map-places';

import * as urlActions from 'actions/url-actions';

import Component from './featured-map-card-component';
import mapStateToProps from './featured-map-card-selectors';

const actions = { ...urlActions, ...featuredMapPlacesActions };

function FeaturedMapCardContainer(props) {
  const { featuredMapsList, selectedFeaturedMap } = props;

  const featuredMap =
    featuredMapsList &&
    featuredMapsList.find((map) => map.slug === selectedFeaturedMap);
  return <Component featuredMap={featuredMap} {...props} />;
}

export default connect(mapStateToProps, actions)(FeaturedMapCardContainer);
