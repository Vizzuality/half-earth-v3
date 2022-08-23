import { connect } from 'react-redux';

import * as actions from 'actions/url-actions';

import Tabs from './tabs-component';

export default connect(null, actions)(Tabs);
