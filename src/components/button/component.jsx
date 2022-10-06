import React from 'react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import styles from './styles.module.scss';

function Component({
  type,
  Icon,
  label,
  active,
  className,
  handleClick,
  tooltipText,
  onboardingOverlay,
  reference,
}) {
  return (
    <motion.button
      {...onboardingOverlay}
      ref={reference}
      onClick={handleClick}
      title={tooltipText}
      className={cx(className, {
        [styles[type]]: type,
        [styles.active]: active,
      })}
    >
      {Icon && <Icon className={styles.icon} />}
      {label && <span className={styles.label}>{label}</span>}
    </motion.button>
  );
}

export default Component;
