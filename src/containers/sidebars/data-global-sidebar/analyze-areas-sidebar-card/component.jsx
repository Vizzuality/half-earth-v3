import React, { useState, useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import cx from 'classnames';

import AoiHistoryModal from 'containers/modals/aoi-history-modal';
import PromptModal from 'containers/modals/prompt-modal';

import Button from 'components/button';
import RadioButton from 'components/radio-button';
import SearchLocation from 'components/search-location';
import ShapeFileUploader from 'components/shape-file-uploader';

import {
  getPrecalculatedAOIOptions,
  HIGHER_AREA_SIZE_LIMIT,
} from 'constants/analyze-areas-constants';
import { SEARCH_TYPES } from 'constants/search-location-constants';

import radioTheme from 'styles/themes/radio-theme.module.scss';

import styles from './styles.module.scss';

import { ReactComponent as AreasHistoryIcon } from 'icons/areas_history_icon.svg';

import { getTabs } from './constants';
import SketchTooltip from './sketch-tooltip';
import SketchWidget from './sketch-widget';

function AnalyzeAreasCardComponent({
  view,
  selectedOption,
  isPromptModalOpen,
  promptModalContent,
  onShapeUploadError,
  selectedAnalysisTab,
  className,
  onShapeUploadSuccess,
  handleOptionSelection,
  handleAnalysisTabClick,
  handlePromptModalToggle,
  aoiHistoryModalOpenAnalytics,
  onboardingStep,
  onboardingType,
  sketchTool,
  sketchWidgetMode,
  setSketchWidgetMode,
  setSketchTooltipType,
  sketchTooltipType,
  updatedGeometry,
  setUpdatedGeometry,
}) {
  const t = useT();
  const locale = useLocale();
  const tabs = useMemo(() => getTabs(), [locale]);
  const precalculatedAOIOptions = useMemo(
    () => getPrecalculatedAOIOptions(),
    [locale]
  );
  const [isAoiHistoryModalOpen, setAoiHistoryModalOpen] = useState(false);
  const handleAoiModalToggle = () => {
    if (!isAoiHistoryModalOpen) {
      aoiHistoryModalOpenAnalytics();
    }
    setAoiHistoryModalOpen(!isAoiHistoryModalOpen);
  };

  return (
    <div
      className={cx(styles.sidebarCardContainer, className, {
        [styles.onboardingOverlay]:
          onboardingType === 'priority-places' && onboardingStep === 2,
      })}
    >
      <h2 className={styles.subtitle}>
        {t('Analyze pre-calculated areas or your own custom area.')}
      </h2>

      <div className={styles.analyzeMenuContainer}>
        <p className={styles.analyzeMenuTitle}>{t('Selection Type')}</p>
        <div className={styles.analyzeMenuTabsContainer}>
          {tabs(selectedAnalysisTab).map((tab) => {
            return (
              <button
                key={tab.label}
                active={selectedAnalysisTab === tab.label}
                className={cx({
                  [styles.tabButton]: true,
                  [styles.tabButtonActive]: selectedAnalysisTab === tab.label,
                })}
                type="button"
                onClick={() =>
                  selectedAnalysisTab !== tab.label &&
                  handleAnalysisTabClick(`${tab.label}`)
                }
              >
                <span>{tab.icon}</span>
                <span
                  className={cx({
                    [styles.tabButtonCaption]: true,
                    [styles.tabButtonCaptionActive]:
                      selectedAnalysisTab === `${tab.label}`,
                  })}
                >
                  {t(tab.label)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {selectedAnalysisTab === 'click' && (
        <div>
          <p className={styles.sectionLabel}>
            <b>{t('Click on the map')}</b> {t('to select:')}
          </p>

          {precalculatedAOIOptions.map((option) => {
            return (
              <div
                className={styles.radioContainer}
                key={`radio-container-${option.slug}`}
              >
                <RadioButton
                  id={option.slug}
                  option={{ ...option, name: option.label }}
                  checked={selectedOption.slug === option.slug}
                  onChange={() => handleOptionSelection(option)}
                  theme={radioTheme}
                />
              </div>
            );
          })}
        </div>
      )}
      {selectedAnalysisTab === 'search' && (
        <div>
          <p className={styles.sectionLabel}>
            <b>{t('Search')}</b> {t('a country, region or protected area')}
          </p>
          <SearchLocation
            stacked
            searchType={SEARCH_TYPES.full}
            view={view}
            theme="dark"
            width="full"
            parentWidth="380px"
            searchSourceLayerSlug={selectedOption.slug}
          />
        </div>
      )}
      {selectedAnalysisTab === 'draw' && (
        <div>
          <SketchWidget
            sketchTool={sketchTool}
            sketchWidgetMode={sketchWidgetMode}
            setSketchWidgetMode={setSketchWidgetMode}
            setSketchTooltipType={setSketchTooltipType}
            setUpdatedGeometry={setUpdatedGeometry}
            updatedGeometry={updatedGeometry}
            view={view}
          />
          <SketchTooltip sketchTooltipType={sketchTooltipType} />
          <p className={styles.sectionLabel}>
            {t('Draw shape smaller than')}{' '}
            <b>
              {getLocaleNumber(HIGHER_AREA_SIZE_LIMIT, locale)} km
              <sup>2</sup>
            </b>
            {t(', approximately the size of Belgium.')}
          </p>

          <p className={styles.sectionLabel}>
            {t('Use the different drawing tools to draw the area.')}
          </p>
        </div>
      )}
      {selectedAnalysisTab === 'upload' && (
        <>
          <p className={styles.sectionLabel}>
            {t('Upload your own shapefile. The shape should be smaller than')}{' '}
            <b>
              {getLocaleNumber(HIGHER_AREA_SIZE_LIMIT, locale)} km
              <sup>2</sup>
            </b>{' '}
            {t('approximately the size of Belgium.')}
          </p>

          <p className={styles.sectionSubtitleLabel}>
            {t('Learn more about shape files')}
            <a
              title={t('Shapefiles information')}
              href="https://enterprise.arcgis.com/es/portal/latest/use/shapefiles.htm"
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('here')}
            </a>
            .
          </p>
          <ShapeFileUploader
            sizeWarning="(Add a .zip file with a maximum of 2MB)"
            view={view}
            onSuccess={onShapeUploadSuccess}
            onError={onShapeUploadError}
          />
        </>
      )}
      <Button
        type="compound"
        Icon={AreasHistoryIcon}
        label={t('Open your analyzed areas history.')}
        className={styles.areasHistoryButton}
        handleClick={handleAoiModalToggle}
      />
      <AoiHistoryModal
        isOpen={isAoiHistoryModalOpen}
        handleClose={handleAoiModalToggle}
      />
      <PromptModal
        isOpen={isPromptModalOpen}
        handleClose={handlePromptModalToggle}
        title={promptModalContent.title}
        description={promptModalContent.description}
      />
    </div>
  );
}

export default AnalyzeAreasCardComponent;
