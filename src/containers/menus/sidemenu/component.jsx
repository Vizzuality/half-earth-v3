import React from 'react';

import cx from 'classnames';

import MinimapWidget from 'containers/menus/sidemenu/minimap-widget';
import ZoomControls from 'containers/menus/sidemenu/zoom-controls';

import { useMobile } from 'constants/responsive';

import uiStyles from 'styles/ui.module.scss';

function SideMenuComponent({
  map,
  view,
  hideZoom = false,
  hideMiniMap = true,
  openedModal = null,
  isNotMapsList = true,
  hidden = false,
  onboardingStep,
}) {
  const isOnMobile = useMobile();
  const hiddenWidget = hidden || isOnMobile;
  return (
    <div
      className={cx({
        [uiStyles.onboardingOverlay]: typeof onboardingStep === 'number',
      })}
    >
      {!hideZoom && (onboardingStep === null || onboardingStep === undefined) && (
        <ZoomControls
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
    </div>
  );
}

export default SideMenuComponent;
