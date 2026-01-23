import { SpeciesItem } from 'types/services-types';

const { VITE_APP_MOL_API } = import.meta.env;

const config = {
  url: `https://dev-mol3-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/info`,
  query: '?scientificname=',
  lang: '&lang=',
};

async function getSpecies(species: string, locale: string) {
  if (!locale || locale === '') return 'en';
  const speciesArray = Array.isArray(species) ? species : [species];
  const promises = speciesArray.map((specie: string) =>
    fetch(`${config.url}${config.query}${specie}${config.lang}${locale}`).then(
      (d) => d.json()
    )
  );

  const data = await Promise.all<Array<SpeciesItem>>(promises);
  return (
    data &&
    data
      .filter((d: SpeciesItem[]) => !!d.length)
      .map((d: SpeciesItem[]) => ({ ...d[0] }))
  );
}

export default { getSpecies };
