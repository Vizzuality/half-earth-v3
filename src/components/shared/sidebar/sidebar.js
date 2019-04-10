import { connect } from 'react-redux';
import reducerRegistry from 'reducerRegistry';
import SidebarComponent from './sidebar-component';

import * as actions from './sidebar-actions';
import reducers, { initialState } from './sidebar-reducers';

const mapStateToProps = ({ sidebar }) => ({ isSidebarOpen: sidebar.open })

reducerRegistry.registerModule('sidebar', {
  actions,
  reducers,
  initialState
});

export default connect(mapStateToProps, actions)(SidebarComponent);
