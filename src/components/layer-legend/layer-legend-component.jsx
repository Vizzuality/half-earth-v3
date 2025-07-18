import React, { useState } from 'react';

import { useT } from '@transifex/react';

import { INDIGENOUS_LANDS_FEATURE_ID } from 'utils/dashboard-utils';

import Switch from '@mui/material/Switch';
import cx from 'classnames';

import EsriFeatureService from 'services/esri-feature-service';

import { LAYER_OPTIONS } from 'constants/dashboard-constants.js';

import ArrowIcon from 'icons/arrow_right.svg?react';

import styles from './layer-legend-styles.module.scss';

function LayerLegendComponent(props) {
  const { map, countryISO, setRegionLayers } = props;
  const t = useT();

  // const [leftPosition, setLeftPosition] = useState(0);
  const [collapse, setCollapse] = useState(false);
  const [dataLayers, setDataLayers] = useState([
    {
      id: LAYER_OPTIONS.INDIGENOUS_LANDS,
      label: t('Indigenous Territories'),
      heatMapImage: '',
      details: `Publication date: 2012-12-04 <br/>Responsible party<br/>Organization's name: RAISG - Red Amazónica de Información Socioambiental Georreferenciada<br/>Contact's role: point of contact<br/>Delivery point: <a href="http://raisg.socioambiental.org/contact" target="_blank" rel="noopener noreferrer">http://raisg.socioambiental.org/contact</a>`,
      showDetails: false,
      showLayer: false,
      portalId: INDIGENOUS_LANDS_FEATURE_ID,
    },
  ]);

  const displayLayer = async (layer) => {
    if (!layer.showLayer) {
      const featureLayer = await EsriFeatureService.getFeatureLayer(
        layer.portalId,
        countryISO,
        layer.id
      );

      setRegionLayers((rl) => ({
        ...rl,
        [layer.id]: featureLayer,
      }));
      map.add(featureLayer);
    } else {
      const layerToRemove = map.layers.items.find(
        (mapLayer) => mapLayer.id === layer.id
      );

      setRegionLayers((rl) => {
        const { [layer.id]: name, ...rest } = rl;
        return rest;
      });

      map.remove(layerToRemove);
    }

    setDataLayers((prevLayers) =>
      prevLayers.map((l) =>
        l.id === layer.id ? { ...l, showLayer: !layer.showLayer } : l
      )
    );
  };

  const showDetails = (layer) => {
    setDataLayers((prevLayers) =>
      prevLayers.map((l) =>
        l.id === layer.id ? { ...l, showDetails: !l.showDetails } : l
      )
    );
  };

  return (
    <div
      className={cx(styles.container, {
        [styles.collapse]: collapse,
      })}
    >
      <button
        type="button"
        className={styles.titleWrapper}
        aria-label={collapse ? t('Expand legend') : t('Collapse legend')}
        onClick={() => setCollapse(!collapse)}
      >
        <span className={styles.title}>{t('Data Layers')}</span>
        <ArrowIcon
          className={cx(styles.arrowIcon, {
            [styles.isOpened]: collapse,
          })}
        />
      </button>
      <ul className={styles.layers}>
        {dataLayers &&
          Object.values(dataLayers).map((layer) => (
            <li key={`${layer.id}-${layer.label}`}>
              <div className={styles.dataLayer}>
                <div className={styles.layer}>
                  <div className={styles.title}>
                    <span className={styles.label}>{layer.label}</span>
                    <ArrowIcon className={styles.arrowIcon} />
                  </div>
                  <Switch onChange={() => displayLayer(layer)} />
                </div>
                {layer.heatMapImage && <img src={layer.heatMapImage} alt="" />}
                <div className={styles.details}>
                  <button
                    className={styles.view}
                    type="button"
                    onClick={() => showDetails(layer)}
                    aria-label="Collapse details"
                  >
                    <span>{t('View details')}</span>
                    <ArrowIcon
                      className={cx(styles.arrowIcon, {
                        [styles.isOpened]: !layer.showDetails,
                      })}
                    />
                  </button>
                  {layer.showDetails && (
                    <p dangerouslySetInnerHTML={{ __html: layer.details }} />
                  )}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default LayerLegendComponent;
