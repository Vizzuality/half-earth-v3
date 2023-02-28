/* eslint-disable no-underscore-dangle */
import { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';

import { loadModules } from 'esri-loader';

import * as urlActions from 'actions/url-actions';

import {
  hitResults,
  setCursor,
  drawGeometry,
  flyToLayerGeometry,
  toggleCountryTooltip,
} from 'utils/globe-events-utils';
import { createGraphic, createGraphicLayer } from 'utils/graphic-layer-utils';

import debounce from 'lodash/debounce';

// CONSTANTS
import { GRID_CELL_STYLES } from 'constants/graphic-styles';
import {
  EEZ_MARINE_AND_LAND_BORDERS,
  GRAPHIC_LAYER,
  GLOBAL_SPI_FEATURE_LAYER,
} from 'constants/layers-slugs';

// UTILS

// ACTIONS

const actions = { ...urlActions };

function CountriesBordersLayerContainer(props) {
  const { view, changeGlobe, countryISO, displayMarineOutline } = props;
  const bordersLayerTitle = useMemo(
    () =>
      displayMarineOutline
        ? EEZ_MARINE_AND_LAND_BORDERS
        : GLOBAL_SPI_FEATURE_LAYER,
    [displayMarineOutline]
  );
  const [selectedCountryBorderGraphic, setSelectedCountryGraphic] =
    useState(null);
  const [hoveredCountryBorderGraphic, setHoveredCountryGraphic] =
    useState(null);

  // Create the graphics layer on mount
  useEffect(() => {
    loadModules(['esri/Graphic', 'esri/layers/GraphicsLayer']).then(
      ([Graphic, GraphicsLayer]) => {
        const _selectedCountryBorderGraphic = createGraphic(
          Graphic,
          GRID_CELL_STYLES
        );
        const _hoveredCountryBorderGraphic = createGraphic(
          Graphic,
          GRID_CELL_STYLES
        );
        const graphicsLayer = createGraphicLayer(
          GraphicsLayer,
          [_selectedCountryBorderGraphic, _hoveredCountryBorderGraphic],
          GRAPHIC_LAYER
        );
        setSelectedCountryGraphic(_selectedCountryBorderGraphic);
        setHoveredCountryGraphic(_hoveredCountryBorderGraphic);
        view.map.add(graphicsLayer);
      }
    );
  }, [bordersLayerTitle]);

  useEffect(() => {
    if (selectedCountryBorderGraphic) {
      if (!countryISO) {
        selectedCountryBorderGraphic.geometry = null;
      }
    }
  }, [countryISO, selectedCountryBorderGraphic]);

  const onClickHandler = (bordersLayerFeatures) => {
    flyToLayerGeometry(view, bordersLayerFeatures);
    toggleCountryTooltip({
      layerFeatures: bordersLayerFeatures,
      changeGlobe,
      countryISO,
    });
    drawGeometry(bordersLayerFeatures, selectedCountryBorderGraphic);
  };

  const onHoverHandler = (bordersLayerFeatures) => {
    setCursor(bordersLayerFeatures);
    drawGeometry(bordersLayerFeatures, hoveredCountryBorderGraphic);
  };

  const onLabelEvent = (event) => {
    event.stopPropagation();
    view.hitTest(event).then((viewPoint) => {
      const bordersLayerFeatures = hitResults(viewPoint, bordersLayerTitle);
      switch (event.type) {
        case 'pointer-move':
          onHoverHandler(bordersLayerFeatures);
          break;
        case 'click':
          onClickHandler(bordersLayerFeatures);
          break;
        default:
      }
    });
  };

  useEffect(() => {
    let eventHandler;
    if (selectedCountryBorderGraphic) {
      eventHandler = view.on('click', onLabelEvent);
    }
    return function cleanUp() {
      if (eventHandler) {
        eventHandler.remove();
      }
    };
  }, [countryISO, selectedCountryBorderGraphic]);

  useEffect(() => {
    let eventHandler;
    if (hoveredCountryBorderGraphic) {
      eventHandler = view.on(
        'pointer-move',
        debounce(onLabelEvent, 35, { leading: true, trailing: true })
      );
    }
    return function cleanUp() {
      if (eventHandler) {
        eventHandler.remove();
      }
    };
  }, [hoveredCountryBorderGraphic]);

  return null;
}

export default connect(null, actions)(CountriesBordersLayerContainer);
