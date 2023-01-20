import React, { useState } from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';

import SearchLocation from 'components/search-location';

import { GLOBAL_SPI_FEATURE_LAYER } from 'constants/layers-slugs';
import { SEARCH_TYPES } from 'constants/search-location-constants';

import styles from './styles.module.scss';

import { ReactComponent as BackArrowIcon } from 'icons/back_arrow.svg';
import { ReactComponent as IconSearch } from 'icons/search.svg';

function MobileSearchLocation({ view }) {
  const t = useT();
  const [searchLocationIsOpen, setSearchLocationIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={cx({
          [styles.initialSearcher]: true,
          [styles.initialSearcherHidden]: searchLocationIsOpen,
        })}
        onClick={() => setSearchLocationIsOpen(true)}
      >
        <IconSearch className={styles.placeholderIcon} />
        <p className={styles.placeholderText}>{t('Search location')}</p>
      </button>

      <div
        className={cx({
          [styles.container]: true,
          [styles.containerHidden]: !searchLocationIsOpen,
        })}
      >
        <div className={styles.searcherContainer}>
          <SearchLocation
            view={view}
            theme="mobile"
            width="full"
            parentWidth="380px"
            placeholder={t('search location')}
            searchSourceLayerSlug={GLOBAL_SPI_FEATURE_LAYER}
            searchType={SEARCH_TYPES.country}
            hasResetButton
            mobile
            setSearchLocationIsOpen={setSearchLocationIsOpen}
          />
        </div>

        <button
          className={styles.backBtn}
          type="button"
          onClick={() => setSearchLocationIsOpen(false)}
        >
          <BackArrowIcon className={styles.arrowIcon} />
        </button>
      </div>
    </>
  );
}

MobileSearchLocation.propTypes = {};

MobileSearchLocation.defaultProps = {};

export default MobileSearchLocation;
