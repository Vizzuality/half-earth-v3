// Sample code for views synchronization
// https://developers.arcgis.com/javascript/latest/sample-code/views-synchronize/index.html
export const synchronizeWebScenes = (globeView, minimapView) => {
  const sync = (newViewpoint, viewToSync) => {
    viewToSync.viewpoint = newViewpoint;
    viewToSync.zoom = 0;
  };
  // it returns the handler in case it needs to be removed
  return globeView.watch('viewpoint', (newViewpoint) => sync(newViewpoint, minimapView));
};

export const updateMainViewExtentGraphic = (mainView, graphic) => {
  mainView.watch('center', () => {
    graphic.geometry = mainView.extent;
  });
};
