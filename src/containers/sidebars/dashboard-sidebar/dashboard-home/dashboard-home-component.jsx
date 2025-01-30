import React, { useContext } from 'react';

import { useT } from '@transifex/react';

import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import { NAVIGATION } from 'constants/dashboard-constants.js';

import BirdsIcon from 'icons/bird_icon.svg?react';
import InfoIcon from 'icons/dashboard/info_icon.svg?react';
import TimeLineIcon from 'icons/timeline.svg?react';

import styles from './dashboard-home-styles.module.scss';

function DashboardHomeComponent(props) {
  const { setSelectedIndex } = props;
  const t = useT();

  const sections = [
    {
      id: NAVIGATION.DATA_LAYER,
      icon: <BirdsIcon />,
      title: t('species'),
      description: t(
        'Explore and manage species distribution, habitat and conservation data'
      ),
    },
    {
      id: NAVIGATION.REGION,
      icon: <SouthAmericaIcon />,
      title: t('regions'),
      description: t(
        'View species lists and conservation status for any region of interest'
      ),
    },
    {
      id: NAVIGATION.TRENDS,
      icon: <TimeLineIcon />,
      title: t('indicators'),
      description: t(
        'Examine indicator trends at national, province, and individual species level'
      ),
    },
    {
      id: NAVIGATION.INFO,
      icon: <InfoIcon />,
      title: t('tutorials'),
      description: t(
        'Get help and tutorials on how to use the dashboard, interpret, graphs, and understand analyses'
      ),
    },
  ];

  const { lightMode } = useContext(LightModeContext);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.content}>
        <span className={styles.sectionTitle}>
          {t('National Biodiversity Information System')}
        </span>

        <p>
          {t(
            'The national biodiversity information system is the central dashboard, which houses biodiversity data and analysis tools to support local to national scale biodiversity monitoring, decision-making, and reporting.'
          )}
        </p>
        <div className={styles.sections}>
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={cx(styles.navCard)}
              onClick={() => {
                setSelectedIndex(section.id);
              }}
            >
              <div className={styles.title}>
                {section.icon}
                <h2>{section.title}</h2>
              </div>
              <p>{section.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardHomeComponent;
