import { createClient } from 'contentful';

const { REACT_APP_CONTENTFUL_SPACE_ID } = process.env;
const { REACT_APP_CONTENTFUL_TOKEN } = process.env;

const contentfulClient = createClient({
  space: REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: REACT_APP_CONTENTFUL_TOKEN
});

const config = {
  baseUrl: 'https://cdn.contentful.com',
  space: REACT_APP_CONTENTFUL_SPACE_ID,
  token: REACT_APP_CONTENTFUL_TOKEN,
  env: 'master'
};

export const removeLanguageFromSlug = (slug) => {
  const splittedSlug = slug.split('_');
  return splittedSlug ? splittedSlug[0] : slug;
}

const hasTranslation = (slug, allItems, locale, slugName = 'slug') => {
  const slugWithoutLocale = removeLanguageFromSlug(slug);
  return allItems.some(s => s[slugName].startsWith(slugWithoutLocale) && s.language  === locale);
}

const isOtherLocalesData = (data, locale, allItems, slugName = 'slug') => {
  const isEnOrDoesntHaveTranslation = locale === 'en' || locale === '' || !hasTranslation(data.fields[slugName], allItems, locale, slugName);
  const dataLanguageIsNotEn = data.fields.language && data.fields.language !== 'en';

  const dataLanguageIsDifferentToLocale = !data.fields.language || data.fields.language !== locale;

  return (isEnOrDoesntHaveTranslation && dataLanguageIsNotEn) || (!isEnOrDoesntHaveTranslation && dataLanguageIsDifferentToLocale);
}

function parseFeaturedMaps(data, locale = 'en') {
  const allItems = data.map(p => p.fields);

  return data.reduce(
    async (acc, data) => {
      // Filter other locales data
      if (isOtherLocalesData(data, locale, allItems)) {
        return acc;
      }

      const featuredMap = {
        slug: removeLanguageFromSlug(data.fields.slug),
        title: data.fields.title,
        description: data.fields.description,
      };
      await getContentfulImage(data.fields.picture.sys.id).then(mapImageUrl => {
        featuredMap.image = mapImageUrl;
      });
      const acummPromise = await acc;
      return [ ...acummPromise, featuredMap ];
    },
[])
}

async function parseFeaturedPlaces(data, config, locale) {
  const allItems = data.map(p => p.fields);

  return data.reduce(
    async (acc, data) => {
      // Filter other locales data
      if (isOtherLocalesData(data, locale, allItems, 'nameSlug')) {
        return acc;
      }
      const featuredPlace = {
        slug: removeLanguageFromSlug(data.fields.nameSlug),
        title: data.fields.title,
        description: data.fields.description,
      };
      data.fields.image && await getContentfulImage(data.fields.image.sys.id, config).then(placeImageUrl => {
        featuredPlace.image = placeImageUrl;
      });
      const acummPromise = await acc;
      return [ ...acummPromise, featuredPlace ];
    },
    []
  )
}

async function getContentfulImage(assetId, config) {
  try {
    const imageUrl = await contentfulClient.getAsset(assetId).then(asset => asset.fields.file.url);
    if (config) {
      return `${imageUrl}?w=${config.imageWidth || ''}&h=${config.imageHeight || ''}`;
    }
    return imageUrl;
  } catch (e) {
    console.warn(e);
    throw new Error(e);
  }
}

async function fetchContentfulEntry(
  { contentType = 'featuredMaps', filterField = 'layerSlug', filterValue = '' }
) {
  let url = `${config.baseUrl}/spaces/${config.space}/environments/${config.env}/entries?content_type=${contentType}&access_token=${config.token}`;
  if (filterField && filterValue) {
    url += `&fields.${filterField}=${filterValue}&limit=999`;
  }
  try {
    const data = await fetch(url).then(d => d.json());

    return data;
  } catch (e) {
    console.warn(e);
    throw new Error(e);
  }
}

async function getFeaturedMapData(locale = 'en') {
  const data = await fetchContentfulEntry({ contentType: 'featuredMaps'});
  if (data && data.items && data.items.length > 0) {
    return parseFeaturedMaps(data.items, locale);
  }
  return null;
}

async function getFeaturedPlacesData(slug, config, locale = 'en') {
  const data = await fetchContentfulEntry({ contentType: 'featuredPoints', filterField:'featureSlug', filterValue: slug });
  if (data && data.items && data.items.length > 0) {
    return parseFeaturedPlaces(data.items, config, locale);
  }
  return null;
}

export default { getFeaturedMapData, getFeaturedPlacesData };
