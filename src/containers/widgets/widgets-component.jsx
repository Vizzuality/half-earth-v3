import React from 'react';
// WIDGETS
import ZoomWidget from 'containers/widgets/zoom-widget';
import SettingsWidget from 'containers/widgets/settings-widget';
import ToggleUiWidget from 'containers/widgets/toggle-ui-widget';
import MinimapWidget from 'containers/widgets/minimap-widget';

import { useMobile } from 'constants/responsive';

const WidgetsComponent = ({
  map,
  view,
  activeLayers,
  hideToggle = false,
  hideSettings = false,
  hideZoom = false,
  hideMiniMap = false,
  isFullscreenActive,
  openedModal = null,
  isNotMapsList = true,
  hidden = false,
  disableSettings = false
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