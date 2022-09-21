import React from 'react';

import SidebarLegend from 'containers/sidebars/sidebar-legend';

import SourceAnnotation from 'components/source-annotation';

import styles from './styles.module.scss';

function SidebarCardContent({
  title,
  sources,
  legendType,
  legendGradientSlug,
  basicColor = '#008604',
  description,
  metaDataSources,
}) {
  return (
    <section>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.datasetWrapper}>
        {!legendType && <p className={styles.description}>{description}</p>}
        {legendType === 'basic' && (
          <>
            <div
              className={styles.wdpaIcon}
              style={{ backgroundColor: `${basicColor}` }}
            />
            <div className={styles.datasetMetadata}>
              <p className={styles.description}>{description}</p>
            </div>
          </>
        )}
        {legendType === 'gradient' && (
          <div className={styles.gradientLegend}>
            <SidebarLegend legendItem={legendGradientSlug} theme="light" />
            <p className={styles.description}>{description}</p>
          </div>
        )}
      </div>
      <SourceAnnotation sources={sources} metaDataSources={metaDataSources} />
    </section>
  );
}

export default SidebarCardContent;
