import React from 'react';

import { useT } from '@transifex/react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './styles.module.scss';

function SidebarLegend({ legendItem, className, theme }) {
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
}

SidebarLegend.propTypes = {
  // eslint-disable-next-line react/require-default-props
  legendItem: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
  theme: PropTypes.string,
};

SidebarLegend.defaultProps = {
  theme: 'dark',
};

export default SidebarLegend;
