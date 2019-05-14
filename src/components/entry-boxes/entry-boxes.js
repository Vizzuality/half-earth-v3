import React from 'react';
import { connect } from 'react-redux';
import Component from './entry-boxes-component';

import * as actions from './entry-boxes-actions';

const EntryBoxesContainer = props => {
  const closeEntryBoxes = () => props.changeUI({ isCategoriesBoxesVisible: false });
  const openSidebar = () => props.changeUI({ isPaddingActive: true });
  const setActiveCategory = 
    (activeCategory) => props.changeUI({ activeCategory: activeCategory });
  return (
    <Component 
      closeEntryBoxes={closeEntryBoxes}
      openSidebar={openSidebar}
      setActiveCategory={setActiveCategory}
      {...props} 
    />
  ) 
}

export default connect(null, actions)(EntryBoxesContainer);
