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
  const protectedAreaDataIsFetched =
    isProtectedArea &&
    content &&
    content.description &&
    content.IUCN_type &&
    content.status &&
    content.status_year;

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
              {isProtectedArea && (
                <span className={styles.description}>
                  {content.description}
                </span>
              )}
              {!isProtectedArea && (
                <span className={styles.subtitle}>{content.subtitle}</span>
              )}
              <div className={styles.speciesContent}>
                {content.species && (
                  <div className={styles.content}>
                    <p className={styles.contentData}>{content.species}</p>
                    <p className={styles.contentDescription}>
                      {t('land vertebrate species')}
                    </p>
                  </div>
                )}
                <div className={styles.content}>
                  <p className={styles.contentData}>
                    {content.percentage_protected}%
                  </p>{' '}
                  {t('land is protected')}
                </div>
                {protectedAreaDataIsFetched && (
                  <>
                    <div className={styles.content}>
                      <p className={styles.contentData}>
                        {content.designation_type}
                      </p>
                      {t('designation type')}
                    </div>
                    <div className={styles.content}>
                      <p className={styles.contentData}>{content.IUCN_type}</p>
                      {t('IUCN type')}
                    </div>
                  </>
                )}
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
