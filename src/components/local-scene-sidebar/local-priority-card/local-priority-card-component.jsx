import React from 'react';
import LocalSceneCard from 'components/local-scene-card';
import { ReactComponent as AreaIcon } from 'icons/area.svg';
import styles from './local-priority-card-styles.module.scss';

const LocalPriorityCardComponent = ({
  sourceDate
}) => {
  return (
    <LocalSceneCard>
      <section>
        <h3 className={styles.title}>The current protection:</h3>
      </section>
      <section>
        <div className={styles.datasetWrapper}>
          <AreaIcon className={styles.wdpaIcon}/>
          <div className={styles.datasetMetadata}>
            <p className={styles.datasetExplanation}>
              The orange areas on the map represent
              the current protected areas.
            </p>
            <p className={styles.datasetSource}>
              {`Source: The World Database on Protected Areas (WDPA) (${sourceDate}).`}
            </p>
          </div>
        </div>
        <div className={styles.datasetWrapper}>
          <AreaIcon className={styles.priorityIcon}/>
          <div className={styles.datasetMetadata}>
            <p className={styles.datasetExplanation}>
              The yellow areas on the map represent
              the higest rarity spots for biodiversity
              in this area. Prioritizing these areas
              will get us closer to reach the
              Half-Earth goal.
            </p>
            <p className={styles.datasetSource}>
              Source: Map Of Life (Yale University)
            </p>
          </div>
        </div>
      </section>
    </LocalSceneCard>
  )
}

export default LocalPriorityCardComponent;