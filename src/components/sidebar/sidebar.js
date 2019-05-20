import React from 'react';
import { connect } from 'react-redux';
import Component from './sidebar-component';

import * as actions from 'actions/url-actions';

const SideBarContainer = props => {
  const handleSidebarToggle = () => props.changeUI({ isSidebarOpen: !props.isSidebarOpen });
  return <Component handleSidebarToggle={handleSidebarToggle} {...props} />; 
}

export default connect(null, actions)(SideBarContainer);
