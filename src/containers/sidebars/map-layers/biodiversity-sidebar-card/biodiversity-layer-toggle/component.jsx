import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import Dropdown from 'components/dropdown';
import LayerTools from 'components/layer-toggle/layers-tools';
import RadioButton from 'components/radio-button';

import { TERRESTRIAL, MARINE } from 'constants/biodiversity-layers-constants';

import theme from 'styles/themes/checkboxes-theme.module.scss';

import styles from './styles.module.scss';

function BiodiversityLayerToggle({
  activeLayers,
  disabled,
  handleInfoClick,
  layers,
  groupedOptions,
  layerToggleAnalytics,
  handleBringToBackClick,
  handleBringToFrontClick,
  onOpacityClick,
  onChange,
  resolutionOptions,
  selectedOption,
  selectedResolutions,
  setSelectedResolutions,
  speciesType,
  themeCategorySlug,
  variant,
}) {
  const [selectedLayer, setSelectedLayer] = useState(layers[0]);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    const newChecked = activeLayers.some(
      (layer) => layer.title === selectedLayer.value
    );
    setIsChecked(newChecked);
    if (newChecked) {
      layerToggleAnalytics(selectedLayer.value);
    }
  }, [activeLayers]);

  const key = `radio-button-${speciesType}-${selectedLayer.value}-${variant}`;

  return (
    <div
      className={cx(styles.container, {
        [styles[variant]]: variant,
        [theme[themeCategorySlug]]: themeCategorySlug,
        [styles.checked]: isChecked,
      })}
    >
      <div className={styles.radioOption}>
        <RadioButton
          id={key}
          theme={theme.biodiversity}
          name={speciesType}
          option={selectedLayer}
          checked={isChecked}
          onChange={onChange}
          groupedOptions={groupedOptions}
          setSelectedLayer={setSelectedLayer}
        />
      </div>

      <Dropdown
        theme="dark"
        parentWidth="170px"
        options={resolutionOptions}
        selectedOption={selectedOption}
        handleOptionSelection={(op) =>
          setSelectedResolutions({
            ...selectedResolutions,
            [speciesType]: op.slug,
          })
        }
        disabled={disabled}
        className={styles.resolutionDropown}
      />

      <LayerTools
        option={selectedLayer}
        onInfoClick={handleInfoClick}
        activeLayers={activeLayers}
        onOpacityClick={onOpacityClick}
        onBringToBackClick={handleBringToBackClick}
        onBringToFrontClick={handleBringToFrontClick}
      />
    </div>
  );
}

BiodiversityLayerToggle.propTypes = {
  activeLayers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  layers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  groupedOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  layerToggleAnalytics: PropTypes.func.isRequired,
  handleBringToBackClick: PropTypes.func.isRequired,
  handleBringToFrontClick: PropTypes.func.isRequired,
  onOpacityClick: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  resolutionOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedResolutions: PropTypes.shape({}).isRequired,
  setSelectedResolutions: PropTypes.func.isRequired,
  speciesType: PropTypes.oneOf([TERRESTRIAL, MARINE]).isRequired,
  themeCategorySlug: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};
BiodiversityLayerToggle.defaultProps = {
  onOpacityClick: undefined,
};

export default BiodiversityLayerToggle;
