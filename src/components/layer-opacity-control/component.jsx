import { useState, forwardRef, useEffect } from 'react';

import { useT } from '@transifex/react';

import Tooltip, { useSingleton } from '@tippyjs/react';
import cx from 'classnames';
import Slider from 'rc-slider';

import styles from './styles.module.scss';

import OpacityIcon from 'icons/opacity.svg?react';

const railStyle = {
  backgroundColor: 'rgba(255,255,255,0.3)',
  height: '4px',
  borderRadius: '2px',
  width: '150px',
};

const handleStyle = {
  border: '1px solid #0E2B3B',
  backgroundColor: '#FFFFFF',
  height: '10px',
  width: '10px',
  boxShadow: '0 2px 4px 0 #0E2B3B',
  borderRadius: '50%',
  position: 'absolute',
  top: '-3px',
  cursor: 'pointer',
  outline: 'none',
  zIndex: '2',
};

const formatValue = (value) => {
  return `${Math.round(value * 100)}%`;
};

const OpacityButton = forwardRef(({ isOpen }, ref) => {
  const t = useT();
  return (
    <div
      title={t('Change opacity')}
      ref={ref}
      className={cx(styles.iconWrapper, { [styles.open]: isOpen })}
    >
      <OpacityIcon className={cx(styles.icon, { [styles.open]: isOpen })} />
    </div>
  );
});

function TooltipContent(value, setValue, onOpacityChange) {
  const t = useT();
  return (
    <div className={styles.sliderContainer}>
      <span>{t('opacity')}</span>
      <div className={styles.sliderWrapper}>
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={value}
          startPoint={value}
          className={styles.slider}
          onChange={setValue}
          onAfterChange={onOpacityChange}
          railStyle={railStyle}
          handleStyle={handleStyle}
          formatValue={formatValue}
        />
        <div style={{ width: `${value * 100}%` }} className={styles.track} />
        <span className={styles.sliderValue}>{formatValue(value)}</span>
      </div>
    </div>
  );
}

function Component({ onOpacityChange, initialOpacityValue }) {
  const [value, setValue] = useState(initialOpacityValue);
  const [isOpen, setIsOpen] = useState(false);
  const [source, target] = useSingleton();

  useEffect(() => {
    setValue(initialOpacityValue);
  }, [initialOpacityValue]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Tooltip
        singleton={source}
        interactive
        trigger="click"
        placement="top-end"
        hideOnClick
        delay={[0, 0]}
        onTrigger={toggleOpen}
        onHidden={toggleOpen}
      />
      <Tooltip
        content={TooltipContent(value, setValue, onOpacityChange)}
        singleton={target}
      >
        <OpacityButton isOpen={isOpen} />
      </Tooltip>
    </>
  );
}

export default Component;
