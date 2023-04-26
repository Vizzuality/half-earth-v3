import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

import { T, useT, useLocale } from '@transifex/react';

import Tooltip from '@tippyjs/react';

import ProtectedAreasModal from 'containers/modals/protected-areas-modal';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import SidebarLegend from 'containers/sidebars/sidebar-legend';

import Button from 'components/button';
import ArcChart from 'components/charts/arc-chart';
import AreaChart from 'components/charts/area-chart';
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

function HumanPressuresTooltipComponent({ node, ...props }) {
  return (
    <span className={styles.tooltipContainer}>
      <Tooltip
        className="light"
        interactive
        appendTo={document.body}
        content={
          <div className={styles.tooltip}>
            <T
              _str="An area classified as experiencing high human pressure is considered to be in a human-dominated state and empirically relates to species threshold responses to habitat loss. See {kennedyEtAl} for more details."
              kennedyEtAl={
                <a
                  href="https://onlinelibrary.wiley.com/doi/abs/10.1111/gcb.14549"
                  title="human modification source Kennedy et al. 2019"
                  target="_blank"
                  rel="noreferrer"
                >
                  Kennedy et al. 2019
                </a>
              }
            />
          </div>
        }
      >
        <span className={styles.tooltipTriggerText} {...props} />
      </Tooltip>
    </span>
  );
}

function SidebarCard({
  hasLegend,
  cardTitle,
  cardCategory,
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

  const hummanPressuresXAxis = useMemo(() => {
    const existingValues =
      humanPressuresData && Object.values(humanPressuresData);
    const nonEmptyValues =
      existingValues &&
      existingValues.find(
        (existingValue) =>
          existingValue.values &&
          existingValue.values.length > 0 &&
          existingValue.values.some((v) => v.value && v.value !== 0)
      );
    return (
      nonEmptyValues &&
      nonEmptyValues.values
        .map((pressure, i) => {
          if (
            pressure.year % 10 === 0 ||
            i === nonEmptyValues.values.length - 1
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

  const renderHumanPressure = () => (
    <div className={styles.humanPressureIndicators}>
      {Object.keys(humanPressuresData).map((key) => {
        const humanPressure = humanPressuresData[key];
        if (
          !humanPressure ||
          !hummanPressuresXAxis ||
          humanPressure.values.every((py) => py.value === 0)
        )
          return null;
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

            <p className={styles.percentage}>{getLastHumanPressureValue()}%</p>
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
                xTicks={hummanPressuresXAxis}
                margin={{
                  top: 0,
                  right: 0,
                  left: -PRESSURES_CHART_WIDTH,
                  bottom: 0,
                }}
                height={PRESSURES_CHART_HEIGHT}
                width={PRESSURES_CHART_WIDTH}
                domain={
                  hummanPressuresXAxis && [
                    Math.min(...hummanPressuresXAxis),
                    Math.max(...hummanPressuresXAxis),
                  ]
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  const isCustom = contextualData?.isCustom;

  const underProtectionPercentage = isCustom
    ? contextualData?.percentage
    : contextualData?.protectionPercentage;
  return (
    <SidebarCardWrapper className={styles.cardWrapper}>
      <div>
        <p className={styles.title}>{cardTitle}</p>
        {cardCategory === PROTECTION_SLUG && underProtectionPercentage && (
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
            components={{
              em: HumanPressuresTooltipComponent,
            }}
          >
            {cardDescription}
          </ReactMarkdown>
        )}
        {cardCategory === PROTECTION_SLUG && (
          <div>
            <Button
              type="rectangular"
              className={styles.fullwidthButton}
              handleClick={handleAllProtectedAreasClick}
              label={t('EXPLORE PROTECTED AREAS')}
            />
            <ProtectedAreasModal
              isOpen={isProtectedAreasModalOpen}
              handleModalClose={handleProtectedAreasModalToggle}
              contextualData={contextualData}
            />
          </div>
        )}
        {cardCategory === PROTECTED_ATTRIBUTES_SLUG && contextualData.DESIG && (
          <div className={styles.attributtesContainer}>
            {protectedAttributesConfig.map((a) => (
              <div className={styles.attributtesItem}>
                <div className={styles.titleWrapper}>
                  <h6 className={styles.title}>{a.title}</h6>
                  <span className={styles.iconWrapper}>
                    <Tooltip
                      className="light"
                      content={
                        <div className={styles.tooltip}>{a.tooltipContent}</div>
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
          humanPressuresData &&
          renderHumanPressure()}
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
    </SidebarCardWrapper>
  );
}

export default SidebarCard;
