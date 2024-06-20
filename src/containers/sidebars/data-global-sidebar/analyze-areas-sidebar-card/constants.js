import React from 'react';

import { t } from '@transifex/native';

import cx from 'classnames';

import styles from './styles.module.scss';

import AoisClickIcon  from 'icons/aois_click.svg?react';
import AoisDrawIcon  from 'icons/aois_draw.svg?react';
import AoisSearchIcon  from 'icons/aois_search.svg?react';
import AoisUploadIcon  from 'icons/aois_upload.svg?react';

export const getTabs = () => (tab) =>
  [
    {
      slug: 'click',
      label: t('click'),
      icon: (
        <AoisClickIcon
          className={cx({
            [styles.tabIcon]: true,
            [styles.tabIconActive]: tab === 'click',
          })}
        />
      ),
    },
    {
      slug: 'search',
      label: t('search'),
      icon: (
        <AoisSearchIcon
          className={cx({
            [styles.tabIcon]: true,
            [styles.tabIconActive]: tab === 'search',
          })}
        />
      ),
    },
    {
      slug: 'draw',
      label: t('draw'),
      icon: (
        <AoisDrawIcon
          className={cx({
            [styles.tabIcon]: true,
            [styles.tabIconActive]: tab === 'draw',
          })}
        />
      ),
    },
    {
      slug: 'upload',
      label: t('upload'),
      icon: (
        <AoisUploadIcon
          className={cx({
            [styles.tabIcon]: true,
            [styles.tabIconActive]: tab === 'upload',
          })}
        />
      ),
    },
  ];
