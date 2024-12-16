import React, { useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import IdentityManager from '@arcgis/core/identity/IdentityManager';
import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import Portal from '@arcgis/core/portal/Portal';
import epaLogo from 'logos/epa_logo_transparent.png';
import ginLogo from 'logos/guinea.jpeg';
import guyLogo from 'logos/Guyana_PAC.png';
import iccnLogo from 'logos/institut-congolais.png';
import sleLogo from 'logos/SL_flag.png';

import Button from 'components/button';

import styles from './dashboard-login-styles.module.scss';

const info = new OAuthInfo({
  appId: '7Xx7eWvI655rXo2l',
  popup: false,
});

function DashboardLoginComponent(props) {
  const { setLoggedIn, countryISO, browsePage, setUser, user } = props;
  const t = useT();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [favicon, setFavicon] = useState('/favicon.ico');
  const [pageTitle, setPageTitle] = useState('EPA National Biodiversity');

  useEffect(() => {
    const link = document.querySelector('link[rel="icon"]');

    if (link) {
      link.href = favicon;
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = favicon;
      document.head.appendChild(newLink);
    }
  }, [favicon]);

  useEffect(() => {
    const title = document.querySelector('head title');

    if (title) {
      title.text = pageTitle;
    } else {
      const newTitle = document.createElement('title');
      newTitle.text = pageTitle;
      document.head.appendChild(newTitle);
    }

    setLoggedIn(true);
  }, [pageTitle]);

  const handleLogin = () => {
    IdentityManager.getCredential(info.portalUrl);
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
    switch (countryISO.toUpperCase()) {
      case 'COD':
        setFavicon('/favicon-drc.ico');
        setPageTitle('ICCN Biodiversité nationale');
        break;
      case 'LBR':
        setFavicon('/favicon-epa.ico');
        setPageTitle('EPA National Biodiversity');
        break;
      case 'GIN':
        setFavicon('/favicon-gin.ico');
        setPageTitle('EPA National Biodiversity');
        break;
      case 'SLE':
        setFavicon('/favicon-sle.ico');
        setPageTitle('Sierra Leone');
        break;
      case 'GUY':
        setFavicon('favicon-guy.ico');
        setPageTitle('Guyana');
        break;
      default:
        break;
    }

    IdentityManager.registerOAuthInfos([info]);

    IdentityManager.checkSignInStatus(info.portalUrl)
      .then(handleLoginSuccess)
      .catch((error) => {
        throw Error(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div>
        {countryISO.toUpperCase() === 'COD' && (
          <img
            src={iccnLogo}
            style={{ width: '300px' }}
            alt="Democratic Rep of Congo"
          />
        )}
        {countryISO.toUpperCase() === 'LBR' && (
          <img src={epaLogo} style={{ width: '300px' }} alt="Liberia" />
        )}
        {countryISO.toUpperCase() === 'GIN' && (
          <img src={ginLogo} style={{ width: '300px' }} alt="Guinea" />
        )}
        {countryISO.toUpperCase() === 'SLE' && (
          <img src={sleLogo} style={{ width: '300px' }} alt="Sierra Leone" />
        )}
        {countryISO.toUpperCase() === 'GUY' && (
          <img src={guyLogo} style={{ width: '300px' }} alt="Guyana" />
        )}
      </div>
      <div className={styles.loginForm}>
        {/* <FormControl variant="standard">
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
            type='password'
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </FormControl> */}
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
