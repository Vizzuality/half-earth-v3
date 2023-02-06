import React, { useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import ReactMarkdown from 'react-markdown/with-html';

import ProtectedAreasModal from 'containers/modals/protected-areas-modal';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import SidebarLegend from 'containers/sidebars/sidebar-legend';

import Button from 'components/button';
import ArcChart from 'components/charts/arc-chart';
import LayerToggle from 'components/layer-toggle';
import SourceAnnotation from 'components/source-annotation';

import {
  PROTECTION_SLUG,
  getSidebarCardsConfig,
} from 'constants/analyze-areas-constants';

import styles from './styles.module.scss';

import { ReactComponent as WarningIcon } from 'icons/warning.svg';

function SidebarCard({
  map,
  layers,
  onChange,
  hasLegend,
  cardTitle,
  toggleType,
  cardCategory,
  activeLayers,
  cardDescription,
  displayWarning,
  handleAllProtectedAreasClick,
  isProtectedAreasModalOpen,
  handleProtectedAreasModalToggle,
  contextualData,
  metadata,
}) {
  const t = useT();
  const locale = useLocale();
  const sidebarCardsConfig = useMemo(
    () => getSidebarCardsConfig(locale),
    [locale]
  );

  return (
    <SidebarCardWrapper className={styles.cardWrapper}>
      <div>
        <p className={styles.title}>{cardTitle}</p>
        <ArcChart />
        {hasLegend && (
          <SidebarLegend
            legendItem={cardCategory}
            className={styles.legendContainer}
            theme="light"
          />
        )}
        <ReactMarkdown
          className={styles.description}
          source={cardDescription}
        />
        {cardCategory === PROTECTION_SLUG && (
          <div>
            <Button
              type="rectangular"
              className={styles.fullwidthButton}
              handleClick={handleAllProtectedAreasClick}
              label={t('ALL PROTECTED AREAS')}
            />
            <ProtectedAreasModal
              isOpen={isProtectedAreasModalOpen}
              handleModalClose={handleProtectedAreasModalToggle}
              contextualData={contextualData}
            />
          </div>
        )}
        <SourceAnnotation
          theme="dark"
          metaDataSources={metadata && metadata.source}
          className={styles.sourceContainer}
        />
      </div>
      {displayWarning ? (
        <div className={styles.warningWrapper}>
          <WarningIcon className={styles.warning} />
          <ReactMarkdown
            className={styles.description}
            source={sidebarCardsConfig[cardCategory].warning}
          />
        </div>
      ) : (
        <div className={styles.togglesContainer}>
          {layers.map((layer) => (
            <LayerToggle
              map={map}
              variant="dark"
              option={layer}
              key={layer.value}
              type={toggleType}
              onChange={onChange}
              themeCategorySlug={cardCategory}
              activeLayers={activeLayers}
            />
          ))}
        </div>
      )}
    </SidebarCardWrapper>
  );
}

export default SidebarCard;
