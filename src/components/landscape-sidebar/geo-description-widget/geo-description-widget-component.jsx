import React from 'react';

import styles from './geo-description-widget-styles.module.scss';

const GeoDescriptionWidget = ({ data }) => {
  if (!data) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{data.title}</h2>
      <div className={styles.line}></div>
      <p className={styles.description}>
        {data.description}
      </p>
    </div>
  );
};

export default GeoDescriptionWidget;
