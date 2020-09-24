import { loadModules } from 'esri-loader';
import { useState, useEffect } from 'react';
import { LAYERS_URLS } from 'constants/layers-urls';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER } from 'constants/layers-slugs';

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

export const useFeatureLayer = ({layerSlug, outFields = ["*"]}) => {
  const [layer, setLayer] = useState(null);
  useEffect(() => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const _layer = new FeatureLayer({
        url: LAYERS_URLS[layerSlug],
        outFields
      });
      setLayer(_layer)
    });
  }, [])
  return layer;
}

export const useSearchWidgetLogic = (view, openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent, postSearchCallback) => {
  const [searchWidget, setSearchWidget ] = useState(null);

  const keyEscapeEventListener = (evt) => {
    evt = evt || window.event;
    if (evt.keyCode === 27 && view && searchWidget) {
      handleCloseSearch();
    }
  };

  const handleOpenSearch = () => {
    if(searchWidget === null) {
      setSearchWidget(undefined); // reset search widget in case of multiple quick clicks
      const container = document.createElement("div");
      container.setAttribute("id", "searchWidget");
      loadModules(["esri/widgets/Search", "esri/layers/FeatureLayer", "esri/tasks/Locator"]).then(([Search, FeatureLayer, Locator]) => {
        const sWidget = new Search({
          view: view,
          locationEnabled: true, // do not show the Use current location box when clicking in the input field
          popupEnabled: false, // hide location popup
          resultGraphicEnabled: false, // hide location pin
          container,
          sources: [
            {
              layer: new FeatureLayer({
                url: LAYERS_URLS[COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER],
                title: COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER,
              }),
              outFields: ["*"],
              searchFields: ["GID_0", "NAME_0"],
              name: "Explore countries"
            },
            {
              locator: new Locator("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"),
              singleLineFieldName: "SingleLine",
              outFields: ["Addr_type"],
              categories: ['District', 'City', 'Metro Area','Subregion', 'Region', 'Territory', 'Water Features', 'Land Features', 'Nature Reserve'],
              name: "other geographic results"
            }
          ],
          includeDefaultSources: false
        });
        setSearchWidget(sWidget);
        openPlacesSearchAnalyticsEvent();
      }).catch((err) => console.error(err));
    }
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
    const esriSearch = document.querySelector('#searchWidget');
    const rootNode = document.getElementById("root");
    if(esriSearch) {
      rootNode.appendChild(esriSearch);
      setTimeout(() => {
        const input = document.querySelector('.esri-search__input');
        input && input.focus()
      }, 300);
    }
  }

  useEffect(() => {
    if( searchWidget ) {
      addSearchWidgetToView();
      document.addEventListener('keydown', keyEscapeEventListener);
      searchWidget.viewModel.on("search-start", handleSearchStart);
      searchWidget.on('select-result', (event) => postSearchCallback(event));
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
