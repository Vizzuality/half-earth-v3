import { LAYERS_URLS } from 'constants/layers-urls';
import { WDPA_OECM_FEATURE_DATA_LAYER } from 'constants/layers-slugs.js';
import EsriFeatureService from 'services/esri-feature-service';

export const setMapTooltipData = ({  molId, setLandVertebrateSpeciesNum, protectedAreaTooltipData }) => {

  setLandVertebrateSpeciesNum({ species: [] });

  EsriFeatureService.getFeatures({
    url: LAYERS_URLS[WDPA_OECM_FEATURE_DATA_LAYER],
    whereClause: `MOL_ID = '${molId}'`,
    returnGeometry: false
  }).then(async(results) => {
    const { attributes } = results[0];
    console.log({attributes})
    const amphibians = await JSON.parse(attributes.amphibians).length || 0;
    const birds = await JSON.parse(attributes.birds).length || 0;
    const mammals = await JSON.parse(attributes.mammals).length || 0;
    const reptiles = await JSON.parse(attributes.reptiles).length || 0;
    const landVertebrateSpeciesNum = await birds + mammals + reptiles + amphibians;
    await setLandVertebrateSpeciesNum(landVertebrateSpeciesNum)
    await protectedAreaTooltipData({
      description: `${attributes.GOV_TYP}(${attributes.DESIG}), designed in ${attributes.STATUS_}`,
      status: attributes.STATUS_,
      statu_year: attributes.STATUS_,
      IUCN_type: attributes.IUCN_CA,
      designation_type: attributes.DESIG_T,
    })
  });
}