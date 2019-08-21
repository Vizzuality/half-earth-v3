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

function formatText(paragraphs) {
  return paragraphs.map(p => p.value).join(',');
}

function parseStories(stories) {
  return stories.reduce(
    async (acc, story) => {
      const parsedStory = {
        id: story.fields.position.lat + story.fields.position.lon,
        title: story.fields.title,
        text: formatText(story.fields.text.content[0].content),
        url: story.fields.link,
        lat: story.fields.position.lat,
        lon: story.fields.position.lon
      };
      await getContentfulImage(story.fields.image.sys.id).then(storyImageUrl => {
        parsedStory.image = storyImageUrl;
      });
      const acummPromise = await acc;
      return [ ...acummPromise, parsedStory ];
    },
    []
  );
}

function parseFeaturedMaps(featuredMaps) {
  return featuredMaps.reduce(
    async (acc, map) => {
      const featuredMap = {
        slug: map.fields.slug,
        title: map.fields.title,
        description: map.fields.description,
      };
      await getContentfulImage(map.fields.picture.sys.id).then(mapImageUrl => {
        featuredMap.image = mapImageUrl;
      });
      const acummPromise = await acc;
      return [ ...acummPromise, featuredMap ];
    },
    []
  )
}

async function parseFeaturedPlace(data) {
  const featuredPlace = {
    title: data.fields.title,
    description: data.fields.description,
  };
  await getContentfulImage(data.fields.image.sys.id).then(mapImageUrl => {
    featuredPlace.image = mapImageUrl;
  });
  return featuredPlace;
}

const parseTexts = items => {
  return items.map(({ fields }) => fields).reduce((acc, item) => {
    acc[item.view] = item;
    return acc
  }, {});
}

async function getContentfulImage(assetId) {
  try {
    const imageUrl = await contentfulClient.getAsset(assetId).then(asset => asset.fields.file.url);
    return imageUrl;
  } catch (e) {
    console.warn(e);
    throw new Error(e);
  }
}

async function fetchContentfulEntry(
  { contentType = 'metadata', filterField = 'layerSlug', filterValue = '' }
) {
  let url = `${config.baseUrl}/spaces/${config.space}/environments/${config.env}/entries?content_type=${contentType}&access_token=${config.token}`;
  if (filterField && filterValue) {
    url += `&fields.${filterField}=${filterValue}`;
  }
  try {
    const data = await fetch(url).then(d => d.json());
    return data;
  } catch (e) {
    console.warn(e);
    throw new Error(e);
  }
}

async function getMetadata(slug) {
  const data = await fetchContentfulEntry({ filterValue: slug });
  if (data && data.items && data.items.length > 0) {
    return data.items[0].fields;
  }
  return null;
}

async function getStories() {
  const data = await fetchContentfulEntry({ contentType: 'stories' });
  if (data && data.items && data.items.length > 0) {
    return parseStories(data.items);
  }
  return null;
}

async function getTexts(slug) {
  const data = await fetchContentfulEntry({ contentType: 'texts', filterField:'view', filterValue: slug });
  if (data && data.items && data.items.length > 0) {
    return parseTexts(data.items);
  }
  return null;
}

async function getFeaturedMapData() {
  const data = await fetchContentfulEntry({ contentType: 'featuredMaps'});
  if (data && data.items && data.items.length > 0) {
    return parseFeaturedMaps(data.items);
  }
  return null;
}

async function getFeaturedPlaceData(slug) {
  const data = await fetchContentfulEntry({ contentType: 'featuredPoints', filterField:'nameSlug', filterValue: slug });
  if (data && data.items && data.items.length > 0) {
    return parseFeaturedPlace(data.items[0]);
  }
  return null;
}

export default { getEntries: fetchContentfulEntry, getMetadata, getStories, getTexts, getFeaturedMapData, getFeaturedPlaceData };