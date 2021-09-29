import React from 'react';
import cx from 'classnames';
import AreaOfInterestScene from 'scenes/aoi-scene';
import HalfEarthLogo from 'components/half-earth-logo';

import styles from './styles.module.scss';
import uiStyles from 'styles/ui.module.scss';

const AreaOfInterestPageComponent = ({
  aoiData,
  geometry,
  userConfig,
  activeLayers,
  sceneSettings,
}) => console.log(aoiData) || (
  <>
    <HalfEarthLogo className={cx(styles.hideOnPrint,uiStyles.halfEarthLogoTopLeft)}/>
    {geometry &&
      <AreaOfInterestScene
        aoiData={aoiData}
        geometry={geometry}
        userConfig={userConfig}
        activeLayers={activeLayers}
        sceneSettings={sceneSettings}
      />
    }
  </>
);

export default AreaOfInterestPageComponent;