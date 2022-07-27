export const LOCAL_STORAGE_USER_CONFIG_KEY = 'HE-user-config' // key in local storage

export const NATIONAL_REPORT_CARDS = 'nrc-10-2020';

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
