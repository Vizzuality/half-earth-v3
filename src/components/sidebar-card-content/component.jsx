import React from 'react';
import SourceAnnotation from 'components/source-annotation';
import styles from './styles.module.scss';

const Component = ({
  title,
  sources,
  legendType,
  basicColor = '#008604',
  description,
  lowValueLabel,
  highValueLabel,
  metaDataSources,
}) => {
  return (
    <section>
        <h3
          className={styles.title}
        >
          {title}
        </h3>
        <div className={styles.datasetWrapper}>
          {!legendType && 
            <p className={styles.description}>
              {description}
            </p>
          }
          {legendType === 'basic' && 
            <>
              <div className={styles.wdpaIcon} style={{backgroundColor: `${basicColor}`}}/>
              <div className={styles.datasetMetadata}>
                <p className={styles.description}>
                  {description}
                </p>
              </div>
            </>
          }
          {legendType === 'gradient' && 
            <div className={styles.gradientLegend}>
              <span className={styles.legendTag}>{highValueLabel}</span>
              <div className={styles.descriptionWrapper}>
                <div className={styles.gradient} />
                <p className={styles.description}>
                  {description}
                </p>
              </div>
              <span className={styles.legendTag}>{lowValueLabel}</span>
            </div>
          }
        </div>
        <SourceAnnotation
          sources={sources}
          metaDataSources={metaDataSources}
        />
      </section>
  )
}

export default Component;
