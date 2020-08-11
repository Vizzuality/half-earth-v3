import React from 'react';
import LocalSceneCard from 'components/local-scene-card';
import {
  MERGED_PROTECTION,
  COUNTRY_PRIORITY
} from 'constants/metadata';
import styles from './local-priority-card-styles.module.scss';

const LocalPriorityCardComponent = ({
  sourceDate,
  handleInfoClick,
  protectionNeeded,
  currentProtection,
}) => {
  return (
    <LocalSceneCard>
      <section>
        <h3 className={styles.title}>{`The current protection ${currentProtection}%`}</h3>
        <div className={styles.datasetWrapper}>
          <div className={styles.wdpaIcon}/>
          <div className={styles.datasetMetadata}>
            <p className={styles.datasetExplanation}>
              The green areas on the map represent
              the current protected areas.
            </p>
            <p className={styles.datasetSource} onClick={() => handleInfoClick(MERGED_PROTECTION)}>
              Source: WDPA, OECM & RAISG.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.priorityLegend}>
        <h3 className={styles.title}>{`The protection needed ${protectionNeeded}%`}</h3>
        <p className={styles.legendTag}>high priority</p>
        <div className={styles.datasetWrapper}>
          <div className={styles.priorityIcon}/>
          <div className={styles.datasetMetadata}>
            <p className={styles.datasetExplanation}>
            The brightly colored map layer presents one possible vision 
            of the areas needed to achieve the Half-Earth goal of comprehensive
            terrestrial biodiversity conservation. Higher values indicate
            locations within the country that contribute more to the 
            conservation of species habitat.
            </p>
            <p className={styles.datasetSource} onClick={() => handleInfoClick(COUNTRY_PRIORITY)}>
              Source: Rinnan DS and Jetz W, (2020).
            </p>
          </div>
        </div>
        <p className={styles.legendTag}>low priority</p>
      </section>
    </LocalSceneCard>
  )
}

export default LocalPriorityCardComponent;
