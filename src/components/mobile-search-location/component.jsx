import React, { useEffect, useRef, useState } from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import SearchLocation from 'components/search-location';

import { GLOBAL_SPI_FEATURE_LAYER } from 'constants/layers-slugs';
import { SEARCH_TYPES } from 'constants/search-location-constants';

import styles from './styles.module.scss';

import { ReactComponent as BackArrowIcon } from 'icons/back_arrow.svg';
import { ReactComponent as IconSearch } from 'icons/search.svg';

function MobileSearchLocation({ countryName, view }) {
  const t = useT();
  const searchContainerRef = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);
  const [searchLocationModal, setSearchLocationModal] = useState(false);

  useEffect(() => {
    setParentWidth(searchContainerRef.current.offsetWidth);
  }, [searchContainerRef.current]);

  return (
    <>
      <motion.button
        type="button"
        animate={{ opacity: searchLocationModal ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className={cx({
          [styles.initialSearcher]: true,
          [styles.initialSearcherHidden]: searchLocationModal,
        })}
        onClick={() => setSearchLocationModal(true)}
      >
        <IconSearch className={styles.placeholderIcon} />
        <p className={styles.placeholderText}>
          {countryName ? countryName.toUpperCase() : t('Search location')}
        </p>
      </motion.button>

      <motion.div
        animate={{ opacity: searchLocationModal ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={cx({
          [styles.container]: true,
          [styles.containerHidden]: !searchLocationModal,
        })}
      >
        <div className={styles.searcherContainer} ref={searchContainerRef}>
          <SearchLocation
            view={view}
            theme="mobile"
            width="full"
            parentWidth={parentWidth}
            placeholder={t('search location')}
            searchSourceLayerSlug={GLOBAL_SPI_FEATURE_LAYER}
            searchType={SEARCH_TYPES.country}
            hasResetButton
            mobile
            searchLocationModal={searchLocationModal}
            setSearchLocationModal={setSearchLocationModal}
          />
        </div>

        <button
          className={styles.backBtn}
          type="button"
          onClick={() => setSearchLocationModal(false)}
        >
          <BackArrowIcon className={styles.arrowIcon} />
        </button>
      </motion.div>
    </>
  );
}

MobileSearchLocation.propTypes = {};

MobileSearchLocation.defaultProps = {};

export default MobileSearchLocation;
