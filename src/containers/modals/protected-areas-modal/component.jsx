import React, { useMemo } from 'react';

import loadable from '@loadable/component';

import { useT, useLocale } from '@transifex/react';

import { Modal } from 'he-components';

import ProtectedAreasTable from 'components/protected-areas-table';

import { getCountryNames } from 'constants/translation-constants';

import styles from './styles.module';

import { ReactComponent as SearchIcon } from 'icons/search-species.svg';

const Spinner = loadable(() => import('components/spinner'));

function ProtectedAreasModal({
  isOpen,
  handleModalClose,
  handleNameClick,
  handleSearchInputChange,
  handleSortChange,
  data,
  contextualData,
  loading,
}) {
  const t = useT();
  const locale = useLocale();
  const CountryNamesTranslations = useMemo(() => getCountryNames(), [locale]);

  return (
    <Modal isOpen={isOpen} onRequestClose={handleModalClose} theme={styles}>
      <div className={styles.modalContainer}>
        {loading && <Spinner floating />}
        <h1>
          {t('Protected areas in ')}
          {CountryNamesTranslations[contextualData.areaName] ||
            contextualData.areaName}
        </h1>
        <div className={styles.searchContainer}>
          <div className={styles.searchInput}>
            <SearchIcon className={styles.searchIcon} />
            <input
              onChange={handleSearchInputChange}
              type="text"
              placeholder={t('SEARCH IN TABLE')}
            />
          </div>
          <div>
            <strong>{data && data.length}</strong>
            {t(' PROTECTED AREAS')}
          </div>
        </div>
        <div className={styles.tableContainer}>
          <ProtectedAreasTable
            data={data}
            handleSortChange={handleSortChange}
            handleNameClick={handleNameClick}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ProtectedAreasModal;
