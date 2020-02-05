import React, { useState } from 'react';
import { Modal } from 'he-components';
import styles from './user-data-modal-styles.module.scss';
import { ReactComponent as ScreenIcon } from 'icons/screen.svg';

const PROFESSIONS = ['Student', 'Researcher', 'Conservationist', 'Other']

const RadioButton = ({ text, value, checked, name, onChange }) => {
  return (
    <div className={styles.radioButton}>
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        checked={checked}
        onChange={onChange}
        readOnly
      />
      <label htmlFor={value} className={styles.radioInput}>
        {text}
      </label>
    </div>
  )
}


const UserDataModalComponent = ({ isModalOpen, handleModalClose }) => {

  const [activeStep, setActiveStep] = useState('step1');
  const [userData, setUserData] = useState(null);

  const userDataUpdate = (key, value) => {
    if (userData) {
      setUserData({...userData, [key]:value})
    } else {
      setUserData({[key]:value})
    }
  }

  const jobRoleInputState = userData => {
    if (!userData || userData.job_role !== 'Other' ) {
      return true
    } else {
      return false
    }
  }

  const step2 = () => {
    return (
      <section className={styles.stepContainer}>
        <ScreenIcon className={styles.screenIcon}/>
        <p className={styles.title}>THANK YOU! JUST ONE MORE THING…</p>
        <p className={styles.question}>Would you like to help us improve the map?</p>
        <p className={styles.bodyText}>If you share your email with us, we will contact you and invite you to share with us your experience with the map, so we can improve it.</p>
        <input type='text' className={styles.textInput} placeholder={'Writte your email here'} onChange={(event) => userDataUpdate('email', event.target.value)}/>
        <button className={styles.button} onClick={(e) => handleModalClose(userData)}>done</button>
      </section>
    )
  }
  
  const step1 = (setActiveStep) => {
    return (
    <section className={styles.stepContainer}>
      <p className={styles.title}>WELCOME TO THE NEW HALF-EARTH MAP:</p>
      <p className={styles.bodyText}>We are trying to improve your experience on the map. Can you tell us a bit about yourself?</p>
      <p className={styles.question}>Which is your profession?</p>
      <div className={styles.radioGroupContainer}>

        {PROFESSIONS.map(profession => (
          <RadioButton
            name={'professions'}
            id={profession}
            value={profession}
            text={profession}
            onChange={(e) => userDataUpdate('job_role', e.target.value)}
          />
        ))}
      </div>
      <input
        type='text'
        className={styles.textInput}
        placeholder={'Writte your profession here'}
        onChange={(event) => userDataUpdate('job_role_other', event.target.value)}
        disabled={jobRoleInputState(userData)}
      />
      <p className={styles.question}>Please tell us what you use the map for:</p>
      <input type='text' className={styles.textInput} placeholder={'What do you use the map for?'} onChange={(event) => userDataUpdate('map_usage', event.target.value)}/>
      <button className={styles.button} onClick={() => setActiveStep('step2')}>SEND</button>
      </section>
    )
  }

  return (
    <Modal
    onRequestClose={(e) => handleModalClose(userData)}
    isOpen={isModalOpen}
    theme={styles}
    >
      {activeStep === 'step1' ? step1(setActiveStep) : step2() }
    </Modal>
  )
}

export default UserDataModalComponent;