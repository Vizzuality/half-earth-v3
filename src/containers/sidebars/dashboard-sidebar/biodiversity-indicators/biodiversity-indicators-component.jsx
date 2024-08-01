import React, { useContext } from 'react';
import cx from 'classnames';
import hrTheme from 'styles/themes/hr-theme.module.scss';

import styles from './biodiversity-indicators-styles.module.scss';
import { LightModeContext } from '../../../../context/light-mode';

function BioDiversityComponent() {
  const { lightMode } = useContext(LightModeContext);
  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <span className={styles.sectionTitle}>Biodiversity Indicators</span>
      <hr className={hrTheme.dark} />
      <p>
        *The Species Habitat Score is calculated using the habitat suitable
        range map and remote sensing layers.
      </p>
    </section>
  );
}

export default BioDiversityComponent;
