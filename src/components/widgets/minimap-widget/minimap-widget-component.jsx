import { loadModules } from '@esri/react-arcgis';
import React, { useEffect, useState } from 'react';
import { ReactComponent as MiniGlobeIcon } from 'icons/miniGlobe.svg';
import styles from './minimap-widget.module.scss';
import GlobeComponent from 'components/globe';

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

const { REACT_APP_MINIMAP_SCENE_ID: SCENE_ID } = process.env;

const settings = {
  environment: {
    atmosphereEnabled: false,
    background: {
      type: "color",
      color: [15, 43, 59, 0.2]
    },
    alphaCompositingEnabled: true,
    starsEnabled: false,
  },
  zoom: 0,
  ui: {
    components: []
  }
}

const MinimapWidgetComponent = ({ view }) => {
  const [watchUtils, setWatchUtils] = useState(null);
  const [center, setCenter] = useState([30,0]);

  useEffect(() => {
    loadModules(["esri/core/watchUtils"]).then(([watchUtils]) => {
      setWatchUtils(watchUtils);
    })
  }, []);

  useEffect(() => {
    const watchHandle = watchUtils && watchUtils.whenTrue(view, "stationary", function() {
      const { longitude, latitude } = view.center;
      const center = [longitude, latitude];
      setCenter(center);
    })
    return function cleanUp() {
      watchHandle && watchHandle.remove()
    }
  }, [watchUtils])

  // const terrestrialValue = 12;
  // const marineValue = 5;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Half</div>
      <div className={styles.globalWrapper}>
      <div className={styles.halfEarthMeterWrapper}>
        <GlobeComponent sceneId={SCENE_ID} sceneSettings={settings}>
          <MiniComponent center={center}/>
        </GlobeComponent>
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
    </div>
  );
};

const MiniComponent = ({ view, center }) => {
  useEffect(() => {
    view.on("key-down", function(event) {
      var prohibitedKeys = ["+", "-", "Shift", "_", "="];
      var keyPressed = event.key;
      if (prohibitedKeys.indexOf(keyPressed) !== -1) {
        event.stopPropagation();
      }
    });

    view.on("mouse-wheel", function(event) {
      event.stopPropagation();
    });

    view.on("double-click", function(event) {
      event.stopPropagation();
    });

    view.on("double-click", ["Control"], function(event) {
      event.stopPropagation();
    });

    view.on("drag", function(event) {
      event.stopPropagation();
    });

    view.on("drag", ["Shift"], function(event) {
      event.stopPropagation();
    });
    
    view.on("drag", ["Shift", "Control"], function(event) {
      event.stopPropagation();
    });
  }, []);

  useEffect(() => {
    const target = { center, zoom: 0 };
    view.goTo(target);
    console.log('UPDATINF CENTER!');
  }, [center])
  
  return null;
}
 
export default MinimapWidgetComponent;
