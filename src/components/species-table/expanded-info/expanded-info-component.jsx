import React, { useState } from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';
import { Loading } from 'he-components';

import styles from './expanded-info-styles.module.scss';

function Image(props) {
  const { className, alt, src } = props;
  const [hasError, setHasError] = useState(false);

  if (!src) return null;

  return (
    <img
      className={cx(className, [hasError])}
      onError={() => setHasError(true)}
      alt={alt}
      {...props}
    />
  );
}

function ExpandedInfo(props) {
  const t = useT();

  const { data, error, speciesName } = props;
  if (error) {
    return <div>{t('Failed to load')}</div>;
  }

  if (!data || !data[0]) {
    return (
      <div className={styles.loaderContainer}>
        <Loading />
      </div>
    );
  }

  const { rangemap, image, info, scientificname } = data[0];

  return (
    <div className={styles.expandedInfo}>
      <div className={styles.imagesContainer}>
        <Image
          title={`${speciesName} ${t(' Range map')}`}
          alt={`${speciesName} ${t(' Range map')}`}
          src={rangemap}
          className={styles.image}
        />
        <Image
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
          href={`https://mol.org/species/${scientificname}`}
          title={`${speciesName} ${t(' MoL link')}`}
          alt={`${speciesName} ${t(' MoL link')}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {t('View more on Map of Life')}
        </a>
      </div>
    </div>
  );
}

export default ExpandedInfo;
