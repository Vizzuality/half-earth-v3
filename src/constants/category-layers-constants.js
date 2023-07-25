import { getLayersToggleConfig as getBiodiversityLayers } from 'constants/biodiversity-layers-constants';
import { getCarbonLayers } from 'constants/carbon-layer';
import {
  getHumanPressuresLandUse,
  getHumanPressuresMarine,
} from 'constants/human-pressures';
import {
  getWDPALayers,
  getConserveNextLayers,
} from 'constants/protected-areas';

const getCategoryLayers = () => {
  const biodiversityLayers = getBiodiversityLayers();
  const allBiodiversityLayers = Object.values(biodiversityLayers)
    .map((marineOrTerrestrialGroups) =>
      Object.values(marineOrTerrestrialGroups).map((resolutionGroups) =>
        Object.values(resolutionGroups).map((layers) => layers)
      )
    )
    .flat(3);
  const protectionLayers = getWDPALayers().concat(getConserveNextLayers());
  const allProtectionLayers = Object.values(protectionLayers);
  const humanImpactLayers = getHumanPressuresLandUse().concat(
    getHumanPressuresMarine()
  );
  const allHumanImpactLayers = Object.values(humanImpactLayers);
  const carbonLayers = getCarbonLayers();

  return [
    ...allBiodiversityLayers,
    ...allProtectionLayers,
    ...allHumanImpactLayers,
    ...carbonLayers,
  ].map((layer) => ({ title: layer.value }));
};

export const CATEGORY_LAYERS = getCategoryLayers();
