import React, { useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import { getConfig, setConfig } from 'utils/user-config-utils';

import {
  NATIONAL_REPORT_CARDS,
  getLatestReleaseSlug,
} from 'constants/user-config-constants';

import Component from './release-notes-modal-component';

function ReleaseNotesModalContainer() {
  const [isModalOpen, setModalOpen] = useState(true);
  const [releaseNotesTexts, setReleaseNotesTexts] = useState(null);
  const t = useT();

  const releaseNotesData = {
    [NATIONAL_REPORT_CARDS]: [
      {
        title: t('NATIONAL REPORT CARDS'),
        body: t(
          'The National Report Cards summarize various aspects of conservation efforts at the national level. Use them to explore different national indicators measuring conservation needs and progress, to discover the relationships between these indicators and different socio-political metrics, and to compare differences between countries.'
        ),
      },
      {
        title: t('HOW TO?'),
        body: t(
          'Find a country’s National Report Card by using the “Find places” tab to search by country name or by clicking on a country directly within the map.'
        ),
      },
    ],
  };

  useEffect(() => {
    const userConfig = getConfig();
    if (userConfig.latestReleaseNotes !== getLatestReleaseSlug()) {
      // keep modal open and update latest release key
      setConfig(userConfig, { latestReleaseNotes: getLatestReleaseSlug() });
    } else if (!userConfig.showLatestReleaseNotes) {
      setModalOpen(false);
    }
  }, []);

  useEffect(() => {
    setReleaseNotesTexts(releaseNotesData[getLatestReleaseSlug()]);
  }, []);

  const handleModalClose = () => {
    const userConfig = getConfig();
    setConfig(userConfig, {
      showLatestReleaseNotes: false,
      latestReleaseNotes: getLatestReleaseSlug(),
    });
    setModalOpen(false);
  };

  return (
    <Component
      isModalOpen={isModalOpen}
      handleModalClose={handleModalClose}
      releaseNotesTexts={releaseNotesTexts}
    />
  );
}

export default ReleaseNotesModalContainer;
