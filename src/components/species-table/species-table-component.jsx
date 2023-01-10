import React, { useState, useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { T, useLocale, useT } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import cx from 'classnames';
import { Loading } from 'he-components';
import capitalize from 'lodash/capitalize';

import useWindowSize from 'hooks/use-window-size';

import HeaderItem from 'components/header-item';

import { getSpeciesGroup } from 'constants/translation-constants';

import { ReactComponent as ArrowIcon } from 'icons/arrow_right.svg';
import { ReactComponent as SearchIcon } from 'icons/search.svg';

import ExpandedInfo from './expanded-info';
import {
  getVertebrateTabs,
  SPECIES_GROUP_STYLE_CLASS_DICTIONARY,
} from './species-table-constants';
import styles from './species-table-styles.module.scss';

function SpeciesTable({
  countryData,
  sortCategory,
  handleSortClick,
  handleSearchChange,
  handleVertebrateChange,
  speciesList,
  searchTerm,
  vertebrateType,
}) {
  const t = useT();
  const locale = useLocale();
  const vertebrateTabs = useMemo(() => getVertebrateTabs(), [locale]);

  const translatedSpeciesGroup = useMemo(getSpeciesGroup, [locale]);
  const { height } = useWindowSize();
  const [expandedRow, setExpandedRow] = useState(null);

  const { landSpeciesTotal, marineSpeciesTotal } = countryData;

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
            type="button"
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
                {stewardship === 1 ? (
                  t('Endemic')
                ) : (
                  <T _str="{stewardship} countries" stewardship={stewardship} />
                )}
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
    t('Group'),
    t('Species'),
    t('Range within country protected'),
    t('SPS'),
    t('Stewardship'),
  ];

  const PX_TO_TOP = 300;
  const tableHeight = height - PX_TO_TOP;

  return (
    <div className={styles.scrolleableArea}>
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
        <div className={styles.tabs}>
          <button
            type="button"
            onClick={() => handleVertebrateChange(vertebrateTabs[0].slug)}
          >
            <p
              className={cx({
                [styles.tab]: true,
                [styles.selectedTab]: vertebrateType === vertebrateTabs[0].slug,
              })}
            >
              <T
                _str="land ({speciesNumber})"
                speciesNumber={getLocaleNumber(landSpeciesTotal, locale)}
              />
            </p>
          </button>
          <button
            type="button"
            onClick={() => handleVertebrateChange(vertebrateTabs[1].slug)}
          >
            <p
              className={cx({
                [styles.tab]: true,
                [styles.selectedTab]: vertebrateType === vertebrateTabs[1].slug,
              })}
            >
              <T
                _str="marine ({speciesNumber})"
                speciesNumber={getLocaleNumber(marineSpeciesTotal, locale)}
              />
            </p>
          </button>
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
      <section />
    </div>
  );
}

export default SpeciesTable;
