// Docs for Search ui widget
//https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
import { loadModules } from '@esri/react-arcgis';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import SearchWidgetComponent from './search-widget-component';

const SearchWidget = ({ view }) => {
  const [searchWidget, setSearchWidget ] = useState();

  const keyEscapeEventListener = (evt) => { 
    evt = evt || window.event;
    if (evt.keyCode == 27 && view && searchWidget) {
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

    }).catch((err) => console.error(err));
  };

  const handleCloseSearch = () => {
    view.ui.remove(searchWidget);
    document.removeEventListener('keydown', keyEscapeEventListener);
    setSearchWidget(null);
  }
  
  useEffect(() => {
    if( searchWidget ) {
      view.ui.add(searchWidget, "top-left");
      document.addEventListener('keydown', keyEscapeEventListener);
      searchWidget.viewModel.on("search-start", handleCloseSearch);
      searchWidget.watch('activeSource', function(evt) {
        evt.placeholder = "Search for a location";
      });
    }

    // const node = document.createElement("div");
    // view.ui.add(node, "top-left");
    // const component = <SearchWidgetComponent handleOpenSearch={handleOpenSearch} handleCloseSearch={handleCloseSearch} showCloseButton={!!searchWidget}/>;
    // ReactDOM.render(component, node);
    
    return function cleanUp() {
      // view.ui.remove(node);
      // ReactDOM.unmountComponentAtNode(node)
      document.removeEventListener('keydown', keyEscapeEventListener);
    }
  }, [searchWidget]);

  return <SearchWidgetComponent handleOpenSearch={handleOpenSearch} handleCloseSearch={handleCloseSearch} showCloseButton={!!searchWidget}/>;
}

export default SearchWidget;
