import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
// CONSTANTS
import { GRID_CELL_STYLES } from 'constants/graphic-styles';
import { GRAPHIC_LAYER } from 'constants/layers-slugs';
// UTILS
import { createGraphic, createGraphicLayer } from 'utils/graphic-layer-utils';
import { hitResults, setCursor, drawGeometry, flyToCentroid } from 'utils/globe-events-utils';
// ACTIONS
import * as urlActions from 'actions/url-actions';
import mapTooltipActions from 'redux_modules/map-tooltip';

const actions = { ...urlActions, ...mapTooltipActions };

const FeatureHighlightLayerContainer = (props) => {
  const { view, featureLayerSlugs, onFeatureClick } = props;


  const [selectedCountryBorderGraphic, setSelectedCountryGraphic] = useState(null);
  const [hoveredCountryBorderGraphic, setHoveredCountryGraphic] = useState(null);
  const [graphicsLayer, setGraphicsLayer] = useState(null);

  //Create the graphics layer on mount
  useEffect(() => {
    if (!graphicsLayer) {
      loadModules(["esri/Graphic", "esri/layers/GraphicsLayer"]).then(([Graphic, GraphicsLayer]) => {
        const _selectedCountryBorderGraphic = createGraphic(Graphic, GRID_CELL_STYLES);
        const _hoveredCountryBorderGraphic = createGraphic(Graphic, GRID_CELL_STYLES);
        const _graphicsLayer = createGraphicLayer(GraphicsLayer, [_selectedCountryBorderGraphic, _hoveredCountryBorderGraphic], GRAPHIC_LAYER);
        setGraphicsLayer(_graphicsLayer)
        setSelectedCountryGraphic(_selectedCountryBorderGraphic);
        setHoveredCountryGraphic(_hoveredCountryBorderGraphic);
        view.map.add(_graphicsLayer);
      })
    }
    return function cleanUp() {
      if (selectedCountryBorderGraphic) selectedCountryBorderGraphic.geometry = null;
      if (hoveredCountryBorderGraphic) hoveredCountryBorderGraphic.geometry = null;
    }
  }, [featureLayerSlugs])

  const onClickHandler = features => {
    if (features && features[0]) {
      const { graphic: { geometry } } = features[0];
      flyToCentroid(view, geometry);
    }
    onFeatureClick(features);
  }

  const onHoverHandler = (features) => {
    setCursor(features);
    drawGeometry(features, hoveredCountryBorderGraphic);
  }

  const onLabelEvent = (event) => {
    event.stopPropagation();
    view.hitTest(event).then(viewPoint => {
      const features = hitResults(viewPoint, featureLayerSlugs);
      switch (event.type) {
        case 'pointer-move':
          onHoverHandler(features);
          break;
        case 'click':
          onClickHandler(features);
          break;
        default: return;
      }
    })
  }

  useEffect(() => {
    let eventHandler;
    if (selectedCountryBorderGraphic) {
      eventHandler = view.on("click", onLabelEvent);
    }
    return function cleanUp() {
      eventHandler && eventHandler.remove();
    }
  }, [featureLayerSlugs, selectedCountryBorderGraphic])

  useEffect(() => {
    let eventHandler;
    if (hoveredCountryBorderGraphic) {
      eventHandler = view.on("pointer-move",
        debounce(onLabelEvent, 35, { leading: true, trailing: true })
      );
    }
    return function cleanUp() {
      eventHandler && eventHandler.remove();
    }
  }, [featureLayerSlugs, hoveredCountryBorderGraphic])

  return null;
}

export default connect(null, actions)(FeatureHighlightLayerContainer);
