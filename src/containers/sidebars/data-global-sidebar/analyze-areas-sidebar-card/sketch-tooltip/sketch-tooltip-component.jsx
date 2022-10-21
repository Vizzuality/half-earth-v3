import React, { useEffect, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';

import { useT, useLocale } from '@transifex/react';

// import cx from 'classnames';

import styles from './sketch-tooltip.styles.module.scss';

const TOOLTIP_WIDTH = 100;
const TOOLTIP_HEIGHT = 16;

function SketchTooltip({ sketchTooltipType }) {
  if (!sketchTooltipType) return null;
  const t = useT();
  const locale = useLocale();
  const [mouseCoords, setMouseCoords] = useState(null);

  useEffect(() => {
    const handleWindowMouseMove = (event) => {
      setMouseCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);
  const label = useMemo(
    () =>
      ({
        polygon: t('Add point'),
        'polygon-close': t('Close shape'),
        'too-big': t('Area too big'),
        circle: t('Drag circle'),
        rectangle: t('Drag rectangle'),
      }[sketchTooltipType]),
    [sketchTooltipType, locale]
  );

  // The points are not drawn out of the esri-ui
  const uiElements = useMemo(
    // eslint-disable-next-line no-undef
    () => document.getElementsByClassName('esri-ui'),
    []
  );
  const uiElement = uiElements && uiElements[0];
  if (
    !label ||
    !mouseCoords ||
    (uiElement && mouseCoords.x < uiElement.offsetLeft)
  ) {
    return null;
  }

  const renderTooltip = (
    <div
      className={styles.sketchTooltip}
      style={{
        top: mouseCoords.y - TOOLTIP_HEIGHT - 20,
        left: mouseCoords.x - TOOLTIP_WIDTH / 2 + 10,
      }}
    >
      {label}
      <span className={styles.arrow} />
    </div>
  );

  return ReactDOM.createPortal(
    renderTooltip,
    // eslint-disable-next-line no-undef
    document.getElementById('root')
  );
}

export default SketchTooltip;
