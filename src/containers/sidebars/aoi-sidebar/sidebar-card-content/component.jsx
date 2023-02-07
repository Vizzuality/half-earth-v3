import React, { useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import ReactMarkdown from 'react-markdown/with-html';

import ProtectedAreasModal from 'containers/modals/protected-areas-modal';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import SidebarLegend from 'containers/sidebars/sidebar-legend';

import Button from 'components/button';
import AreaChart from 'components/charts/area-chart';
import LayerToggle from 'components/layer-toggle';
import SourceAnnotation from 'components/source-annotation';

import {
  LAND_HUMAN_PRESSURES_SLUG,
  PROTECTION_SLUG,
  getSidebarCardsConfig,
} from 'constants/analyze-areas-constants';

import styles from './styles.module.scss';

import { ReactComponent as WarningIcon } from 'icons/warning.svg';

const { REACT_APP_FEATURE_AOI_CHANGES } = process.env;

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
        {cardCategory === LAND_HUMAN_PRESSURES_SLUG && (
          <AreaChart
            area1={{
              key: 'spi',
              stroke: '#000000',
              fill: [
                '#FFBF00',
                '#A74815',
                '#821213',
                '#371033',
                '#250F3B',
                '#1D1135',
                '#060B2B',
              ],
              fillOpacity: 0.4,
              strokeWidth: 0.5,
            }}
            area2={{}}
            data={[]}
            height={200}
            width="100%"
          />
        )}
        <SourceAnnotation
          theme="dark"
          metaDataSources={metadata && metadata.source}
          className={styles.sourceContainer}
        />
      </div>
      {displayWarning && (
        <div className={styles.warningWrapper}>
          <WarningIcon className={styles.warning} />
          <ReactMarkdown
            className={styles.description}
            source={sidebarCardsConfig[cardCategory].warning}
          />
        </div>
      )}
      {!displayWarning && !REACT_APP_FEATURE_AOI_CHANGES && (
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
