import React, { useState } from 'react';
import cx from 'classnames';
import CategoryBox from 'components/category-box';
import Button from 'components/button';
import Dropdown from 'components/dropdown';
import ShapeFileUploader from 'components/shape-file-uploader';
import SearchLocation from 'components/search-location';
import AoiHistoryModal from 'containers/modals/aoi-history-modal';
import PromptModal from 'containers/modals/prompt-modal';
import { ReactComponent as AnalyzeAreasIcon } from 'icons/analyze_areas.svg';
import { ReactComponent as AoisDrawIcon } from 'icons/aois_draw.svg';
import { ReactComponent as AoisClickIcon } from 'icons/aois_click.svg';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { ReactComponent as AreasHistoryIcon } from 'icons/areas_history_icon.svg';
import {
  PRECALCULATED_AOI_OPTIONS,
  HIGHER_AREA_SIZE_LIMIT,
} from 'constants/analyze-areas-constants';
import { localeFormatting } from 'utils/data-formatting-utils';
import styles from './styles.module.scss';

const AnalyzeAreasCardComponent = ({
  view,
  geometryArea,
  selectedOption,
  handleDrawClick,
  isPromptModalOpen,
  promptModalContent,
  isSketchToolActive,
  onShapeUploadError,
  selectedAnalysisTab,
  onShapeUploadSuccess,
  handleOptionSelection,
  handleAnalysisTabClick,
  handlePromptModalToggle,
  aoiHistoryModalOpenAnalytics,
}) => {
  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);
  const [isAoiHistoryModalOpen, setAoiHistoryModalOpen] = useState(false);
  const handleAoiModalToggle = () => {
    if (!isAoiHistoryModalOpen) {
      aoiHistoryModalOpenAnalytics();
    }
    setAoiHistoryModalOpen(!isAoiHistoryModalOpen);
  };

  return (
    <div className={cx(styles.sidebarCardContainer, { [styles.open]: isOpen })}>
      <CategoryBox
        title="Analyze areas"
        Icon={AnalyzeAreasIcon}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div
        className={cx(styles.cardContentContainer, { [styles.open]: isOpen })}
      >
        <div className={styles.buttonsContainer}>
          <Button
            type="square"
            label="Click on the map"
            Icon={AoisClickIcon}
            active={selectedAnalysisTab === 'click'}
            handleClick={() => handleAnalysisTabClick('click')}
          />
          <Button
            type="square"
            label="Draw or upload a shape"
            Icon={AoisDrawIcon}
            active={selectedAnalysisTab === 'draw'}
            handleClick={() => handleAnalysisTabClick('draw')}
          />
        </div>
        {selectedAnalysisTab === 'click' && (
          <section className={styles.sectionContainer}>
            <span className={styles.label}>Analyze an area by searching:</span>
            <div className={styles.dropdownContainer}>
              <Dropdown
                stacked
                theme={'dark'}
                width="full"
                parentWidth="380px"
                options={PRECALCULATED_AOI_OPTIONS}
                selectedOption={selectedOption}
                handleOptionSelection={handleOptionSelection}
              />
              <SearchLocation
                stacked
                view={view}
                theme={'dark'}
                width="full"
                parentWidth="380px"
                searchSourceLayerSlug={selectedOption.slug}
              />
            </div>
            <Button
              type="compound"
              Icon={AreasHistoryIcon}
              label="Open your analyzed areas history"
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
                Draw or upload a shape smaller than{' '}
                <b>
                  {localeFormatting(HIGHER_AREA_SIZE_LIMIT)}km<sup>2</sup>
                </b>
                .
              </span>
            </div>
            <span className={styles.label}>
              Draw on the map the area you want to analyze:
            </span>
            <Button
              type="rectangular"
              label={isSketchToolActive ? 'cancel drawing' : 'start drawing'}
              handleClick={handleDrawClick}
            />
            <span className={styles.separatorLabel}>or</span>
            <ShapeFileUploader
              view={view}
              onSuccess={onShapeUploadSuccess}
              onError={onShapeUploadError}
            />
            <Button
              type="compound"
              Icon={AreasHistoryIcon}
              label="Open your analyzed areas history"
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
  );
};

export default AnalyzeAreasCardComponent;
