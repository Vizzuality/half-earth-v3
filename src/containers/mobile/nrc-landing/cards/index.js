import { connect } from 'react-redux';

import * as actions from 'actions/url-actions';

import Cards from './cards-component';

export default connect(null, actions)(Cards);
