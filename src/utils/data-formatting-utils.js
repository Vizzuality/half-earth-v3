import { format } from 'd3-format';
import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';
import { t } from '@transifex/native';

const intlLanguage = (l) => {
  if (l === '') return 'en-GB';
  if (l === 'en') return 'en-GB';
  if (l === 'pt') return 'pt-PT';
  if (l === 'es') return 'es-ES';
  if (l === 'fr') return 'fr-FR';
  return 'en-GB';
}

export const getLocaleNumber = (value, locale) => {
  const formattedNumber = new Intl.NumberFormat(intlLanguage(locale)).format(value);
  return formattedNumber;
}

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

export const roundGlobalRange = (value, l) => {
  if (value < 500) {
    return '<500';
  } else if (value < 1000) {
    return `500-${getLocaleNumber(1000, l)}`;
  } else if (value < 5000) {
    return `${getLocaleNumber(1000, l)}-${getLocaleNumber(5000, l)}`;
  } else if (value < 10000) {
    return `${getLocaleNumber(5000, l)}-${getLocaleNumber(10000, l)}`;
  } else if (value < 50000) {
    return `${getLocaleNumber(10000, l)}-${getLocaleNumber(50000, l)}`;
  } else if (value < 100000) {
    return `${getLocaleNumber(50000, l)}-${getLocaleNumber(100000, l)}`;
  } else if (value < 1000000) {
    return `${getLocaleNumber(100000, l)} - 1 ${t('million')}`;
  } else {
    return format(".2s")(value).replace('M', `${t('million')}`);
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
  [COUNTRY_ATTRIBUTES.Pop2020]: value => localeFormatting(value),
  GNI_PPP: value => `${currencyFormatting(value)} B`,
  [COUNTRY_ATTRIBUTES.hm_vh_ter]: value => `${percentageFormat(value)}%`,
  [COUNTRY_ATTRIBUTES.prop_protected_ter]: value => `${percentageFormat(value)}%`,
  [COUNTRY_ATTRIBUTES.protection_needed_ter]: value => `${percentageFormat(value)}%`,
  [COUNTRY_ATTRIBUTES.total_endemic_ter]: value => localeFormatting(value),
  [COUNTRY_ATTRIBUTES.nspecies_ter]: value => localeFormatting(value),
}

export const countryChallengesSizes = (area) => {
  if (area <= 150) return 18;
  if (area <= 22000) return 29;
  if (area <= 3250000) return 35;
  return 45
}


