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
  const [searchWidget, setSearchWidget ] = useState(null);
  const { searchSources, postSearchCallback} = searchWidgetConfig || {};
  const keyEscapeEventListener = (evt) => {
    evt = evt || window.event;
    if (evt.keyCode === 27 && view && searchWidget) {
      handleCloseSearch();
    }
  };

  const handleOpenSearch = (ref) => {
    if(searchWidget === null) {
      setSearchWidget(undefined); // reset search widget in case of multiple quick clicks
      const container = ref ? ref : document.createElement("div");
      container.setAttribute("id", "searchWidget");
      loadModules(["esri/widgets/Search", "esri/layers/FeatureLayer", "esri/tasks/Locator"]).then(([Search, FeatureLayer, Locator]) => {
        const sWidget = new Search({
          view: view,
          locationEnabled: true, // do not show the Use current location box when clicking in the input field
          popupEnabled: false, // hide location popup
          resultGraphicEnabled: false, // hide location pin
          container,
          sources: searchSources(FeatureLayer, Locator),
          includeDefaultSources: false
        });
        setSearchWidget(sWidget);
      }).catch((err) => console.error(err));
    }
  };

  const handleCloseSearch = () => {
    view.ui.remove(searchWidget);
    document.removeEventListener('keydown', keyEscapeEventListener);
    setSearchWidget(null);
  }

  const handleSearchStart = () => {
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
      searchWidget.on('suggest-complete', (event) => searchTermsAnalyticsEvent(event.searchTerm));
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

export const useSketchWidget = (view, sketchWidgetConfig = {}) => {
  const [sketchTool, setSketchTool ] = useState(null);
  const [sketchLayer, setSketchLayer ] = useState(null);
  const { postDrawCallback} = sketchWidgetConfig;
  
  const handleSketchToolActivation = () => {
    loadModules(["esri/widgets/Sketch",  "esri/layers/GraphicsLayer"]).then(([Sketch, GraphicsLayer]) => {
      const _sketchLayer = new GraphicsLayer({ elevationInfo: { mode: 'on-the-ground' } });
      setSketchLayer(_sketchLayer);
      view.map.add(_sketchLayer);
      const _sketchTool = new Sketch({
        view,
        layer: _sketchLayer,
        availableCreateTools: ['polygon', 'rectangle', 'circle'],
        defaultCreateOptions: { hasZ: false },
        defaultUpdateOptions: { enableZ: false, multipleSelectionEnabled: false, toggleToolOnClick: true },
        visibleElements: {
          settingsMenu: false
        }
      });
      setSketchTool(_sketchTool)
    });
  }

  const addWidgetToTheUi = () => {
    view.ui.add(sketchTool, "manual");
    const container = document.createElement("div");
    const rootNode = document.getElementById("root");
    rootNode.appendChild(container);
  }

  const  handleSketchToolDestroy = () => {
    view.ui.remove(sketchTool);
    setSketchTool(null)
    sketchTool.destroy();
  }

  useEffect(() => {
    if(sketchTool) {

      addWidgetToTheUi();

      sketchTool.on('create', (event) => {
        if (event.state === 'complete') {
          postDrawCallback(event.graphic);
        }
      });
    }

    return function cleanUp() {
      sketchLayer && view.map.remove(sketchLayer)
    }
  }, [sketchTool]);

  return {
    handleSketchToolActivation,
    handleSketchToolDestroy,
    sketchTool
  }
}