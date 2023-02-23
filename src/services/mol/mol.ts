import { SpeciesItemProps } from 'types/services-types';

const config = {
  url: 'https://api.mol.org/2.x/species/info',
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

  const data = await Promise.all<Array<SpeciesItemProps>>(promises);
  return (
    data &&
    data
      .filter((d: SpeciesItemProps[]) => !!d.length)
      .map((d: SpeciesItemProps[]) => ({ ...d[0] }))
  );
}

export default { getSpecies };
