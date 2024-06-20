import React from 'react';
import Select from 'react-select';

import ArcChart from 'components/charts/arc-chart';

import COLORS from 'styles/settings';

import styles from './temporal-trends-chart-styles.module.scss';

function TemporalTrendsChartComponent() {
  const areaChartHeight = 100;
  const areaChartWidth = 220;
  const spi = 48.55;

  const provinces = [
    { value: 'Mai-Ndombe', label: 'Mai-Ndombe' },
    { value: 'Équateur', label: 'Équateur' },
    { value: 'Kasaï', label: 'Kasaï' },
    { value: 'Sankuru', label: 'Sankuru' },
  ];

  return (
    <div className={styles.info}>
      <div className={styles.specs}>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={provinces[0]}
          isClearable
          isSearchable
          name="provinces"
          options={provinces}
        />
        <span>
          <b>#13</b> in Species Protection Index
        </span>
        <span>
          <b>#1</b> in vertebrate species richness
        </span>
        <span>
          <b>#16</b> in size
        </span>
      </div>
      <div className={styles.arcChart}>
        <div className={styles.stats}>
          <b>2024</b>
          <span>Year</span>
        </div>
        <div
          style={{
            height: areaChartHeight,
            width: areaChartWidth,
          }}
        >
          <ArcChart
            color={COLORS.primary}
            parentHeight={areaChartHeight}
            parentWidth={areaChartWidth}
            value={spi}
          />
        </div>
        <div className={styles.stats}>
          <b>19.58</b>
          <span>Area Protected</span>
        </div>
      </div>
    </div>
  );
}

export default TemporalTrendsChartComponent;
