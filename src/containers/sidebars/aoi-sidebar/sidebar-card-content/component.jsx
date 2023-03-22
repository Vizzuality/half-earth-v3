import React, { useMemo } from 'react';

import { T, useT, useLocale } from '@transifex/react';

import Tooltip from '@tippyjs/react';
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
  PROTECTED_ATTRIBUTES_SLUG,
  getSidebarCardsConfig,
  getProtectedAttributesConfig,
} from 'constants/analyze-areas-constants';
import { getWDPATranslations } from 'constants/translation-constants';

import COLORS from 'styles/settings';

import styles from './styles.module.scss';

import { ReactComponent as InfoIcon } from 'icons/infoTooltip.svg';
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
  const WDPATranslations = useMemo(() => getWDPATranslations(), [locale]);

  const translateInfo = (data) => WDPATranslations[data] || data;
  const protectedAttributesConfig = useMemo(
    () => getProtectedAttributesConfig(contextualData),
    [contextualData, locale]
  );

  const hpXAxis = useMemo(() => {
    const existingKey =
      humanPressuresData &&
      Object.keys(humanPressuresData).find((k) => humanPressuresData[k]);

    return (
      existingKey &&
      humanPressuresData[existingKey] &&
      humanPressuresData[existingKey].values &&
      humanPressuresData[existingKey].values.length > 0 &&
      humanPressuresData[existingKey].values[0].value &&
      humanPressuresData[existingKey].values
        .map((pressure, i) => {
          if (
            pressure.year % 10 === 0 ||
            i === humanPressuresData[existingKey].values.length - 1
          ) {
            return pressure.year;
          }
          return false;
        })
        .filter(Boolean)
    );
  }, [humanPressuresData]);

  const protectedAreaChartHeight = 100;
  const protectedAreaChartWidth = 320;
  const PRESSURES_CHART_WIDTH = 166;
  const PRESSURES_CHART_HEIGHT = 66;

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
                  _comment="{Of the current area is"
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
        {cardDescription && (
          <ReactMarkdown
            className={styles.description}
            source={cardDescription}
          />
        )}
        {REACT_APP_FEATURE_AOI_CHANGES && cardCategory === PROTECTION_SLUG && (
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

        {REACT_APP_FEATURE_AOI_CHANGES &&
          cardCategory === PROTECTED_ATTRIBUTES_SLUG &&
          contextualData.DESIG && (
            <div className={styles.attributtesContainer}>
              {protectedAttributesConfig.map((a) => (
                <div className={styles.attributtesItem}>
                  <div className={styles.titleWrapper}>
                    <h6 className={styles.title}>{a.title}</h6>
                    <span className={styles.iconWrapper}>
                      <Tooltip
                        className="light"
                        content={
                          <div className={styles.tooltip}>
                            {a.tooltipContent}
                          </div>
                        }
                        delay={100}
                        position="bottom"
                      >
                        <InfoIcon className={styles.icon} />
                      </Tooltip>
                    </span>
                  </div>
                  <p className={styles.value}>{translateInfo(a.value)}</p>
                </div>
              ))}
            </div>
          )}

        {cardCategory === LAND_HUMAN_PRESSURES_SLUG &&
          REACT_APP_FEATURE_AOI_CHANGES &&
          humanPressuresData && (
            <div className={styles.humanPressureIndicators}>
              {Object.keys(humanPressuresData).map((key) => {
                const humanPressure = humanPressuresData[key];
                if (!humanPressure || !hpXAxis) return null;
                // Cap value to 100 as more than 100 is only caused by errors on the calculations
                const humanPressureValues = humanPressure.values.map((v) => ({
                  year: v.year,
                  value: v.value > 100 ? 100 : v.value,
                }));

                const lastHumanPressure =
                  humanPressureValues[humanPressureValues.length - 1];
                const getLastHumanPressureValue = () => {
                  return lastHumanPressure.value > 1
                    ? Math.trunc(lastHumanPressure.value)
                    : '<1';
                };
                return (
                  <div className={styles.humanPressureIndicator}>
                    <p className={styles.title}>{humanPressure.title}</p>

                    <p className={styles.percentage}>
                      {getLastHumanPressureValue()}%
                    </p>
                    <div className={styles.hpChartContainer}>
                      <AreaChart
                        area={{
                          key: 'value',
                          stroke: COLORS.gold,
                          fill: 'url(#gradientColor)',
                          strokeWidth: 2,
                          type: 'natural',
                        }}
                        data={humanPressureValues}
                        xTicks={hpXAxis}
                        margin={{
                          top: 0,
                          right: 0,
                          left: -PRESSURES_CHART_WIDTH,
                          bottom: 0,
                        }}
                        height={PRESSURES_CHART_HEIGHT}
                        width={PRESSURES_CHART_WIDTH}
                        domain={
                          hpXAxis && [
                            Math.min(...hpXAxis),
                            Math.max(...hpXAxis),
                          ]
                        }
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
