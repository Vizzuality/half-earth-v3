import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import InfoModal from 'components/modal-metadata';

import styles from './checkbox-styles.module.scss';

const Checkbox = ({ option, onChange, checked, theme }) => {
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
        defaultChecked={checked}
        onChange={(e) => onChange(e, option)} 
      />
      <label htmlFor={option.value} className={cx(styles.checkbox, { [styles.checkboxSelected]: checked })}>
        <span className={styles.label}>{option.name}</span>
      </label>
      {checked && <InfoModal />}
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