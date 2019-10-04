import React from 'react';
// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';
import MinimapWidget from 'components/widgets/minimap-widget';

import { isMobile } from 'constants/responsive';

const WidgetsComponent = ({ map, view, isFullscreenActive, isNotMapsList = true, hidden = false}) => {
  const isOnMobile = isMobile();
  const hiddenWidget = hidden || isOnMobile;
  return (
    <>
      <ToggleUiWidget map={map} view={view} isFullscreenActive={isFullscreenActive} hidden={hiddenWidget}/>
      <ZoomWidget map={map} view={view} isNotMapsList={isNotMapsList} hidden={hiddenWidget} />
      <MinimapWidget map={map} view={view} hidden={hiddenWidget} />
      {!isOnMobile && <SearchWidget map={map} view={view} hidden={hiddenWidget} />}
      <LocationWidget map={map} view={view} isNotMapsList={isNotMapsList} hidden={hiddenWidget} />
    </>
  )
}

export default WidgetsComponent;