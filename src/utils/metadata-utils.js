import metadataConfig from 'constants/metadata';

export const handleMetadataClick = ({ option, locale, setModalMetadata }) => {
  setModalMetadata({
    slug: metadataConfig[option.value] || option.slug || option.value,
    locale,
    title: `${option.metadataTitle || option.name} metadata`,
    isOpen: true,
  });
};
