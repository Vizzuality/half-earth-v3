import React from 'react';

import cx from 'classnames';

import Logo from 'components/half-earth-logo';

import uiStyles from 'styles/ui.module.scss';

import DashboardSpeciesNameView from '../../containers/views/dashboard-species-name-view/dashboard-species-name-view';

function DashboardSpeciesNameComponent(props) {
  const {
    activeLayers,
    handleMapLoad,
  } = props;

  return (
    <>
      <Logo className={cx(uiStyles.halfEarthLogoTopLeft)} />
      <DashboardSpeciesNameView
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
        {...props}
      />
    </>
  );
}

export default DashboardSpeciesNameComponent;
