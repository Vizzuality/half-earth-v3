import React, { useState } from 'react';
import cx from 'classnames';
import CategoryBox from 'components/category-box';
import Button from 'components/button';
import Dropdown from 'components/dropdown';
import ShapeFileUploader from 'components/shape-file-uploader';
import SearchLocation from 'components/search-location';
import {ReactComponent as AnalyzeAreasIcon} from "icons/analyze_areas.svg";
import {ReactComponent as AoisDrawIcon} from "icons/aois_draw.svg";
import {ReactComponent as AoisClickIcon} from "icons/aois_click.svg";
import {ReactComponent as AreasHistoryIcon} from "icons/areas_history_icon.svg";
import { PRECALCULATED_AOI_OPTIONS } from 'constants/analyze-areas-constants';
import styles from './styles.module.scss';

const AnalyzeAreasCardComponent = ({
  view,
  selectedOption,
  handleDrawClick,
  isSketchToolActive,
  selectedAnalysisTab,
  handleOptionSelection,
  onFeatureSetGenerated,
  handleAnalysisTabClick,
}) => {
  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);
  
  return (
    <div className={cx(
      styles.sidebarCardContainer,
      { [styles.open]: isOpen }
    )}>
      <CategoryBox
        title="Analyze areas"
        Icon={AnalyzeAreasIcon}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div
        className={cx(
          styles.cardContentContainer,
          { [styles.open]: isOpen }
        )}
      >
        <div className={styles.buttonsContainer}>
          <Button
            type="square"
            label="By clicking on the map"
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
            <span className={styles.label}>Analyze an area prompt on:</span>
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
            />
          </section>
        )}
        {selectedAnalysisTab === 'draw' && (
          <section className={styles.sectionContainer}>
            <span className={styles.label}>Draw on the map the area you want to analyze:</span>
            <Button
              type="rectangular"
              label={isSketchToolActive ? "cancel drawing" : "start drawing"}
              handleClick={handleDrawClick}
            />
            <span className={styles.separatorLabel}>or</span>
            <ShapeFileUploader
              view={view}
              onFeatureSetGenerated={onFeatureSetGenerated}
            />
            <Button 
              type="compound"
              Icon={AreasHistoryIcon}
              label="Open your analyzed areas history"
              className={styles.areasHistoryButton}
            />
          </section>
        )}
      </div>
    </div>
  )

}

export default AnalyzeAreasCardComponent;