import React from 'react';
import Treemap from 'components/treemap';
import styles from './human-presure-widget-styles.module.scss';

function handleClick(data) {
  console.log(data)
}

const HumanPressureWidgetComponent = ({ humanPressures, data }) => console.log(humanPressures) || (
  <div className={styles.container}>
    <h3 className={styles.title}>Human pressures in this area</h3>
    <p className={styles.text}>Of the current landscape, 43% is under human pressure, the majority of which is pressure from irrigated agriculture.</p>
    {data && <Treemap data={data} handleOnClick={handleClick} className={styles.treemap}/>}
    <p  className={styles.hint}>CLICK TO SHOW ON MAP</p>
  </div>
)

export default HumanPressureWidgetComponent;