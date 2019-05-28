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
      value: 77
    },
    {
      name: 'Not under pressure',
      value: 13
    }
  ]
}

const handleClick = data => console.log(data)

const HumanPressureWidgetComponent = () => (
  <div className={styles.container}>
    <h3>Human pressures in this area</h3>
    <p>Of the current landscape, 55% is under human pressure, the majority of which is pressure from irrigated agriculture.</p>
    <Treemap data={data} handleOnClick={handleClick}/>
  </div>
)

export default HumanPressureWidgetComponent;