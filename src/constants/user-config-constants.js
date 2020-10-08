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
      title: 'focus on biodiversity conservation within national borders!',
      body: 'Explore the preliminary results on prioritisation by Rinnan and Jetz allowing to give a first idea of where governments should focus their conservation efforts. Discover the relationships between the Species Protection Index and various socio-political indicators of different nations.'
    },
    {
      title: 'HOW TO?',
      body: 'Search for a country in the find places tab or interact with the map by clicking on a given country area in the globe.'
    }
  ]
}



export const tutorialData = {
  [RARITY_RICHNESS_TUTORIAL]: 'When activating a new biodiversity layer you can switch between rarity and richness.',
  [LEGEND_TUTORIAL]: 'In the legend you can get the layer’s metadata info, change its opacity or remove it from the map.',
  [LEGEND_DRAG_TUTORIAL]: 'Drag the legends to change its order on the map.',
}