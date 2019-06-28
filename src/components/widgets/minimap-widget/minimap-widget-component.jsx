import React from 'react';
import styles from './minimap-widget.module.scss';
import GlobeComponent from 'components/globe';
import sceneSettings from './minimap-settings';

const { REACT_APP_MINIMAP_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const MinimapWidgetComponent = ({ view: globeView, handleMapLoad, handleModalOpen }) => {
  return (
    <>
      <div className={styles.wrapper} onClick={handleModalOpen}>
        <div className={styles.title}>Half</div>
        <div className={styles.progressBars}>
          <div className={styles.globeComponentWrapper}>
            <GlobeComponent
              sceneId={SCENE_ID}
              sceneSettings={sceneSettings}
              onLoad={(map, view) => handleMapLoad(map, view, globeView)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MinimapWidgetComponent;


// PART OF THE HALF-EART-O-METER, IMPLEMENTED IN CSS, CAN BE USEFUL IN THE FUTURE

// const MinimapWidgetComponent = ({ view }) => {
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.title}>Half</div>
//       <div className={styles.globalWrapper}>
//         <div id='blueLeftCircleGlobal' className={styles.blueLeftCircle}></div>
//         <div className={styles.blueRightCircle}></div>
//         <div className={styles.insideCircle}>
//           <div id='greenLeftCircle' className={styles.greenLeftCircle}></div>
//           <div className={styles.greenRightCircle}></div>
//           <div className={styles.smallInsideCircle}>
//             <MiniGlobeIcon className={styles.miniGlobeIcon} />
//           </div>
//         </div>
//         <ProtecedAreaValueStyle marineValue={marineValue} terrestrialValue={terrestrialValue} />
//       </div>
//     </div>
//   );
// };

// const ProtecedAreaValueStyle = ({ terrestrialValue, marineValue }) => (
//   <style dangerouslySetInnerHTML={{
//   __html: [
//     '#blueLeftCircleGlobal:before {',
//     `  transform: rotate(${180 + marineValue * 3.15}deg);`,
//     '}',
//     '#greenLeftCircle:before {',
//     `  transform: rotate(${180 + terrestrialValue * 3.15}deg);`,
//     '}'
//     ].join('\n')
//   }}>
//   </style>
// );