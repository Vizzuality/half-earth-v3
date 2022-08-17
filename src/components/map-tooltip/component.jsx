import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import { useT } from '@transifex/react';
import { loadModules } from 'esri-loader';

import { ReactComponent as CloseIcon } from 'icons/close.svg';
import styles from './styles.module.scss';
import { useMobile } from 'constants/responsive';

const MapTooltipComponent = ({
  img,
  view,
  content,
  isVisible,
  isProtectedArea,
  tooltipPosition,
  onCloseButtonClick,
  onActionButtonClick,
}) => {
  const t = useT();
  const tooltipref = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  // Create a new Popup to contain the tooltip
  useEffect(() => {
    loadModules(['esri/widgets/Popup']).then(([Popup]) => {
      const _tooltip = new Popup({ view });
      setTooltip(_tooltip);
    });
    return function cleanUp() {
      onCloseButtonClick();
    };
  }, []);

  // Clean up on mount
  useEffect(() => {
    onCloseButtonClick();
  }, []);

  useEffect(() => {
    if (isVisible && tooltip && tooltipPosition) {
      view.popup.open({
        location: tooltipPosition.centroid,
        content: tooltipref.current,
      });
    } else {
      view.popup.close();
    }
  }, [isVisible, tooltipPosition, tooltip]);

  return (
    <div
      ref={tooltipref}
      className={cx(styles.tooltipContainer, {
        [styles.isVisible]: isVisible,
        [styles.isMobile]: useMobile(),
      })}
    >
      {content && (
        <>
          <section className={styles.tooltipSection}>
            {img && <img className={styles.tooltipFlag} alt="" />}
            <div className={styles.featureNaming}>
              <span className={styles.title}>{content.title}</span>
              {isProtectedArea && <span className={styles.subtitle}>{content.description}</span>}
              <span className={styles.subtitle}>{content.subtitle}</span>
              <div className={styles.speciesContent}>
                {content.species && <p><span className={styles.speciesContentNumbers}>{content.species}</span>{t('land vertebrate species')}</p>}
                <p><span className={styles.speciesContentNumbers}>{content.percentage_protected}%</span> {t('land is protected')}</p>
                {isProtectedArea && <span className={styles.subtitle}>{content.status}</span>}
                {isProtectedArea && <span className={styles.subtitle}>{content.status_year}</span>}
              </div>
            </div>
          </section>
          <CloseIcon
            className={styles.tooltipClose}
            onClick={onCloseButtonClick}
          />

          <button
            className={styles.tooltipExplore}
            onClick={onActionButtonClick}
          >
            {content.buttonText}
          </button>
        </>
      )}
    </div>
  );
};

export default MapTooltipComponent;
