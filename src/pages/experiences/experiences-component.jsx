import React from 'react';
import cx from 'classnames';
import loadable from '@loadable/component'
import styles from './experiences-styles.module';

import ExpertMode from './data-globe';
// const ExpertMode = loadable(() => import('./data-globe'));
const FeaturedMode = loadable(() => import('./featured-globe'));

const Experiences = ({ route, switchToExpert, switchToFeature }) => {
  const isExpertMode = route.path === '/dataGlobe';

  return (
    <>
      <div className={cx({ [styles.hidden]: !isExpertMode })}>
        <ExpertMode handleSwitch={switchToFeature} />
      </div>
      <div className={cx({ [styles.hidden]: isExpertMode })}>
        <FeaturedMode handleSwitch={switchToExpert} />
      </div>
    </>
  )
};

export default Experiences;
