/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';

import { calculateGeometryArea } from 'utils/analyze-areas-utils';

import * as watchUtils from '@arcgis/core/core/reactiveUtils.js';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import * as Locator from '@arcgis/core/rest/locator.js';
import Search from '@arcgis/core/widgets/Search';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import Sketch from '@arcgis/core/widgets/Sketch.js';

import { HIGHER_AREA_SIZE_LIMIT } from 'constants/analyze-areas-constants';
import { LAYERS_URLS } from 'constants/layers-urls';
// Load watchUtils module to follow esri map changes
export const useWatchUtils = () => {
  // TODO: Move reactiveUtils import to each component that uses it
  return watchUtils;
};

export const useFeatureLayer = ({ layerSlug, outFields = ['*'] }) => {
  const [layer, setLayer] = useState(null);
  useEffect(() => {
    const updatedLayer = new FeatureLayer({
      url: LAYERS_URLS[layerSlug],
      outFields,
    });
    setLayer(updatedLayer);
  }, []);
  return layer;
};

export const useSearchWidgetLogic = (
  view,
  searchTermsAnalyticsEvent,
  searchWidgetConfig,
  isSimpleSearch
) => {
  const [searchWidget, setSearchWidget] = useState(null);
  const { searchSources, postSearchCallback, searchResultsCallback } =
    searchWidgetConfig || {};

  const handleOpenSearch = () => {
    if (searchWidget === null) {
      const sWidget = new Search({
        view,
        locationEnabled: true,
        // do not show the Use current location box when clicking in the input field
        popupEnabled: false, // hide location popup
        resultGraphicEnabled: false, // hide location pin
        maxSuggestions: 500,
        sources: !isSimpleSearch && searchSources(FeatureLayer, Locator),
        includeDefaultSources: isSimpleSearch,
        goToOverride: isSimpleSearch ? undefined : () => {}, // Go to will be done on the callback
      });
      setSearchWidget(sWidget);
    }
    return undefined;
  };

  const updateSources = (searchSourcesFunction) => {
    if (searchWidget) {
      searchWidget.sources = searchSourcesFunction(FeatureLayer, Locator);
    }
  };

  const handleCloseSearch = () => {
    setSearchWidget(null);
  };

  const handleSearchInputChange = (event) => {
    if (searchWidget) {
      searchWidget.suggest(`%${event.target.value}`);
    }
  };

  const handleSearchSuggestionClick = (option) => {
    if (searchWidget) {
      searchWidget.search(option);
    }
  };

  useEffect(() => {
    if (searchWidget && searchWidgetConfig) {
      searchWidget.on('suggest-complete', searchResultsCallback);
      searchWidget.on('select-result', postSearchCallback);
    }
  }, [searchWidget]);

  return {
    updateSources,
    handleOpenSearch,
    handleCloseSearch,
    handleSearchInputChange,
    handleSearchSuggestionClick,
    searchWidget,
  };
};

const createSymbol = (outlineColor) => {
  return {
    type: 'simple-fill',
    style: 'solid',
    color: [255, 255, 255, 0],
    outline: {
      style: 'solid',
      color: outlineColor,
      width: 4,
    },
  };
};

const INVALID_SYMBOL = createSymbol([255, 0, 0, 255]);
const VALID_SYMBOL = createSymbol([255, 255, 255, 0]);

export const useSketchWidget = ({
  view,
  sketchWidgetMode,
  setSketchWidgetMode,
  setPromptModalOpen,
  setPromptModalContent,
  warningMessages,
  shapeDrawTooBigAnalytics,
  sketchWidgetConfig = {},
}) => {
  const [sketchTool, setSketchTool] = useState(null);
  const [sketchLayer, setSketchLayer] = useState(null);
  const [sketchTooltipType, setSketchTooltipType] = useState(null);
  const [updatedGeometry, setUpdatedGeometry] = useState(null);
  const { postDrawCallback } = sketchWidgetConfig;

  const handleSketchToolActivation = () => {
    const _sketchLayer = new GraphicsLayer({
      elevationInfo: { mode: 'on-the-ground' },
    });
    setSketchLayer(_sketchLayer);
    view.map.add(_sketchLayer);

    const _sketchTool = new Sketch({
      view,
      layer: _sketchLayer,
      visibleElements: {
        settingsMenu: false,
      },
      createTools: {
        point: false,
      },
      availableCreateTools: ['polygon', 'rectangle', 'circle'],
      viewModel: new SketchViewModel({
        view,
        layer: _sketchLayer,
        defaultCreateOptions: { hasZ: false },
        defaultUpdateOptions: {
          enableZ: false,
          multipleSelectionEnabled: false,
          toggleToolOnClick: true,
        },
        polygonSymbol: VALID_SYMBOL,
      }),
    });

    setSketchTool(_sketchTool);
    setSketchTooltipType('polygon');
  };

  const handleSketchToolDestroy = () => {
    view.ui.remove(sketchTool);
    setUpdatedGeometry(null);
    setSketchTool(null);
    sketchTool.destroy();
  };

  const hasInvalidStyle = (graphic) =>
    graphic.symbol &&
    graphic.symbol.outline &&
    JSON.stringify(graphic.symbol.outline.color) ===
      JSON.stringify(INVALID_SYMBOL.outline.color);

  useEffect(() => {
    const isNotValidArea = (graphic) => {
      const area = graphic && calculateGeometryArea(graphic.geometry);
      return area > HIGHER_AREA_SIZE_LIMIT;
    };

    const checkAndMarkValidArea = (graphic) => {
      if (isNotValidArea(graphic)) {
        graphic.symbol = INVALID_SYMBOL;
        setSketchTooltipType('too-big');
      } else if (hasInvalidStyle(graphic)) {
        setSketchTooltipType(null);
        graphic.symbol = VALID_SYMBOL;
      }
    };

    if (sketchTool) {
      sketchTool.on('create', (event) => {
        const { state, tool, toolEventInfo, graphic } = event;
        if (state === 'active') {
          setSketchTooltipType(tool);

          if (tool === 'circle' || tool === 'rectangle') {
            checkAndMarkValidArea(graphic);
          }

          if (tool === 'polygon' && toolEventInfo.type === 'cursor-update') {
            checkAndMarkValidArea(graphic);

            const firstPoint = graphic.geometry.rings[0][0];
            const isClosingGeometry =
              toolEventInfo.coordinates &&
              firstPoint &&
              toolEventInfo.coordinates[0] === firstPoint[0] &&
              toolEventInfo.coordinates[1] === firstPoint[1];

            if (isClosingGeometry) {
              setSketchTooltipType('polygon-close');
            }
          }
        }
        if (state === 'complete' && sketchWidgetMode === 'create') {
          if (isNotValidArea(graphic)) {
            // Remove geometry if too big
            sketchTool.layer.remove(graphic);
            sketchTool.create(tool);
            setSketchTooltipType(tool);
          } else {
            // Go to edit
            setSketchTooltipType(null);
            setSketchWidgetMode('edit');
            view.goTo(graphic.geometry);
            checkAndMarkValidArea(graphic);
            sketchTool.update([graphic], { tool: 'reshape' });
            setUpdatedGeometry(graphic.geometry);
          }
        }
      });

      sketchTool.on('update', (event) => {
        const { toolEventInfo, graphics } = event;
        if (graphics && toolEventInfo && toolEventInfo.type.endsWith('-stop')) {
          checkAndMarkValidArea(graphics[0]);
          setUpdatedGeometry(graphics[0].geometry);
        }
      });

      sketchTool.on('delete', () => {
        setUpdatedGeometry(null);
      });
    }

    return function cleanUp() {
      if (sketchLayer) {
        view.map.remove(sketchLayer);
      }
    };
  }, [sketchTool]);

  useEffect(() => {
    if (sketchWidgetMode === 'finished') {
      const graphic =
        sketchLayer.graphics.items && sketchLayer.graphics.items[0];
      const area = calculateGeometryArea(graphic.geometry);
      if (area > HIGHER_AREA_SIZE_LIMIT) {
        setPromptModalContent({
          title: warningMessages.area.title,
          description: warningMessages.area.description(area),
        });
        setPromptModalOpen(true);
        shapeDrawTooBigAnalytics();
        sketchTool.update([graphic], { tool: 'reshape' });
        setSketchWidgetMode('edit');
      } else {
        // Finish creation of area and trigger postDrawCallback
        postDrawCallback(graphic.geometry);
        setSketchWidgetMode('create');
      }
    }
  }, [sketchWidgetMode, warningMessages, setSketchTooltipType]);
  return {
    sketchTool,
    // Only export for 'Esc' exception
    setUpdatedGeometry,
    updatedGeometry,
    handleSketchToolDestroy,
    handleSketchToolActivation,
    sketchTooltipType,
    setSketchTooltipType,
  };
};
