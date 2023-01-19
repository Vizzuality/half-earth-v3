import { connect } from 'react-redux';

import * as actions from 'actions/url-actions';

import Component from './component';

export default connect(null, actions)(Component);
