import { createSelector, createStructuredSelector } from 'reselect';

const selectOpen = ({ metadata }) => metadata.isOpen;
const selectLoading = ({ metadata }) => metadata.loading;
const selectSlug = ({ metadata }) => metadata.slug;
const selectData = ({ metadata }) => metadata.data;

export const getMetadata = createSelector([ selectSlug, selectData ], (slug, data) => {
  if (!slug || !data) return null;
  return data[slug];
});

export const mapStateToProps = createStructuredSelector({
  isOpen: selectOpen,
  loading: selectLoading,
  metadata: getMetadata
});
