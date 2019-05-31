import eoWilsonLogo from 'logos/eoWilson.png';
import molLogo from 'logos/mol.png';
import gbifLogo from 'logos/gbif.png';
import eBirdLogo from 'logos/eBird.png';
import changingOceanLogo from 'logos/changingOcean.png';
import vizzualityLogo from 'logos/vizzuality.png';
import globalFishingWatchLogo from 'logos/globalFishingWatch.png';
import esaLogo from 'logos/esa.png';
import iucnLogo from 'logos/iucn.png';
import unEnvironmentLogo from 'logos/unEnvironment.png';
import raisgLogo from 'logos/raisg.png';
import eolLogo from 'logos/eol.png';
import yaleLogo from 'logos/yale.png';
import ubcLogo from 'logos/ubc.png';
import universityOfFloridaLogo from 'logos/universityOfFlorida.png';
import googleEarthEngineLogo from 'logos/googleEarthEngine.png';
import googleCloudLogo from 'logos/googleCloud.png';
import cartoLogo from 'logos/carto.png';

import styles from './partners-styles.module.scss';

const partners = [
  { href: 'https://mol.org/', image: { src: molLogo, alt: 'Map of Life' } },
  {
    href: 'https://eowilsonfoundation.org/',
    image: {
      src: eoWilsonLogo,
      alt: 'Wilson Biodiversity Foundation',
    }
  },
  {
    href: 'http://www.vizzuality.com/',
    image: { src: vizzualityLogo, alt: 'vizzuality' }
  }
];

const dataPartners = [
  {
    href: molLogo,
    image: { src: molLogo, alt: 'Map of Life' }
  },
  {
    href: 'http://coru.oceans.ubc.ca/',
    image: {
      src: changingOceanLogo,
      alt: 'Changing Ocean Research Unit'
    }
  },
  {
    href: 'https://www.gbif.org/',
    image: { src: gbifLogo, alt: 'GBIF' }
  },
  {
    href: 'https://ebird.org/home',
    image: { src: eBirdLogo, alt: 'eBird' }
  },
  {
    href: 'https://www.iucn.org/',
    image: { src: iucnLogo, alt: 'iucn' }
  },
  {
    href: 'http://globalfishingwatch.org/',
    image: {
      src: globalFishingWatchLogo,
      alt: 'Global Fishing Watch'
    }
  },
  {
    href: 'https://www.unep-wcmc.org/',
    image: { src: unEnvironmentLogo, alt: 'UNEP-WCMC' }
  },
  {
    href: 'https://www.esa-landcover-cci.org/',
    image: { src: esaLogo, alt: 'ESA' }
  },
  {
    href: 'https://raisg.socioambiental.org/',
    image: { src: raisgLogo, alt: 'RAISG' }
  },
  {
    href: 'http://eol.org/',
    image: { src: eolLogo, alt: 'Encyclopedia of Life' }
  },
  {
    href: 'https://carto.com/',
    image: { src: cartoLogo, alt: 'Carto' }
  },
];

const researchPartners = [
  {
    href: 'https://www.yale.edu/',
    image: { src: yaleLogo, alt: 'Yale University' }
  },
  {
    href: 'https://www.ubc.ca/',
    image: { src: ubcLogo, alt: 'University of British Columbia' }
  },
  {
    href: 'http://www.ufl.edu/',
    image: { src: universityOfFloridaLogo, alt: 'University of Florida' }
  },
  {
    href: 'https://earthengine.google.com/',
    image: { src: googleEarthEngineLogo, alt: 'Google Earth Engine' }
  },
  {
    href: 'https://cloud.google.com',
    image: { src: googleCloudLogo, alt: 'Google Cloud Platform' }
  }
];

const sections = [
  {
    title: 'Half-earth mapping core',
    description: 'The Half-Earth Project is an initiative of the E.O. Wilson Biodiversity Foundation. Map of Life utilizes geospatial species distribution data and analytics to guide where we have the best opportunity to conserve the most species. Vizzuality brings this information to life.',
    content: partners,
    theme: styles.partners
  },
  { title: 'Sponsors', description: 'Jeff and Laurie Ubben', theme: styles.sponsors },
  { title: 'Data Partners', content: dataPartners },
  { title: 'Research Partners', content: researchPartners }
];

export default sections;