import React from 'react';

import { useT } from '@transifex/react';

import IdentityManager from '@arcgis/core/identity/IdentityManager';

import styles from './top-menu-styles.module.scss';

function UserProfile(props) {
  const t = useT();
  const { user, setLoggedIn } = props;
  const logOut = () => {
    IdentityManager.destroyCredentials();
    setLoggedIn(false);
  };
  return (
    <>
      <a
        href="https://eowilson.maps.arcgis.com/home/index.html"
        target="_blank"
        className={styles.profile}
        rel="noreferrer"
      >
        <img
          src={user.thumbnailUrl}
          width="30px"
          height="30px"
          alt="User profile"
        />
      </a>
      <span>|</span>
      <button type="button" onClick={logOut}>
        {t('Logout')}
      </button>
    </>
  );
}

function TopMenuComponent(props) {
  const { user } = props;
  return (
    <div className={styles.container}>{user && <UserProfile {...props} />}</div>
  );
}

export default TopMenuComponent;
