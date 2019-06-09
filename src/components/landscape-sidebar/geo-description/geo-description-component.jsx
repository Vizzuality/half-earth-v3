import React, { useState, useEffect } from 'react';

import styles from './geo-description-styles.module.scss';

const GEO_DESCRIBER_API = 'https://staging-api.globalforestwatch.org/v1/geodescriber/geom?lang=en&app=HE';

const GeoDescription = ({ geojson }) => {
  const [data, setData] = useState();

  async function fetchGeoDescription() {
    if (!geojson) return null;

    try {
      const response = await fetch(GEO_DESCRIBER_API, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: geojson
      });

      if (!response.ok) {
        throw new Error('Error while loading geodescription');
      }
      const result = await response.json();
      setData(result.data);
    } catch(error) {
      setData(null);
      console.warn(error);
    }
  }

  useEffect(() => {
    fetchGeoDescription();
  }, [geojson]);

  if (!data) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{data.title}</h2>
    </div>
  );
};

export default GeoDescription;
