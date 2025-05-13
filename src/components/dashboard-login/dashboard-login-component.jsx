import React, { useEffect } from 'react';

import { useT } from '@transifex/react';

import IdentityManager from '@arcgis/core/identity/IdentityManager';
import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import Portal from '@arcgis/core/portal/Portal';
import { FormControl, TextField } from '@mui/material';

import Button from 'components/button';

import styles from './dashboard-login-styles.module.scss';

// TODO: Research why storing appId in .env file returns undefined
const info = new OAuthInfo({
  appId: '7Xx7eWvI655rXo2l',
  popup: false,
});

function DashboardLoginComponent(props) {
  const { setLoggedIn, setUser } = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const t = useT();

  const handleLogin = () => {
    // IdentityManager.getCredential(info.portalUrl);
    if (email === 'walter.jetz@yale.edu' && password === 'nbis') {
      setLoggedIn(true);
    }
  };

  const handleLoginSuccess = () => {
    const portal = new Portal();
    portal.authMode = 'immediate';
    portal.load().then(() => {
      setLoggedIn(true);
      setUser(portal.user);
    });
  };

  useEffect(() => {
    IdentityManager.registerOAuthInfos([info]);
    IdentityManager.checkSignInStatus(info.portalUrl)
      .then(handleLoginSuccess)
      .catch((error) => {
        throw Error(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <h1 className={styles.title}>{t('Login')}</h1>
        <FormControl variant="standard">
          <TextField
            label={t('Email address')}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </FormControl>
        <FormControl variant="standard">
          <TextField
            label={t('Password')}
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </FormControl>
        <Button
          className={styles.saveButton}
          type="rectangular"
          label={t('Login')}
          handleClick={handleLogin}
        />
      </div>
    </div>
  );
}

export default DashboardLoginComponent;
