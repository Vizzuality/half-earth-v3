import { createSelector, createStructuredSelector } from 'reselect';
import { sumBy } from 'lodash';
import { getWDPALayers, PROTECTED_AREAS_COLOR, COMMUNITY_AREAS_COLOR, NOT_UNDER_CONSERVATION_COLOR } from 'constants/protected-areas';
import { selectLangUrlState } from 'selectors/location-selectors';

export const COMMUNITY_BASED = 'community';
export const PROTECTED = 'protected';
export const NOT_UNDER_CONSERVATION = 'notUnderConservation';


const conservationEffortsData = ({ conservationEffortsData }) => conservationEffortsData && conservationEffortsData.data;
const conservationEffortsLoading = ({ conservationEffortsData }) => conservationEffortsData && conservationEffortsData.loading;
const gridCellData = ({ gridCellData }) => (gridCellData && gridCellData.data) || null;

const getActiveLayersFromProps = (state, props) => props.activeLayers;

const getConservationEfforts = createSelector(
  [conservationEffortsData],
  cellData => {
    if (!cellData || !cellData.length) return null;
    const conservationEfforts = cellData.reduce((acc, current) => {
      return {
        ...acc,
        [current.ID]: {
          community: current.comm_prot_prop,
          not_community: current.not_comm_prot_prop,
          all: current.all_prot_prop
        }
        }
    }, {});
    const values = Object.values(conservationEfforts)
    const gridCellsLength = Object.keys(conservationEfforts).length;
    const community_prop = sumBy(values, 'community') / gridCellsLength;
    const not_community_prop = sumBy(values, 'not_community') / gridCellsLength;
    const all_prop = sumBy(values, 'all') / gridCellsLength;
    return {
      community_prop,
      not_community_prop,
      all_prop
    }
  }
)

const getConservationAreasLogic = createSelector(
  [getConservationEfforts],
  (conservationEfforts) => {
    if (!conservationEfforts) return null;
    const { community_prop, not_community_prop, all_prop } = conservationEfforts;

    const areas = {};
    areas[NOT_UNDER_CONSERVATION] = 100 - (not_community_prop + community_prop); // set NOT_UNDER_CONSERVATION first to render the slice below all others
    if (not_community_prop + community_prop > all_prop) {
      areas[COMMUNITY_BASED] = all_prop - not_community_prop;
      areas[PROTECTED] = not_community_prop;
      areas[NOT_UNDER_CONSERVATION] = 100 - (areas[PROTECTED] + areas[COMMUNITY_BASED]);
    } else {
      areas[COMMUNITY_BASED] = community_prop;
      areas[PROTECTED] = not_community_prop;
    }

    return areas;
  }
)

const getAllPropsForDynamicSentence = createSelector(
  [getConservationEfforts],
  (conservationEfforts) => {
    if (!conservationEfforts) return null;
    return conservationEfforts.all_prop.toFixed(2);
  }
)

const getConservationAreasFormatted = createSelector(
  [getConservationAreasLogic],
  (conservationAreasLogic) => {
    if (!conservationAreasLogic) return null;

    const formattedAreas = Object.keys(conservationAreasLogic).reduce((acc, key) => {
      return { ...acc, [key]: conservationAreasLogic[key].toFixed(2) };
    }, {});

    return formattedAreas;
  }
)

// locale is here to recompute the data when the language changes
const getComputedWDPALayers = createSelector(selectLangUrlState, locale => getWDPALayers());

const getAlreadyChecked = createSelector(
  [getActiveLayersFromProps, getComputedWDPALayers],
  (activeLayers, wdpaLayers) => {
    if (!activeLayers) return {};
    const alreadyChecked = wdpaLayers.reduce((acc, option) => ({
      ...acc, [option.value]: activeLayers.some(layer => layer.title === option.title)
    }), {});
    return alreadyChecked;
});

const getChartData = createSelector(
  [getConservationAreasLogic, getAlreadyChecked],
  (chartValues, alreadyChecked) => {
    if (!chartValues) return null;
    const chartData = [
      {name: 'protected', value: chartValues[PROTECTED], color: PROTECTED_AREAS_COLOR, explodedSlice: alreadyChecked['Protected areas'] },
      {name: 'community', value: chartValues[COMMUNITY_BASED], color: COMMUNITY_AREAS_COLOR, explodedSlice: alreadyChecked['Community areas']},
      {name: 'not under conservation', value: chartValues[NOT_UNDER_CONSERVATION], color: NOT_UNDER_CONSERVATION_COLOR, explodedSlice: false},
    ]
    return chartData;
  }
)

const getProtectedLayers = createSelector(
  [getConservationAreasFormatted, getComputedWDPALayers],
  (dataFormatted, wdpaLayers) => {
    if (!dataFormatted) return [];
    const protectedLayers = wdpaLayers.map(layer => ({
      ...layer,
      name: layer.name === 'Protected areas' ? `${layer.name} ${dataFormatted.protected}%` : `${layer.name} ${dataFormatted.community}%`,
      metadataTitle: layer.metadataTitle,
      rightDot: layer.name === 'Protected areas' ? PROTECTED_AREAS_COLOR : COMMUNITY_AREAS_COLOR
    })) || [];
    return protectedLayers;
});

const getActiveSlices = createSelector(
  [getConservationAreasLogic, getAlreadyChecked],
  (rawData, alreadyChecked) => {
    if (!rawData) return null;
    const orangeActive = alreadyChecked['Protected areas'];
    const yellowActive = alreadyChecked['Community areas'];
    const activeSlices = rawData && Object.keys(rawData).reduce((obj, key) => {
      if (key === NOT_UNDER_CONSERVATION) {
        obj[key] = false;
      } else {
        obj[key] = key === PROTECTED ? orangeActive : yellowActive;
      }
      return obj;
    }, {});
    return activeSlices;
});

const getSelectedCellsIds = createSelector(
  [gridCellData],
  (cellData) => {
  if(!cellData) return null;
  const selectedCellsIDs = cellData.map(i => {
    const id = i.ID || i.CELL_ID;
    return `'${id}'`;
  });
  return selectedCellsIDs;
});

export default createStructuredSelector({
  selectedCellsIDs: getSelectedCellsIds,
  pieChartData: getConservationEfforts,
  dataFormatted: getConservationAreasFormatted,
  rawData: getConservationAreasLogic,
  chartData: getChartData,
  allProp: getAllPropsForDynamicSentence,
  alreadyChecked: getAlreadyChecked,
  protectedLayers: getProtectedLayers,
  explodedSlices: getActiveSlices,
  loading: conservationEffortsLoading
});
