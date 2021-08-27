import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { ReactComponent as OpacityIcon } from 'icons/opacity.svg';
import { ReactComponent as BringToBackIcon } from 'icons/bring_to_back.svg';
import { ReactComponent as BringToFrontIcon } from 'icons/bring_to_front.svg';

import RadioButton from 'components/radio-button';
import styles from './styles.module.scss';

const RadioGroup = ({
  isChecked,
  option,
  title,
  handleInfoClick,
  variant
}) => {
    const key = `radio-button-${title}-${option.value}-${variant}`;
    return (
      <div
        key={key}
        className={cx(styles.radioOption, {
          [styles.radioOptionSelected]: option.selected
        })}
      >
        <RadioButton
          name={title}
          value={option.value}
          checked={isChecked}
          id={key}
          text={option.name}
        />
        {isChecked && (
          <div className={styles.toggle}>
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
              onClick={() => handleInfoClick(option, variant)}
              data-tip
              data-for="infoLayerButtonId"
              data-effect="solid"
              data-delay-show={0}
            />
          </div>
        )}
      </div>
    );
};


RadioGroup.propTypes = {
  options: PropTypes.array
};

RadioGroup.defaultProps = {
  options: []
};

export default RadioGroup;
