import { Asset, createClient } from 'contentful';

import fetchWithCache from 'services/fetch/fetch';

import { ConfigProps, FeaturePlaceItemProps, GenericItemProps } from './types';

const { REACT_APP_CONTENTFUL_SPACE_ID } = process.env;
const { REACT_APP_CONTENTFUL_TOKEN } = process.env;

const contentfulClient = createClient({
  space: REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: REACT_APP_CONTENTFUL_TOKEN,
});

const config: ConfigProps = {
  baseUrl: 'https://cdn.contentful.com',
  space: REACT_APP_CONTENTFUL_SPACE_ID,
  token: REACT_APP_CONTENTFUL_TOKEN,
  env: 'master',
};

export const removeLanguageFromSlug = (slug: string) => {
  const splittedSlug = slug.split('_');
  return splittedSlug ? splittedSlug[0] : slug;
};

const hasTranslation = (
  slug: string,
  allItems,
  locale: string,
  slugName = 'slug'
) => {
  const slugWithoutLocale = removeLanguageFromSlug(slug);
  return allItems.some(
    (s) => s[slugName].startsWith(slugWithoutLocale) && s.language === locale
  );
};

const isOtherLocalesData = (
  data: FeaturePlaceItemProps,
  locale: string,
  allItems: GenericItemProps[],
  slugName = 'slug'
) => {
  const isEnOrDoesntHaveTranslation =
    locale === 'en' ||
    locale === '' ||
    !hasTranslation(data.fields[slugName], allItems, locale, slugName);
  const dataLanguageIsNotEn =
    data.fields.language && data.fields.language !== 'en';

  const dataLanguageIsDifferentToLocale =
    !data.fields.language || data.fields.language !== locale;

  return (
    (isEnOrDoesntHaveTranslation && dataLanguageIsNotEn) ||
    (!isEnOrDoesntHaveTranslation && dataLanguageIsDifferentToLocale)
  );
};

async function getContentfulImage(
  assetId: string,
  _config: { imageHeight?: number; imageWidth?: number }
) {
  try {
    const imageUrl = await contentfulClient
      .getAsset(assetId)
      .then((asset: Asset) => asset.fields.file.url);
    if (_config) {
      return `${imageUrl}?w=${config.imageWidth || ''}&h=${
        _config.imageHeight || ''
      }`;
    }
    return imageUrl;
  } catch (e) {
    console.warn(e);
    throw new Error(e);
  }
}

function parseFeaturedMaps(data: FeaturePlaceItemProps[], locale = 'en') {
  const allItems = data.map((p) => p.fields);

  // eslint-disable-next-line no-shadow
  return data.reduce(async (acc: any, data) => {
    // Filter other locales data
    if (isOtherLocalesData(data, locale, allItems)) {
      return acc;
    }

    const featuredMap: {
      slug: string;
      title: string;
      description: Record<string, unknown>;
      image?: string;
    } = {
      slug: removeLanguageFromSlug(data.fields.slug),
      title: data.fields.title,
      description: data.fields.description,
    };
    await getContentfulImage(data.fields.picture.sys.id, null).then(
      (mapImageUrl) => {
        featuredMap.image = mapImageUrl;
      }
    );
    const acummPromise = await acc;
    return [...acummPromise, featuredMap];
  }, []);
}

// eslint-disable-next-line no-shadow
function parseFeaturedPlaces(data, config, locale) {
  const allItems: GenericItemProps[] = data.map((p) => p.fields);

  // eslint-disable-next-line no-shadow
  return data.reduce(async (acc, data) => {
    // Filter other locales data
    if (isOtherLocalesData(data, locale, allItems, 'nameSlug')) {
      return acc;
    }
    const featuredPlace: {
      slug: string;
      title: string;
      description: Record<string, unknown>;
      image?: string;
    } = {
      slug: removeLanguageFromSlug(data.fields.nameSlug),
      title: data.fields.title,
      description: data.fields.description,
    };
    if (data.fields.image) {
      await getContentfulImage(data.fields.image.sys.id, config).then(
        (placeImageUrl) => {
          featuredPlace.image = placeImageUrl;
        }
      );
    }
    const acummPromise = await acc;
    return [...acummPromise, featuredPlace];
  }, []);
}
function parseMetadata(data: FeaturePlaceItemProps[], locale) {
  const allItems: GenericItemProps[] = data.map((p) => p.fields);
  const metadata = data[0];
  // Filter other locales data
  if (isOtherLocalesData(metadata, locale, allItems, 'layerSlug')) {
    return null;
  }
  return {
    ...metadata.fields,
    slug: removeLanguageFromSlug(metadata.fields.layerSlug),
  };
}

async function fetchContentfulEntry({
  contentType = 'featuredMaps',
  filterField = 'layerSlug',
  filterValue = '',
}) {
  let url = `${config.baseUrl}/spaces/${config.space}/environments/${config.env}/entries?content_type=${contentType}&access_token=${config.token}`;
  if (filterField && filterValue) {
    url += `&fields.${filterField}=${filterValue}&limit=999`;
  }
  try {
    const data: any = await fetchWithCache(url);
    return data;
  } catch (e) {
    console.warn(e);
    throw new Error(e);
  }
}

async function getFeaturedMapData(locale = 'en') {
  const data = await fetchContentfulEntry({ contentType: 'featuredMaps' });
  if (data && data.items && data.items.length > 0) {
    return parseFeaturedMaps(data.items, locale);
  }
  return null;
}

// eslint-disable-next-line no-shadow
async function getFeaturedPlacesData(slug, config, locale = 'en') {
  const data = await fetchContentfulEntry({
    contentType: 'featuredPoints',
    filterField: 'featureSlug',
    filterValue: slug,
  });
  if (data && data.items && data.items.length > 0) {
    return parseFeaturedPlaces(data.items, config, locale);
  }
  return null;
}

async function getMetadata(slug: string, locale = 'en') {
  const slugWithLocale = locale && locale !== 'en' ? `${slug}_${locale}` : slug;
  let data = await fetchContentfulEntry({
    contentType: 'metadataProd',
    filterField: 'layerSlug',
    filterValue: slugWithLocale,
  });
  // eslint-disable-next-line no-shadow
  const hasData = (data) => data && data.items && data.items.length > 0;
  if (!hasData(data)) {
    // Try with the english (default) version
    data = await fetchContentfulEntry({
      contentType: 'metadataProd',
      filterField: 'layerSlug',
      filterValue: slug,
    });
  }

  if (hasData(data)) {
    return parseMetadata(data.items, locale);
  }
  return null;
}

export default { getFeaturedMapData, getFeaturedPlacesData, getMetadata };
