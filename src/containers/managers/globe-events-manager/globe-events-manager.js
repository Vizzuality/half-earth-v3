function GlobeEventsManager({
  view,
  clickCallbacksArray,
  selectedFeaturedMap,
  mouseMoveCallbacksArray,
}) {
  view.on('pointer-down', (event) => {
    event.stopPropagation();
    view.hitTest(event).then((response) => {
      clickCallbacksArray.forEach((cb) =>
        cb(response, view, selectedFeaturedMap)
      );
    });
  });

  view.on('pointer-move', (event) => {
    event.stopPropagation();
    view.hitTest(event).then((response) => {
      mouseMoveCallbacksArray.forEach((cb) => cb(response, view));
    });
  });
  return null;
}

export default GlobeEventsManager;
