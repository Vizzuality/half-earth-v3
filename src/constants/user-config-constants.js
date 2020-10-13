export const LOCAL_STORAGE_USER_CONFIG_KEY = 'HE-user-config' // key in local storage
export const RARITY_RICHNESS_TUTORIAL = 'rarity-richness-tutorial';
export const LEGEND_TUTORIAL = 'legend-tutorial';
export const LEGEND_DRAG_TUTORIAL = 'legend-drag-tutorial';

const NATIONAL_REPORT_CARDS = 'nrc-10-2020';

// Whenever a new release is to be displayed in the modal
// add it to this log on index [0]
const releasesLog = [
  NATIONAL_REPORT_CARDS
]

export const getLatestReleaseSlug = () => releasesLog[0]

export const userConfigInitialState = {
  showAllTutorials: true,
  [RARITY_RICHNESS_TUTORIAL]: true,
  [LEGEND_TUTORIAL]: true,
  [LEGEND_DRAG_TUTORIAL]: true,
  latestReleaseNotes: getLatestReleaseSlug(),
  showLatestReleaseNotes: true
}

export const releaseNotesData = {
  [NATIONAL_REPORT_CARDS]: [
    {
      title: 'NATIONAL REPORT CARDS',
      body: 'The National Report Cards summarize various aspects of conservation efforts at the national level. Use them to explore different national indicators measuring conservation needs and progress, to discover the relationships between these indicators and different socio-political metrics, and to compare differences between countries.'
    },
    {
      title: 'HOW TO?',
      body: 'Find a country’s National Report Card by using the “Find places” tab to search by country name or by clicking on a country directly within the map.'
    }
  ]
}



export const tutorialData = {
  [RARITY_RICHNESS_TUTORIAL]: 'When activating a new biodiversity layer you can switch between rarity and richness.',
  [LEGEND_TUTORIAL]: 'In the legend you can get the layer’s metadata info, change its opacity or remove it from the map.',
  [LEGEND_DRAG_TUTORIAL]: 'Drag the legends to change its order on the map.',
}