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
          <MiniComponent center={center} globeView={view}/>
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


const MiniComponent = ({ view: minimapView, map, center, globeView }) => {
  useEffect(() => {
    disableInteractions(minimapView);
    loadModules(["esri/layers/VectorTileLayer"]).then(([VectorTileLayer]) => {
      const minimapLayer = new VectorTileLayer(minimapLayerStyles);
      map.add(minimapLayer);
    });
  }, []);

  // useEffect(() => {
  //   const target = { center, zoom: 0 };
  //   minimapView.goTo(target);
  // }, [center]);

  useEffect(() => {
    loadModules(["esri/core/watchUtils"]).then(([watchUtils]) => {
      var synchronizeView = function(view, others) {
        others = Array.isArray(others) ? others : [others];
    
        var viewpointWatchHandle;
        var viewStationaryHandle;
        var otherInteractHandlers;
        var scheduleId;
    
        var clear = function() {
          if (otherInteractHandlers) {
            otherInteractHandlers.forEach(function(handle) {
              handle.remove();
            });
          }
          viewpointWatchHandle && viewpointWatchHandle.remove();
          viewStationaryHandle && viewStationaryHandle.remove();
          scheduleId && clearTimeout(scheduleId);
          otherInteractHandlers = viewpointWatchHandle = viewStationaryHandle = scheduleId = null;
        };
    
        var interactWatcher = view.watch("interacting,animation", function(
          newValue
        ) {
          if (!newValue) {
            return;
          }
          if (viewpointWatchHandle || scheduleId) {
            return;
          }
    
          // start updating the other views at the next frame
          scheduleId = setTimeout(function() {
            scheduleId = null;
            viewpointWatchHandle = view.watch("viewpoint", function(
              newValue
            ) {
              others.forEach(function(otherView) {
                newValue.camera.tilt = 0;
                otherView.viewpoint = newValue;
                otherView.zoom = 0;
              });
            });
          }, 0);
    
          // stop as soon as another view starts interacting, like if the user starts panning
          otherInteractHandlers = others.map(function(otherView) {
            return watchUtils.watch(
              otherView,
              "interacting,animation",
              function(value) {
                if (value) {
                  clear();
                }
              }
            );
          });
    
          // or stop when the view is stationary again
          viewStationaryHandle = watchUtils.whenTrue(
            view,
            "stationary",
            clear
          );
        });
    
        return {
          remove: function() {
            this.remove = function() {};
            clear();
            interactWatcher.remove();
          }
        };
      };
    
      /**
       * utility method that synchronizes the viewpoints of multiple views
       */
      var synchronizeViews = function(views) {
        var handles = views.map(function(view, idx, views) {
          var others = views.concat();
          others.splice(idx, 1);
          return synchronizeView(view, others);
        });
    
        return {
          remove: function() {
            this.remove = function() {};
            handles.forEach(function(h) {
              h.remove();
            });
            handles = null;
          }
        };
      };
    
      // bind the views
      synchronizeViews([globeView, minimapView]);
    });
  }, []);

 

  return null;
}

export default MinimapWidgetComponent;
