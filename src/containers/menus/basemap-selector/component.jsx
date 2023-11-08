import React from 'react';

// import { useT } from '@transifex/react';

// import { useMobile } from 'constants/responsive';

import styles from './styles.module';

function BasemapSelector() {
  // const t = useT();
  // const isMobile = useMobile();

  return (
    <button type="button" className={styles.basemapContainer}>
      <p className={styles.basemapLabel}>LANDCOVER</p>
    </button>
  );
}

BasemapSelector.propTypes = {};

BasemapSelector.defaultProps = {};

export default BasemapSelector;
