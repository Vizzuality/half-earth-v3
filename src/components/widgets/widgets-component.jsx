import React from 'react';
// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import SettingsWidget from 'components/widgets/settings-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import MinimapWidget from 'components/widgets/minimap-widget';

import { useMobile } from 'constants/responsive';

const WidgetsComponent = ({
  map,
  view,
  activeLayers,
  hideToggle = false,
  hideSettings = false,
  hideZoom = false,
  hideMiniMap = false,
  hideLocator = false,
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
      {!hideSettings && (
        <SettingsWidget
          map={map}
          view={view}
          activeLayers={activeLayers}
          hidden={hiddenWidget}
          disableSettings={disableSettings}
        />
      )}
      {!hideToggle && (
        <ToggleUiWidget
          map={map}
          view={view}
          isFullscreenActive={isFullscreenActive}
          hidden={hiddenWidget}
        />
      )}
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
      {!hideLocator && (
        <LocationWidget
          map={map}
          view={view}
          isNotMapsList={isNotMapsList}
          hidden={hiddenWidget}
        />
      )}
    </>
  );
};

export default WidgetsComponent;