import React, { useEffect } from 'react';

import { useT } from '@transifex/react';

import IdentityManager from '@arcgis/core/identity/IdentityManager';

import UserAvatar from 'icons/user_icon.svg?react';

import styles from './top-menu-styles.module.scss';

function UserProfile(props) {
  const t = useT();
  const { setLoggedIn } = props;
  const logOut = () => {
    IdentityManager.destroyCredentials();
    setLoggedIn(false);
  };

  // useEffect(() => {
  //   logOut();
  // }, []);

  return (
    <>
      {/* <a
        href="https://eowilson.maps.arcgis.com/home/index.html"
        target="_blank"
        className={styles.profile}
        rel="noreferrer"
      >
        <UserAvatar />
      </a>
      <span>|</span>
      <button type="button" onClick={logOut}>
        {t('Logout')}
      </button> */}
    </>
  );
}

function TopMenuComponent(props) {
  const { user } = props;
  return (
    // <div className={styles.container}>{user && <UserProfile {...props} />}</div>
    <div className={styles.container}>
      <UserProfile {...props} />
    </div>
  );
}

export default TopMenuComponent;
