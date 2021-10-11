import isEmpty from 'lodash/isEmpty';
import { createStructuredSelector } from 'reselect';
const selectMetadataData = ({ metadata }) => metadata && (!isEmpty(metadata.data) || null);


export default createStructuredSelector({
  hasMetadata: selectMetadataData,
});