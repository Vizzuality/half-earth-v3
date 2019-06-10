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

export default { getEntries: fetchContentfulEntry, getMetadata, getStories };