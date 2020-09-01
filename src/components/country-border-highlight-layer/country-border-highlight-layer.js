import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER, GRAPHIC_LAYER } from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';
import { GRID_CELL_STYLES } from 'constants/graphic-styles';
import { connect } from 'react-redux';
import actions from 'redux_modules/countries-geometries';
import mapStateToProps from './country-border-highlight-layer-selectors';

import {
  createGraphic,
  createGraphicLayer,
  createPolygonGeometry
} from 'utils/graphic-layer-utils';


const CountryBorderLayer = props => {
  const { view, spatialReference, countryTooltip, countryBorder, setCountryBorderReady, highlightedCountryBorder, highlightedCountryIso } = props;
  const [countryLayer, setCountryLayer] = useState(null);
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

  const queryCountryData = (countryTooltip, graphic) => {
    const query = countryLayer.createQuery();
    query.where = `GID_0 = '${countryTooltip}'`;
    query.outSpatialReference = spatialReference;
    countryLayer.queryFeatures(query)
      .then(async function(results){
        const { features } = results;
        const { geometry } = features[0];
        if (graphic) {
          const polygon = await createPolygonGeometry(geometry);
          graphic.geometry = polygon;
          setCountryBorderReady({ iso: countryTooltip, borderGraphic: polygon, borderGeometry: geometry });
        };
      })
  };

  useEffect(() => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const _countryLayer = new FeatureLayer({
        url: LAYERS_URLS[COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER]
      });
      setCountryLayer(_countryLayer)
    });
  }, []);

  useEffect(() => {
    if (countryLayer && countryTooltip && selectedCountryBorderGraphic) {
      if (countryBorder) {
        selectedCountryBorderGraphic.geometry = countryBorder;
      } else {
        queryCountryData(countryTooltip, selectedCountryBorderGraphic);
      }
    }
  }, [countryLayer, countryTooltip, selectedCountryBorderGraphic]);

  useEffect(() => {
    if (countryLayer && highlightedCountryIso && hoveredCountryBorderGraphic) {
      if (highlightedCountryBorder) {
        hoveredCountryBorderGraphic.geometry = highlightedCountryBorder;
      } else {
        queryCountryData(highlightedCountryIso, hoveredCountryBorderGraphic);
      }
    }
  }, [countryLayer, highlightedCountryIso, hoveredCountryBorderGraphic])

  useEffect(() => {
    if (selectedCountryBorderGraphic && !countryTooltip) {
      selectedCountryBorderGraphic.geometry = null;
    }
  },[countryTooltip])

  useEffect(() => {
    if (hoveredCountryBorderGraphic && !highlightedCountryIso) {
      hoveredCountryBorderGraphic.geometry = null;
    }
  },[highlightedCountryIso])

  return null
}

export default connect(mapStateToProps, actions)(CountryBorderLayer);