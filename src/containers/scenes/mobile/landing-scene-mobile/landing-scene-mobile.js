import { connect } from 'react-redux';

import mapStateToProps from 'selectors/map-tooltip-selectors';

import urlActions from 'actions/url-actions';

import Component from './landing-scene-mobile-component';

export default connect(mapStateToProps, urlActions)(Component);
