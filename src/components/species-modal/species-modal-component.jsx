import React, { useState, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { useLocale, useT } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';
import {
  getCountryNames,
  getSpeciesGroup,
} from 'constants/translation-constants';

import useEventListener from 'hooks/use-event-listener';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import { ReactComponent as ArrowIcon } from 'icons/arrow_right.svg';
import { Virtuoso } from 'react-virtuoso';
import { Loading } from 'he-components';
import HeaderItem from 'components/header-item';
import Tabs from 'components/tabs';
import useWindowSize from 'hooks/use-window-size';
import ExpandedInfo from './expanded-info';
import styles from './species-modal-styles.module.scss';
import capitalize from 'lodash/capitalize';
import {
  getVertebrateTabs,
  SPECIES_GROUP_STYLE_CLASS_DICTIONARY,
} from './species-modal-constants';

const SpeciesModalComponent = ({
  handleModalClose,
  countryData,
  open,
  sortCategory,
  handleSortClick,
  handleSearchChange,
  handleVertebrateChange,
  speciesList,
  searchTerm,
  vertebrateType,
}) => {
  const t = useT();

  const locale = useLocale();
  const vertebrateTabs = useMemo(() => getVertebrateTabs(), [locale]);
  const countryNames = useCallback(getCountryNames, [locale]);
  const translatedSpeciesGroup = useCallback(getSpeciesGroup, [locale]);
  const { height } = useWindowSize();
  const [expandedRow, setExpandedRow] = useState(null);
  const keyEscapeEventListener = (evt) => {
    evt = evt || window.event;
    if (evt.keyCode === 27) {
      handleModalClose();
    }
  };

  useEventListener('keydown', keyEscapeEventListener);

  const toggleExpand = (index) => {
    setExpandedRow(index === expandedRow ? null : index);
  };

  const renderRow = (index) => {
    const { species, speciesgroup, NSPS, percentprotected, stewardship } =
      speciesList[index];
    const isOpened = expandedRow === index;
    return (
      <div className={styles.tableRowContainer}>
        <div
          className={cx(
            styles.groupColor,
            styles[
              SPECIES_GROUP_STYLE_CLASS_DICTIONARY[speciesgroup] || speciesgroup
            ]
          )}
        />
        <div className={styles.tableRow}>
          <button
            className={styles.expandButton}
            onClick={() => toggleExpand(index)}
          >
            <div
              className={cx(styles.mainInfo, { [styles.isOpened]: isOpened })}
            >
              <div className={styles.tableItem}>
                {capitalize(
                  translatedSpeciesGroup[speciesgroup.toLowerCase()] ||
                    speciesgroup
                )}
              </div>
              <div className={cx(styles.tableItem, styles.bold, styles.italic)}>
                {species}
              </div>
              <div className={styles.tableItem}>{percentprotected}</div>
              <div className={styles.tableItem}>{NSPS}</div>
              <div
                className={cx(styles.tableItem, {
                  [styles.bold]: stewardship === 1,
                })}
              >
                {stewardship === 1
                  ? t('Endemic')
                  : `${stewardship} ${t('countries')}`}
              </div>
              <ArrowIcon
                className={cx(styles.arrowIcon, {
                  [styles.isOpened]: isOpened,
                })}
              />
            </div>
          </button>
          <div
            className={cx(styles.expandedInfo, { [styles.isOpened]: isOpened })}
          >
            {isOpened && <ExpandedInfo speciesName={species} />}
          </div>
        </div>
      </div>
    );
  };

  const headers = [
    t('Species group'),
    t('Species'),
    t('Range within country protected'),
    t('Species protection score'),
    t('Stewardship'),
  ];

  const PX_TO_TOP = 300;
  const tableHeight = height - PX_TO_TOP;
  const summaryText = useMemo(() => {
    const speciesNumber =
      countryData[
        vertebrateType === vertebrateTabs[0].slug
          ? 'landSpeciesTotal'
          : 'marineSpeciesTotal'
      ];

    // the list has been filtered
    if (speciesList.length < speciesNumber) {
      return `${getLocaleNumber(speciesList.length, locale)} ${t(
        'of'
      )} ${getLocaleNumber(speciesNumber, locale)} ${
        vertebrateType === vertebrateTabs[0].slug ? t('Land') : t('Marine')
      } ${t('vertebrate species')}`;
    }
    return `${getLocaleNumber(speciesNumber, locale)} ${
      vertebrateType === vertebrateTabs[0].slug ? t('Land') : t('Marine')
    } ${t('vertebrate species')}`;
  }, [countryData, vertebrateType, speciesList, locale]);

  const renderSpeciesModal = (
    <div className={styles.speciesModal}>
      <div className={styles.grid}>
        <h1 className={styles.title}>
          {t('Vertebrates in ')}
          {countryNames[countryData.name] || countryData.name}
        </h1>
        <section className={styles.section}>
          <div className={styles.search}>
            <SearchIcon className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder={t('Search in table')}
              onChange={handleSearchChange}
              value={searchTerm || ''}
            />
          </div>
          <div className={styles.summary}>
            <Tabs
              disabled={!countryData.coastal}
              tabs={vertebrateTabs}
              onClick={handleVertebrateChange}
              className={styles.speciesTab}
              defaultTabSlug={vertebrateType}
            />
            <span className={styles.speciesTabTitle}>{summaryText}</span>
          </div>
        </section>
        <div>
          <div className={styles.tableHeaderContainer}>
            <div className={styles.tableHeader}>
              {headers.map((title) => (
                <HeaderItem
                  title={title}
                  theme={{
                    headerItem: styles.tableHeaderItem,
                    arrowUp: styles.arrowUp,
                  }}
                  key={title}
                  isSortSelected={
                    sortCategory &&
                    sortCategory.split('-')[0] &&
                    sortCategory.split('-')[0] === title
                  }
                  sortDirection={sortCategory && sortCategory.split('-')[1]}
                  handleSortClick={handleSortClick}
                />
              ))}
            </div>
          </div>
          {!speciesList ? (
            <div
              className={styles.loader}
              style={{ width: '100%', height: tableHeight }}
            >
              <Loading />
            </div>
          ) : (
            <Virtuoso
              style={{ width: '100%', height: tableHeight }}
              totalCount={speciesList.length}
              item={renderRow}
            />
          )}
        </div>
        <section></section>
      </div>
      <button className={styles.closeButton} onClick={handleModalClose}>
        <CloseIcon />
      </button>
    </div>
  );
  if (!open) return null;

  return ReactDOM.createPortal(
    renderSpeciesModal,
    document.getElementById('root')
  );
};

export default SpeciesModalComponent;
