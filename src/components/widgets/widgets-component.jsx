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
  return !isOnMobile && (
    <>
      <ToggleUiWidget map={map} view={view} isFullscreenActive={isFullscreenActive} hidden={hidden}/>
      <ZoomWidget map={map} view={view} isNotMapsList={isNotMapsList} hidden={hidden} />
      <MinimapWidget map={map} view={view} hidden={hidden} />
      <SearchWidget map={map} view={view} hidden={hidden} />
      <LocationWidget map={map} view={view} isNotMapsList={isNotMapsList} hidden={hidden} />
    </>
  )
}

export default WidgetsComponent;