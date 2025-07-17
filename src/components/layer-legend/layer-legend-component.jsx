import React, { useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';

import ToggleOpacityContainer from 'components/toggle-opacity';

import ArrowIcon from 'icons/arrow_right.svg?react';

import styles from './layer-legend-styles.module.scss';

function LayerLegendComponent(props) {
  const { dataLayers } = props;
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

  return (
    <div
      className={cx(styles.container, {
        [styles.collapse]: collapse,
      })}
    >
      <div className={styles.titleWrapper}>
        <span className={styles.title}>{t('Data Layers')}</span>
        <button
          type="button"
          onClick={() => setCollapse(!collapse)}
          aria-label="Collapse legend"
        >
          <ArrowIcon
            className={cx(styles.arrowIcon, {
              [styles.isOpened]: collapse,
            })}
          />
        </button>
      </div>
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
                  <span>On/off</span>
                </div>
                <img src="https://placehold.co/360x7" alt="" />
                <div className={styles.details}>
                  <span>View details</span>
                  <p>{layer.details}</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default LayerLegendComponent;
