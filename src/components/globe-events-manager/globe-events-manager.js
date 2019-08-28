
const GlobeEventsManager = ({view, clickCallbacksArray, mouseMoveCallbacksArray }) => {

  view.on("pointer-down", function(event) {
    event.stopPropagation();
    view.hitTest(event).then(function(response) {
      clickCallbacksArray.forEach(cb => cb(response, view))
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