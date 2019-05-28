import { loadModules } from '@esri/react-arcgis';
import React, { useEffect, useState } from 'react';
import { ReactComponent as MiniGlobeIcon } from 'icons/miniGlobe.svg';
import styles from './minimap-widget.module.scss';
import GlobeComponent from 'components/globe';
import { disableInteractions, minimapLayerStyles } from 'utils/minimap-utils';

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
const { REACT_APP_FEATURED_GLOBE_SCENE_ID: SCENE_ID } = process.env;

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
    });
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


const MiniComponent = ({ view, map, center }) => {
  useEffect(() => {
    disableInteractions(view);
    loadModules(["esri/layers/VectorTileLayer"]).then(([VectorTileLayer]) => {
      const minimapLayer = new VectorTileLayer(minimapLayerStyles);
      map.add(minimapLayer);
    });
  }, []);

  useEffect(() => {
    const target = { center, zoom: 0 };
    view.goTo(target);
  }, [center])

  return null;
}

export default MinimapWidgetComponent;
