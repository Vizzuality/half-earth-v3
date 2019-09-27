
const GlobeEventsManager = ({view, clickCallbacksArray, selectedFeaturedMap, mouseMoveCallbacksArray }) => {

  view.on("pointer-down", function(event) {
    event.stopPropagation();
    view.hitTest(event).then(function(response) {
      clickCallbacksArray.forEach(cb => cb(response, view, selectedFeaturedMap))
    });
  });

  view.on("pointer-move", function(event) {
    event.stopPropagation();
    view.hitTest(event).then(function(response) {
      mouseMoveCallbacksArray.forEach(cb => cb(response, view))
    });
  });
  return null;
}

export default GlobeEventsManager;