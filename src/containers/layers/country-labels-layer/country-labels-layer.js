import Component from './country-labels-layer-component';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';

export default connect(null, urlActions)(Component);
