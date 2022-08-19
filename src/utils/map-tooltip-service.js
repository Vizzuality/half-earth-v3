import { LAYERS_URLS } from 'constants/layers-urls';
import { WDPA_OECM_FEATURE_DATA_LAYER } from 'constants/layers-slugs.js';
import EsriFeatureService from 'services/esri-feature-service';

export const setMapTooltipData = ({ molId, setLandVertebrateSpeciesNum, setProtectedAreaTooltipData, t }) => {
  EsriFeatureService.getFeatures({
    url: LAYERS_URLS[WDPA_OECM_FEATURE_DATA_LAYER],
    whereClause: `MOL_ID = '${molId}'`,
    returnGeometry: false,
  }).then((results) => {
    const { attributes } = results[0];

    const amphibians = JSON.parse(attributes.amphibians).length || 0;
    const birds = JSON.parse(attributes.birds).length || 0;
    const mammals = JSON.parse(attributes.mammals).length || 0;
    const reptiles = JSON.parse(attributes.reptiles).length || 0;
    const landVertebrateSpeciesNum = birds + mammals + reptiles + amphibians;

    setLandVertebrateSpeciesNum(landVertebrateSpeciesNum);

    setProtectedAreaTooltipData({
      description: `${t(attributes.DESIG)}, ${t(attributes.STATUS).toLowerCase()} ${t('in')} ${attributes.STATUS_}`,
      status: attributes.STATUS,
      status_year: attributes.STATUS_,
      IUCN_type: attributes.IUCN_CA,
      designation_type: attributes.DESIG_T,
      percentage_protected: Math.round(attributes.percentage_protected) || 100, // 100 is for protected areaa
    });
  });
};
