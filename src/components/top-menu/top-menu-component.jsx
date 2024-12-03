import React from 'react'
import styles from './top-menu-styles.module.scss';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import { useT } from '@transifex/react';

function TopMenuComponent(props) {
  const t = useT();
  const { user, setLoggedIn } = props;

  const logOut = () => {
    IdentityManager.destroyCredentials();
    setLoggedIn(false);
  }

  const UserProfile = () => {
    return (<>
      <a href="https://eowilson.maps.arcgis.com/home/index.html" target="_blank" className={styles.profile}>
        <img src={user.thumbnailUrl} width="30px" height="30px" />
      </a>
      <span>|</span>
      <button onClick={logOut}>Logout</button>
    </>
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
