import React from 'react'
import styles from './top-menu-styles.module.scss';

function TopMenuComponent(props) {
  return (
    <div className={styles.container}>
      <a href="#" target='_blank'>About Us</a>
      <span>|</span>
      <a href="#">Login</a>
    </div>
  )
}

export default TopMenuComponent;
