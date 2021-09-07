import React, { useState } from 'react';
import cx from 'classnames';
import CategoryBox from 'components/category-box';
import Button from 'components/button';
import Dropdown from 'components/dropdown';
import {ReactComponent as AnalyzeAreasIcon} from "icons/analyze_areas.svg";
import {ReactComponent as AoisClickIcon} from "icons/globe.svg";
import {ReactComponent as AddShapeIcon} from "icons/add_shape_icon.svg";
import {ReactComponent as AreasHistoryIcon} from "icons/areas_history_icon.svg";
import styles from './styles.module.scss';

const AnalyzeAreasCardComponent = ({}) => {
  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);
  const [selectedAnalysis, setSelectedAnalysis] = useState('click');

  const options = [
    {slug: 'political-boundaries', label: 'Politica boundaries'}
  ]

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
              width={'full'}
              options={options}
              selectedOption={options[0]}
              handleOptionSelection={(op) => console.log(op)}
            />
            <Button 
              type="compound"
              Icon={AreasHistoryIcon}
              label="Open your analyzed areas history"
              className={styles.areasHistoryButton}
            />
          </div>
        )}
        {selectedAnalysis === 'draw' && (
          <div className={styles.drawPromptContainer}>
            <span className={styles.label}>Draw on the map the area you want to analyze:</span>
            <Button
              type="rectangular"
              label="start drawing"
              handleClick={() => console.log('draw')}
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