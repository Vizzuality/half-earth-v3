import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import Dropdown from 'components/dropdown';
import LayerTools from 'components/layer-toggle/layers-tools';
import RadioButton from 'components/radio-button';

import {
  TERRESTRIAL,
  GROUPED_OPTIONS,
} from 'constants/biodiversity-layers-constants';

import theme from 'styles/themes/checkboxes-theme.module.scss';

import styles from './styles.module.scss';

function BiodiversityLayerToggle({
  activeLayers,
  handleInfoClick,
  layers,
  layerToggleAnalytics,
  onBringToBackClick,
  onBringToFrontClick,
  onOpacityClick,
  onChange,
  resolutions,
  resolutionOptions,
  selectedResolution,
  setSelectedResolution,
  themeCategorySlug,
  title,
  variant,
}) {
  const [selectedLayer, setSelectedLayer] = useState(layers[0]);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    const newChecked = activeLayers.some((layer) => layer.title === selectedLayer.value);
    setIsChecked(newChecked);
    if (newChecked) { layerToggleAnalytics(selectedLayer.value); }
  }, [activeLayers]);

  const key = `radio-button-${title}-${selectedLayer.value}-${variant}`;

  return (
    <div
      className={cx(
        styles.container,
        {
          [styles[variant]]: variant,
          [theme[themeCategorySlug]]: themeCategorySlug,
          [styles.checked]: isChecked,
        },
      )}
    >
      <div className={styles.radioOption}>
        <RadioButton
          id={key}
          theme={theme.biodiversity}
          name={title}
          option={selectedLayer}
          checked={isChecked}
          onChange={onChange}
          biodiversityToggle
          groupedOptions={GROUPED_OPTIONS(layers)}
          setSelectedLayer={setSelectedLayer}
        />
      </div>

      <Dropdown
        theme="dark"
        parentWidth="170px"
        options={resolutionOptions}
        selectedOption={resolutions[selectedResolution[TERRESTRIAL]]}
        handleOptionSelection={(op) => setSelectedResolution({
          ...selectedResolution,
          [TERRESTRIAL]: op.slug,
        })}
        disabled={resolutionOptions.length < 2}
        className={styles.resolutionDropown}
      />

      <LayerTools
        option={selectedLayer}
        onInfoClick={handleInfoClick}
        activeLayers={activeLayers}
        onOpacityClick={onOpacityClick}
        onBringToBackClick={onBringToBackClick}
        onBringToFrontClick={onBringToFrontClick}
      />

    </div>
  );
}

BiodiversityLayerToggle.propTypes = {
  activeLayers: PropTypes.shape({}).isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  layers: PropTypes.shape({}).isRequired,
  layerToggleAnalytics: PropTypes.func.isRequired,
  onBringToBackClick: PropTypes.func.isRequired,
  onBringToFrontClick: PropTypes.func.isRequired,
  onOpacityClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  resolutions: PropTypes.objectOf.isRequired,
  resolutionOptions: PropTypes.shape({}).isRequired,
  selectedResolution: PropTypes.func.isRequired,
  setSelectedResolution: PropTypes.func.isRequired,
  themeCategorySlug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default BiodiversityLayerToggle;
