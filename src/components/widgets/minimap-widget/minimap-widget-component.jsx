import React from 'react';
import { ReactComponent as MiniGlobeIcon } from 'icons/miniGlobe.svg';
import styles from './minimap-widget.module.scss';

const ProtecedAreaValueStyle = ({ terrestrialValue, marineValue }) => (
  <style dangerouslySetInnerHTML={{
  __html: [
    '#blueLeftCircleGlobal:before {',
    `  transform: rotate(${180 + marineValue * 3.15}deg);`,
    '}',
    '#greenLeftCircle:before {',
    `  transform: rotate(${180 + terrestrialValue * 3.15}deg);`,
    '}'
    ].join('\n')
  }}>
  </style>
);

const MinimapWidgetComponent = props => {
  // const { terrestrialValue, marineValue } = props;
  const terrestrialValue = 12;
  const marineValue = 5;
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Half</div>
      <div className={styles.globalWrapper}>
      <div className={styles.halfEarthMeterWrapper}></div>
        {/* <div id='blueLeftCircleGlobal' className={styles.blueLeftCircle}></div>
        <div className={styles.blueRightCircle}></div>
        <div className={styles.insideCircle}>
          <div id='greenLeftCircle' className={styles.greenLeftCircle}></div>
          <div className={styles.greenRightCircle}></div>
          <div className={styles.smallInsideCircle}>
            <MiniGlobeIcon className={styles.miniGlobeIcon} />
          </div>
        </div>
        <ProtecedAreaValueStyle marineValue={marineValue} terrestrialValue={terrestrialValue} /> */}
      </div>
    </div>
  );
};

export default MinimapWidgetComponent;
