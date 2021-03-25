import * as d3 from 'd3';

export const currencyFormatting = d3.format("$,.2f");
export const localeFormatting = d3.format(",.0f");

export const countryChallengesChartFormats = {
  Population2016: value => localeFormatting(value),
  GNI_PPP: value => `${currencyFormatting(value)} B`,
  prop_hm_very_high: value => `${d3.format(".2f")(value)}%`,
  total_endemic: value => localeFormatting(value),
  N_SPECIES: value => localeFormatting(value),
}

export const countryChallengesSizes = (area) => {
  if (area < 2000) return 10;
  if (area < 200000) return 20;
  if (area < 20000000) return 30;
  return 45
}