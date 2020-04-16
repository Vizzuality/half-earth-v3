import React from 'react';
import { connect } from 'react-redux';
import Component from './category-box-component';
import * as actions from 'actions/url-actions';

const CategoryBoxContainer = props => {
  const setActiveCategory = (category, activeCategory) => {
    const { changeUI } = props;
    const updatedCategory = category === activeCategory ? null : category;
    changeUI({ activeCategory: updatedCategory })
  };
  return (
    <Component
      setActiveCategory={setActiveCategory}
      {...props} 
    />
  ) 
}

export default connect(null, actions)(CategoryBoxContainer);
