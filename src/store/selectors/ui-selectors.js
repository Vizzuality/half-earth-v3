import { createSelector, createStructuredSelector } from 'reselect';
import { selectUiUrlState } from 'selectors/location-selectors';

export const getSidebarTabActive = ({ ui }) => ui && ui.sidebarTabActive;
export const getNRCSidebarView = ({ ui }) => ui && ui.NRCSidebarView;
export const getLandcoverBasemap = ({ ui }) => ui && ui.landcoverBasemap;
export const getIsSpeciesModalOpen = ({ ui }) => ui && ui.isSpeciesModalOpen;
export const getSelectedSpecies = ({ ui }) => ui && ui.selectedSpecies;

export const getIsSpeciesModalOpenWithURL = createSelector(
  [selectUiUrlState, getIsSpeciesModalOpen],
  (uiState, uiSpecies) => (uiState && uiState.isSpeciesModalOpen) || (uiSpecies && uiSpecies.isSpeciesModalOpen)
);
export const getSelectedSpeciesWithURL = createSelector(
  [selectUiUrlState, getSelectedSpecies],
  (uiState, uiSpecies) => (uiState && uiState.selectedSpecies) || (uiSpecies && uiSpecies.selectedSpecies)
);

export default createStructuredSelector({
  sidebarTabActive: getSidebarTabActive,
  NRCSidebarView: getNRCSidebarView,
  landcoverBasemap: getLandcoverBasemap,
  isSpeciesModalOpen: getIsSpeciesModalOpenWithURL,
  selectedSpecies: getSelectedSpeciesWithURL,
});
