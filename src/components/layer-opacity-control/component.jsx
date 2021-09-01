import React, {useState, forwardRef} from 'react';
import cx from 'classnames';
import Slider from 'rc-slider';
import Tooltip, {useSingleton} from '@tippyjs/react';
import { ReactComponent as OpacityIcon } from 'icons/opacity.svg';
import styles from './styles.module.scss';

const railStyle = {
  backgroundColor: 'rgba(255,255,255,0.3)',
  height: '4px',
  borderRadius: '2px',
  width: '150px'
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
  return `${Math.round(value * 100)}%`
}

const OpacityButton = forwardRef(({ isOpen, toggleOpen }, ref) => (
  <div 
    ref={ref}
    className={cx(
      styles.iconWrapper,
      {[styles.open]: isOpen}
    )
  }>
    <OpacityIcon 
      className={cx(
        styles.icon,
        {[styles.open]: isOpen}
      )}
    />
  </div>
));

const TooltipContent = (value, setValue) => (
  <div className={styles.sliderContainer}>
    <span>opacity</span>
    <div className={styles.sliderWrapper}>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={value}
        startPoint={value}
        className={styles.slider}
        onChange={(value) => setValue(value)}
        railStyle={railStyle}
        handleStyle={handleStyle}
        formatValue={formatValue}
      />
      <div style={{width: `${value * 100}%`}} className={styles.track}/>
      <span className={styles.sliderValue}>{formatValue(value)}</span>
    </div>
  </div>
)

const Component = () => {
  const [value, setValue] = useState(0.6);
  const [isOpen, toggleOpen] = useState(false);
  const [source, target] = useSingleton();

  return (
    <>
      <Tooltip
        singleton={source}
        interactive
        trigger='click'
        placement='top-end'
        hideOnClick={true}
        delay={[0, 0]}
        onTrigger={(_,e) => {
          e.stopPropagation();
          toggleOpen(!isOpen)
        }}
        onHidden={() => {
          toggleOpen(!isOpen)
        }}
      />
      <Tooltip
        content={TooltipContent(value, setValue)}
        singleton={target}
      >
        <OpacityButton
          isOpen={isOpen}
          toggleOpen={toggleOpen}
        />
      </Tooltip>
    </>
  )
}

export default Component;