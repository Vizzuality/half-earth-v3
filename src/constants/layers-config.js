
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
    url: 'https://utility.arcgis.com/usrsvcs/servers/685d69cda038469f93dcfd96355abefc/rest/services/PriorPolygons/FeatureServer',
    title: PRIORITY_PLACES_POLYGONS,
    type: 'FeatureLayer',
    categories: [
      {
        title: 'all species',
        slug: 'all',
        icon: All
      },
      {
        title: 'reptiles',
        slug: 'reptiles',
        icon: Reptiles
      },
      {
        title: 'mammals',
        slug: 'mammals',
        icon: Mammals
      },
      {
        title: 'amphibians',
        slug: 'amphibians',
        icon: Amphibians
      },
      {
        title: 'birds',
        slug: 'birds',
        icon: Birds
      },
    ]
  }
}