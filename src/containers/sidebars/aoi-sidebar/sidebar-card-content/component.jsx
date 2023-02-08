import React, { useMemo } from 'react';

import { T, useT, useLocale } from '@transifex/react';

import ReactMarkdown from 'react-markdown/with-html';

import ProtectedAreasModal from 'containers/modals/protected-areas-modal';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import SidebarLegend from 'containers/sidebars/sidebar-legend';

import Button from 'components/button';
import ArcChart from 'components/charts/arc-chart';
import AreaChart from 'components/charts/area-chart';
import LayerToggle from 'components/layer-toggle';
import SourceAnnotation from 'components/source-annotation';

import {
  LAND_HUMAN_PRESSURES_SLUG,
  PROTECTION_SLUG,
  getSidebarCardsConfig,
} from 'constants/analyze-areas-constants';

import COLORS from 'styles/settings';

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
  humanPressuresData,
}) {
  const t = useT();
  const locale = useLocale();
  const sidebarCardsConfig = useMemo(
    () => getSidebarCardsConfig(locale),
    [locale]
  );

  const {
    hpAgriculture,
    hpEnergy,
    hpHumanIntrusion,
    hpTransportation,
    hpUrban,
  } = humanPressuresData || {};

  // !TODO: byYear data is mocked. Please, change it as possible.
  const HUMAN_PRESSURE_DATA = [
    {
      title: 'Agriculture',
      percentage: hpAgriculture,
      byYear: [
        { year: 1980, value: 12.5 },
        { year: 1990, value: 12.5 },
        { year: 2000, value: 14.3 },
        { year: 2010, value: 55.3 },
        { year: 2020, value: 80.3 },
      ],
    },
    {
      title: 'Energy',
      percentage: hpEnergy,
      byYear: [
        { year: 1980, value: 12.5 },
        { year: 1990, value: 22.5 },
        { year: 2000, value: 24.3 },
        { year: 2010, value: 25.3 },
        { year: 2020, value: 50.3 },
      ],
    },
    {
      title: 'Human Intrusion',
      percentage: hpHumanIntrusion,
      byYear: [
        { year: 1980, value: 12.5 },
        { year: 1990, value: 12.5 },
        { year: 2000, value: 14.3 },
        { year: 2010, value: 15.3 },
        { year: 2020, value: 60.3 },
      ],
    },
    {
      title: 'Transportation',
      percentage: hpTransportation,
      byYear: [
        { year: 1980, value: 12.5 },
        { year: 1990, value: 12.5 },
        { year: 2000, value: 14.3 },
        { year: 2010, value: 15.3 },
        { year: 2020, value: 78.3 },
      ],
    },
    {
      title: 'Urban',
      percentage: hpUrban,
      byYear: [
        { year: 1980, value: 12.5 },
        { year: 1990, value: 22.5 },
        { year: 2000, value: 24.3 },
        { year: 2010, value: 25.3 },
        { year: 2020, value: 68.3 },
      ],
    },
  ];

  const hpXAxis = useMemo(() => {
    return HUMAN_PRESSURE_DATA[0].byYear.map((obj) => obj.year);
  }, []);

  const protectedAreaChartHeight = 100;
  const protectedAreaChartWidth = 320;

  const isCustom = contextualData?.isCustom;

  const underProtectionPercentage = isCustom
    ? contextualData?.percentage
    : contextualData?.protectionPercentage;

  return (
    <SidebarCardWrapper className={styles.cardWrapper}>
      <div>
        <p className={styles.title}>{cardTitle}</p>
        {cardCategory === PROTECTION_SLUG &&
          REACT_APP_FEATURE_AOI_CHANGES &&
          underProtectionPercentage && (
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
                  paPercentage={underProtectionPercentage}
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

        {cardCategory === LAND_HUMAN_PRESSURES_SLUG && (
          <p className={styles.hpLegendTitle}>{t('Land pressures')}</p>
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
        {cardCategory === LAND_HUMAN_PRESSURES_SLUG &&
          REACT_APP_FEATURE_AOI_CHANGES && (
            <div className={styles.humanPressureIndicators}>
              {HUMAN_PRESSURE_DATA.map((hp) => {
                return (
                  <div className={styles.humanPressureIndicator}>
                    <p className={styles.title}>{hp.title}</p>

                    {hp.percentage !== undefined && (
                      <p className={styles.percentage}>
                        {Math.trunc(hp.percentage)}%
                      </p>
                    )}
                    <div className={styles.hpChartContainer}>
                      <AreaChart
                        area={{
                          key: 'value',
                          stroke: COLORS.gold,
                          fill: 'url(#gradientColor)',
                          strokeWidth: 2,
                          type: 'natural',
                        }}
                        data={hp.byYear}
                        xTicks={hpXAxis}
                        margin={{
                          top: 0,
                          right: 0,
                          left: -114,
                          bottom: 0,
                        }}
                        height={66}
                        width={161}
                      />
                    </div>
                  </div>
                );
              })}
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
