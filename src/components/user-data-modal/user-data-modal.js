import React, { useEffect, useState } from 'react';
import { getConfig, setConfig } from 'utils/user-config-utils';
import { createUserEntry, updateUserEntry } from 'services/airtable.js';
import Component from './user-data-modal-component';
import { STEP_2 } from 'constants/user-modal-constants';

const UserDataModalContainer = () => {
  const [isModalOpen, setModalOpen] = useState(true);
  const [requiredFieldsWarning, setRequiredFieldsWarning] = useState(false);


  useEffect(() => {
    const userConfig = getConfig();
    if (!userConfig.showUserResearchModal) {
      // close modal in case the usermodal has been seen before
      setModalOpen(false);
    }
  }, [])

  const handleModalClose = () => {
    const userConfig = getConfig();
    setConfig(userConfig, {showUserResearchModal: false})
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