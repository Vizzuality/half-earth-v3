import React from 'react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import styles from './styles.module.scss';

interface ButtonProps {
  type: 'rectangular' | 'rectangular-primary' | 'icon' | 'icon-square';
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  label?: string;
  active?: boolean;
  className?: string;
  handleClick: () => void;
  tooltipText?: string;
  onboardingOverlay?: any;
  reference?: any;
}

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
}: ButtonProps) {
  return (
    <motion.button
      {...onboardingOverlay}
      ref={reference}
      onClick={handleClick}
      title={tooltipText}
      className={cx(className, {
        [styles[type]]: type,
        [styles.iconSquare]: type === 'icon-square',
        [styles.active]: active,
      })}
    >
      {Icon && <Icon className={styles.icon} />}
      {label && <span className={styles.label}>{label}</span>}
    </motion.button>
  );
}

Component.defaultProps = {
  Icon: undefined,
  label: undefined,
  reference: undefined,
  onboardingOverlay: undefined,
  tooltipText: undefined,
  className: undefined,
  active: undefined,
};

export default Component;
