import React from 'react';
import Treemap from 'components/treemap';
import styles from './human-pressure-widget-styles.module.scss';

const HumanPressureWidgetComponent = ({ handleOnClick, data, pressureStatement, activeRect }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Land human pressures in this area</h3>
      <p className={styles.text}>{pressureStatement}</p>
      {data && <Treemap data={data} handleOnClick={handleOnClick} activeRect={activeRect} className={styles.treemap}/>}
      <p  className={styles.hint}>CLICK TO SHOW ON MAP</p>
    </div>
  )
}
export default HumanPressureWidgetComponent;