import { useEffect, useRef } from 'react';

import { useT } from '@transifex/react';

import { useClickOutside } from 'utils/ui-utils';

import cx from 'classnames';
import { format } from 'd3-format';

import CloseIcon from 'icons/close.svg?react';

import styles from './future-place-tooltip-styles.module.scss';

function AOIEntryTooltipComponent({
  view,
  tooltipContent,
  tooltipPosition,
  handleTooltipClose,
  onExploreAOIClick,
}) {
  const tooltipref = useRef(null);
  const buttonRef = useRef(null);
  const t = useT();

  useClickOutside(tooltipref, () => handleTooltipClose(), buttonRef);

  useEffect(() => {
    if (!view) return;
    if (tooltipPosition && !!tooltipContent) {
      const { latitude, longitude } = tooltipPosition.centroid;
      view.openPopup({
        location: { latitude, longitude },
        content: tooltipref.current,
      });
    } else {
      view.closePopup();
    }
  }, [tooltipPosition, !!tooltipContent, view]);

  const {
    attributes: { MOL_ID, AREA_KM2 },
  } = tooltipContent || { attributes: {} };

  return (
    <div
      ref={tooltipref}
      className={cx(styles.tooltipContainer, {
        [styles.tooltipVisible]: tooltipContent,
      })}
    >
      <CloseIcon className={styles.tooltipClose} onClick={handleTooltipClose} />
      <section className={styles.tooltipSection}>
        <span className={styles.tooltipName}>
          {t('Priority area')} {MOL_ID}
        </span>
      </section>
      <section className={styles.areaSection}>
        <p className={styles.area}>
          {format(',.3f')(AREA_KM2)} {t('km')}
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
