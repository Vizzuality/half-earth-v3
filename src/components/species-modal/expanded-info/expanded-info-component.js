import React from 'react';
import { Loading, Button } from 'he-components';
import styles from './expanded-info-styles.module.scss';
import buttonTheme from 'styles/themes/button-theme.module.scss';

const ExpandedInfo = (props) => {
  const { data, error, speciesName } = props;
  if (error) {
    return <div>Failed to load</div>
  }

  if (!data || !data[0]) {
    return (
      <div className={styles.loaderContainer}>
        <Loading />
      </div>
    );
  }

  const { rangemap, image, info, redlist_link } = data[0];
  return (
    <div className={styles.expandedInfo}>
      <div className={styles.imagesContainer}>
        <img
          title={`${speciesName} Range map`}
          alt={`${speciesName} Range map`}
          src={rangemap}
          className={styles.image}
        />
        <img
          title={`${speciesName}`}
          alt={`${speciesName}`}
          src={image && image.url}
          className={styles.image}
        />
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.description}>
          {info && info[0] && info[0].content}
        </div>
        <a
          href={redlist_link}
          title={`${speciesName} red list link`}
          alt={`${speciesName} red list link`}
          className={styles.link}
        >
          <Button theme={buttonTheme} className={styles.button}>
            View more on Map of Life
          </Button>
        </a>
      </div>
    </div>
  );
}

export default ExpandedInfo;
