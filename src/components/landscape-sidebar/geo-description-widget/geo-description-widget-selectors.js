import { createSelector, createStructuredSelector } from 'reselect';

const getGeodescriberData = ({ geoDescription }) => (geoDescription && geoDescription.data) || null;
const getGeodescriberLoading = ({ geoDescription }) => (geoDescription && geoDescription.loading) || null;
const getGeodescriberError = ({ geoDescription }) => (geoDescription && geoDescription.error) || null;

const parseGeodescriberText = (text = '', params) => {
  const parsedText = Object.keys(params).reduce((acc, key) => {
    return acc.replace(new RegExp(`{${key}}`, 'g'), params[key]);
  }, text);
  return parsedText;
};

const getData = createSelector(
  [getGeodescriberData],
  (geodescriberData) => {
    if (!geodescriberData) return null;
    const {
      description, description_params, title, title_params,
    } = geodescriberData;
    const parsedDescription = parseGeodescriberText(description, description_params);
    const parsedTitle = parseGeodescriberText(title, title_params);

    return {
      description: parsedDescription,
      title: parsedTitle,
      area: description_params.area_0,
    };
  },
);

export default createStructuredSelector({
  data: getData,
  loading: getGeodescriberLoading,
  error: getGeodescriberError,
});
