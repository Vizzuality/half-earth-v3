import React from 'react';
import cx from 'classnames';
import { useT } from '@transifex/react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';

const SidebarLegend = ({ legendItem, className, theme }) => {
  const t = useT();
  return (
    <div className={cx(className, styles.container)}>
      <div className={styles.gradientWrapper}>
        <div className={cx(styles.gradient, styles[legendItem])} />
      </div>
      <div
        className={cx(styles.valuesWrapper, {
          [styles.light]: theme === 'light',
        })}
      >
        <span>{t('low')}</span>
        <span>{t('high')}</span>
      </div>
    </div>
  );
};

SidebarLegend.propTypes = {
  legendItem: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.string,
};

SidebarLegend.defaultProps = {
  theme: 'dark',
};

export default SidebarLegend;
