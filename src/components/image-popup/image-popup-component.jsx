import React from 'react';

import styles from './image-popup-component-styles.module.scss';

function ImagePopupComponent(props) {
  const { children } = props;
  return <div className={styles.container}>{children}</div>;
}

export default ImagePopupComponent;
