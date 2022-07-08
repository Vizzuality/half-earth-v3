import { t } from '@transifex/native';

export const LOCAL_STORAGE_USER_CONFIG_KEY = 'HE-user-config' // key in local storage

const NATIONAL_REPORT_CARDS = 'nrc-10-2020';

// Whenever a new release is to be displayed in the modal
// add it to this log on index [0]
const releasesLog = [
  NATIONAL_REPORT_CARDS
]

export const getLatestReleaseSlug = () => releasesLog[0]

export const userConfigInitialState = {
  showAllTutorials: true,
  latestReleaseNotes: getLatestReleaseSlug(),
  showLatestReleaseNotes: true,
  showUserResearchModal: true
}

export const releaseNotesData = {
  [NATIONAL_REPORT_CARDS]: [
    {
      title: t('NATIONAL REPORT CARDS'),
      body: t('The National Report Cards summarize various aspects of conservation efforts at the national level. Use them to explore different national indicators measuring conservation needs and progress, to discover the relationships between these indicators and different socio-political metrics, and to compare differences between countries.')
    },
    {
      title: t('HOW TO?'),
      body: t('Find a country’s National Report Card by using the “Find places” tab to search by country name or by clicking on a country directly within the map.')
    }
  ]
}
