import { loadModules } from 'esri-loader';
import { useState, useEffect } from 'react';
import { LAYERS_URLS } from 'constants/layers-urls';

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

export const useSearchWidgetLogic = (view, searchTermsAnalyticsEvent, searchWidgetConfig) => {
  const [searchWidget, setSearchWidget] = useState(null);
  const { searchSources, postSearchCallback, searchResultsCallback} = searchWidgetConfig || {};
  const [esriConstructors, setEsriConstructors] = useState();

  useEffect(() => {
    loadModules(["esri/widgets/Search", "esri/layers/FeatureLayer", "esri/tasks/Locator"])
      .then(([Search, FeatureLayer, Locator]) => {
        setEsriConstructors({Search, FeatureLayer, Locator})
      }).catch((err) => console.error(err));
  },[])

  const handleOpenSearch = (ref) => {
    const {Search, FeatureLayer, Locator} = esriConstructors;
    if(searchWidget === null) {
      const sWidget = new Search({
        view: view,
        locationEnabled: true, // do not show the Use current location box when clicking in the input field
        popupEnabled: false, // hide location popup
        resultGraphicEnabled: false, // hide location pin
        sources: searchSources(FeatureLayer, Locator),
        includeDefaultSources: false
      });
      setSearchWidget(sWidget);
    }
  };

  const updateSources = (searchSourcesFunction) => {
    if (searchWidget) {
      const {FeatureLayer, Locator} = esriConstructors;
      searchWidget.sources = searchSourcesFunction(FeatureLayer, Locator)
    }
  }

  const handleCloseSearch = () => {
    setSearchWidget(null);
  }

  const handleSearchInputChange = (event) => {
    if (searchWidget) {
      console.log(event.target.value)
      console.log(searchWidget)
      searchWidget.suggest(event.target.value);
    }
  }

  const handleSearchSuggestionClick = (option) => {
    if (searchWidget) {
      console.log(option)
      searchWidget.search(option);
    }
  }

  useEffect(() => {
    if(searchWidget) {
      searchWidget.on('suggest-complete', searchResultsCallback);
      searchWidget.on('select-result', postSearchCallback);
    }
  }, [searchWidget]);

  useEffect(() => {
    if(searchWidget) {
      searchWidget.on('suggest-complete', searchResultsCallback);
      searchWidget.on('select-result', postSearchCallback);
    }
  }, [searchWidgetConfig]);

  return {
    updateSources,
    handleOpenSearch,
    handleCloseSearch,
    handleSearchInputChange,
    handleSearchSuggestionClick,
    searchWidget
  }
}
