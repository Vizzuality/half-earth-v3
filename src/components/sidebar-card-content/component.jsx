import React from 'react';
import ReactMarkdown from 'react-markdown';
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
  handleSourceClick,
}) => {
  const lastSource = sources && sources.length -1;
  const isMultiSource = sources && sources.length > 1;
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
        {metaDataSources && (
          <div className={styles.metadataSource}>
            <ReactMarkdown
              renderers={{link: ({href, children}) => <a href={href} target="_blank" rel="noopener noreferrer">{children[0].props.children}</a>}}
              children={`Source: ${metaDataSources}`}
            />
          </div>
          )
        }
        {sources && (<span className={styles.sourcesWrapper}>
          {`Source: `}
          {sources.map((source, index) => (
            <>
            {(isMultiSource && index === lastSource) && <span> and </span> }
              <span
                className={styles.source}
                onClick={() => handleSourceClick(source.metadataService)}
              >
                {`${source.label}`}
              </span>
              {index !== lastSource && <span>, </span> }
              {index === lastSource && <span>.</span> }
            </>
          ))
          }
        </span>)}
      </section>
  )
}

export default Component;
