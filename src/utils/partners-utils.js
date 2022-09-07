import { t } from '@transifex/native';

import burtsLogo from 'logos/BB_Foundation_logo_stacked.png';
import changingOceanLogo from 'logos/changingOcean.png';
import eBirdLogo from 'logos/eBird.png';
import eolLogo from 'logos/eol.png';
import eoWilsonLogo from 'logos/eoWilson.png';
import esaLogo from 'logos/esa.png';
import esriLogo from 'logos/esri.png';
import fieldMuseumLogo from 'logos/field-museum-logo_2018.png';
import gbifLogo from 'logos/gbif.png';
import globalFishingWatchLogo from 'logos/globalFishingWatch.png';
import googleCloudLogo from 'logos/googleCloud.png';
import googleEarthEngineLogo from 'logos/googleEarthEngine.png';
import gorongosaLogo from 'logos/gorongosa_np_logo.png';
import inaturalistLogo from 'logos/inaturalist.png';
import iucnLogo from 'logos/iucn.png';
import molLogo from 'logos/mol.png';
import mooreFoundationLogo from 'logos/mooreFoundation.png';
import raisgLogo from 'logos/raisg.png';
import ubcLogo from 'logos/ubc.png';
import unEnvironmentLogo from 'logos/unEnvironment.png';
import universityOfFloridaLogo from 'logos/universityOfFlorida.png';
import vizzualityLogo from 'logos/vizzuality.png';
import yaleLogo from 'logos/yale.png';

export const getTexts = () => ({
  partners: {
    title: t('Half-Earth Project Map - Core Team'),
    content: [
      `<a style="text-decoration: underline; color: white" target="_blank" href="https://www.half-earthproject.org">${t('The Half-Earth Project')}</a> ${t(' is an initiative of the E.O. Wilson Biodiversity Foundation. Map of Life utilizes geospatial species distribution data and analytics to guide where we have the best opportunity to conserve the most species. Vizzuality brings this information to life')}`,
      `<a style="text-decoration: underline;" target="_blank" href="https://www.half-earthproject.org/half-earth-project-team-members/"> ${t('More about the core team of Half-Earth')} </a>`,
    ],
  },
  platformPartners: {
    title: t('Platform partner'),
  },
  sponsors: {
    title: t('Funding support'),
  },
  dataPartners: {
    title: t('Data partners'),
  },
  researchPartners: {
    title: t('Research partners'),
  },
});

export const getPartners = () => [
  {
    index: 0,
    href: 'https://eowilsonfoundation.org/',
    image: {
      src: eoWilsonLogo,
      alt: t('Wilson Biodiversity Foundation'),
    },
  },
  {
    index: 1,
    href: 'https://mol.org/',
    image: {
      src: molLogo,
      alt: t('Map of Life'),
    },
  },
  {
    index: 2,
    href: 'http://www.vizzuality.com/',
    image: { src: vizzualityLogo, alt: t('vizzuality') },
  },
];

export const getPlatformPartners = () => [
  {
    href: 'https://www.esri.com/en-us/home',
    image: { src: esriLogo, alt: t('Esri') },
  },
];

export const getDataPartners = () => [
  {
    index: 0,
    href: 'https://mol.org/',
    image: { src: molLogo, alt: t('Map of Life') },
  },
  {
    index: 1,
    href: 'http://coru.oceans.ubc.ca/',
    image: {
      src: changingOceanLogo,
      alt: t('Changing Ocean Research Unit'),
    },
  },
  {
    index: 2,
    href: 'https://www.gbif.org/',
    image: { src: gbifLogo, alt: t('GBIF') },
  },
  {
    index: 3,
    href: 'https://ebird.org/home',
    image: { src: eBirdLogo, alt: t('eBird') },
  },
  {
    index: 4,
    href: 'https://www.iucn.org/',
    image: { src: iucnLogo, alt: t('iucn') },
  },
  {
    index: 5,
    href: 'http://globalfishingwatch.org/',
    image: {
      src: globalFishingWatchLogo,
      alt: t('Global Fishing Watch'),
    },
  },
  {
    index: 6,
    href: 'https://www.unep-wcmc.org/',
    image: { src: unEnvironmentLogo, alt: t('UNEP-WCMC') },
  },
  {
    index: 7,
    href: 'https://www.esa-landcover-cci.org/',
    image: { src: esaLogo, alt: t('ESA') },
  },
  {
    index: 8,
    href: 'https://raisg.socioambiental.org/',
    image: { src: raisgLogo, alt: t('RAISG') },
  },
  {
    index: 9,
    href: 'http://eol.org/',
    image: { src: eolLogo, alt: t('Encyclopedia of Life') },
  },
  {
    index: 10,
    href: 'https://www.inaturalist.org/',
    image: { src: inaturalistLogo, alt: t('iNaturalist') },
  },
  {
    index: 11,
    href: 'https://www.gorongosa.org/',
    image: { src: gorongosaLogo, alt: t('Gorongosa National Park') },
  },
  {
    index: 12,
    href: 'https://www.fieldmuseum.org/',
    image: { src: fieldMuseumLogo, alt: t('Field Museum') },
  },
];

export const getResearchPartners = () => [
  {
    index: 0,
    href: 'https://www.yale.edu/',
    image: { src: yaleLogo, alt: t('Yale University') },
  },
  {
    index: 1,
    href: 'https://www.ubc.ca/',
    image: { src: ubcLogo, alt: t('University of British Columbia') },
  },
  {
    index: 2,
    href: 'http://www.ufl.edu/',
    image: { src: universityOfFloridaLogo, alt: t('University of Florida') },
  },
  {
    index: 3,
    href: 'https://earthengine.google.com/',
    image: { src: googleEarthEngineLogo, alt: t('Google Earth Engine') },
  },
  {
    index: 4,
    href: 'https://cloud.google.com',
    image: { src: googleCloudLogo, alt: t('Google Cloud Platform') },
  },
];

export const getSponsors = () => [
  {
    index: 0,
    href: 'https://www.esri.com/en-us/home',
    image: { src: esriLogo, alt: t('Esri') },
  },
  {
    index: 1,
    href: 'https://www.moore.org/',
    image: { src: mooreFoundationLogo, alt: t('Gordon and Betty Moore Foundation') },
  },
  {
    index: 2,
    href: 'https://www.burtsbees.com/content/outreach/out-reach-asset.html',
    image: { src: burtsLogo, alt: t('Burt’s Bees Greater Good Foundation'), className: 'bbees' },
  },
  {
    index: 3,
    label: 'Jeff and Laurie Ubben',
  },
];
