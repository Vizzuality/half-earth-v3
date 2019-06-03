import React from 'react';
import PropTypes from 'prop-types';

import RadioGroup from 'components/radio-group';

import styles from './biodiversity-layers-styles.module.scss';

const BiodiversityLayers = ({ map, title, description, options, subcategories, defaultSelection, handleLayerUpdate }) => {
  return (
    <>
      {!subcategories ? (
        <div className={styles.wrapper}>
          <div className={styles.titleSection}>
            <h2 className={styles.widgetTitle}>{title}</h2>
          </div>
          <p className={styles.description}>{description}</p>
          <RadioGroup options={options} title={title} defaultSelection={defaultSelection} handleLayerToggle={handleLayerUpdate}/>
        </div>
      ) : (
        <div className={styles.fineScaleWrapper}>
          <div className={styles.titleSection}>
            <h2 className={styles.widgetTitle}>{title}</h2>
          </div>
          <p className={styles.description}>{description}</p>
          {
            subcategories.map(subct => (
              <>
                <h2 className={styles.widgetTitle}>{subct.name}</h2>
                <div className={styles.subcategoryRadioContainer}>
                  <RadioGroup options={subct.taxa} title={title} defaultSelection={defaultSelection} handleLayerToggle={handleLayerUpdate}/>
                </div>
              </>
            ))
          }
        </div>
      )
      }
    </>
    
  )}


BiodiversityLayers.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  options: PropTypes.array
};

BiodiversityLayers.defaultProps = {
  title: '',
  description: '',
  options: []
};

export default BiodiversityLayers;