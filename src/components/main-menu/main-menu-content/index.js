import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import Component from './component.jsx';

export default connect(null, urlActions)(Component);
