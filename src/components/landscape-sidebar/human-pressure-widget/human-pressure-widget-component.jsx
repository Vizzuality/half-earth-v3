import React from 'react';
import CheckboxGroup from 'components/checkbox-group';

import styles from './human-pressure-widget-styles.module.scss';

const BarComponent = ({ selectedPressures, totalPressure }) => {
  return (
    <div className={styles.barContainer}>
      <div className={styles.selectedPressureBar} style={{ width: `${selectedPressures}%`}}>
        <span className={styles.selectedPressureLabel}>{`${selectedPressures}%`}</span>
      </div>
      <div className={styles.nonSelectedPressureBar} style={{ width: `${totalPressure}%`}}></div>
      <div className={styles.pressureFreeBar}></div>
    </div>
  )
}

const PressureStatementComponent = ({ totalPressure, biggestPressureName }) => (
  <>
    {totalPressure === 0 ? 
      (<p className={styles.text}>There is no land human pressure on the selected area</p>)
      :
      (<p className={styles.text}>Of the current landscape, <b>{Math.round(totalPressure)}% is under human pressure</b>, the majority of which is pressure from {biggestPressureName}.</p>)
    }
  </>
);

const HumanPressureWidgetComponent = ({ handleOnClick, options, rasters, selectedPressures, totalPressure, biggestPressureName, pressureFree }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Land human pressures in this area</h3>
      <PressureStatementComponent totalPressure={totalPressure} biggestPressureName={biggestPressureName} />
      <BarComponent selectedPressures={selectedPressures} totalPressure={totalPressure}/>
      {options && <CheckboxGroup
        options={options}
        handleClick={handleOnClick}
        checkedOptions={rasters}
      />}
      {pressureFree && <p className={styles.pressureFreeLabel}>Not under pressure {pressureFree}%</p>}
      <p className={styles.hint}>CLICK TO SHOW ON MAP</p>
    </div>
  )
}

export default HumanPressureWidgetComponent;