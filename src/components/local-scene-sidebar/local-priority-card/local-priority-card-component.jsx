import React from 'react';
import LocalSceneCard from 'components/local-scene-card';
import {
  MERGED_PROTECTION,
  COUNTRY_PRIORITY
} from 'constants/metadata';
import styles from './local-priority-card-styles.module.scss';

const LocalPriorityCardComponent = (props) => {
  const {
    countryName,
    handleInfoClick,
    protectionNeeded,
    currentProtection,
    hasPriority,
  } = props;
  return (
    <LocalSceneCard>
      <section>
        <h3
          className={styles.title}
        >{`The current protection: ${currentProtection}%`}</h3>
        <div className={styles.datasetWrapper}>
          <div className={styles.wdpaIcon} />
          <div className={styles.datasetMetadata}>
            <p className={styles.datasetExplanation}>
              The green areas on the map represent regions that are currently
              recognized as being managed for the long-term conservation of
              nature.
            </p>
            <p
              className={styles.datasetSource}
              onClick={() => handleInfoClick(MERGED_PROTECTION)}
            >
              Source: WDPA, OECM & RAISG.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.priorityLegend}>
        <h3
          className={styles.title}
        >{`Additional protection needed: ${protectionNeeded}%`}</h3>
        {hasPriority ? (
          <>
            <p className={styles.legendTag}>higher priority</p>
            <div className={styles.datasetWrapper}>
              <div className={styles.priorityIcon} />
              <div className={styles.datasetMetadata}>
                <p className={styles.datasetExplanation}>
                  {`The brightly colored map layer presents one possible configuration
               of the additional areas needed to achieve the Half-Earth goal of 
               comprehensive terrestrial biodiversity conservation. Higher values 
               indicate locations within ${countryName} that contribute more to the 
               conservation of species habitat.`}
                </p>
                <p
                  className={styles.datasetSource}
                  onClick={() => handleInfoClick(COUNTRY_PRIORITY)}
                >
                  Source: Rinnan DS and Jetz W (2020).
                </p>
              </div>
            </div>
            <p className={styles.legendTag}>lower priority</p>
          </>
        ) : (
          <p className={styles.datasetExplanation}>
            {`Our global model of comprehensive terrestrial vertebrate biodiversity conservation did not identify any areas in ${countryName} in need of additional protection. Further expansion of ${countryName}'s protected areas will nonetheless promote resilience towards global biodiversity loss, and can contribute to creating a global conservation network with more equity between countries.`}
          </p>
        )}
      </section>
    </LocalSceneCard>
  );
}

export default LocalPriorityCardComponent;
