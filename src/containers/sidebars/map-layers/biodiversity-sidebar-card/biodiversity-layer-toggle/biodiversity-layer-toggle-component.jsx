import { T } from '@transifex/react';

import PropTypes from 'prop-types';

import cx from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import parse from 'html-react-parser';

import GroupedSelect from 'components/grouped-select';
import LayerTools from 'components/layer-toggle/layers-tools';
import RadioButton from 'components/radio-button';

import { BIODIVERSITY_SLUG } from 'constants/analyze-areas-constants';
import {
  TERRESTRIAL_GLOBAL,
  TERRESTRIAL_REGIONAL,
  MARINE,
} from 'constants/biodiversity-layers-constants';

import theme from 'styles/themes/checkboxes-theme.module.scss';
import radioTheme from 'styles/themes/radio-theme.module.scss';

import styles from './biodiversity-layer-toggle.module.scss';

function BiodiversityLayerToggle({
  activeLayers,
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
      className={cx(styles.container, styles.light, {
        [styles.checked]: isChecked,
      })}
    >
      <div className={cx(styles.selectContainer, theme[BIODIVERSITY_SLUG])}>
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
      {selectedLayerOption && resolutionOptions.length > 1 && (
        <div className={styles.resolutionOptions}>
          <span className={styles.resolutionIntro}>
            <T _str="Resolution:" />
          </span>
          <span className={styles.checkboxes}>
            {resolutionOptions.map((option) => (
              <div key={option.slug}>
                <RadioButton
                  id={option.slug}
                  option={{ ...option, name: parse(option.label) }}
                  checked={selectedResolutionOption.slug === option.slug}
                  onChange={(o) => handleResolutionSelection(o.slug)}
                  theme={radioTheme}
                />
              </div>
            ))}
          </span>
        </div>
      )}
    </div>
  );
}

BiodiversityLayerToggle.propTypes = {
  activeLayers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  groupedOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedLayerOption: PropTypes.shape({}).isRequired,
  handleBringToBackClick: PropTypes.func.isRequired,
  handleBringToFrontClick: PropTypes.func.isRequired,
  onOpacityClick: PropTypes.func,
  onLayerChange: PropTypes.func.isRequired,
  resolutionOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedResolutionOption: PropTypes.shape({}).isRequired,
  category: PropTypes.oneOf([TERRESTRIAL_GLOBAL, TERRESTRIAL_REGIONAL, MARINE])
    .isRequired,
};

BiodiversityLayerToggle.defaultProps = {
  onOpacityClick: undefined,
};

export default BiodiversityLayerToggle;
