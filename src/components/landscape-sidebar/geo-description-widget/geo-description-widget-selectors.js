import { createStructuredSelector } from 'reselect';

const getGeodescriberData = ({ geoDescription }) => (geoDescription && geoDescription.data) || null;
const getGeodescriberLoading = ({ geoDescription }) => (geoDescription && geoDescription.loading) || null;
const getGeodescriberError = ({ geoDescription }) => (geoDescription && geoDescription.error) || null;

export default createStructuredSelector({
  data: getGeodescriberData,
  loading: getGeodescriberLoading,
  error: getGeodescriberError
})