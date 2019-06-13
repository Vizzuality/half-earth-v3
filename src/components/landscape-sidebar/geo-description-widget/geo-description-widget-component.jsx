import React from 'react';
import { Loading } from 'he-components';
import ShareModal from 'components/share-modal';

import styles from './geo-description-widget-styles.module.scss';

const GeoDescriptionWidget = ({ data, loading, error, view }) => {
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Loading />
          <span className={styles.loadingText}>Loading area information...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.errorText}>
          Cannot load area information.
        </p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className={styles.container}>
      <ShareModal theme={{ shareButton: styles.shareButton }} view={view} />
      <h2 className={styles.title}>{data.title}</h2>
      <div className={styles.line}></div>
      <p className={styles.description}>
        {data.description}
      </p>
    </div>
  );
};

export default GeoDescriptionWidget;
