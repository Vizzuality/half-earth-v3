import React, { useState } from 'react';
import { Modal } from 'he-components';
import styles from './user-data-modal-styles.module.scss';
import { ReactComponent as ScreenIcon } from 'icons/screen.svg';
import Dropdown from 'components/dropdown';
import { useT } from '@transifex/react';

import {
  STEP_1,
  USER_MODAL_QUESTIONS,
  DROPDOWN_INITIAL_VALUE,
} from 'constants/user-modal-constants';

const UserDataModalComponent = ({
  isModalOpen,
  handleModalClose,
  storeFirstStepData,
  storeSecondStepData,
  requiredFieldsWarning,
}) => {
  const t = useT();

  const [activeStep, setActiveStep] = useState(STEP_1);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({
    job_role: DROPDOWN_INITIAL_VALUE,
    job_role_description: '',
    map_usage: DROPDOWN_INITIAL_VALUE,
    map_usage_description: '',
    email: '',
  });

  const userDataUpdate = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  const step1 = () => {
    return (
      <section className={styles.stepContainer}>
        <p className={styles.title}>
          {t('WELCOME TO THE NEW HALF-EARTH MAP:')}
        </p>
        <p className={styles.bodyText}>
          {t(
            'We are trying to improve your experience on the map. Can you tell us a bit about yourself?'
          )}
        </p>
        <div className={styles.sectionsWrapper}>
          {USER_MODAL_QUESTIONS.map((q) => (
            <section key={q.userStateKey} className={styles.questionSection}>
              <p className={styles.question}>
                {q.text}
                {userData[q.userStateKey].slug === 'placeholder' &&
                  q.required &&
                  requiredFieldsWarning && (
                    <span className={styles.requiredWarning}>
                      {t('Required fields are empty!')}
                    </span>
                  )}
              </p>
              <div className={styles.radioGroupContainer}>
                <Dropdown
                  options={q.dropdownOptions}
                  handleOptionSelection={(value) =>
                    userDataUpdate(q.userStateKey, value)
                  }
                  selectedOption={
                    q.dropdownOptions.find(
                      (o) => o.slug === userData[q.userStateKey]
                    ) || DROPDOWN_INITIAL_VALUE
                  }
                  width="full"
                />
              </div>
              <div className={styles.alternativeAnswerContainer}>
                <input
                  type="text"
                  className={styles.textInput}
                  placeholder={q.inputPlaceholder}
                  onChange={(e) =>
                    userDataUpdate(
                      `${q.userStateKey}_description`,
                      e.target.value
                    )
                  }
                  disabled={userData[q.userStateKey] !== 'other'}
                />
              </div>
            </section>
          ))}
        </div>
        <button
          className={styles.button}
          onClick={() => storeFirstStepData(userData, setUserId, setActiveStep)}
        >
          {t('SEND')}
        </button>
      </section>
    );
  };

  const step2 = () => {
    return (
      <section className={styles.stepContainer}>
        <ScreenIcon className={styles.screenIcon} />
        <p className={styles.title}>{t('THANK YOU! JUST ONE MORE THING…')}</p>
        <p className={styles.question}>
          {t('Would you like to help us improve the map?')}
        </p>
        <p className={styles.bodyText}>
          {t(
            'If you share your email with us, we will contact you and invite you to share with us your experience with the map, so we can improve it.'
          )}
        </p>
        <input
          required
          type="email"
          value={userData.email}
          className={styles.textInput}
          placeholder={t('Write your email here')}
          onChange={(event) => userDataUpdate('email', event.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => storeSecondStepData(userId, userData)}
        >
          {t('done')}
        </button>
      </section>
    );
  };

  return (
    <Modal
      onRequestClose={handleModalClose}
      isOpen={isModalOpen}
      theme={styles}
    >
      {activeStep === STEP_1 ? step1() : step2()}
    </Modal>
  );
};

export default UserDataModalComponent;
