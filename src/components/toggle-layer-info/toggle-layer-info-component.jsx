import React from 'react';

import { useT, T } from '@transifex/react';

import { LAYER_OPTIONS } from 'constants/dashboard-constants.js';
import { DASHBOARD_URLS } from 'constants/layers-urls';

import InfoIcon from 'icons/dashboard/info_icon.svg?react';

import styles from './toggle-layer-info-component-styles.module.scss';

function ToggleLayerInfoComponent(props) {
  const { layer, setLayerInfo } = props;
  const t = useT();
  const parentLayers = [
    LAYER_OPTIONS.EXPERT_RANGE_MAPS,
    LAYER_OPTIONS.POINT_OBSERVATIONS,
  ];

  const customLayers = [
    LAYER_OPTIONS.HABITAT,
    LAYER_OPTIONS.PROTECTED_AREAS,
    LAYER_OPTIONS.ADMINISTRATIVE_LAYERS,
  ];

  // display info for each layer
  const displayInfo = async (item) => {
    let parent = false;
    let url = `${DASHBOARD_URLS.DATASET_LAYER_INFO}${item.dataset_id}`;

    if (customLayers.includes(item.id)) {
      let data;
      if (item.id === LAYER_OPTIONS.HABITAT) {
        data = [
          {
            label: 'Description',
            value:
              'The habitat loss/gain map is developed from the species expert range map, species habitat preference data, and annually-updated environmental and land cover data. These maps use the year 2001 as a baseline to determine a species total suitable habitat area, where suitable habitat is based on the application of habitat preferences and environmental/land cover data to the expert range map, and track what areas of the range have been lost or regained since 2001.',
          },
        ];
      } else if (item.id === LAYER_OPTIONS.PROTECTED_AREAS) {
        data = [
          {
            label: 'Description',
            id: item.id,
            value: (
              <T
                _str="From the World Database of Protected Areas ({link})."
                link={
                  <a
                    href="http://protectedplant.net"
                    target="_blank"
                    rel="noreferrer"
                  >
                    protectedplant.net
                  </a>
                }
              />
            ),
          },
        ];
      } else if (item.id === LAYER_OPTIONS.ADMINISTRATIVE_LAYERS) {
        data = [
          {
            label: 'Description',
            id: item.id,
            value: (
              <T
                _str="From the Database of Global Administrative Areas ({link})."
                link={
                  <a href="http://gadm.org" target="_blank" rel="noreferrer">
                    gadm.org
                  </a>
                }
              />
            ),
          },
        ];
      }

      setLayerInfo({ info: data, title: item.label });
    } else if (layer.type !== 'PRIVATE') {
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
    } else if (item.id === LAYER_OPTIONS.POINT_OBSERVATIONS) {
      const data = [
        {
          label: 'Data type',
          id: item.id,
          value: 'Point Observations',
        },
        {
          label: 'Description',
          id: item.id,
          value:
            'Recorded observations of species collected by ranger or scientific teams. These data are those collected and uploaded by ICCN or its associates into the ICCN ArcGIS Online account. Note that each point may carry a large spatial uncertainty.',
        },
      ];

      setLayerInfo({ info: data, title: item.label });
    }
  };
  return (
    <button
      type="button"
      className={styles.info}
      onClick={() => displayInfo(layer)}
      aria-label="Toggle info visibility"
      title={t('Info and metadata')}
    >
      <InfoIcon />
    </button>
  );
}

export default ToggleLayerInfoComponent;
