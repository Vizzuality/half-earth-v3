import { connect } from 'react-redux';

import * as actions from 'actions/url-actions';

import Banner from './component';

export default connect(null, actions)(Banner);
