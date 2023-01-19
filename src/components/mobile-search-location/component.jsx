import React from 'react';

import { useT } from '@transifex/react';

import PropTypes from 'prop-types';

import SearchLocation from 'components/search-location';

import { GLOBAL_SPI_FEATURE_LAYER } from 'constants/layers-slugs';
import { SEARCH_TYPES } from 'constants/search-location-constants';

import styles from './styles.module.scss';

function MobileSearchLocation({ isOpen, setSearchLocationIsOpen, view }) {
  const t = useT();

  console.log({ view });
  return (
    isOpen && (
      <div className={styles.container}>
        <div className={styles.searcherContainer}>
          <SearchLocation
            view={view}
            theme="light"
            width="full"
            parentWidth="380px"
            placeholder={t('search location')}
            searchSourceLayerSlug={GLOBAL_SPI_FEATURE_LAYER}
            searchType={SEARCH_TYPES.country}
            mobile
          />
        </div>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => setSearchLocationIsOpen(false)}
        >
          CLOSE
        </button>
      </div>
    )
  );
}

MobileSearchLocation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

MobileSearchLocation.defaultProps = {};

export default MobileSearchLocation;
