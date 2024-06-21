import { getCSSVariable } from 'utils/css-utils';

export const CONTINENTS = [
  {
    slug: 'africa',
    // color: COLORS.shamrock,
    color: getCSSVariable('shamrock'),
  },
  {
    slug: 'antarctica',
    // color: COLORS.conifer,
    color: getCSSVariable('conifer'),
  },
  {
    slug: 'asia',
    // color: COLORS['picton-blue'],
    color: getCSSVariable('picton-blue'),
  },
  {
    slug: 'europe',
    // color: COLORS.gold,
    color: getCSSVariable('gold'),
  },
  {
    slug: 'north-america',
    // color: COLORS['medium-purple'],
    color: getCSSVariable('medium-purple'),
  },
  {
    slug: 'south-america',
    // color: COLORS['french-rose'],
    color: getCSSVariable('french-rose'),
  },
  {
    slug: 'oceania',
    // color: COLORS.tango,
    color: getCSSVariable('tango'),
  },
];
