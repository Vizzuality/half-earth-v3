import React from 'react';

import cx from 'classnames';

import Logo from 'components/half-earth-logo';

import uiStyles from 'styles/ui.module.scss';

import DashboardSpeciesView from '../../containers/views/dashboard-species-view/dashboard-species-view';

function DashboardSpeciesComponent(props) {
  return (
    <>
      <Logo className={cx(uiStyles.halfEarthLogoTopLeft)} />
      <DashboardSpeciesView {...props} />
    </>
  );
}

export default DashboardSpeciesComponent;
