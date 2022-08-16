import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocale, useT } from '@transifex/react';
import { getSelectedAnalysisLayer } from 'utils/analyze-areas-utils';
import MAP_TOOLTIP_CONFIG from 'constants/map-tooltip-constants';
import Component from './data-scene-component';
// ACTIONS
import { AREA_OF_INTEREST } from 'router';
import urlActions from 'actions/url-actions';
import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import mapTooltipActions from 'redux_modules/map-tooltip';
import mapStateToProps from 'selectors/map-tooltip-selectors';
import { HALF_EARTH_FUTURE_TILE_LAYER, SPECIFIC_REGIONS_TILE_LAYER } from 'constants/layers-slugs';
import { createHashFromGeometry } from 'utils/analyze-areas-utils';
import { setMapTooltipData } from 'utils/species-service';

const actions = { ...mapTooltipActions, ...urlActions, ...aoiAnalyticsActions };

const Container = (props) => {
  const { activeLayers, setBatchTooltipData, browsePage, mapTooltipContent, precomputedAoiAnalytics } = props;
  const [selectedAnalysisLayer, setSelectedAnalysisLayer] = useState();
  const [landVertebrateSpeciesNum, setLandVertebrateSpeciesNum]= useState();
  const [protectedAreaTooltipData, setProtectedAreaTooltipData]= useState();

  const locale = useLocale();
  const t = useT();


  const handleHighlightLayerFeatureClick = (features) => {

    if (features && features.length && selectedAnalysisLayer) {
      const tooltipConfig = MAP_TOOLTIP_CONFIG[selectedAnalysisLayer.slug];

      const { title, subtitle, id} = tooltipConfig;
      const { geometry, attributes } = features[0].graphic;

      let customId;
      let customTitle;
      if (selectedAnalysisLayer.slug === HALF_EARTH_FUTURE_TILE_LAYER) {
        // Calculate sha-1 id for future places
        customId = createHashFromGeometry(geometry);
        customTitle = `Priority place ${attributes.cluster}`;
      }
      if (selectedAnalysisLayer.slug === SPECIFIC_REGIONS_TILE_LAYER) {
        // Calculate sha-1 id for specific regions
        customId = `region-${attributes.region}`;
      }

      setMapTooltipData({ molId: attributes.MOL_ID, setLandVertebrateSpeciesNum, setProtectedAreaTooltipData});

      console.log({landVertebrateSpeciesNum, protectedAreaTooltipData})

      setBatchTooltipData({
        isVisible: true,
        geometry,
        content: {
          buttonText: t('analyze area'),
          id: customId || attributes[id],
          title: customTitle || attributes[title],
          subtitle: attributes[subtitle],
          objectId: attributes.OBJECTID, // Only for feature places
          percentage_protected: Math.round(attributes.percentage_protected) || 100, // 100 is for protected areaa
        }
      });
    }
  }

  const handleTooltipActionButtonClick = () => {
    precomputedAoiAnalytics(mapTooltipContent.title);
    browsePage({ type: AREA_OF_INTEREST, payload: { id: mapTooltipContent.id }, query: { precalculatedLayer: selectedAnalysisLayer.slug, OBJECTID: mapTooltipContent.objectId } });
  }

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
  )
}

export default connect(mapStateToProps, actions)(Container);
