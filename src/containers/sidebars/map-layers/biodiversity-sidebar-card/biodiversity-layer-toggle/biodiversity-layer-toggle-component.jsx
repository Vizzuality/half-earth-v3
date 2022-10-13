import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import Dropdown from 'components/dropdown';
import GroupedSelect from 'components/grouped-select';
import LayerTools from 'components/layer-toggle/layers-tools';
import RadioButton from 'components/radio-button';

import { BIODIVERSITY_SLUG } from 'constants/analyze-areas-constants';
import { TERRESTRIAL, MARINE } from 'constants/biodiversity-layers-constants';

import theme from 'styles/themes/checkboxes-theme.module.scss';

import styles from './biodiversity-layer-toggle.module.scss';

function BiodiversityLayerToggle({
  activeLayers,
  disabledResolutionDropdown,
  handleInfoClick,
  groupedOptions,
  handleBringToBackClick,
  handleBringToFrontClick,
  onOpacityClick,
  onLayerChange,
  selectedLayerOption,
  resolutionOptions,
  selectedResolutionOption,
  handleResolutionSelection,
  category,
  isChecked,
}) {
  return (
    <div
      className={cx(styles.container, styles.light, theme[BIODIVERSITY_SLUG], {
        [styles.checked]: isChecked,
      })}
    >
      {/* Radio option with layer dropdown */}
      <div className={styles.radioOption}>
        {selectedLayerOption && (
          <RadioButton
            id={`radio-button-${category}`}
            theme={theme.biodiversity}
            name={category}
            option={selectedLayerOption}
            checked={isChecked}
            onChange={onLayerChange}
            hideLabel
          />
        )}
        {selectedLayerOption && (
          <GroupedSelect
            selectedOption={selectedLayerOption}
            groupedOptions={groupedOptions}
            onSelect={onLayerChange}
          />
        )}
      </div>
      {/* Resolution dropdown */}
      {selectedLayerOption && (
        <Dropdown
          theme="dark"
          parentWidth="100px"
          options={resolutionOptions}
          selectedOption={selectedResolutionOption}
          handleOptionSelection={(option) =>
            handleResolutionSelection(option.slug)
          }
          disabled={disabledResolutionDropdown}
          className={styles.resolutionDropown}
        />
      )}
      {selectedLayerOption && (
        <LayerTools
          option={selectedLayerOption}
          onInfoClick={handleInfoClick}
          activeLayers={activeLayers}
          onOpacityClick={onOpacityClick}
          onBringToBackClick={handleBringToBackClick}
          onBringToFrontClick={handleBringToFrontClick}
        />
      )}
    </div>
  );
}

BiodiversityLayerToggle.propTypes = {
  activeLayers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  disabledResolutionDropdown: PropTypes.bool,
  handleInfoClick: PropTypes.func.isRequired,
  groupedOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedLayerOption: PropTypes.shape({}).isRequired,
  handleBringToBackClick: PropTypes.func.isRequired,
  handleBringToFrontClick: PropTypes.func.isRequired,
  onOpacityClick: PropTypes.func,
  onLayerChange: PropTypes.func.isRequired,
  handleResolutionSelection: PropTypes.func.isRequired,
  resolutionOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedResolutionOption: PropTypes.shape({}).isRequired,
  category: PropTypes.oneOf([TERRESTRIAL, MARINE]).isRequired,
};

BiodiversityLayerToggle.defaultProps = {
  disabledResolutionDropdown: false,
  onOpacityClick: undefined,
};

export default BiodiversityLayerToggle;