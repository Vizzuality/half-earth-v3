import { connect } from 'react-redux';
import SidebarComponent from './sidebar-component';

import * as actions from './sidebar-actions';
import reducers, { initialState } from './sidebar-reducers';

export const reduxConfig = { actions, reducers, initialState };

export default connect(null, actions)(SidebarComponent);