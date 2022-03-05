import React, { useEffect, useState, useRef } from 'react';
import { loadModules } from 'esri-loader';
import styles from './aoi-entry-tooltip-styles.module.scss';
import { format } from 'd3-format';
import cx from 'classnames';

function useClickOutside(ref, callback, exceptionRef) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref &&
        ref.current &&
        !ref.current.contains(event.target) &&
        exceptionRef &&
        exceptionRef.current &&
        !exceptionRef.current.contains(event.target)
      ) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

const AOIEntryTooltipComponent = ({
  view,
  tooltipContent,
  tooltipPosition,
  handleTooltipClose,
  onExploreAOIClick,
}) => {
  const tooltipref = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const buttonRef = useRef(null);

  useClickOutside(tooltipref, () => handleTooltipClose(), buttonRef);

  // Create a new Popup to contain the tooltip
  useEffect(() => {
    loadModules(['esri/widgets/Popup']).then(([Popup]) => {
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
      <section className={styles.tooltipSection}>
        <span className={styles.tooltipName}>Priority area {MOL_ID}</span>
      </section>
      <section className={styles.areaSection}>
        <p className={styles.area}>{format(',.3f')(AREA_KM2)} km2</p>
      </section>
      <button
        className={styles.tooltipExplore}
        ref={buttonRef}
        onClick={onExploreAOIClick}
      >
        Analyze area
      </button>
    </div>
  );
};

export default AOIEntryTooltipComponent;
