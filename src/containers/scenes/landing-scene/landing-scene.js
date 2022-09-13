import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapTooltipActions from 'redux_modules/map-tooltip';

import { AREA_OF_INTEREST } from 'router';

import { useLocale, useT } from '@transifex/react';

import mapStateToProps from 'selectors/map-tooltip-selectors';

import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import urlActions from 'actions/url-actions';

import { getSelectedAnalysisLayer } from 'utils/analyze-areas-utils';
import { getTooltipContent } from 'utils/tooltip-utils';

import MAP_TOOLTIP_CONFIG from 'constants/map-tooltip-constants';

import Component from './landing-scene-component';
// ACTIONS

const actions = { ...mapTooltipActions, ...urlActions, ...aoiAnalyticsActions };

function Container(props) {
  const locale = useLocale();
  const t = useT();

  const {
    activeLayers, setBatchTooltipData, browsePage, mapTooltipContent, precomputedAoiAnalytics,
  } = props;
  const [selectedAnalysisLayer, setSelectedAnalysisLayer] = useState();

  const handleHighlightLayerFeatureClick = (features) => {
    if (features && features.length && selectedAnalysisLayer) {
      const tooltipConfig = MAP_TOOLTIP_CONFIG[selectedAnalysisLayer.slug];
      const { title, subtitle, id } = tooltipConfig;
      const { geometry, attributes } = features[0].graphic;
      setBatchTooltipData({
        isVisible: true,
        geometry,
        content: getTooltipContent(t, attributes, id, title, subtitle),
      });
    }
  };

  const handleTooltipActionButtonClick = () => {
    precomputedAoiAnalytics(mapTooltipContent.title);
    browsePage({
      type: AREA_OF_INTEREST,
      payload: { id: mapTooltipContent.id },
      query: { precalculatedLayer: selectedAnalysisLayer.slug }
    });
  };

  useEffect(() => {
    const activeOption = getSelectedAnalysisLayer(activeLayers);
    setSelectedAnalysisLayer(activeOption);
    // Don't remove locale. Is here to recalculate the titles translation
  }, [activeLayers, locale]);

  return (
    <Component
      selectedAnalysisLayer={selectedAnalysisLayer}
      handleTooltipActionButtonClick={handleTooltipActionButtonClick}
      handleHighlightLayerFeatureClick={handleHighlightLayerFeatureClick}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(Container);
