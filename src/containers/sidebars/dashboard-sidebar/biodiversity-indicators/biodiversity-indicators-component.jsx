import React from 'react';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import styles from './biodiversity-indicators-styles.module.scss';

function BioDiversityComponent() {
  return (
    <section className={styles.container}>
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
