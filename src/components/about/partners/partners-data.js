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
import esriLogo from 'logos/esri.png';
import mooreFoundationLogo from 'logos/mooreFoundation.png';
import burtsLogo from 'logos/BB_Foundation_logo_stacked.png';
import fieldMuseumLogo from 'logos/field-museum-logo_2018.png';
import gorongosaLogo from 'logos/gorongosa_np_logo.png';
import inaturalistLogo from 'logos/inaturalist.png';

export const texts = {
  partners: {
    title: 'Half-Earth Project Map - Core Team',
    content: [
      'The Half-Earth Project is an initiative of the E.O. Wilson Biodiversity Foundation. Map of Life utilizes geospatial species distribution data and analytics to guide where we have the best opportunity to conserve the most species. Vizzuality brings this information to life.',
      `Click here to know more about the core team of Half-Earth:
      <a target="_blank" href="https://www.half-earthproject.org/half-earth-project-team-members/">www.half-earthproject.org/half-earth-project-team-members</a>`
    ]
  },
  platformPartners: {
    title: 'Platform partner'
  },
  sponsors: {
    title: 'Funding support'
  },
  dataPartners: {
    title: 'Data partners'
  },
  researchPartners: {
    title: 'Research partners'
  },
}

export const partners = [
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

export const platformPartners = [
  {
    href: 'https://www.esri.com/en-us/home',
    image: { src: esriLogo, alt: 'Esri' }
  }
]

export const dataPartners = [
  {
    href: 'https://mol.org/',
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
    href: 'https://www.inaturalist.org/',
    image: { src: inaturalistLogo, alt: 'iNaturalist' }
  },
  {
    href: 'https://www.gorongosa.org/',
    image: { src: gorongosaLogo, alt: 'Gorongosa National Park' }
  },
  {
    href: 'https://www.fieldmuseum.org/',
    image: { src: fieldMuseumLogo, alt: 'Field Museum' }
  }
];

export const researchPartners = [
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

export const sponsors =  [{
    href: 'https://www.esri.com/en-us/home',
    image: { src: esriLogo, alt: 'Esri' }
  },
  {
    href: 'https://www.moore.org/',
    image: { src: mooreFoundationLogo, alt: 'Gordon and Betty Moore Foundation' }
  },
  {
    href: 'https://www.burtsbees.com/content/outreach/out-reach-asset.html',
    image: { src: burtsLogo, alt: 'Burt’s Bees Greater Good Foundationc', className: 'bbees' }
  },
  {
    label: 'Jeff and Laurie Ubben'
  }
];
