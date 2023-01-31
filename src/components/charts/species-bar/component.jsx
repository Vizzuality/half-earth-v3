import React from 'react';

import Tooltip from '@tippyjs/react';
import cx from 'classnames';

import styles from './styles.module.scss';

import { ReactComponent as InfoIcon } from 'icons/infoTooltip.svg';

function Component({
  title,
  className,
  percentage,
  barAnnotation,
  tooltipContent = 'More info',
  theme = 'light',
}) {
  let titlePosition = barAnnotation;
  let updatedBarAnnotation = barAnnotation;
  if (barAnnotation < 18) {
    titlePosition = 18;
  } else if (barAnnotation > 82) {
    updatedBarAnnotation = 82;
  }
  return (
    <section
      className={cx(className, styles.container, {
        [styles.dark]: theme === 'dark',
      })}
    >
      <div className={styles.barTitleWrapper}>
        <p className={styles.barTitle}>{title}</p>
        <span className={styles.iconWrapper}>
          <Tooltip
            className="light"
            content={<div className={styles.tooltip}>{tooltipContent}</div>}
            delay={100}
            position="bottom"
          >
            <InfoIcon className={styles.icon} />
          </Tooltip>
        </span>
      </div>
      <div className={styles.barWrapper}>
        <div className={styles.bar}>
          <div className={styles.value} style={{ width: `${percentage}%` }} />
          {barAnnotation && (
            <div
              className={styles.annotationBar}
              style={{ left: `${updatedBarAnnotation}%` }}
            />
          )}
          <div
            className={styles.annotation}
            style={{ left: `${titlePosition}%` }}
          />
        </div>
      </div>
    </section>
  );
}

export default Component;
