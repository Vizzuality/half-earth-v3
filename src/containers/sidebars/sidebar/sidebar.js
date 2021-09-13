import React from 'react';
import { connect } from 'react-redux';
import Component from './sidebar-component';

import * as actions from 'actions/url-actions';

const SideBarContainer = props => {
  const closeSidebar = () => props.changeUI({ isSidebarOpen: false });
  const resetCategory = () => props.changeUI({ activeCategory: '' });
  const handleSidebarToggle = () => {
    closeSidebar();
    resetCategory();
  }
  return <Component handleSidebarToggle={handleSidebarToggle} {...props} />; 
}

export default connect(null, actions)(SideBarContainer);
