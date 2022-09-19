import React, { useEffect, useState, useRef } from 'react';

import { loadModules } from 'esri-loader';

import { useT } from '@transifex/react';

import cx from 'classnames';
import { format } from 'd3-format';

import { ReactComponent as CloseIcon } from 'icons/close.svg';

import styles from './future-place-tooltip-styles.module.scss';

function useClickOutside(ref, callback, exceptionRef) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref
        && ref.current
        && !ref.current.contains(event.target)
        && exceptionRef
        && exceptionRef.current
        && !exceptionRef.current.contains(event.target)
      ) {
        callback();
      }
    }

    // eslint-disable-next-line no-undef
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // eslint-disable-next-line no-undef
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

function AOIEntryTooltipComponent({
  view,
  tooltipContent,
  tooltipPosition,
  handleTooltipClose,
  onExploreAOIClick,
}) {
  const tooltipref = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const buttonRef = useRef(null);
  const t = useT();

  useClickOutside(tooltipref, () => handleTooltipClose(), buttonRef);

  // Create a new Popup to contain the tooltip
  useEffect(() => {
    loadModules(['esri/widgets/Popup']).then(([Popup]) => {
      // eslint-disable-next-line no-underscore-dangle
      const _tooltip = new Popup({ view });
      setTooltip(_tooltip);
    });
  }, []);

  useEffect(() => {
    if (tooltipPosition && tooltip && !!tooltipContent) {
      const { latitude, longitude } = tooltipPosition.centroid;
      view.popup.open({
        location: { latitude, longitude },
        content: tooltipref.current,
      });
    } else {
      view.popup.close();
    }
  }, [tooltipPosition, tooltip, !!tooltipContent]);

  const {
    attributes: { MOL_ID, AREA_KM2 },
  } = tooltipContent || { attributes: {} };

  return (
    <div
      ref={tooltipref}
      className={cx(styles.tooltipContainer, {
        [styles.tooltipVisible]: tooltip && tooltipContent,
      })}
    >
      <CloseIcon className={styles.tooltipClose} onClick={handleTooltipClose} />
      <section className={styles.tooltipSection}>
        <span className={styles.tooltipName}>
          {t('Priority area')}
          {' '}
          {MOL_ID}
        </span>
      </section>
      <section className={styles.areaSection}>
        <p className={styles.area}>
          {format(',.3f')(AREA_KM2)}
          {' '}
          {t('km')}
          <sup>2</sup>
        </p>
      </section>
      <button
        className={styles.tooltipExplore}
        ref={buttonRef}
        type="button"
        onClick={onExploreAOIClick}
      >
        {t('Analyze area')}
      </button>
    </div>
  );
}

export default AOIEntryTooltipComponent;
