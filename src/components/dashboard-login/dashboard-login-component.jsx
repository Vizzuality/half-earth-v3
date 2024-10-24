import React, { useState } from 'react';
import styles from './dashboard-login-styles.module.scss';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from 'components/button';
import iccnLogo from 'logos/institut-congolais.png';
import epaLogo from 'logos/channels4_profile.jpg';
import { useT } from '@transifex/react';

function DashboardLoginComponent(props) {
  const { setLoggedIn, countryISO } = props;
  const t = useT();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = () => {
    setLoggedIn(true);
  }

  return (
    <div className={styles.container}>
      <div>
        {countryISO.toUpperCase() === 'COD' && <img src={iccnLogo} style={{ width: '300px' }} />}
        {countryISO.toUpperCase() === 'LBR' && <img src={epaLogo} style={{ width: '300px' }} />}
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
