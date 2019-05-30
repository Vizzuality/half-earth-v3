import camelCase from 'lodash/camelCase';

const { MOL_API_KEY } = process.env;

const config = {
  account: 'half-earth',
  molAccount: 'carto.mol.org/user/half-earth',
  layersQuery: 'SELECT dataset, env, interaction_config, iso, layer_config, legend_config, name, provider, slug FROM layers ORDER BY name',
  storiesQuery: 'SELECT image, lat, lon, title, subtitle, url FROM stories',
  pledgesQuery: 'SELECT cartodb_id, ST_asGeoJson(the_geom) FROM pledge_locations',
  placesQuery: 'SELECT image, lat, lon, places, region, cell_id, bbox, description FROM places_to_watch',
  categoriesQuery: 'SELECT name, slug, description, position, group_name, group_slug, featured, image_url, multi_select from categories ORDER BY position',
  datasetsQuery: 'SELECT name, description, slug, multilayer, category, featured, position from datasets ORDER BY name',
  detailQuery: 'SELECT rank_sr as ranked_richness, rank_rsr as ranked_rarity, sr as richness, ave_rsr as rarity, strict as strict_reserves, biosphere as biosphere_reserves, other as protected_other, focal_spp as species, conservati as community_conservation, prop_land, agricultur as human_pressures_agriculture, urban as human_pressures_urban, rainfed as human_pressures_rainfed, (rainfed%20%2B%20urban%20%2B%20agricultur) as human_pressures_all, taxa, location, feature_da FROM global_facets_attr_pressures_vizz'
};

function handleResponse(data) {
  if (!data || !data.rows) return [];
  return data.rows.map(row => {
    const camelCasedKeys = {};
    Object.keys(row).forEach(key => {
      camelCasedKeys[camelCase(key)] = row[key];
    });
    return camelCasedKeys;
  });
}

function fetchCartoResource(resource) {
  const cartoUrl = `https://${config.account}.carto.com/api/v2/sql`;
  const resourceTable = `${resource}Query`;
  const query = config[resourceTable] || '';
  return fetch(`${cartoUrl}?q=${query}`).then(d => d.json().then(handleResponse));
}

export default { get: fetchCartoResource };
