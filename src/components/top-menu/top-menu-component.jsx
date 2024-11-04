import React, { useEffect } from 'react'
import styles from './top-menu-styles.module.scss';
import { useT } from '@transifex/react';

function TopMenuComponent(props) {
  const t = useT();
  const { user } = props;

  const UserProfile = () => {
    return (
      <a href="https://eowilson.maps.arcgis.com/home/index.html" target="_blank" className={styles.profile}>
        <img src={user.thumbnailUrl} width="30px" height="30px" />
      </a>
    )
  }
  return (
    <div className={styles.container}>
      <a href="#" target='_blank'>{t('About Us')}</a>
      {user && <>
        <span>|</span>
        <UserProfile />
      </>}
    </div>
  )
}

export default TopMenuComponent;
