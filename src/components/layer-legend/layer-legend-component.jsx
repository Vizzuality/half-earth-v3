import React, { useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import Switch from '@mui/material/Switch';
import cx from 'classnames';

import ToggleOpacityContainer from 'components/toggle-opacity';

import ArrowIcon from 'icons/arrow_right.svg?react';

import styles from './layer-legend-styles.module.scss';

function LayerLegendComponent(props) {
  const { dataLayers, setDataLayers } = props;
  // const [leftPosition, setLeftPosition] = useState(0);
  const [collapse, setCollapse] = useState(false);
  const t = useT();

  // useEffect(() => {
  //   const sidebar = document.getElementById('dashboard-sidebar');

  //   const rect = sidebar.getBoundingClientRect();
  //   const style = window.getComputedStyle(sidebar);
  //   const left = style.getPropertyValue('left');

  //   setLeftPosition(`${rect.width + parseInt(left, 10) + 10}px`);
  // }, [dataLayers]);

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
          Object.values(dataLayers).map((layer, index) => (
            <li key={`${layer.id}-${layer.label}`}>
              <div className={styles.dataLayer}>
                <div className={styles.layer}>
                  <div className={styles.title}>
                    <span className={styles.label}>{layer.label}</span>
                    <ArrowIcon className={styles.arrowIcon} />
                  </div>
                  <Switch />
                </div>
                <img src="https://placehold.co/360x7" alt="" />
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
                        [styles.isOpened]: layer.showDetails,
                      })}
                    />
                  </button>
                  {layer.showDetails && <p>{layer.details}</p>}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default LayerLegendComponent;
