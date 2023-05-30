import React from 'react';

import { T } from '@transifex/react';

import Tooltip from '@tippyjs/react';
import cx from 'classnames';

import styles from './styles.module.scss';

import { ReactComponent as InfoIcon } from 'icons/infoTooltip.svg';

function SpeciesBar({
  title,
  className,
  percentage,
  barAnnotation,
  tooltipContent = 'More info',
  theme = 'light',
}) {
  const renderTitle = () => (
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
  );
  const renderBar = () => (
    <Tooltip
      className="light"
      content={
        <div className={styles.tooltip}>
          {barAnnotation ? (
            <>
              <div>
                <T _str="Protection:" _comment="Protection: 5%" /> {percentage}%
              </div>
              <div>
                <T _str="Target:" _comment="Target: 5%" /> {barAnnotation}%
              </div>
            </>
          ) : (
            <>{Math.round(percentage)}%</>
          )}
        </div>
      }
      delay={100}
      position="bottom"
    >
      <div className={styles.barWrapper}>
        <div className={styles.bar}>
          <div className={styles.value} style={{ width: `${percentage}%` }} />
          {barAnnotation && (
            <div
              className={styles.annotationBar}
              style={{ left: `${barAnnotation}%` }}
            />
          )}
        </div>
      </div>
    </Tooltip>
  );

  return (
    <section
      className={cx(className, styles.container, {
        [styles.dark]: theme === 'dark',
      })}
    >
      {renderTitle()}
      {renderBar()}
    </section>
  );
}

export default SpeciesBar;
