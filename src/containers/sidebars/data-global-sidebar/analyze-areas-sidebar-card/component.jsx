import React, { useState, useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import { localeFormatting } from 'utils/data-formatting-utils';

import cx from 'classnames';

import AoiHistoryModal from 'containers/modals/aoi-history-modal';
import PromptModal from 'containers/modals/prompt-modal';

import Button from 'components/button';
import CategoryBox from 'components/category-box';
import Dropdown from 'components/dropdown';
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

import { ReactComponent as AnalyzeAreasOLDIcon } from 'icons/analyze_areas_OLD.svg';
import { ReactComponent as AoisClickIcon } from 'icons/aois_click.svg';
import { ReactComponent as AoisDrawIcon } from 'icons/aois_draw.svg';
import { ReactComponent as AreasHistoryIcon } from 'icons/areas_history_icon.svg';
import { ReactComponent as InfoIcon } from 'icons/info.svg';

import { TABS } from './constants';

const { REACT_APP_FEATURE_NEW_MENUS } = process.env;

function AnalyzeAreasCardComponent({
  view,
  geometryArea,
  selectedOption,
  handleDrawClick,
  isPromptModalOpen,
  promptModalContent,
  isSketchToolActive,
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
}) {
  const t = useT();
  const locale = useLocale();
  const precalculatedAOIOptions = useMemo(
    () => getPrecalculatedAOIOptions(),
    [locale],
  );

  const [isAoiHistoryModalOpen, setAoiHistoryModalOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const handleAoiModalToggle = () => {
    if (!isAoiHistoryModalOpen) {
      aoiHistoryModalOpenAnalytics();
    }
    setAoiHistoryModalOpen(!isAoiHistoryModalOpen);
  };

  const handleBoxClick = () => setOpen(!isOpen);
  if (REACT_APP_FEATURE_NEW_MENUS) {
    return (
      <div
        className={cx(styles.sidebarCardContainer, className, {
          [styles.open]: isOpen,
          [styles.onboardingOverlay]:
            onboardingType === 'priority-places' && onboardingStep === 2,
        })}
      >
        <h2 className={styles.subtitle}>
          {t('Analyze pre-calculated areas or your own custom area.')}
        </h2>

        {REACT_APP_FEATURE_NEW_MENUS && (
          <>
            <div className={styles.analyzeMenuContainer}>
              <p className={styles.analyzeMenuTitle}>{t('Selection Type')}</p>
              <div className={styles.analyzeMenuTabsContainer}>
                {TABS(selectedAnalysisTab).map((tab) => {
                  return (
                    <button
                      key={tab.label}
                      active={selectedAnalysisTab === `${tab.label}`}
                      className={cx({
                        [styles.tabButton]: true,
                        [styles.tabButtonActive]:
                          selectedAnalysisTab === `${tab.label}`,
                      })}
                      type="button"
                      onClick={() => selectedAnalysisTab !== `${tab.label}`
                        && handleAnalysisTabClick(`${tab.label}`)}
                    >
                      {tab.icon}
                    </button>
                  );
                })}
              </div>
            </div>
            {selectedAnalysisTab === 'click' && (
              <div>
                <p className={styles.sectionLabel}>
                  <b>{t('Click on the map')}</b>
                  {' '}
                  {t('to select:')}
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
                  <b>{t('Search')}</b>
                  {' '}
                  {t('a country, region or protected areas')}
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
                <p className={styles.sectionLabel}>
                  {t('Draw shape smaller than')}
                  {' '}
                  <b>
                    {localeFormatting(HIGHER_AREA_SIZE_LIMIT)}
                    km
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
                  {t(
                    'Upload your own shapefile. The shape should be smaller than',
                  )}
                  {' '}
                  <b>{localeFormatting(HIGHER_AREA_SIZE_LIMIT)}</b>
                  {' '}
                  {t('approximately the size of Belgium.')}
                </p>

                <p className={styles.sectionSubtitleLabel}>
                  {t('Learn more about shape files')}
                  {' '}
                  <a href="https://enterprise.arcgis.com/es/portal/latest/use/shapefiles.htm">
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
          </>
        )}

        {!REACT_APP_FEATURE_NEW_MENUS && (
          <div>
            <div className={styles.buttonsContainer}>
              <Button
                type="square"
                label={t('Click on the map')}
                Icon={AoisClickIcon}
                active={selectedAnalysisTab === 'click'}
                handleClick={() => selectedAnalysisTab !== 'click'
                  && handleAnalysisTabClick('click')}
              />
              <Button
                type="square"
                label={t('Define region of interest')}
                Icon={AoisDrawIcon}
                active={selectedAnalysisTab === 'draw'}
                handleClick={() => selectedAnalysisTab !== 'draw'
                  && handleAnalysisTabClick('draw')}
              />
            </div>
            {selectedAnalysisTab === 'click' && (
              <section className={styles.sectionContainer}>
                <span className={styles.label}>
                  {t('Choose your area of interest')}
                </span>
                <div className={styles.dropdownContainer}>
                  <Dropdown
                    stacked
                    theme="dark"
                    width="full"
                    parentWidth="380px"
                    options={precalculatedAOIOptions}
                    selectedOption={selectedOption}
                    handleOptionSelection={handleOptionSelection}
                  />
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
                <Button
                  type="compound"
                  Icon={AreasHistoryIcon}
                  label={t('Open your analyzed areas history.')}
                  className={styles.areasHistoryButton}
                  theme={styles.areasHistoryButton}
                  handleClick={handleAoiModalToggle}
                />
              </section>
            )}
            {selectedAnalysisTab === 'draw' && (
              <section className={styles.sectionContainer}>
                <div
                  className={cx(styles.sizeWarningContainer, {
                    [styles.active]: geometryArea > HIGHER_AREA_SIZE_LIMIT,
                  })}
                >
                  <InfoIcon className={styles.info} />
                  <span className={styles.warning}>
                    {t('Draw or upload a shape smaller than')}
                    {' '}
                    <b>
                      {localeFormatting(HIGHER_AREA_SIZE_LIMIT)}
                      km
                      <sup>2</sup>
                    </b>
                    .
                  </span>
                </div>
                <span className={styles.label}>
                  {t('Draw on the map the area you want to analyze:')}
                </span>
                <Button
                  type="rectangular"
                  label={
                    isSketchToolActive
                      ? t('cancel drawing')
                      : t('start drawing')
                  }
                  handleClick={handleDrawClick}
                />
                <span className={styles.separatorLabel}>{t('or')}</span>
                <ShapeFileUploader
                  view={view}
                  onSuccess={onShapeUploadSuccess}
                  onError={onShapeUploadError}
                />
              </section>
            )}
          </div>
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
  if (!REACT_APP_FEATURE_NEW_MENUS) {
    return (
      <div
        className={cx(styles.sidebarCardContainerOLD, className, {
          [styles.open]: isOpen,
          [styles.onboardingOverlay]:
            onboardingType === 'priority-places' && onboardingStep === 2,
        })}
      >
        <CategoryBox
          title={t('Analyze areas')}
          Icon={AnalyzeAreasOLDIcon}
          handleBoxClick={handleBoxClick}
          isOpen={isOpen}
        />
        <div
          className={cx(styles.cardContentContainer, { [styles.open]: isOpen })}
        >
          <h2 className={styles.subtitle}>
            {t('Analyze pre-calculated areas or your own custom area.')}
          </h2>
          <div>
            <div className={styles.buttonsContainer}>
              <Button
                type="square"
                label={t('Click on the map')}
                Icon={AoisClickIcon}
                active={selectedAnalysisTab === 'click'}
                handleClick={() => selectedAnalysisTab !== 'click'
                  && handleAnalysisTabClick('click')}
              />
              <Button
                type="square"
                label={t('Draw or upload a shape')}
                Icon={AoisDrawIcon}
                active={selectedAnalysisTab === 'draw'}
                handleClick={() => selectedAnalysisTab !== 'draw'
                  && handleAnalysisTabClick('draw')}
              />
            </div>
            {selectedAnalysisTab === 'click' && (
              <section className={styles.sectionContainer}>
                <span className={styles.label}>
                  {t('Choose your area of interest')}
                </span>
                <div className={styles.dropdownContainer}>
                  <Dropdown
                    stacked
                    theme="dark"
                    width="full"
                    parentWidth="380px"
                    options={precalculatedAOIOptions}
                    selectedOption={selectedOption}
                    handleOptionSelection={handleOptionSelection}
                  />
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
                <Button
                  type="compound"
                  Icon={AreasHistoryIcon}
                  label={t('Open your analyzed areas history.')}
                  className={styles.areasHistoryButton}
                  theme={styles.areasHistoryButton}
                  handleClick={handleAoiModalToggle}
                />
              </section>
            )}
            {selectedAnalysisTab === 'draw' && (
              <section className={styles.sectionContainer}>
                <div
                  className={cx(styles.sizeWarningContainer, {
                    [styles.active]: geometryArea > HIGHER_AREA_SIZE_LIMIT,
                  })}
                >
                  <InfoIcon className={styles.info} />
                  <span className={styles.warning}>
                    {t('Draw or upload a shape smaller than')}
                    {' '}
                    <b>
                      {localeFormatting(HIGHER_AREA_SIZE_LIMIT)}
                      km
                      <sup>2</sup>
                    </b>
                    .
                  </span>
                </div>
                <span className={styles.label}>
                  {t('Draw on the map the area you want to analyze:')}
                </span>
                <Button
                  type="rectangular"
                  label={
                    isSketchToolActive
                      ? t('cancel drawing')
                      : t('start drawing')
                  }
                  handleClick={handleDrawClick}
                />
                <span className={styles.separatorLabel}>{t('or')}</span>
                <ShapeFileUploader
                  view={view}
                  onSuccess={onShapeUploadSuccess}
                  onError={onShapeUploadError}
                />
                <Button
                  type="compound"
                  Icon={AreasHistoryIcon}
                  label={t('Open your analyzed areas history.')}
                  className={styles.areasHistoryButton}
                  handleClick={handleAoiModalToggle}
                />
              </section>
            )}
          </div>

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
      </div>
    );
  }
}

export default AnalyzeAreasCardComponent;
