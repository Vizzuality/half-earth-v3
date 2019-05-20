import React from 'react';
import { connect } from 'react-redux';
import Component from './sidebar-component';

import * as actions from 'actions/url-actions';
import mapStateToProps from 'selectors/animations-selectors';

const SideBarContainer = props => {
  const openEntryBoxes = () => props.changeUI({ isCategoriesBoxesVisible: true });
  const closeSidebar = () => props.changeUI({ isSidebarOpen: false });
  const resetCategory = () => props.changeUI({ activeCategory: '' });
  const resetCategoryBoxesAnimation = () => props.changeAnimations({ categoryBoxesAnimationEnded: false });
  const handleSidebarToggle = () => {
    resetCategoryBoxesAnimation();
    closeSidebar();
    resetCategory();
    openEntryBoxes();
  }
  return <Component handleSidebarToggle={handleSidebarToggle} {...props} />; 
}

export default connect(mapStateToProps, actions)(SideBarContainer);
