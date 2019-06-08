import { createSelector, createStructuredSelector } from 'reselect';

const selectOpen = ({ modalMetadata }) => modalMetadata.isOpen;
const selectTitle = ({ modalMetadata }) => modalMetadata.title;
const selectLoading = ({ modalMetadata }) => modalMetadata.loading;
const selectSlug = ({ modalMetadata }) => modalMetadata.slug;
const selectData = ({ modalMetadata }) => modalMetadata.data;

export const getMetadata = createSelector([ selectSlug, selectData ], (slug, data) => {
  if (!slug || !data) return null;
  return data[slug];
});

export const mapStateToProps = createStructuredSelector({
  isOpen: selectOpen,
  loading: selectLoading,
  metadata: getMetadata,
  title: selectTitle
});
