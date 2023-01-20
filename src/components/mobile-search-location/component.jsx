import React, { useState } from 'react';

import { useT } from '@transifex/react';

import SearchLocation from 'components/search-location';

import { GLOBAL_SPI_FEATURE_LAYER } from 'constants/layers-slugs';
import { SEARCH_TYPES } from 'constants/search-location-constants';

import styles from './styles.module.scss';

import { ReactComponent as IconSearch } from 'icons/search.svg';

function MobileSearchLocation({ view }) {
  const t = useT();
  const [searchLocationIsOpen, setSearchLocationIsOpen] = useState(false);
  return (
    <>
      {!searchLocationIsOpen && (
        <button
          type="button"
          className={styles.initialSearcher}
          onClick={() => setSearchLocationIsOpen(true)}
        >
          <IconSearch className={styles.placeholderIcon} />
          <p className={styles.placeholderText}>{t('Search location')}</p>
        </button>
      )}

      {searchLocationIsOpen && (
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
      )}
    </>
  );
}

MobileSearchLocation.propTypes = {};

MobileSearchLocation.defaultProps = {};

export default MobileSearchLocation;
