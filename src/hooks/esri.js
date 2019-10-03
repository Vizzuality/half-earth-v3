import { loadModules } from '@esri/react-arcgis';
import { useState, useEffect } from 'react';
import { isMobile } from 'constants/responsive';
import { FOOTER_OPTIONS } from 'constants/mobile-only';

// Load watchUtils module to follow esri map changes
export const useWatchUtils = () => {
  const [watchUtils, setWatchUtils] = useState(null);
  useEffect(() => {
    loadModules(["esri/core/watchUtils"]).then(([watchUtils]) => {
      setWatchUtils(watchUtils);
    })
  }, []);
  return watchUtils;
}

export const usePaintLayer = (layer, slug, color) => {
  useEffect(() => {
    const paintProperties = layer.getPaintProperties(slug);

    paintProperties['fill-color'] = color;
    paintProperties['fill-outline-color'] = color;

    layer.setPaintProperties(slug, paintProperties);
  }, [])
}

export const useSearchWidgetLogic = (view, openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent) => {
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

  return {
    handleOpenSearch,
    handleCloseSearch,
    searchWidget
  }
}