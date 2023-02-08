import React, { useMemo } from 'react';

import { T, useT, useLocale } from '@transifex/react';

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
  const protectedAreaChartHeight = 100;
  const protectedAreaChartWidth = 320;

  const isCustom = contextualData?.isCustom;

  return (
    <SidebarCardWrapper className={styles.cardWrapper}>
      <div>
        <p className={styles.title}>{cardTitle}</p>
        {cardCategory === PROTECTION_SLUG && REACT_APP_FEATURE_AOI_CHANGES && (
          <div className={styles.protectedAreaChartContainer}>
            <div
              style={{
                height: protectedAreaChartHeight,
                width: protectedAreaChartWidth,
              }}
            >
              <ArcChart
                parentHeight={protectedAreaChartHeight}
                parentWidth={protectedAreaChartWidth}
                paPercentage={
                  isCustom
                    ? contextualData?.percentage
                    : contextualData?.protectionPercentage
                }
              />
            </div>
            <p className={styles.protectedAreaChartLegend}>
              <T
                _str="Of the current area is {bold}"
                bold={
                  <b>
                    <T _str="under protection" />
                  </b>
                }
              />
            </p>
          </div>
        )}
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
              label={
                REACT_APP_FEATURE_AOI_CHANGES
                  ? t('EXPLORE PROTECTED AREAS')
                  : t('ALL PROTECTED AREAS')
              }
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
