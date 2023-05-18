import { connect } from 'react-redux';

import * as urlActions from 'actions/url-actions';

import Component from './regions-labels-layer-component';

export default connect(null, urlActions)(Component);
