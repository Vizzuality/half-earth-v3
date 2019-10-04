import { loadModules } from 'esri-loader';

// Sample code for disabling interactions with the globe
// https://developers.arcgis.com/javascript/latest/sample-code/view-disable-zoom/index.html
export const disableInteractions = view => {
  view.on("key-down", function(event) {
    const prohibitedKeys = ["+", "-", "Shift", "_", "="];
    const keyPressed = event.key;
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
};

// Sample code about using VectorTileLayers on the globe
// https://developers.arcgis.com/javascript/latest/sample-code/layers-vectortilelayer-json/index.html
export const minimapLayerStyles = {
  style: {
    layers: [
      {
        layout: {},
        paint: {
          "fill-color": "#7C95AA"
        },
        source: "esri",
        minzoom: 0,
        "source-layer": "Land",
        type: "fill",
        id: "Land/0"
      },
      {
        layout: {},
        paint: {
          "fill-color": "#0A212E"
        },
        source: "esri",
        minzoom: 0,
        "source-layer": "Marine area",
        type: "fill",
        id: "Marine area/1"
      },
    ],
    glyphs:
      "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/resources/fonts/{fontstack}/{range}.pbf",
    version: 8,
    sprite:
      "https://www.arcgis.com/sharing/rest/content/items/7675d44bb1e4428aa2c30a9b68f97822/resources/sprites/sprite",
    sources: {
      esri: {
        url:
          "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer",
        type: "vector"
      }
    } 
  }
};

// Sample code for views synchronization
// https://developers.arcgis.com/javascript/latest/sample-code/views-synchronize/index.html
export const synchronizeWebScenes = (globeView, minimapView) => {
  loadModules(["esri/core/watchUtils"]).then(([watchUtils]) => {
    const synchronizeView = (view, others) => {
      others = Array.isArray(others) ? others : [others];

      let viewpointWatchHandle;
      let viewStationaryHandle;
      let otherInteractHandlers;
      let scheduleId;

      const clear = () => {
        if (otherInteractHandlers) {
          otherInteractHandlers.forEach(handle => handle.remove());
        }
        viewpointWatchHandle && viewpointWatchHandle.remove();
        viewStationaryHandle && viewStationaryHandle.remove();
        scheduleId && clearTimeout(scheduleId);
        otherInteractHandlers = viewpointWatchHandle = viewStationaryHandle = scheduleId = null;
      };

      const interactWatcher = view.watch("interacting,animation", 
       newValue => {
        if (!newValue) return;
        if (viewpointWatchHandle || scheduleId) return;
        // start updating the other views at the next frame
        scheduleId = setTimeout(() => {
          scheduleId = null;
          viewpointWatchHandle = view.watch("viewpoint",
            newValue => {
              others.forEach((otherView) => {
                const newAltitude = { max: 12500000, min: 12500000 }
                newValue.camera.tilt = 0;
                otherView.viewpoint = newValue;
                otherView.constraints.altitude = newAltitude;
                otherView.zoom = 0;
              });
          });
        }, 0);

        // stop as soon as another view starts interacting, like if the user starts panning
        otherInteractHandlers = others.map((otherView) => {
          return watchUtils.watch(
            otherView,
            "interacting,animation",
            (value) => { value && clear(); }
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
        remove: () => {
          this.remove = () => {};
          clear();
          interactWatcher.remove();
        }
      };
    };

    /**
     * utility method that synchronizes the viewpoints of multiple views
     */
    const synchronizeViews = (views) => {
      let handles = views.map((view, idx, views) => {
        const others = views.concat();
        others.splice(idx, 1);
        return synchronizeView(view, others);
      });

      return {
        remove: () => {
          this.remove = () => {};
          handles.forEach((h) => {
            h.remove();
          });
          handles = null;
        }
      };
    };

    // bind the views
    synchronizeViews([globeView, minimapView]);
  });
};
