import { format } from 'd3-format';

export const currencyFormatting = format("$,.2f");
export const localeFormatting = format(",.0f");
export const percentageFormat = format(".0f");
export const timestampAoiFormatting = (timestamp) => {
  if (!timestamp) return null;
  return (
    Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: 'numeric',
    hour12: false
  }).format(new Date(timestamp))
  )
}

export const roundGlobalRange = (value) => {
  if (value < 500) {
    return '<500';
  } else if (value < 1000) {
    return '500-1,000';
  } else if (value < 5000) {
    return '1,000-5,000';
  } else if (value < 10000) {
    return '5,000-10,000';
  } else if (value < 50000) {
    return '10,000-50,000';
  } else if (value < 100000) {
    return '50,000-100,000';
  } else if (value < 1000000) {
    return '100,000 - 1 million';
  } else {
    return format(".2s")(value).replace('M', ' million');
  }
}

export const roundRangeInArea = (value) => {
  const low = Math.floor(value / 5) * 5;
  const high = Math.ceil(value / 5) * 5;
  if (low < 5) {
    return "<5%";
  }
  if (low === 100) {
    return "100%";
  }

  return `${low}-${high}%`;
}

export const countryChallengesChartFormats = {
  Population2016: value => localeFormatting(value),
  GNI_PPP: value => `${currencyFormatting(value)} B`,
  prop_hm_very_high: value => `${percentageFormat(value)}%`,
  prop_protected: value => `${percentageFormat(value)}%`,
  protection_needed: value => `${percentageFormat(value)}%`,
  total_endemic: value => localeFormatting(value),
  N_SPECIES: value => localeFormatting(value),
}

export const countryChallengesSizes = (area) => {
  if (area <= 150 ) return 18;
  if (area <= 22000) return 29;
  if (area <= 3250000) return 35;
  return 45
}
