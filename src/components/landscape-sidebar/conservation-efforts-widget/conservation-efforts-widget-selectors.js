import { createSelector, createStructuredSelector } from 'reselect';
import { sumBy } from 'lodash';
import { WDPALayers } from 'constants/protected-areas';
import { getTerrestrialCellData } from 'selectors/grid-cell-selectors';

export const COMMUNITY_BASED = 'community';
export const PROTECTED = 'protected';
export const NOT_UNDER_CONSERVATION = 'notUnderConservation';

const COLORS = () => ({
  [COMMUNITY_BASED]: '#FCC44A',
  [PROTECTED]: '#FF6C47',
  [NOT_UNDER_CONSERVATION]: '#6C828F'
})

const conservationEffortsData = ({ conservationEffortsData }) => conservationEffortsData && conservationEffortsData.data;
const conservationEffortsLoading = ({ conservationEffortsData }) => conservationEffortsData && conservationEffortsData.loading;

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

const getAlreadyChecked  = createSelector(
  [getActiveLayersFromProps],
  (activeLayers) => {
    if (!activeLayers) return {};
    const alreadyChecked = WDPALayers.reduce((acc, option) => ({
      ...acc, [option.value]: activeLayers.some(layer => layer.title === option.title)
    }), {});
    return alreadyChecked;
});

const getProtectedLayers = createSelector(
  [getConservationAreasFormatted],
  (dataFormatted) => {
    if (!dataFormatted) return [];
    const protectedLayers = WDPALayers.map(layer => ({
      ...layer,
      name: layer.name === 'Protected areas' ? `${layer.name} ${dataFormatted.protected}%` : `${layer.name} ${dataFormatted.community}%`,
      metadataTitle: layer.metadataTitle,
      rightDot: layer.name === 'Protected areas' ? COLORS[PROTECTED] : COLORS[COMMUNITY_BASED]
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

export default createStructuredSelector({
  terrestrialCellData: getTerrestrialCellData,
  pieChartData: getConservationEfforts,
  dataFormatted: getConservationAreasFormatted,
  rawData: getConservationAreasLogic, 
  colors: COLORS,
  allProp: getAllPropsForDynamicSentence,
  alreadyChecked: getAlreadyChecked,
  protectedLayers: getProtectedLayers,
  activeSlices: getActiveSlices,
  loading: conservationEffortsLoading
});