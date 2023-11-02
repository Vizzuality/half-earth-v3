import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { T, useT, useLocale } from '@transifex/react';

import Tooltip from '@tippyjs/react';
import cx from 'classnames';

import ProtectedAreasModal from 'containers/modals/protected-areas-modal';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import SidebarLegend from 'containers/sidebars/sidebar-legend';

import Button from 'components/button';
import ArcChart from 'components/charts/arc-chart';
import SourceAnnotation from 'components/source-annotation';

import {
  LAND_HUMAN_PRESSURES_SLUG,
  PROTECTION_SLUG,
  SPI_SLUG,
  PROTECTED_ATTRIBUTES_SLUG,
  getSidebarCardsConfig,
  getProtectedAttributesConfig,
} from 'constants/analyze-areas-constants';
import { getWDPATranslations } from 'constants/translation-constants';

import COLORS from 'styles/settings';

import styles from './styles.module.scss';

import { ReactComponent as ExternalLinkIcon } from 'icons/external_link.svg';
import { ReactComponent as InfoIcon } from 'icons/infoTooltip.svg';
import { ReactComponent as WarningIcon } from 'icons/warning.svg';

import HumanPressure from './human-pressure-chart';

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
  openNRCInNewTab,
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
  const [chartDomain, setChartDomain] = useState([1990, 2017]);
  const translateInfo = (data) => WDPATranslations[data] || data;
  const protectedAttributesConfig = useMemo(
    () => getProtectedAttributesConfig(contextualData),
    [contextualData, locale]
  );

  const areaChartHeight = 100;
  const areaChartWidth = 320;

  const isCustom = contextualData?.isCustom;

  const underProtectionPercentage = isCustom
    ? contextualData?.percentage
    : contextualData?.protectionPercentage;
  const spi = contextualData?.SPI;
  return (
    <SidebarCardWrapper className={styles.cardWrapper}>
      <div>
        <p className={styles.title}>{cardTitle}</p>
        {cardCategory === PROTECTION_SLUG && underProtectionPercentage && (
          <div className={styles.protectedAreaChartContainer}>
            <div
              style={{
                height: areaChartHeight,
                width: areaChartWidth,
              }}
            >
              <ArcChart
                parentHeight={areaChartHeight}
                parentWidth={areaChartWidth}
                value={underProtectionPercentage}
                isPercentage
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
        {cardCategory === SPI_SLUG && (
          <>
            <div className={styles.protectedAreaChartContainer}>
              <div
                style={{
                  height: areaChartHeight,
                  width: areaChartWidth,
                }}
              >
                <ArcChart
                  color={COLORS.primary}
                  parentHeight={areaChartHeight}
                  parentWidth={areaChartWidth}
                  value={spi}
                />
              </div>
              <p className={styles.protectedAreaChartLegend}>
                <T _str="Land SPI" />
              </p>
            </div>
            <div>
              <Button
                type="rectangular"
                className={cx(styles.fullwidthButton, styles.reverseIconButton)}
                handleClick={openNRCInNewTab}
                label={t('EXPLORE NATIONAL REPORT CARD')}
                Icon={ExternalLinkIcon}
              />
              <ProtectedAreasModal
                isOpen={isProtectedAreasModalOpen}
                handleModalClose={handleProtectedAreasModalToggle}
                contextualData={contextualData}
              />
            </div>
          </>
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
        {cardCategory === LAND_HUMAN_PRESSURES_SLUG && humanPressuresData && (
          <HumanPressure
            chartDomain={chartDomain}
            setChartDomain={setChartDomain}
            data={humanPressuresData}
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
    </SidebarCardWrapper>
  );
}

export default SidebarCard;
