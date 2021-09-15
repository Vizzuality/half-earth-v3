import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
// CONSTANTS
import { GRID_CELL_STYLES } from 'constants/graphic-styles';
import { GRAPHIC_LAYER } from 'constants/layers-slugs';
// UTILS
import { createGraphic, createGraphicLayer } from 'utils/graphic-layer-utils';
import { hitResults, setCursor, drawGeometry, flyToGeometry, toggleCountryTooltip } from 'utils/globe-events-utils';
// ACTIONS
import * as urlActions from 'actions/url-actions';

const actions = {...urlActions }

const FeatureHighlightLayerContainer = (props) => {
const { view, changeGlobe, countryISO, featureLayerSlug, onClickCallback } = props;


  const [selectedCountryBorderGraphic, setSelectedCountryGraphic] = useState(null);
  const [hoveredCountryBorderGraphic, setHoveredCountryGraphic] = useState(null);
  const [graphicsLayer, setGraphicsLayer] = useState(null);

  //Create the graphics layer on mount
  useEffect(() => {
    if (!graphicsLayer) {
      loadModules(["esri/Graphic","esri/layers/GraphicsLayer"]).then(([Graphic, GraphicsLayer]) => {
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
  }, [featureLayerSlug])

  const onClickHandler = features => {
    flyToGeometry(view, features);
    toggleCountryTooltip(features, changeGlobe, countryISO);
    drawGeometry(features, selectedCountryBorderGraphic);
  }

  const onHoverHandler = features => {
    setCursor(features);
    drawGeometry(features, hoveredCountryBorderGraphic);
  }

const onLabelEvent = (event) => {
  event.stopPropagation();
  view.hitTest(event).then( viewPoint => {
    const features = hitResults(viewPoint, featureLayerSlug);
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
  }, [featureLayerSlug, selectedCountryBorderGraphic])

  useEffect(() => {
    let eventHandler;
    if (hoveredCountryBorderGraphic) {
      eventHandler = view.on("pointer-move",
        debounce(onLabelEvent, 35, {leading: true, trailing: true})
      );
    }
    return function cleanUp() {
      eventHandler && eventHandler.remove();
    }
  }, [featureLayerSlug, hoveredCountryBorderGraphic])


  return null;
}

export default connect(null, actions)(FeatureHighlightLayerContainer);