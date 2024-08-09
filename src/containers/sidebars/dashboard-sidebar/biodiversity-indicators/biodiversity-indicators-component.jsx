import React, { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import hrTheme from 'styles/themes/hr-theme.module.scss';

import styles from './biodiversity-indicators-styles.module.scss';
import { LightModeContext } from '../../../../context/light-mode';

function BioDiversityComponent(props) {
  const { data, countryName } = props
  const { lightMode } = useContext(LightModeContext);
  const [selectedIndex, setSelectedIndex] = useState(1);

  useEffect(() => {
    console.log(data);
    console.log(countryName);
  }, [data])


  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <span className={styles.sectionTitle}>Biodiversity Indicators</span>
      <hr className={hrTheme.dark} />
      <div className={styles.tabs}>
        <button
          type="button"
          aria-label="Species Habitat Index"
          className={cx({
            [styles.selected]: selectedIndex === 1,
          })}
          onClick={() => setSelectedIndex(1)}
        >
          <span>Habitat Score</span>
        </button>
        <button
          type="button"
          aria-label="Species Protection Index"
          className={cx({
            [styles.selected]: selectedIndex === 2,
          })}
          onClick={() => setSelectedIndex(2)}
        >
          <span>Protection Score</span>
        </button>
        <button
          type="button"
          aria-label="Species Information Index"
          className={cx({
            [styles.selected]: selectedIndex === 3,
          })}
          onClick={() => setSelectedIndex(3)}
        >
          <span>Information Score</span>
        </button>
      </div>
      {selectedIndex === 1 &&
        <p>
          *The Species Habitat Score is calculated using the habitat suitable
          range map and remote sensing layers.
        </p>
      }
    </section>
  );
}

export default BioDiversityComponent;
