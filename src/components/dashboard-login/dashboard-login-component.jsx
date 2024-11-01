import React, { useEffect, useState } from 'react';
import styles from './dashboard-login-styles.module.scss';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from 'components/button';
import iccnLogo from 'logos/institut-congolais.png';
import epaLogo from 'logos/epa_logo_transparent.png';
import ginLogo from 'logos/guinea.jpeg';
import { useT } from '@transifex/react';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import Portal from '@arcgis/core/portal/Portal';

const info = new OAuthInfo({
  appId: '7Xx7eWvI655rXo2l',
  popup: false,
})

function DashboardLoginComponent(props) {
  const { setLoggedIn, countryISO } = props;
  const t = useT();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [favicon, setFavicon] = useState('/favicon.ico');
  const [pageTitle, setPageTitle] = useState('EPA National Biodiversity');

  useEffect(() => {
    if (countryISO.toUpperCase() === 'COD') {
      setFavicon('/favicon-drc.ico');
      setPageTitle('EPA');
    } else if (countryISO.toUpperCase() === 'LBR') {
      setFavicon('/favicon-epa.ico');
      setPageTitle('EPA National');
    } else if (countryISO.toUpperCase() === 'GIN') {
      setFavicon('/favicon-gin.ico');
      setPageTitle('EPA National Biodiversity');
    }

    IdentityManager.registerOAuthInfos([info]);

    IdentityManager.checkSignInStatus(info.portalUrl)
      .then(handleLoginSuccess)
      .catch(() => console.log('not logged in'));

  }, []);

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
  }, [pageTitle]);

  const handleLogin = () => {
    setLoggedIn(true);
    // IdentityManager.getCredential(info.portalUrl);
  }

  const handleLoginSuccess = () => {
    const portal = new Portal();
    portal.authMode = 'immediate';
    portal.load().then(() => {
      console.log(portal);
      console.log('User Info: ', portal.user);
    })
  }

  return (
    <div className={styles.container}>
      <div>
        {countryISO.toUpperCase() === 'COD' && <img src={iccnLogo} style={{ width: '300px' }} />}
        {countryISO.toUpperCase() === 'LBR' && <img src={epaLogo} style={{ width: '300px' }} />}
        {countryISO.toUpperCase() === 'GIN' && <img src={ginLogo} style={{ width: '300px' }} />}
      </div>
      <div className={styles.loginForm}>
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
            type='password'
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
  )
}

export default DashboardLoginComponent
