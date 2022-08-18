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

import mapStateToProps from './data-scene-selectors';

import {
  HALF_EARTH_FUTURE_TILE_LAYER,
  SPECIFIC_REGIONS_TILE_LAYER,
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
} from 'constants/layers-slugs';
import { createHashFromGeometry } from 'utils/analyze-areas-utils';
import { setMapTooltipData } from 'utils/map-tooltip-service';

const actions = { ...mapTooltipActions, ...urlActions, ...aoiAnalyticsActions };

const Container = (props) => {

  const { activeLayers, setBatchTooltipData, browsePage, mapTooltipContent, precomputedAoiAnalytics, areaTypeSelected} = props;
  const [selectedAnalysisLayer, setSelectedAnalysisLayer] = useState();
  const [landVertebrateSpeciesNum, setLandVertebrateSpeciesNum]= useState();
  const [protectedAreaTooltipData, setProtectedAreaTooltipData]= useState();
  const [batchTooltipData, updateBatchTooltipData]= useState();

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

      updateBatchTooltipData({
        isVisible: true,
        geometry,
        content: {
          buttonText: t('analyze area'),
          id: customId || attributes[id],
          title: customTitle || attributes[title],
          subtitle: attributes[subtitle],
          objectId: attributes.OBJECTID,
        }
      })

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
          isSubnational: !!attributes.GID_1,
        }
      });
    }
  }

  const handleTooltipActionButtonClick = () => {
    const { isSubnational, title } = mapTooltipContent;
    precomputedAoiAnalytics(title);

    const isAdminNational = areaTypeSelected === 'national_boundaries' && !isSubnational;
    const isAdminSubnational = areaTypeSelected === 'national_boundaries' && isSubnational;

    const precalculatedLayer = isAdminNational  ? GADM_0_ADMIN_AREAS_FEATURE_LAYER : isAdminSubnational ? GADM_1_ADMIN_AREAS_FEATURE_LAYER   : selectedAnalysisLayer.slug;
    browsePage({ type: AREA_OF_INTEREST, payload: { id: mapTooltipContent.id }, query: { precalculatedLayer, OBJECTID: mapTooltipContent.objectId } });
  }

  useEffect(() => {
    const activeOption = getSelectedAnalysisLayer(activeLayers);
    setSelectedAnalysisLayer(activeOption);
    // Don't remove locale. Is here to recalculate the titles translation
  }, [activeLayers, locale]);


  useEffect(() => {
    if(protectedAreaTooltipData && landVertebrateSpeciesNum) {
      const { description, designation_type, IUCN_type, status, status_year } = protectedAreaTooltipData;

      setBatchTooltipData({
          ...batchTooltipData,
          content: {
            ...mapTooltipContent,
            description,
            designation_type,
            IUCN_type,
            status,
            status_year,
            species: landVertebrateSpeciesNum,
          }
        })
    }
  },[landVertebrateSpeciesNum, protectedAreaTooltipData]);

  return (
    <Component
      selectedAnalysisLayer={selectedAnalysisLayer}
      handleTooltipActionButtonClick={handleTooltipActionButtonClick}
      handleHighlightLayerFeatureClick={handleHighlightLayerFeatureClick}
      areaTypeSelected={areaTypeSelected}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(Container);
