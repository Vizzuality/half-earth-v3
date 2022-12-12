import { connect } from 'react-redux';

import * as actions from 'actions/url-actions';

import Hero from './hero-component';

export default connect(null, actions)(Hero);
