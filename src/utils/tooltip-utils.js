/* eslint-disable no-underscore-dangle */
export const getTooltipContent = (
  t,
  attributes,
  id,
  title,
  subtitle,
  customId,
  customTitle
) => ({
  buttonText: t('analyze area'),
  id: customId || attributes[id],
  title:
    customTitle || attributes[title] || attributes.NAME_0 || attributes.NAME,
  subtitle: attributes[subtitle] || attributes.NAME_1,
  objectId: attributes.OBJECTID, // Only for feature places
  percentage_protected:
    attributes.percentage_protected || attributes.percentage_protected === 0
      ? Math.round(attributes.percentage_protected)
      : 100, // 100 is for protected areas
  description:
    attributes.DESIG &&
    `${attributes.DESIG}, ${attributes.STATUS?.toLowerCase()} ${
      attributes.STATUS_YR ? `${t('in')} ${attributes.STATUS_YR}` : ''
    }`,
  nspecies: attributes.nspecies,
  status: attributes.STATUS,
  // eslint-disable-next-line no-underscore-dangle
  status_year: attributes.STATUS_YR,
  IUCN_type: attributes.IUCN_CAT,
  designation_type: attributes.DESIG_TYPE,
});
