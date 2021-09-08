import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import urlActions from 'actions/url-actions';
import Component from './component.jsx';
import { getEcoregionsSearchSource, getAdminsSearchSource, getProtectedAreasSearchSource } from 'utils/analyze-areas-utils';
import { ECOREGIONS, ADMIN_AREAS, PROTECTED_AREAS, DEFAULT_SOURCE } from 'constants/analyze-areas-constants';
import { useSketchWidget} from 'hooks/esri';
import { AREA_OF_INTEREST } from 'router'

const actions = { ...urlActions };

const AnalyzeAreasContainer = (props) => {
  const { browsePage, view } = props;
  const [selectedSource, setSelectedSource] = useState(DEFAULT_SOURCE)
  const [searchWidgetConfig, setSearchWidgetConfig] = useState({})
  
  const postDrawCallback = (graphic) => {
    console.log(graphic);
    browsePage({type: AREA_OF_INTEREST, query: { aoi_geometry: graphic.geometry }});
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
      case ADMIN_AREAS:
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
      case ADMIN_AREAS:
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
      isSketchToolActive={sketchTool}
      searchWidgetConfig={searchWidgetConfig}
      handleDrawClick={handleDrawClick}
      {...props}
    />
  );
}

export default connect(null, actions)(AnalyzeAreasContainer);
