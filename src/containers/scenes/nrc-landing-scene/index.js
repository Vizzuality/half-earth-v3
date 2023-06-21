import { connect } from 'react-redux';

import urlActions from 'actions/url-actions';

import Component from './component';

export default connect(null, urlActions)(Component);
