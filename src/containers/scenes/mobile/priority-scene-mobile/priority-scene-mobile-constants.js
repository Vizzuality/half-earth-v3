import React from 'react';

import { t } from '@transifex/native';
import { T } from '@transifex/react';

import {
  LAND_COUNTRY_PRIORITY_LAYER,
  MARINE_COUNTRY_PRIORITY_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
} from 'constants/layers-slugs';
import { FUTURE_PLACES_COLOR } from 'constants/protected-areas';

export const getPriorityMobileCards = () => [
  {
    id: 1,
    title: t('Where are the priority areas for terrestrial vertebrates?'),
    description: (
      <div>
        <T
          _str="This layer illustrates where conservation efforts should be directed to {bold} conservation at a global scale."
          _comment="(This layer illustrates where conservation efforts should be directed to )achieve the most rapid gains in terrestrial vertebrate ( conservation at a global scale.)"
          bold={
            <b>
              <T
                _str="achieve the most rapid gains in terrestrial vertebrate"
                _comment="This layer illustrates where conservation efforts should be directed to (achieve the most rapid gains in terrestrial vertebrate) conservation at a global scale."
              />
            </b>
          }
        />
      </div>
    ),
    layer: LAND_COUNTRY_PRIORITY_LAYER,
    legendTitle: t('ALL LAND VERTEBRATES PRIORITY'),
    legendItem: 'biodiversity',
  },
  {
    id: 2,
    title: t('Where are the priority areas for marine vertebrates?'),
    description: (
      <div>
        <T
          _str="This layer illustrates where conservation efforts should be directed to {bold} conservation at a global scale."
          _comment="(This layer illustrates where conservation efforts should be directed to )achieve the most rapid gains in marine vertebrate ( conservation at a global scale.)"
          bold={
            <b>
              <T
                _str="achieve the most rapid gains in marine vertebrate"
                _comment="This layer illustrates where conservation efforts should be directed to (achieve the most rapid gains in marine vertebrate) conservation at a global scale."
              />
            </b>
          }
        />
      </div>
    ),
    layer: MARINE_COUNTRY_PRIORITY_LAYER,
    legendTitle: t('ALL MARINE VERTEBRATES PRIORITY'),
    legendItem: 'biodiversity',
  },
  {
    id: 3,
    title: t('Where to protect next?'),
    description: (
      <div>
        <T
          _str="This layer highlights the top regions in each country that would benefit from additional conservation action. These areas represent the top {percentageOfCountry} and can serve as important starting places for conservation efforts."
          percentageOfCountry={
            <b>
              <T
                _str="10% of each country’s priority areas"
                _comment="This layer highlights the top regions in each country that would benefit from additional conservation action. These areas represent the top {percentageOfCountry} and can serve as important starting places for conservation efforts. (10% of each country’s priority areas)"
              />
            </b>
          }
        />
      </div>
    ),
    layer: HALF_EARTH_FUTURE_TILE_LAYER,
    legendTitle: t('Places for a Half-Earth Future'),
    legendColor: FUTURE_PLACES_COLOR,
  },
];
