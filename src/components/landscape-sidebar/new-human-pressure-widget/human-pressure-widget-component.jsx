import React from 'react';
import Treemap from 'components/treemap';
import styles from './human-pressure-widget-styles.module.scss';

const BarComponnet = () => {
  const data = {
    selected: 32,
    nonSelected:  10
  };

  return (
    <div className={styles.barContainer}>
      {data.selected > 0 && <div className={styles.selectedPressureBar} style={{ width: `${data.selected}%`}}></div>}
      <div className={styles.nonSelectedPressureBar} style={{ width: `${data.nonSelected}%`}}></div>
      <div className={styles.pressureFreeBar}></div>
    </div>
  )
}

const HumanPressureWidgetComponent = ({ handleOnClick, data, pressureStatement, activeRect }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Land human pressures in this area</h3>
      <p className={styles.text}>{pressureStatement}</p>
      {data && <Treemap data={data} handleOnClick={handleOnClick} activeRect={activeRect} className={styles.treemap}/>}
      <BarComponnet />
      <p className={styles.hint}>CLICK TO SHOW ON MAP</p>
    </div>
  )
}
export default HumanPressureWidgetComponent;