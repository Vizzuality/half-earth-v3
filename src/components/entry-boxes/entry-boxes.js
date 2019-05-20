import React from 'react';
import { connect } from 'react-redux';
import Component from './entry-boxes-component';

import * as actions from 'actions/url-actions';

const EntryBoxesContainer = props => {
  const closeEntryBoxes = () => props.changeUI({ isCategoriesBoxesVisible: false });
  const openSidebar = () => props.changeUI({ isSidebarOpen: true });
  const setActiveCategory = 
    (activeCategory) => props.changeUI({ activeCategory: activeCategory });
  const setCategoryBoxesAnimationEnded = () => props.changeAnimations({ categoryBoxesAnimationEnded: true });
  return (
    <Component
      closeEntryBoxes={closeEntryBoxes}
      openSidebar={openSidebar}
      setActiveCategory={setActiveCategory}
      setCategoryBoxesAnimationEnded={setCategoryBoxesAnimationEnded}
      {...props} 
    />
  ) 
}

export default connect(null, actions)(EntryBoxesContainer);
