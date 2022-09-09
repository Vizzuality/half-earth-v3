import { connect } from 'react-redux';

import * as actions from 'actions/url-actions';

import DataGlobalSidebar from './data-global-sidebar-component';

export default connect(null, actions)(DataGlobalSidebar);
