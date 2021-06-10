import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
// CONSTANTS
import { GRID_CELL_STYLES } from 'constants/graphic-styles';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER as bordersLayerTitle, GRAPHIC_LAYER } from 'constants/layers-slugs';
// UTILS
import { createGraphic, createGraphicLayer } from 'utils/graphic-layer-utils';
import { hitResults, setCursor, drawGeometry, flyToGeometry, toggleCountryTooltip, dispatchClickedCountryAnalyticsEvent } from 'utils/globe-events-utils';
// ACTIONS
import * as urlActions from 'actions/url-actions';

const actions = {...urlActions }

const CountriesBordersLayerContainer = (props) => {
const { view, changeGlobe, countryISO, isLandscapeMode } = props;


  const [selectedCountryBorderGraphic, setSelectedCountryGraphic] = useState(null);
  const [hoveredCountryBorderGraphic, setHoveredCountryGraphic] = useState(null);

  //Create the graphics layer on mount
  useEffect(() => {
    loadModules(["esri/Graphic","esri/layers/GraphicsLayer"]).then(([Graphic, GraphicsLayer]) => {
        const _selectedCountryBorderGraphic = createGraphic(Graphic, GRID_CELL_STYLES);
        const _hoveredCountryBorderGraphic = createGraphic(Graphic, GRID_CELL_STYLES);
        const graphicsLayer = createGraphicLayer(GraphicsLayer, [_selectedCountryBorderGraphic, _hoveredCountryBorderGraphic], GRAPHIC_LAYER);
        setSelectedCountryGraphic(_selectedCountryBorderGraphic);
        setHoveredCountryGraphic(_hoveredCountryBorderGraphic);
        view.map.add(graphicsLayer);
      })
  }, [])

  useEffect(() => {
    if (selectedCountryBorderGraphic) {
      if (!countryISO) {selectedCountryBorderGraphic.geometry = null}
    }
  }, [countryISO, selectedCountryBorderGraphic])

  const onClickHandler = bordersLayerFeatures => {
    flyToGeometry(view, bordersLayerFeatures);
    toggleCountryTooltip(bordersLayerFeatures, changeGlobe, countryISO);
    drawGeometry(bordersLayerFeatures, selectedCountryBorderGraphic);
  }

  const onHoverHandler = bordersLayerFeatures => {
    setCursor(bordersLayerFeatures);
    drawGeometry(bordersLayerFeatures, hoveredCountryBorderGraphic);
  }

const onLabelEvent = (event) => {
  event.stopPropagation();
  view.hitTest(event).then( viewPoint => {
    const bordersLayerFeatures = hitResults(viewPoint, bordersLayerTitle);
    switch (event.type) {
      case 'pointer-move':
        onHoverHandler(bordersLayerFeatures);
        break;
      case 'click':
        onClickHandler(bordersLayerFeatures);
        break;
      default: return;
    }
  })
}

  useEffect(() => {
    let eventHandler;
    if (selectedCountryBorderGraphic && !isLandscapeMode) {
      eventHandler = view.on("click", onLabelEvent);
    }
    return function cleanUp() {
      eventHandler && eventHandler.remove();
    }
  }, [countryISO, selectedCountryBorderGraphic, isLandscapeMode])

  useEffect(() => {
    let eventHandler;
    if (hoveredCountryBorderGraphic && !isLandscapeMode) {
      eventHandler = view.on("pointer-move",
        debounce(onLabelEvent, 35, {leading: true, trailing: true})
      );
    }
    return function cleanUp() {
      eventHandler && eventHandler.remove();
    }
  }, [hoveredCountryBorderGraphic, isLandscapeMode])


  return null;
}

export default connect(null, actions)(CountriesBordersLayerContainer);