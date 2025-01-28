import React, { useEffect, useState, createRef } from 'react';

import { useT } from '@transifex/react';

import { Slider } from '@mui/material';

import OpacityIcon from 'icons/dashboard/opacity_icon.svg?react';

import styles from './toggle-opacity-component-styles.module.scss';

function ToggleOpacityComponent({ layer, map }) {
  const t = useT();
  const ref = createRef();
  const [showOpacity, setShowOpacity] = useState(false);
  const [opacityValue, setOpacityValue] = useState(1);

  const updateOpacity = (layerToFind, value) => {
    const foundLayer = map.layers.items.find(
      (l) => l.id.toUpperCase() === layerToFind.id.toUpperCase()
    );
    foundLayer.opacity = value;
    setOpacityValue(value);
  };

  const displayOpacity = () => {
    setShowOpacity(!showOpacity);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click occurred outside the component
      if (ref.current && !ref.current.contains(event.target)) {
        // Perform actions when clicked outside
        setShowOpacity(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className={styles.opacity} ref={ref}>
      <button
        type="button"
        onClick={() => displayOpacity(layer)}
        aria-label="Toggle opacity"
        title={t('Change layer opacity')}
      >
        <OpacityIcon />
      </button>
      {showOpacity && (
        <div className={styles.opacityLabel}>
          <Slider
            className={styles.slider}
            min={0}
            max={1}
            step={0.1}
            value={opacityValue}
            onChange={(e, value) => updateOpacity(layer, value)}
          />
        </div>
      )}
    </div>
  );
}

export default ToggleOpacityComponent;
