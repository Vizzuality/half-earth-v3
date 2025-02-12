import React from 'react';

import { useT } from '@transifex/react';

import ChartInfoPopupComponent from 'components/chart-info-popup/chart-info-popup-component';

import InfoIcon from 'icons/dashboard/info_icon.svg?react';

import styles from './chart-info-popup-component-styles.module.scss';

function ChartInfoComponent(props) {
  const t = useT();
  const { children, setImagePopup, chartInfo } = props;

  const displayInfo = () => {
    const alt = chartInfo.imgAlt;
    const desc = chartInfo.description;
    const popUpInfo = (
      <ChartInfoPopupComponent
        title={chartInfo.title}
        description={desc}
        imgSrc={chartInfo.image}
        imgAlt={alt}
      />
    );

    setImagePopup(popUpInfo);
  };
  return (
    <div className={styles.chartWrapper}>
      {children}
      <button
        type="button"
        className={styles.info}
        aria-label={t('How to interpret this graph')}
        onClick={displayInfo}
      >
        <InfoIcon />
      </button>
    </div>
  );
}

export default ChartInfoComponent;
