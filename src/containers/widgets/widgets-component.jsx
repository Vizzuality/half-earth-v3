import React from 'react';
import cx from 'classnames';
// WIDGETS
import ZoomWidget from 'containers/widgets/zoom-widget';
import MinimapWidget from 'containers/widgets/minimap-widget';

import { useMobile } from 'constants/responsive';

// Styles
import uiStyles from 'styles/ui.module.scss';

const WidgetsComponent = ({
  map,
  view,
  hideZoom = false,
  hideMiniMap = false,
  openedModal = null,
  isNotMapsList = true,
  hidden = false,
  waitingInteraction,
}) => {
  const isOnMobile = useMobile();
  const hiddenWidget = hidden || isOnMobile;
  return (
    <div className={cx({ [uiStyles.onBoardingOverlay]: waitingInteraction })}>
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
    </div>
  );
};

export default WidgetsComponent;