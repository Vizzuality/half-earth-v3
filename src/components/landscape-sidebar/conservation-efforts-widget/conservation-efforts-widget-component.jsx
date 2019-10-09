import React from 'react';
import PieChart from 'components/pie-chart';
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
      Of the current landscape, <span className={styles.boldFont}>{allProp.toFixed(2)}% is under protection.</span>
      {rawData[COMMUNITY_BASED] > rawData[PROTECTED] ? 'The majority of the protected areas are community managed.' : ''}
    </p>
  )
};

const ConservationEffortsWidget = ({
  dataFormatted,
  colors,
  rawData,
  allProp,
  alreadyChecked,
  protectedLayers,
  activeSlices,
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
          {noData &&  <p className={styles.description}>No conservation efforts data for this area.</p>}
          {!loading && rawData && (
            <>
              <ConservationEffortsDescription allProp={allProp} rawData={rawData} />
              <PieChart
                data={rawData}
                activeSlices={activeSlices}
                colors={colors}
                alreadyChecked={alreadyChecked}
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