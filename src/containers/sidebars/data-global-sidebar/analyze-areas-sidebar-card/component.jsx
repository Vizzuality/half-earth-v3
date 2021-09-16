import React, { useState } from 'react';
import cx from 'classnames';
import CategoryBox from 'components/category-box';
import Button from 'components/button';
import Dropdown from 'components/dropdown';
import {ReactComponent as AnalyzeAreasIcon} from "icons/analyze_areas.svg";
import {ReactComponent as AoisClickIcon} from "icons/globe.svg";
import {ReactComponent as AddShapeIcon} from "icons/add_shape_icon.svg";
import {ReactComponent as AreasHistoryIcon} from "icons/areas_history_icon.svg";
import { PRECALCULATED_AOI_OPTIONS } from 'constants/analyze-areas-constants';
import styles from './styles.module.scss';

const AnalyzeAreasCardComponent = ({
  selectedOption,
  handleDrawClick,
  isSketchToolActive,
  handleOptionSelection
}) => {
  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);
  const [selectedAnalysis, setSelectedAnalysis] = useState('click');

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
            active={selectedAnalysis === 'click'}
            handleClick={() => setSelectedAnalysis('click')}
          />
          <Button
            type="square"
            label="Draw or upload a shape"
            Icon={AoisClickIcon}
            active={selectedAnalysis === 'draw'}
            handleClick={() => setSelectedAnalysis('draw')}
          />
        </div>
        {selectedAnalysis === 'click' && (
          <div className={styles.dropdownContainer}>
            <span className={styles.label}>Analyze an area prompt on:</span>
            <Dropdown
                theme={'dark'}
                width="full"
                parentWidth="380px"
                options={PRECALCULATED_AOI_OPTIONS}
                selectedOption={selectedOption}
                handleOptionSelection={handleOptionSelection}
              />
              <Button 
                type="compound"
                Icon={AreasHistoryIcon}
                label="Open your analyzed areas history"
                className={styles.areasHistoryButton}
                theme={styles.areasHistoryButton}
              />
          </div>
        )}
        {selectedAnalysis === 'draw' && (
          <div className={styles.drawPromptContainer}>
            <span className={styles.label}>Draw on the map the area you want to analyze:</span>
            <Button
              type="rectangular"
              label={isSketchToolActive ? "cancel drawing" : "start drawing"}
              handleClick={handleDrawClick}
            />
            <span className={styles.separatorLabel}>or</span>
            <div className={styles.shapeUploader}>
              <Button 
                className={styles.uploadShapeButton}
                Icon={AddShapeIcon}
                handleClick={() => console.log('upload')}
              />
              <span className={styles.label}>Add a shapefile from your computer</span>
            </div>
            <Button 
              type="compound"
              Icon={AreasHistoryIcon}
              label="Open your analyzed areas history"
              className={styles.areasHistoryButton}
            />
          </div>
        )}
      </div>
    </div>
  )

}

export default AnalyzeAreasCardComponent;