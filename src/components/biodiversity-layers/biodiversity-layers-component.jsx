import React from 'react';
import PropTypes from 'prop-types';

import RadioGroup from 'components/radio-group';

import styles from './biodiversity-layers-styles.module.scss';

const BiodiversityLayers = ({
  activeLayers,
  title,
  description,
  options,
  subcategories,
  handleSimpleLayerToggle,
  handleExclusiveLayerToggle
}) => {
  return (
    <>
      {!subcategories ? (
        <div className={styles.wrapper}>
          <div className={styles.titleSection}>
            <h2 className={styles.widgetTitle}>{title}</h2>
          </div>
          <p className={styles.description}>{description}</p>
          <RadioGroup
            activeLayers={activeLayers}
            title={title}
            options={options}
            handleExclusiveLayerToggle={handleExclusiveLayerToggle}
            handleSimpleLayerToggle={handleSimpleLayerToggle}
          />
        </div>
      ) : (
        <div className={styles.fineScaleWrapper}>
          <div className={styles.titleSection}>
            <h2 className={styles.widgetTitle}>{title}</h2>
          </div>
          <p className={styles.description}>{description}</p>
          {
            subcategories.map(subct => (
              <div className={styles.widgetWrapper} key={subct.name}>
                <h2 className={styles.widgetSubTitle}>{subct.name}</h2>
                <div className={styles.subcategoryRadioContainer}>
                  <RadioGroup
                    activeLayers={activeLayers}
                    options={subct.taxa}
                    title={subct.name}
                    handleExclusiveLayerToggle={handleExclusiveLayerToggle}
                    handleSimpleLayerToggle={handleSimpleLayerToggle}
                  />
                </div>
              </div>
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
