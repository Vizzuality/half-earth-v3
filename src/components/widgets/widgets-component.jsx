import React from 'react';
// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';
import MinimapWidget from 'components/widgets/minimap-widget';

import { useMobile } from 'constants/responsive';

const WidgetsComponent = ({ 
  map,
  view,
  hideToggle = false,
  hideZoom = false,
  hideMiniMap = false,
  hideSearch = false,
  hideLocator = false,
  isFullscreenActive,
  isHEModalOpen = false,
  isNotMapsList = true,
  hidden = false
}) => {
  const isOnMobile = useMobile();
  const hiddenWidget = hidden || isOnMobile;
  return (
    <>
      {!hideToggle && <ToggleUiWidget map={map} view={view} isFullscreenActive={isFullscreenActive} hidden={hiddenWidget}/>}
      {!hideZoom && <ZoomWidget map={map} view={view} isNotMapsList={isNotMapsList} hidden={hiddenWidget} />}
      {!hideMiniMap && <MinimapWidget map={map} view={view} hidden={hiddenWidget} isHEModalOpen={isHEModalOpen} />}
      {!isOnMobile && !hideSearch && <SearchWidget map={map} view={view} hidden={hiddenWidget} />}
      {!hideLocator && <LocationWidget map={map} view={view} isNotMapsList={isNotMapsList} hidden={hiddenWidget} />}
    </>
  )
}

export default WidgetsComponent;