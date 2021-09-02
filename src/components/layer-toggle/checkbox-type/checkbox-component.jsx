import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import LayerTools from 'components/layer-toggle/layers-tools';

import styles from './checkbox-styles.module.scss';

const Checkbox = ({
  theme,
  option,
  isChecked,
  onClick,
  handleInfoClick,
  onBringToFrontClick,
  onBringToBackClick,
  onOpacityClick,
 }) => {
  return (
    <div 
      key={option.name}
      onClick={(e) => onClick(e,option)}
      className={cx(
        styles.checkboxWrapper,
        { [styles.checkboxWrapperSelected]: isChecked, [theme]: isChecked }
      )}
    >
      <input
        type="checkbox"
        value={option.value}
        name={option.name}
        id={option.value}
        checked={isChecked}
      />
      <label htmlFor={option.value} className={cx(styles.checkbox, { [styles.checkboxSelected]: isChecked })}>
        <span className={styles.label}>{option.name}</span>
        {option.rightDot && !isChecked && <span className={styles.rightDot} style={{ background: option.rightDot }} />}
      </label>
      {isChecked && (
        <LayerTools 
          option={option}
          handleInfoClick={handleInfoClick}
          onOpacityClick={onOpacityClick}
          onBringToBackClick={onBringToBackClick}
          onBringToFrontClick={onBringToFrontClick}
        />
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
