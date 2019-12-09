import LandLegend from 'images/landLegend.png';
import MarineLegend from 'images/marineLegend.png';

const title = 'Monitoring Progress Toward the Goal of Half-Earth';

const description = [
  'How are we doing in our progress towards Half-Earth? All together there are currently 245,449 designated protected areas, which collectively protect a little over 20 million km2 of land and 26 million km2 of marine waters. According to the World Database on Protected Areas, a joint project of the United Nations Environmental Program and the International Union for Conservation of Nature, in January 2019 these protected areas occupied 14.9% of Earth’s land area and 7.47% of Earth’s ocean area.',
  'The coverage is increasing gradually, which is encouraging. To have reached the existing level is a tribute to those who have led and participated in the global conservation effort. Current protected areas only partly cover important sites for biodiversity, however, and are not yet fully effectively or equitably managed. We must raise our ambition. By protecting half the land and sea we can safeguard the bulk of biodiversity and the people who call these places home.',
  'Monitor our progress here and join us in working together towards the goal of Half-Earth.'
];

const legend = [
  {
    value: '7.8%',
    label: 'CURRENT MARINE PROTECTED AREAS',
    imageSrc: MarineLegend
  },
  {
    value: '15%',
    label: 'CURRENT LAND PROTECTED AREAS',
    imageSrc: LandLegend
  }
];

export default { title, description, legend }
