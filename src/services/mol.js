const config = {
  url: 'https://api.mol.org/2.x/species/info',
  query: '?scientificname=',
  lang: '&lang=',
};

async function getSpecies(species, locale) {
  if (!locale || locale === '') return 'en';
  const speciesArray = Array.isArray(species) ? species : [species];
  const promises = speciesArray.map((specie) =>
    fetch(`${config.url}${config.query}${specie}${config.lang}${locale}`).then(
      (d) => d.json()
    )
  );

  const data = await Promise.all(promises);
  return data && data.filter((d) => !!d.length).map((d) => ({ ...d[0] }));
}

export default { getSpecies };
