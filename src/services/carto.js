import { camelCase } from 'lodash';

const config = {
  account: 'half-earth',
  layersQuery: 'SELECT dataset, env, interaction_config, iso, layer_config, legend_config, name, provider, slug FROM layers ORDER BY name',
  categoriesQuery: 'SELECT name, slug, description, position, group_name, group_slug, featured, image_url, multi_select from categories ORDER BY position',
  datasetsQuery: 'SELECT name, description, slug, multilayer, category, featured, position from datasets ORDER BY name'
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
