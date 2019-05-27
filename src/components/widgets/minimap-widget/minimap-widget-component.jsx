import React from 'react';
import { ReactComponent as MiniGlobeIcon } from 'icons/miniGlobe.svg';

import styles from './minimap-widget.module.scss';

const MinimapWidgetComponent = props => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Half</div>
      <div className={styles.uberWrapper}>
        <div className={styles.moduleBorderWrap}>
          <div className={styles.module}></div>
        </div>
        <div className={styles.moduleBorderWrapGreen}>
          <div className={styles.module} ></div>
        </div>
        <MiniGlobeIcon className={styles.miniGlobeIcon} />
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
