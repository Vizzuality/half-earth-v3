import React from 'react';
import PieChart from 'components/pie-chart';
import CheckboxGroup from 'components/checkbox-group';
import { 
  COMMUNITY_BASED,
  PROTECTED
} from 'components/landscape-sidebar/conservation-efforts-widget/conservation-efforts-widget-selectors';
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
  toggleLayer
}) => {

  return (
    <>
      {rawData && (
        <div className={styles.container}>
          <div className={styles.fixBlur} />
          <div className={styles.padding}>
            <h3 className={styles.title}>Conservation Efforts</h3>
            {allProp && rawData && <ConservationEffortsDescription allProp={allProp} rawData={rawData} />}
            <PieChart
              data={rawData}
              activeSlices={activeSlices}
              colors={colors}
              alreadyChecked={alreadyChecked}
            />
          </div>
          <CheckboxGroup 
            handleClick={toggleLayer}
            checkedOptions={alreadyChecked}
            options={protectedLayers}
            theme={styles}
          />
          {rawData && (
            <p className={styles.notUnderConservationLabel}>
              Not under conservation {dataFormatted.notUnderConservation}%
            </p>
          )}
        </div>
      )}
    </>
  )
}

export default ConservationEffortsWidget;