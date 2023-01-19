import React from 'react';

import { t } from '@transifex/native';
import { T } from '@transifex/react';

import {
  GLOBAL_SPI_FEATURE_LAYER,
  MARINE_SPI_FEATURE_LAYER,
} from 'constants/layers-slugs';

export const getNRCLandingCards = () => [
  {
    title: t('National Report Cards'),
    description: (
      <p>
        <T _str="The SPI (Species Protection Index) provides an estimation of how well each country is meeting conservation targets and is the basis for a National Report Card on every country in the world. Countries with the highest SPI scores tend to host very few endemic species. They earn a higher score because it is easier to build protected area networks when richness is the primary factor to consider." />
      </p>
    ),
    layer: GLOBAL_SPI_FEATURE_LAYER,
  },
  {
    title: t('How is the Land SPI calculated?'),
    description: (
      <p>
        <T
          _str="The Land SPI is calculated based on the {bold1} area, the total number of {bold2}, and the amount of these species that are {bold3} to that nation.'"
          bold1={
            <b>
              <T _str="protected land" />
            </b>
          }
          bold2={
            <b>
              <T _str="terrestrial vertebrates" />
            </b>
          }
          bold3={
            <b>
              <T _str="endemic" />
            </b>
          }
        />
      </p>
    ),
    layer: GLOBAL_SPI_FEATURE_LAYER,
    legendTitle: t('Land SPI'),
    legendItem: 'spi',
  },
  {
    title: t('How is the Marine SPI calculated?'),
    description: (
      <p>
        <T
          _str="The Marine SPI is based on the {bold1} area, the total number of {bold2}, and the amount of these species that are {bold3} to that nation."
          bold1={
            <b>
              <T _str="protected marine" />
            </b>
          }
          bold2={
            <b>
              <T _str="marine vertebrates" />
            </b>
          }
          bold3={
            <b>
              <T _str="endemic" />
            </b>
          }
        />
      </p>
    ),
    layer: MARINE_SPI_FEATURE_LAYER,
    legendTitle: t('Marine SPI'),
    legendItem: 'spi',
  },
];
