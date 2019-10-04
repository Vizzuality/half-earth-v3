import React from 'react';
// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';
import MinimapWidget from 'components/widgets/minimap-widget';

import { isMobile } from 'constants/responsive';

const WidgetsComponent = ({ map, view, isFullscreenActive, isNotMapsList = true}) => {
  const isOnMobile = isMobile();
  return !isOnMobile && (
    <>
      <ToggleUiWidget map={map} view={view} isFullscreenActive={isFullscreenActive} />
      <ZoomWidget map={map} view={view} isNotMapsList={isNotMapsList} />
      <MinimapWidget map={map} view={view} />
      <SearchWidget map={map} view={view} />
      <LocationWidget map={map} view={view} isNotMapsList={isNotMapsList} />
    </>
  )
}

export default WidgetsComponent;