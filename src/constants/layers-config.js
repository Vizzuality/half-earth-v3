
import { ReactComponent as All } from 'icons/taxa_all.svg';
import { ReactComponent as Mammals } from 'icons/taxa_mammals.svg';
import { ReactComponent as Reptiles } from 'icons/taxa_reptiles.svg';
import { ReactComponent as Amphibians } from 'icons/taxa_amphibians.svg';
import { ReactComponent as Birds } from 'icons/taxa_birds.svg';

import {
  PRIORITY_PLACES_POLYGONS
} from 'constants/layers-slugs';

export default {
  [PRIORITY_PLACES_POLYGONS]: {
    url: 'https://utility.arcgis.com/usrsvcs/servers/9d466a49b2594519bd5dbf4a9d38195f/rest/services/disPriorFacet_v1/FeatureServer',
    title: PRIORITY_PLACES_POLYGONS,
    type: 'FeatureLayer',
    categories: [
      {
        title: 'all species',
        slug: 'all',
        icon: All,
        color: '#CC607D'
      },
      {
        title: 'reptiles',
        slug: 'reptiles',
        icon: Reptiles,
        color: '#3690C0'
      },
      {
        title: 'mammals',
        slug: 'mammals',
        icon: Mammals,
        color: '#ADDD8E'
      },
      {
        title: 'amphibians',
        slug: 'amphibians',
        icon: Amphibians,
        color: '#6A51A3'
      },
      {
        title: 'birds',
        slug: 'birds',
        icon: Birds,
        color: '#4C9B82'
      },
    ],
    styles: {
      all: {
        fillRgb: [204, 96, 125],
        fillOpacity: 0.4,
        outlineRgb: [204, 96, 125],
        outlineOpacity: 0.9
      },
      amphibians: {
        fillRgb: [106, 81, 163],
        fillOpacity: 0.4,
        outlineRgb: [106, 81, 163],
        outlineOpacity: 0.9
      },
      mammals: {
        fillRgb: [173, 221, 142],
        fillOpacity: 0.4,
        outlineRgb: [173, 221, 142],
        outlineOpacity: 0.9
      },
      reptiles: {
        fillRgb: [54, 144, 192],
        fillOpacity: 0.4,
        outlineRgb: [54, 144, 192],
        outlineOpacity: 0.9
      },
      birds: {
        fillRgb: [76, 155, 130],
        fillOpacity: 0.4,
        outlineRgb: [76, 155, 130],
        outlineOpacity: 0.9
      }
    }
  }
}