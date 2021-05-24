import React, { useEffect, useState } from 'react';
import { createUserEntry, updateUserEntry } from 'services/airtable.js';
import Component from './user-data-modal-component';
import { STEP_2 } from 'constants/user-modal-constants';

const UserDataModalContainer = () => {
  const [isModalOpen, setModalOpen] = useState(true);
  const [isLocalStorageAllowed, setLocalStorageAllowed] = useState(false);
  const [requiredFieldsWarning, setRequiredFieldsWarning] = useState(false);

  useEffect(() => {
    try {
      if (localStorage) {setLocalStorageAllowed(true)}
    } catch (error) {
      console.log(error)
      if(!localStorage) {setLocalStorageAllowed(false)}
    }
  }, []);

  useEffect(() => {
    if (isLocalStorageAllowed) {
      const doesModalKeyExists = localStorage.getItem('user-data-modal');
      if (doesModalKeyExists === null) {
        localStorage.setItem('user-data-modal', 'true')
      } else if (doesModalKeyExists === 'false') {
        setModalOpen(false);
      }
    }
  }, [isLocalStorageAllowed])

  const handleModalClose = () => {
    localStorage.setItem('user-data-modal', 'false')
    setModalOpen(false);
  }

  const storeFirstStepData = async (userData, storeUserId, nextStep) => {
    if (userData.job_role.slug === 'placeholder' || userData.map_usage.slug === 'placeholder') {
      setRequiredFieldsWarning(true)
    } else {
      const createdUser = await createUserEntry({...userData});
      storeUserId(createdUser[0].id);
      nextStep(STEP_2)
    }
  }

  const storeSecondStepData = (userId, userData) => {
    updateUserEntry(userId, userData);
    setModalOpen(false);
  }

 return (
  <Component
    isModalOpen={isModalOpen}
    handleModalClose={handleModalClose}
    storeFirstStepData={storeFirstStepData}
    storeSecondStepData={storeSecondStepData}
    requiredFieldsWarning={requiredFieldsWarning}
  />
 )
}

export default UserDataModalContainer;