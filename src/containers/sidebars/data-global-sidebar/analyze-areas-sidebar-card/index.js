import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Component from './component.jsx';
import { getEcoregionsSearchSource, getAdminsSearchSource, getProtectedAreasSearchSource } from 'utils/analyze-areas-utils';
import { ECOREGIONS, POLITICAL_BOUNDARIES, PROTECTED_AREAS, DEFAULT_SOURCE, PRECALCULATED_AOI_OPTIONS } from 'constants/analyze-areas-constants';
import { getSelectedAnalysisLayer, createHashFromGraphic } from 'utils/analyze-areas-utils';
import { batchToggleLayers } from 'utils/layer-manager-utils';
import { useSketchWidget} from 'hooks/esri';
// ACTIONS
import { AREA_OF_INTEREST } from 'router';
import urlActions from 'actions/url-actions';
import mapTooltipActions from 'redux_modules/map-tooltip';

const actions = { ...urlActions, ...mapTooltipActions };

const AnalyzeAreasContainer = (props) => {
  const { browsePage, view, activeLayers, changeGlobe, setTooltipIsVisible } = props;
  const [selectedOption, setSelectedOption] = useState(PRECALCULATED_AOI_OPTIONS[0]);
  const [selectedSource, setSelectedSource] = useState(DEFAULT_SOURCE)
  const [searchWidgetConfig, setSearchWidgetConfig] = useState({});

  useEffect(() => {
    const activeOption = getSelectedAnalysisLayer(activeLayers);
    setSelectedOption(activeOption);
  }, [])

  const handleOptionSelection = (option) => {
    handleLayerToggle(option);
    setSelectedOption(option);
    setTooltipIsVisible(false);
  }

  const handleLayerToggle = (option) => {
    batchToggleLayers([selectedOption.slug, option.slug], activeLayers, changeGlobe)
  }
  
  const postDrawCallback = (graphic) => {
    const aoi_hash = createHashFromGraphic(graphic);
    browsePage({type: AREA_OF_INTEREST, payload: { id: aoi_hash }, query: { aoi_geometry: graphic.geometry }});
  }

  const {
    handleSketchToolActivation,
    handleSketchToolDestroy,
    sketchTool
  } = useSketchWidget(view, { postDrawCallback });

  const handleDrawClick = () => {
    if (!sketchTool) {
      handleSketchToolActivation()
    } else {
      handleSketchToolDestroy()
    }
  }


  const postSearchCallback = () => {
    switch (selectedSource) {
      case ECOREGIONS:
        return function({result}) {
          const { feature: { attributes: { ECO_ID }}} = result;
          browsePage({type: AREA_OF_INTEREST, query: { eco_id: ECO_ID }});
        }
      case PROTECTED_AREAS:
        return function({result}) {
          const { feature: { attributes: { WDPAID }}} = result;
          browsePage({type: AREA_OF_INTEREST, query: { wdpa_id: WDPAID }});
        }
      case POLITICAL_BOUNDARIES:
        return function({result}) {
          const { feature: { attributes: { ISO_CODE }}} = result;
          browsePage({type: AREA_OF_INTEREST, query: { wdpa_id: ISO_CODE }});
        }
      default:
        return function({result}) {
          const { feature: { attributes: { ISO_CODE }}} = result;
          browsePage({type: AREA_OF_INTEREST, query: { iso_code: ISO_CODE }});
        }
    }
  }

  const searchSources = (FeatureLayer) => {
    switch (selectedSource) {
      case ECOREGIONS:
        return function() {
          getEcoregionsSearchSource(FeatureLayer);
        }
      case PROTECTED_AREAS:
        return function() {
          getProtectedAreasSearchSource(FeatureLayer);
        }
      case POLITICAL_BOUNDARIES:
        return function() {
          getAdminsSearchSource(FeatureLayer);
        }
      default:
        return function() {
          getAdminsSearchSource(FeatureLayer);
        }
    }
  }

  useEffect(() => {
    setSearchWidgetConfig({
      postSearchCallback: postSearchCallback(),
      searchSources: searchSources()
    })
  }, [selectedSource])


  return (
    <Component
      selectedOption={selectedOption}
      isSketchToolActive={sketchTool}
      handleDrawClick={handleDrawClick}
      searchWidgetConfig={searchWidgetConfig}
      handleOptionSelection={handleOptionSelection}
      {...props}
    />
  );
}

export default connect(null, actions)(AnalyzeAreasContainer);
