import React from 'react';

import { useLocale, useT } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import styles from './area-chart-tooltip-styles.module.scss';

function AreaChartTooltip({ active, payload }) {
  const t = useT();
  const locale = useLocale();
  const SPI = payload[0];
  const protectedAreas = payload[1];

  if (active && payload && payload.length) {
    return (
      <div className={styles.container}>
        <div className={styles.SPIcontainer}>
          <p>
            {t('SPI')}:{' '}
            {getLocaleNumber(
              Math.round(SPI.value[0] + SPI.value[1]) / 2,
              locale
            )}
          </p>
        </div>
        <div className={styles.protectedAreasContainer}>
          <p>
            {t('Protected areas')}:{' '}
            {Math.round(protectedAreas.value[0] + protectedAreas.value[1]) / 2}%
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default AreaChartTooltip;
