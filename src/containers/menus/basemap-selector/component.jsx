import React from 'react';

// import { useT } from '@transifex/react';

// import { useMobile } from 'constants/responsive';

import styles from './styles.module';

function BasemapSelector({ basemap, setBasemap }) {
  // const t = useT();
  // const isMobile = useMobile();

  console.log({ basemap });

  return (
    <button
      className={styles.basemapContainer}
      type="button"
      onClick={() => setBasemap('landcover')}
    >
      <p className={styles.basemapLabel}>LANDCOVER</p>
    </button>
  );
}

BasemapSelector.propTypes = {};

BasemapSelector.defaultProps = {};

export default BasemapSelector;
