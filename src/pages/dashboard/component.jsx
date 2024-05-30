import React from 'react';

import cx from 'classnames';

import Logo from 'components/half-earth-logo';

import uiStyles from 'styles/ui.module.scss';

import DashboardView from '../../containers/views/dashboard';

function DashboardPageComponent(props) {
  return (
    <>
      <Logo className={cx(uiStyles.halfEarthLogoTopLeft)} />
      <DashboardView mapName="dashboard" {...props} />
    </>
  );
}

export default DashboardPageComponent;
