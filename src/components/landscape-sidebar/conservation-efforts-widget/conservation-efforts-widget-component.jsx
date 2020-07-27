import React from 'react';
import PieChart from 'components/charts/pie-chart';
import CheckboxGroup from 'components/checkbox-group';
import DummyBlurWorkaround from 'components/dummy-blur-workaround';

import { 
  COMMUNITY_BASED,
  PROTECTED
} from './conservation-efforts-widget-selectors';
import styles from './conservation-efforts-widget-styles.module.scss';

const ConservationEffortsDescription = ({ allProp, rawData }) => {
  return (
    <p className={styles.description}>
      Of the current landscape, <span className={styles.boldFont}>{allProp}% is under protection.</span>
      {rawData[COMMUNITY_BASED] > rawData[PROTECTED] ? 'The majority of the protected areas are community managed.' : ''}
    </p>
  )
};

const ConservationEffortsWidget = ({
  dataFormatted,
  chartData,
  rawData,
  allProp,
  alreadyChecked,
  protectedLayers,
  toggleLayer,
  loading
}) => {
  const noData = !loading && !rawData;

  return (
    <>
      <div className={styles.container} style={{ minHeight: noData ? 'auto' : '430px' }}>
        <DummyBlurWorkaround />
        <div className={styles.padding}>
          <h3 className={styles.title}>Conservation Efforts</h3>
          {noData && <p className={styles.description}>No conservation efforts data for this area.</p>}
          {!loading && rawData && (
            <>
              <ConservationEffortsDescription allProp={allProp} rawData={rawData} />
              <PieChart
                id="conservation-widget"
                width={150}
                height={150}
                data={chartData}
                className={styles.pieChart}
              />
            </>
          )}
        </div>
        {!loading && rawData && (
          <>
            <CheckboxGroup
              handleClick={toggleLayer}
              checkedOptions={alreadyChecked}
              options={protectedLayers}
              theme={styles}
            />
            <p className={styles.notUnderConservationLabel}>
              Not under conservation {dataFormatted.notUnderConservation}%
            </p>
          </>
        )}
      </div>
    </>
  )
}

export default ConservationEffortsWidget;