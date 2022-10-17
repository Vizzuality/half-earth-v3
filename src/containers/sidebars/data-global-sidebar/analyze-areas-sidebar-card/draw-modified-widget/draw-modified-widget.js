import React, { useEffect } from 'react';

import ReactDOMServer from 'react-dom/server';

function DrawModifiedWidget({ drawWidgetRef, sketchTool }) {
  useEffect(() => {
    if (drawWidgetRef) {
      const deleteButtonMenu = (
        <div
          role="menu"
          className="esri-sketch__section esri-sketch__tool-section"
        >
          <button
            aria-label="Delete selection"
            className="esri-sketch__button esri-icon-trash"
            data-tool-name="delete"
            title="Delete selection"
            type="button"
            onClick={sketchTool.delete}
          />
        </div>
      );
      drawWidgetRef.insertAdjacentHTML(
        'beforeend',
        ReactDOMServer.renderToString(deleteButtonMenu)
      );
    }
  }, [drawWidgetRef]);
  return null;
}

export default DrawModifiedWidget;
