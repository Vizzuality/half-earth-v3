// Docs for Search ui widget
//https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
import { loadModules } from 'esri-loader';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent } from 'actions/google-analytics-actions';
import SearchWidgetComponent from './search-widget-component';

const actions = { openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent };

const SearchWidget = ({ view, openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent }) => {
  const [searchWidget, setSearchWidget ] = useState();

  const keyEscapeEventListener = (evt) => { 
    evt = evt || window.event;
    if (evt.keyCode === 27 && view && searchWidget) {
      handleCloseSearch();
    }
  };

  const handleOpenSearch = () => {
    loadModules(["esri/widgets/Search"]).then(([Search]) => {
      const sWidget = new Search({
        view: view,
        locationEnabled: false, // don't show the Use current location box when clicking in the input field
        popupEnabled: false, // hide location popup
        resultGraphicEnabled: false // hide location pin
      });
      setSearchWidget(sWidget);
      openPlacesSearchAnalyticsEvent();
    }).catch((err) => console.error(err));
  };

  const handleCloseSearch = () => {
    view.ui.remove(searchWidget);
    document.removeEventListener('keydown', keyEscapeEventListener);
    setSearchWidget(null);
  }
  
  const handleSearchStart = () => {
    searchLocationAnalyticsEvent();
    handleCloseSearch();
  }

  const addSearchWidgetToView = async () => {
    await view.ui.add(searchWidget, "top-left");
    document.querySelector(".esri-search__input").focus();
  }
  
  useEffect(() => {
    if( searchWidget ) {
      addSearchWidgetToView();
      document.addEventListener('keydown', keyEscapeEventListener);
      searchWidget.viewModel.on("search-start", handleSearchStart);
      searchWidget.watch('activeSource', function(evt) {
        evt.placeholder = "Search for a location";
      });
    }
    
    return function cleanUp() {
      document.removeEventListener('keydown', keyEscapeEventListener);
    }
  }, [searchWidget]);

  return <SearchWidgetComponent handleOpenSearch={handleOpenSearch} handleCloseSearch={handleCloseSearch} showCloseButton={!!searchWidget}/>;
}

export default connect(null, actions)(SearchWidget);
