import React from 'react';

import cx from 'classnames';

import styles from './styles.module.scss';

import { ReactComponent as AoisClickIcon } from 'icons/aois_click.svg';
import { ReactComponent as AoisDrawIcon } from 'icons/aois_draw.svg';
import { ReactComponent as AoisSearchIcon } from 'icons/aois_search.svg';
import { ReactComponent as AoisUploadIcon } from 'icons/aois_upload.svg';

export const TABS = (selectedAnalysisTab) => [
  {
    label: 'click',
    icon: <AoisClickIcon className={cx({
      [styles.tabIcon]: true,
      [styles.tabIconActive]: selectedAnalysisTab === 'click',
    })}
    />,
  },
  {
    label: 'search',
    icon: <AoisSearchIcon className={cx({
      [styles.tabIcon]: true,
      [styles.tabIconActive]: selectedAnalysisTab === 'search',
    })}
    />,
  },
  {
    label: 'draw',
    icon: <AoisDrawIcon className={cx({
      [styles.tabIcon]: true,
      [styles.tabIconActive]: selectedAnalysisTab === 'draw',
    })}
    />,
  },
  {
    label: 'upload',
    icon: <AoisUploadIcon className={cx({
      [styles.tabIcon]: true,
      [styles.tabIconActive]: selectedAnalysisTab === 'upload',
    })}
    />,
  },
];
