import * as d3 from 'd3';

export const currencyFormatting = d3.format("$,.2f");
export const localeFormatting = d3.format(",.0f");

export const countryChallengesChartFormats = {
  Population2016: value => localeFormatting(value),
  GNI_PPP: value => `${currencyFormatting(value)} B`,
  prop_hm_very_high: value => `${d3.format(".2f")(value)}%`,
  prop_protected: value => `${d3.format(".2f")(value)}%`,
  protection_needed: value => `${d3.format(".2f")(value)}%`,
  total_endemic: value => localeFormatting(value),
  N_SPECIES: value => localeFormatting(value),
}

export const countryChallengesSizes = (area) => {
  if (area <= 150 ) return 18;
  if (area <= 22000) return 29;
  if (area <= 3250000) return 35;
  return 45
}