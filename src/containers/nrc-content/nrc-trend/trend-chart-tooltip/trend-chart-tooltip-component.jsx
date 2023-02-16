import React from 'react';

import { useT } from '@transifex/react';

import { roundSPI } from 'utils/data-formatting-utils';

import styles from './trend-chart-tooltip-styles.module.scss';

function TrendChartTooltip({ active, payload }) {
  const t = useT();

  const SPI = payload && payload[0];
  const protectedAreas = payload && payload[1];

  if (active && payload && payload.length) {
    return (
      <div className={styles.container}>
        <div className={styles.SPIcontainer}>
          <p>
            {t('SPI')}: {roundSPI(SPI.value)}
          </p>
        </div>
        <div className={styles.protectedAreasContainer}>
          <p>
            {t('Protected areas')}: {Math.round(protectedAreas.value)}%
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default TrendChartTooltip;
