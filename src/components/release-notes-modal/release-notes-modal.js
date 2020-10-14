import React, { useEffect, useState } from 'react';
import { getConfig, setConfig } from 'utils/user-config-utils';
import { releaseNotesData, getLatestReleaseSlug } from 'constants/user-config-constants';
import Component from './release-notes-modal-component';

const ReleaseNotesModalContainer = () => {
  const [isModalOpen, setModalOpen] = useState(true);
  const [releaseNotesTexts, setReleaseNotesTexts] = useState(null);

  useEffect(() => {
    const userConfig = getConfig();
    if (userConfig.latestReleaseNotes !== getLatestReleaseSlug()) {
      // keep modal open and update latest release key
      setConfig(userConfig, {latestReleaseNotes: getLatestReleaseSlug()})
    } else if (!userConfig.showLatestReleaseNotes) {
      setModalOpen(false);
    }
  }, [])

  useEffect(() => {
    setReleaseNotesTexts(releaseNotesData[getLatestReleaseSlug()])
  },[])

  const handleModalClose = () => {
    const userConfig = getConfig();
    setConfig(userConfig, {showLatestReleaseNotes: false, latestReleaseNotes: getLatestReleaseSlug()})
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