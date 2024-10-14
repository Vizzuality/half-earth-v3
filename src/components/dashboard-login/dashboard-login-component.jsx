import React, { useState } from 'react';
import styles from './dashboard-login-styles.module.scss';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from 'components/button';
import { useT } from '@transifex/react';
import Logo from '../half-earth-logo/component';

function DashboardLoginComponent(props) {
  const { setLoggedIn } = props;
  const t = useT();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState()

  const handleLogin = () => {
    setLoggedIn(true);
  }

  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.loginForm}>
        <FormControl variant="standard">
          <TextField
            id="outlined-controlled"
            label="Email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </FormControl>
        <FormControl variant="standard">
          <TextField
            id="outlined-controlled"
            label="Password"
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
