import React from 'react';
// WIDGETS
import ZoomWidget from 'components/widgets/zoom-widget';
import MinimapWidget from 'components/widgets/minimap-widget';

import { useMobile } from 'constants/responsive';

const WidgetsComponent = ({
  map,
  view,
  hideZoom = false,
  hideMiniMap = false,
  openedModal = null,
  isNotMapsList = true,
  hidden = false,
}) => {
  const isOnMobile = useMobile();
  const hiddenWidget = hidden || isOnMobile;
  return (
    <>
      {!hideZoom && (
        <ZoomWidget
          map={map}
          view={view}
          isNotMapsList={isNotMapsList}
          hidden={hiddenWidget}
        />
      )}
      {!hideMiniMap && (
        <MinimapWidget
          map={map}
          view={view}
          hidden={hiddenWidget}
          openedModal={openedModal}
        />
      )}
    </>
  );
};

export default WidgetsComponent;