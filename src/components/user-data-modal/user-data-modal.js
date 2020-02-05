import React, { useEffect, useState } from 'react';
import { createUserEntry } from 'services/airtable.js';
import Component from './user-data-modal-component';

const UserDataModalContainer = () => {
  const [isModalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    const doesModalKeyExists = localStorage.getItem('user-data-modal');
    if (doesModalKeyExists === null) {
      localStorage.setItem('user-data-modal', 'true')
    } else if (doesModalKeyExists === 'false') {
      setModalOpen(false);
    }
  }, [])

  const handleModalClose = userData => {
    userData && createUserEntry({...userData});
    localStorage.setItem('user-data-modal', 'false')
    setModalOpen(false);
  }

 return (
  <Component
    isModalOpen={isModalOpen}
    handleModalClose={handleModalClose}
  />
 )
}

export default UserDataModalContainer;