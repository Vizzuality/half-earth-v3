import React from 'react';
import { connect } from 'react-redux';
import { zoomToScale } from 'constants/view-props';
import * as actions from 'actions/url-actions';
import Component from './geo-description-widget-component';
import mapStateToProps from './geo-description-widget-selectors';

// this forces the registration of redux module and sagas
import 'redux_modules/geo-description';

const GeoDescriptionWidget = props => {
  const { isLandscapeSidebarCollapsed, activeOption, changeUI } = props;

  const handleBackClick = () => {
    const { view } = props;
    const { center } = view;
    const target = {
      center: [ center.longitude, center.latitude],
      scale: zoomToScale[7]
    }
    view.goTo(target)
      .catch(function(error) {
        // Avoid displaying console errors when transition is aborted by user interacions
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
  };

  const toggleCollapsedLandscapeSidebar = () => {
    if (isLandscapeSidebarCollapsed && activeOption) { changeUI({ activeOption: '' }); } // close the menu
    changeUI({ isLandscapeSidebarCollapsed: !isLandscapeSidebarCollapsed });
  }

  return (
    <Component
      handleBackClick={handleBackClick}
      toggleCollapsedLandscapeSidebar={toggleCollapsedLandscapeSidebar}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(GeoDescriptionWidget);
