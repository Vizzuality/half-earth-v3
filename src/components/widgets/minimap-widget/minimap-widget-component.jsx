import React from 'react';
import { ReactComponent as MiniGlobeIcon } from 'icons/miniGlobe.svg';

import styles from './minimap-widget.module.scss';

const CircleMeter = () => {
  return (
    <>
      <div className={styles.redCircle}></div>
      <div className={styles.greenCircle}></div>
      <div className={styles.insideCircle}></div>
    </>
  );
}

const MinimapWidgetComponent = props => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Half</div>
      <div className={styles.globalWrapper}>
        <div className={styles.blueLeftCircle}></div>
        <div className={styles.blueRightCircle}></div>
        <div className={styles.insideCircle}>
          <div className={styles.greenLeftCircle}></div>
          <div className={styles.greenRightCircle}></div>
          <div className={styles.smallInsideCircle}>
            <MiniGlobeIcon className={styles.miniGlobeIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimapWidgetComponent;

// import React from 'react';
// import { ReactComponent as MiniGlobeIcon } from 'icons/miniGlobe.svg';

// import styles from './minimap-widget.module.scss';

// const MinimapWidgetComponent = props => {
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.title}>Half</div>
//       <div className={styles.uberWrapper}>
//         <div className={styles.moduleBorderWrap}>
//           <div className={styles.module}></div>
//         </div>
//         <div className={styles.moduleBorderWrapGreen}>
//           <div className={styles.module} ></div>
//         </div>
//         <MiniGlobeIcon className={styles.miniGlobeIcon} />
//       </div>
//     </div>
//   );
// };

// export default MinimapWidgetComponent;
