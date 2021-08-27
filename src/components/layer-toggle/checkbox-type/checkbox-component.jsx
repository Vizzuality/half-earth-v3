import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';

import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { ReactComponent as OpacityIcon } from 'icons/opacity.svg';
import { ReactComponent as BringToBackIcon } from 'icons/bring_to_back.svg';
import { ReactComponent as BringToFrontIcon } from 'icons/bring_to_front.svg';

import styles from './checkbox-styles.module.scss';

const Checkbox = ({ option, onChange, checked, theme, handleInfoClick }) => {
  return (
    <div key={option.name} className={cx(
      styles.checkboxWrapper,
      { [styles.checkboxWrapperSelected]: checked, [theme]: checked }
    )}>
      <input
        type="checkbox"
        value={option.value}
        name={option.name}
        id={option.value}
        checked={checked}
        onChange={(e) => onChange(e, option)}
      />
      <label htmlFor={option.value} className={cx(styles.checkbox, { [styles.checkboxSelected]: checked })}>
        <span className={styles.label}>{option.name}</span>
        {option.rightDot && !checked && <span className={styles.rightDot} style={{ background: option.rightDot }} />}
      </label>
      {checked && (
      <>
        <BringToFrontIcon
          className={styles.icon}
          onClick={() => handleInfoClick(option)}
          data-tip
          data-for='infoLayerCheckboxButtonId'
          data-effect='solid'
          data-delay-show={0}
        />
        <BringToBackIcon
          className={styles.icon}
          onClick={() => handleInfoClick(option)}
          data-tip
          data-for='infoLayerCheckboxButtonId'
          data-effect='solid'
          data-delay-show={0}
        />
        <OpacityIcon
          className={styles.icon}
          onClick={() => handleInfoClick(option)}
          data-tip
          data-for='infoLayerCheckboxButtonId'
          data-effect='solid'
          data-delay-show={0}
        />
        <InfoIcon
          className={styles.icon}
          onClick={() => handleInfoClick(option)}
          data-tip
          data-for='infoLayerCheckboxButtonId'
          data-effect='solid'
          data-delay-show={0}
        />
        <ReactTooltip id='infoLayerCheckboxButtonId' className='infoTooltipStyle'>
          Click to read the info of this layer
        </ReactTooltip>
      </>
      )}
    </div>
  )}

export default Checkbox;

Checkbox.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  theme: PropTypes.string
};

Checkbox.defaultProps = {
  options: [],
  onChange: () => {},
  checked: false,
  theme: ''
};
