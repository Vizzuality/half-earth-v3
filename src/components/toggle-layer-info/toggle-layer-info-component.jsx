import React from 'react';

import { useT } from '@transifex/react';

import { LAYER_OPTIONS } from 'constants/dashboard-constants.js';
import { DASHBOARD_URLS } from 'constants/layers-urls';

import InfoIcon from 'icons/info.svg?react';

function ToggleLayerInfoComponent(props) {
  const { layer, setLayerInfo } = props;
  const t = useT();
  const parentLayers = [
    LAYER_OPTIONS.EXPERT_RANGE_MAPS,
    LAYER_OPTIONS.POINT_OBSERVATIONS,
    LAYER_OPTIONS.HABITAT,
  ];

  // display info for each layer
  const displayInfo = async (item) => {
    let parent = false;
    let url = `${DASHBOARD_URLS.DATASET_LAYER_INFO}${item.dataset_id}`;

    if (parentLayers.includes(item.id)) {
      url = `${DASHBOARD_URLS.DATASET_LAYER_GROUP_INFO}`;
    }

    if (item.id === LAYER_OPTIONS.EXPERT_RANGE_MAPS) {
      url += `?id=range`;
      parent = true;
    } else if (item.id === LAYER_OPTIONS.POINT_OBSERVATIONS) {
      url += `?id=points`;
      parent = true;
    } else if (item.id === LAYER_OPTIONS.HABITAT) {
      url += `?id=points`;
      parent = true;
    }
    // DATASET_LAYER_GROUP_INFO
    const response = await fetch(url);
    const data = await response.json();
    if (parent) {
      setLayerInfo({ info: data, title: item.label });
    } else {
      setLayerInfo({ info: data.metadata, title: item.label });
    }
  };
  return (
    <button
      type="button"
      onClick={() => displayInfo(layer)}
      aria-label="Toggle info visibility"
      title={t('Info and metadata')}
    >
      <InfoIcon />
    </button>
  );
}

export default ToggleLayerInfoComponent;
