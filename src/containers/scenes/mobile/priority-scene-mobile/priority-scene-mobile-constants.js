import React from 'react';

import { t } from '@transifex/native';
import { T } from '@transifex/react';

import {
  LAND_COUNTRY_PRIORITY_LAYER,
  MARINE_COUNTRY_PRIORITY_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
} from 'constants/layers-slugs';

export const getPriorityMobileCards = () => [
  {
    title: t('Where are the priority areas for terrestrial vertebrates?'),
    description: (
      <p>
        <T
          _str="This layers illustrates where conservation efforts should be directed to {bold} conservation at a global scale."
          bold={
            <b>
              <T _str="achieve the most rapid gains in terrestrial vertebrate" />
            </b>
          }
        />
      </p>
    ),
    layer: LAND_COUNTRY_PRIORITY_LAYER,
    legendTitle: t('ALL LAND VERTEBRATES PRIORITY'),
    legendColor: 'biodiversity',
    source: t(
      'Source: (1) Rinnan DS et al., 2021a (2) Rinnan DS et al., 2021b (Map of Life - Yale University)'
    ),
  },
  {
    title: t('Where are the priority areas for marine vertebrates?'),
    description: (
      <p>
        <T
          _str="This layers illustrates where conservation efforts should be directed to {bold} conservation at a global scale."
          bold={
            <b>
              <T _str="achieve the most rapid gains in marine vertebrate" />
            </b>
          }
        />
      </p>
    ),
    layer: MARINE_COUNTRY_PRIORITY_LAYER,
    legendTitle: t('ALL MARINE VERTEBRATES PRIORITY'),
    legendColor: 'biodiversity',
    source: t(
      'Source: (1) Rinnan DS et al., 2021a (2) Rinnan DS et al., 2021b (Map of Life - Yale University)'
    ),
  },
  {
    title: t('Where to protect next?'),
    description: (
      <p>
        <T
          _str="This layer highlights the top regions in each country that would benefit from additional conservation action. These areas represent the top {bold} and can serve as important starting places for conservation efforts."
          bold={
            <b>
              <T _str="10% of each country’s priority areas" />
            </b>
          }
        />
      </p>
    ),
    layer: HALF_EARTH_FUTURE_TILE_LAYER,
    legendTitle: t('Places for Half-Earth Future'),
    legendColor: 'biodiversity',
    source: t(
      'Source: (1) Rinnan DS et al., 2021a (2) Rinnan DS et al., 2021b (Map of Life - Yale University)'
    ),
  },
];
