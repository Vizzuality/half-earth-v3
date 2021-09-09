const SEARCH_SOURCES = {
  ECOREGIONS: 'ecoregions',
  POLITICAL_BOUNDARIES: 'political-boundaries',
  PROTECTED_AREAS: 'protected-areas'
}

export const { ECOREGIONS, POLITICAL_BOUNDARIES, PROTECTED_AREAS } = SEARCH_SOURCES;

export const DEFAULT_SOURCE = POLITICAL_BOUNDARIES;

export const PRECALCULATED_AOI_OPTIONS = [
  {slug: POLITICAL_BOUNDARIES, label: 'Political boundaries'},
  {slug: ECOREGIONS, label: 'Ecoregions'},
  {slug: PROTECTED_AREAS, label: 'Protected areas'},
]