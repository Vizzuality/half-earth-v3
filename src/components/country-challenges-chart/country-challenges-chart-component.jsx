import React from 'react';
import cx from 'classnames';
import ScatterPlot from 'components/charts/scatter-plot';
import { INDICATOR_LABELS } from 'constants/country-mode-constants';
import styles from './country-challenges-chart-styles.module.scss';

import { LOCAL_SCENE_TABS } from 'constants/ui-params';

const CountryChallengesChartComponent = ({
  data,
  countryISO,
  localSceneActiveTab,
  countryChallengesSelectedKey
}) => (
  <div className={cx(
    styles.container,
    { [styles.containerChallenges]: localSceneActiveTab === LOCAL_SCENE_TABS.CHALLENGES }
    )
  }>
    <ScatterPlot
      data={data}
      countryISO={countryISO}
      xAxisLabels={INDICATOR_LABELS}
      countryChallengesSelectedKey={countryChallengesSelectedKey}
    />
  </div>
  )

export default CountryChallengesChartComponent;