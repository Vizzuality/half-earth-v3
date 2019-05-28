import React from 'react';
import Treemap from 'components/treemap';
import styles from './human-presure-widget-styles.module.scss';

const data = {
  name: 'Human Pressures',
  children: [
    {
      name: 'Irrigated agriculture',
      value: 20
    },
    {
      name: 'Rainfed agriculture',
      value: 15
    },
    {
      name: 'Urban pressures',
      value: 8
    },
    {
      name: 'Not under pressure',
      value: 57
    }
  ]
}

function handleClick(data) {
  console.log(data)
}

const HumanPressureWidgetComponent = () => (
  <div className={styles.container}>
    <h3 className={styles.title}>Human pressures in this area</h3>
    <p className={styles.text}>Of the current landscape, 43% is under human pressure, the majority of which is pressure from irrigated agriculture.</p>
    <Treemap data={data} handleOnClick={handleClick} className={styles.treemap}/>
    <p  className={styles.hint}>CLICK TO SHOW ON MAP</p>
  </div>
)

export default HumanPressureWidgetComponent;