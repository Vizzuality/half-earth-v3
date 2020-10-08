import React, { useEffect, useState } from 'react';
import { getConfig, setConfig } from 'utils/user-config-utils';
import { releaseNotesData } from 'constants/user-config-constants';
import Component from './release-notes-modal-component';

const ReleaseNotesModalContainer = () => {
  const [isModalOpen, setModalOpen] = useState(true);
  const [releaseNotesTexts, setReleaseNotesTexts] = useState(null);

  useEffect(() => {
    const userConfig = getConfig();
    if (!userConfig.showLatestReleaseNotes) {
      setModalOpen(false);
    }
  }, [])

  useEffect(() => {
    const userConfig = getConfig();
    setReleaseNotesTexts(releaseNotesData[userConfig.latestReleaseNotes])
  },[])

  const handleModalClose = () => {
    const userConfig = getConfig();
    setConfig(userConfig, {showLatestReleaseNotes: false})
    setModalOpen(false);
  }

 return (
  <Component
    isModalOpen={isModalOpen}
    handleModalClose={handleModalClose}
    releaseNotesTexts={releaseNotesTexts}
  />
 )
}

export default ReleaseNotesModalContainer;