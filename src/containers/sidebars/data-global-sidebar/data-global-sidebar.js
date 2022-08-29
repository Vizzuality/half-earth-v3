import * as actions from 'actions/url-actions';
import { connect } from 'react-redux';
import DataGlobalSidebar from './data-global-sidebar-component';

export default connect(null, actions)(DataGlobalSidebar);
