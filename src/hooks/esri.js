import { loadModules } from 'esri-loader';
import { useState, useEffect } from 'react';
import { LAYERS_URLS } from 'constants/layers-urls';
import { calculateGeometryArea } from 'utils/analyze-areas-utils';

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
      searchWidget.suggest(event.target.value);
    }
  }

  const handleSearchSuggestionClick = (option) => {
    if (searchWidget) {
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

export const useSketchWidget = (view, sketchWidgetConfig = {}) => {
  const [sketchTool, setSketchTool ] = useState(null);
  const [sketchLayer, setSketchLayer ] = useState(null);
  const { postDrawCallback } = sketchWidgetConfig;
  const [Constructors, setConstructors] = useState(null);
  const [geometryArea, setGeometryArea] = useState(0);

  useEffect(() => {
    loadModules(["esri/widgets/Sketch/SketchViewModel","esri/geometry/geometryEngine"]).then(([SketchViewModel, geometryEngine]) => {
      setConstructors({
        geometryEngine,
        SketchViewModel
      })
    })
  }, [])

  
  const handleSketchToolActivation = () => {
    loadModules(["esri/widgets/Sketch",  "esri/widgets/Sketch/SketchViewModel","esri/layers/GraphicsLayer"]).then(([Sketch, SketchViewModel, GraphicsLayer]) => {
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
        },
        // viewModel: new SketchViewModel({
        //   view: view,
        //   layer:_sketchLayer,
        //   polygonSymbol: {
        //     type: "simple-fill", 
        //     color: [147, 255, 95, 0.2]
        //   }
        // })
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
        if (event.state === 'active') {
          if (event.graphic.geometry.rings[0].length > 3) {
            setGeometryArea(calculateGeometryArea(event.graphic.geometry, Constructors.geometryEngine))
          }
        }
        else if (event.state === 'complete') {
          postDrawCallback(event.graphic, calculateGeometryArea(event.graphic.geometry, Constructors.geometryEngine));
        }
      });
    }

    return function cleanUp() {
      sketchLayer && view.map.remove(sketchLayer)
    }
  }, [sketchTool]);

  return {
    sketchTool,
    geometryArea,
    handleSketchToolDestroy,
    handleSketchToolActivation,
  }
}
